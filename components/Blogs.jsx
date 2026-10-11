import Link from "next/link";
import Image from "next/image";
import ArticleLanguage from "./ArticleLanguage";
import { getMessages, localizedPath } from "@/lib/i18n";

export default function Blogs({ blogs, locale = "en" }) {
  const t = getMessages(locale);
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.slug} className="mb-10">
          <Link href={localizedPath(`/blog/${blog.slug}`, locale)} lang={blog.language === "zh" ? "zh-CN" : "en"}>
            <div
              className={`flex flex-col sm:flex-row w-full lg:w-4/5 items-stretch gap-6 rounded-2xl  sm:shadow-[0_0px_1.2px_rgb(140,140,140)] shadow-[0_0px_2px_rgb(140,140,140)] hover:shadow-[0_0px_2px_rgb(140,140,140)] p-3 opacity-90 hover:opacity-100  hover:bg-muted`}
            >
              {blog.image ? (
                <div className="relative aspect-[48/27] w-full shrink-0 overflow-hidden rounded-2xl sm:w-80">
                  <Image src={blog.image} alt="" fill className="object-cover" />
                </div>
              ) : (
                <div className="flex aspect-[48/27] w-full shrink-0 flex-col justify-between rounded-2xl border border-cyan-200/10 bg-gradient-to-br from-cyan-300/20 via-slate-200/5 to-indigo-400/20 p-5 sm:w-80">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/70">{t.tags[blog.tag] ?? blog.tag}</span>
                  <span className="line-clamp-3 font-semibold text-foreground/90">{blog.title}</span>
                </div>
              )}

              <div className="flex flex-col justify-between flex-grow p-4">
                <div>
                  <h2 className="mb-2 font-bold">{blog.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {blog.publishedAt ?? ""} | {t.tags[blog.tag] ?? blog.tag}{" "}
                    <ArticleLanguage language={blog.language} locale={locale} />
                  </p>
                </div>
                <p className="text-sm ">{blog.summary}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
