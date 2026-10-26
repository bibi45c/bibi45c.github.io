import Link from "next/link";
import ArticleLanguage from "./ArticleLanguage";
import { getMessages, localizedPath } from "@/lib/i18n";

// Plain rows with hairlines: grey until hovered, no panel.
export default function RecentUpdate({ blogs, locale = "en", className = "" }) {
  const t = getMessages(locale);
  return (
    <section className={className} aria-labelledby="recent-title">
      <h2 id="recent-title" className="mb-3.5 text-18 font-semibold text-strong">{t.recent}</h2>
      <ul>
        {blogs.map((blog) => {
          const lang = blog.language === "zh" ? "zh-CN" : "en";
          return (
            <li key={blog.slug} className="border-t border-line first:border-t-0">
              <Link href={localizedPath(`/blog/${blog.slug}`, locale)} className="group block py-4">
                <span className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-12 text-muted-foreground">
                  {blog.publishedAt && <time dateTime={blog.publishedAt}>{blog.publishedAt}</time>}
                  <span aria-hidden="true">·</span>
                  <span>{t.tags[blog.tag] ?? blog.tag}</span>
                  <span aria-hidden="true">·</span>
                  <ArticleLanguage language={blog.language} locale={locale} />
                </span>
                <span lang={lang} className="mt-1.5 block text-17 font-semibold text-foreground transition-colors group-hover:text-strong">
                  {blog.title}
                </span>
                {blog.summary && (
                  <span lang={lang} className="mt-1 block text-15 text-muted-foreground transition-colors group-hover:text-foreground [&:lang(zh)]:leading-[1.75]">
                    {blog.summary}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
