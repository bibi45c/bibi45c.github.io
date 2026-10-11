import path from "path";
import fs from "fs";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "content", "blog");
const translationDirectory = path.join(process.cwd(), "content", "translations");

function readBlog(slug, locale = "en") {
  const filePath = path.join(rootDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);
  const originalLanguage = data.language ?? (/[\u4e00-\u9fff]/.test(`${data.title}\n${content}`) ? "zh" : "en");
  const availableLanguages = [originalLanguage];
  const otherLanguage = originalLanguage === "zh" ? "en" : "zh";
  if (fs.existsSync(path.join(translationDirectory, otherLanguage, `${slug}.mdx`))) {
    availableLanguages.push(otherLanguage);
  }
  const translated = locale !== originalLanguage && availableLanguages.includes(locale);
  const edition = translated
    ? matter(fs.readFileSync(path.join(translationDirectory, locale, `${slug}.mdx`), "utf8"))
    : { data, content };

  return {
    metadata: {
      ...data,
      title: edition.data.title,
      summary: edition.data.summary,
      slug,
      language: translated ? locale : originalLanguage,
      originalLanguage,
      availableLanguages,
      translated,
    },
    content: edition.content,
  };
}

export async function getBlogBySlug(slug, locale = "en") {
  return readBlog(slug, locale);
}

export async function getBlogs(locale = "en") {
  const files = fs.readdirSync(rootDirectory).filter((file) => file.endsWith(".mdx"));
  const posts = files
    .map((file) => getBlogMetadata(file, locale))
    .sort((a, b) =>
      new Date(a.publishedAt ?? "") < new Date(b.publishedAt ?? "") ? 1 : -1
    );

  return posts;
}

export function getBlogMetadata(filepath, locale = "en") {
  const slug = filepath.replace(/\.mdx$/, "");
  return readBlog(slug, locale)?.metadata;
}
