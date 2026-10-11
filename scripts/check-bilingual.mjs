import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);
const require = createRequire(import.meta.url);
const matter = require("gray-matter");
// Application helpers are ESM inside a CommonJS package; resolve their one package import explicitly.
async function loadHelper(file) {
  const source = readFileSync(resolve(root, file), "utf8").replace('from "gray-matter"', `from ${JSON.stringify(pathToFileURL(require.resolve("gray-matter")).href)}`);
  return import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
}
const { localizedPath, unlocalizedPath, messages } = await loadHelper("lib/i18n.js");
const { getBlogs, getBlogBySlug } = await loadHelper("lib/blog.js");

assert.equal(localizedPath("/", "en"), "/", "English is the default root");
assert.equal(localizedPath("/", "zh"), "/zh/");
assert.equal(localizedPath("/zh/blog/example/?from=home#details", "en"), "/blog/example/?from=home#details");
assert.equal(localizedPath("/blog/example/?from=home#details", "zh"), "/zh/blog/example/?from=home#details");
assert.equal(unlocalizedPath("/zhong/"), "/zhong", "Only an exact locale segment is removed");
assert.deepEqual(Object.keys(messages.en).sort(), Object.keys(messages.zh).sort());
assert.deepEqual(Object.keys(messages.en.nav).sort(), Object.keys(messages.zh.nav).sort());

for (const locale of ["en", "zh"]) {
  for (const file of readdirSync(resolve(root, "content/translations", locale))) {
    assert.ok(file.endsWith(".mdx"));
    assert.ok(existsSync(resolve(root, "content/blog", file)), `Orphan translation: ${locale}/${file}`);
    const { data, content } = matter(readFileSync(resolve(root, "content/translations", locale, file), "utf8"));
    assert.ok(data.title && data.summary && content.trim(), `Incomplete translation: ${locale}/${file}`);
  }
}

const enPosts = await getBlogs("en");
const zhPosts = await getBlogs("zh");
assert.deepEqual(enPosts.map(p => p.slug), zhPosts.map(p => p.slug), "Switching languages preserves the article catalog and order");
assert.equal(await getBlogBySlug("nonexistent-test-article"), null);
let bilingual = 0;
for (const post of enPosts) {
  const original = matter(readFileSync(resolve(root, "content/blog", `${post.slug}.mdx`), "utf8"));
  const en = await getBlogBySlug(post.slug, "en");
  const zh = await getBlogBySlug(post.slug, "zh");
  const originalEdition = post.originalLanguage === "zh" ? zh : en;
  assert.equal(originalEdition.content, original.content, `Original preserved: ${post.slug}`);
  for (const [locale, edition] of [["en", en], ["zh", zh]]) {
    for (const key of ["author", "publishedAt", "tag"]) assert.equal(edition.metadata[key], original.data[key]);
    const available = post.availableLanguages.includes(locale);
    assert.equal(edition.metadata.language, available ? locale : post.originalLanguage);
    assert.equal(edition.metadata.translated, available && locale !== post.originalLanguage);
  }
  if (post.availableLanguages.length === 2) {
    bilingual++;
    assert.notEqual(en.metadata.title, zh.metadata.title);
    assert.notEqual(en.content, zh.content);
    assert.deepEqual(en.content.match(/```[\s\S]*?```/g), zh.content.match(/```[\s\S]*?```/g), `Code samples preserved: ${post.slug}`);
  }
}

if (process.argv.includes("--export")) {
  const decode = text => text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const rendered = html => decode(html.replace(/<script\b[\s\S]*?<\/script>/g, ""));
  function inspect(path, locale) {
    const html = readFileSync(resolve(root, "out", path.replace(/^\//, ""), "index.html"), "utf8");
    assert.ok(html.includes(`<html lang="${locale === "zh" ? "zh-CN" : "en"}"`), `Document language: ${path}`);
    const t = messages[locale];
    assert.ok(html.includes(`aria-label="${t.switchLanguage}"`), `Language button: ${path}`);
    assert.ok(html.includes(`href="${localizedPath(path, locale === "zh" ? "en" : "zh")}"`), `Matching language target: ${path}`);
    for (const match of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)"/g)) {
      const target = decode(match[1]);
      const file = resolve(root, "out", target.replace(/^\//, ""), target.endsWith("/") ? "index.html" : "");
      assert.ok(existsSync(file), `Broken exported link on ${path}: ${target}`);
    }
    return rendered(html);
  }
  for (const locale of ["en", "zh"]) {
    for (const path of ["/", "/about", "/project", "/blog"]) {
      const html = inspect(localizedPath(path, locale), locale);
      assert.ok(/hreflang="en"/i.test(html) && /hreflang="zh-CN"/i.test(html) && /hreflang="x-default"/i.test(html));
      if (path === "/") assert.ok(html.includes(messages[locale].greeting) && html.includes(messages[locale].hashtag));
      if (path === "/about") assert.ok(html.includes(messages[locale].aboutIntro));
      if (path === "/project") assert.ok(html.includes(messages[locale].projectSummary));
    }
    for (const post of await getBlogs(locale)) {
      const html = inspect(localizedPath(`/blog/${post.slug}`, locale), locale);
      assert.ok(html.includes(post.title), `Localized article title: ${locale}/${post.slug}`);
      assert.ok(html.includes(`article lang="${post.language === "zh" ? "zh-CN" : "en"}"`));
      assert.equal(html.includes(messages[locale].originalOnly), post.language !== locale, `Fallback notice: ${locale}/${post.slug}`);
      if (post.availableLanguages.length === 2) assert.ok(/hreflang="zh-CN"/i.test(html));
    }
  }
}
console.log(`Bilingual checks passed: ${enPosts.length} original articles, ${bilingual} translated pairs, locale paths, preserved code and truthful fallbacks${process.argv.includes("--export") ? ", all EN/ZH exported pages and internal links" : ""}.`);
