import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { articleCounterPaths, getRecommendationPosts, parseViewCount, selectRandomPost } from "../lib/recommendations.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const posts = [
  { slug: "new", title: "New", publishedAt: "2026-10-12" },
  { slug: "old", title: "Old", publishedAt: "2020-01-01" },
  { slug: "middle", title: "Middle", publishedAt: "2024-01-01" },
  { slug: "other", title: "Other", publishedAt: "2023-01-01" },
];
const snapshot = {
  siteCode: "example",
  updatedAt: "2026-10-12T00:00:00Z",
  counts: { new: 1, old: 15, middle: 10, other: 3 },
};
assert.equal(parseViewCount("1,234"), 1234);
assert.equal(parseViewCount("0"), 0);
for (const unknown of [null, undefined, "", "unknown", "12broken", -1, NaN, true]) {
  assert.equal(parseViewCount(unknown), null, "Unknown counts remain unknown");
}
assert.deepEqual(articleCounterPaths("example"), ["/blog/example", "/zh/blog/example"]);
assert.deepEqual(getRecommendationPosts(posts, snapshot, "example").popular.map(p => p.slug), ["old", "middle"], "Traffic wins over publication date");
const tied = { ...snapshot, counts: { new: 1, old: 1, middle: 1, other: 1 } };
assert.deepEqual(getRecommendationPosts(posts, tied, "example").popular.map(p => p.slug), ["new", "middle"]);
for (const unavailable of [
  { ...snapshot, counts: { ...snapshot.counts, old: null } },
  { ...snapshot, counts: { new: 1, middle: 10, other: 3 } },
  { ...snapshot, updatedAt: null },
  { ...snapshot, siteCode: "different" },
]) {
  const result = getRecommendationPosts(posts, unavailable, "example");
  assert.equal(result.ranked, false);
  assert.deepEqual(result.popular.map(p => p.slug), ["new", "middle"]);
  assert.ok(result.popular.every(p => p.views === null), "A fallback must not invent zero traffic");
}
const excluded = ["old", "middle"];
assert.equal(selectRandomPost(posts, excluded, undefined, () => 0).slug, "new");
assert.equal(selectRandomPost(posts, excluded, undefined, () => 0.999).slug, "other");
assert.equal(selectRandomPost(posts, excluded, "new", () => 0).slug, "other", "Shuffle changes only the random item");
assert.equal(selectRandomPost(posts.slice(0, 1), ["new"]), null);
assert.equal(selectRandomPost(posts.slice(0, 1), [], "new").slug, "new", "A one-item pool remains valid");
assert.deepEqual(getRecommendationPosts(posts.map(p => ({ ...p, title: "中文 " + p.title })), snapshot, "example").popular.map(p => p.slug), ["old", "middle"], "Locale cannot change the ranking");

const actual = JSON.parse(readFileSync(resolve(root, "data/article-popularity.json"), "utf8"));
if (actual.updatedAt) {
  for (const count of Object.values(actual.counts)) {
    assert.notEqual(parseViewCount(count), null, "Stored traffic counts are valid");
  }
}
if (process.argv.includes("--export")) {
  const catalog = readdirSync(resolve(root, "content/blog")).filter(file => file.endsWith(".mdx")).map(file => ({
    ...matter(readFileSync(resolve(root, "content/blog", file), "utf8")).data,
    slug: file.slice(0, -4),
  }));
  const expected = getRecommendationPosts(catalog, actual, actual.siteCode);
  for (const [path, title, random, shuffle] of [
    ["out/index.html", "Read next", "At random", "Another one"],
    ["out/zh/index.html", "接着读", "随读", "换一篇"],
  ]) {
    const html = readFileSync(resolve(root, path), "utf8").replace(/<script\b[\s\S]*?<\/script>/g, "");
    assert.ok(html.includes(title) && html.includes(random) && html.includes(shuffle));
    assert.ok(html.includes('aria-labelledby="read-next-title"'));
    const aside = html.match(/<aside\b[\s\S]*?<\/aside>/)?.[0];
    assert.ok(aside, "Recommendation card sits beside the hero");
    const slugs = [...aside.matchAll(/href="\/(?:zh\/)?blog\/([^/"?#]+)\/"/g)].map(match => match[1]);
    assert.deepEqual(slugs.slice(0, 2), expected.popular.map(post => post.slug), "Export contains the actual traffic leaders");
    assert.equal(new Set(slugs).size, 3, "Random recommendation cannot repeat a popular article");
    assert.ok(aside.includes(expected.ranked ? path.includes("/zh/") ? "热门" : "Most read" : path.includes("/zh/") ? "近期文章" : "Recent posts"));
    assert.ok(!html.includes("Hey, I&#x27;m bibi45.") && !html.includes("bibi45 的一页笔记"), "Duplicate profile card removed");
  }
}
console.log("Recommendation checks passed: traffic ranking, honest fallback, locale invariance, random exclusions and small catalogs" + (process.argv.includes("--export") ? ", both exported cards." : "."));
