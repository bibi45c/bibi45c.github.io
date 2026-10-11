import { Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ArticleLanguage from "./ArticleLanguage";
import { getMessages, localizedPath } from "@/lib/i18n";

export default function RecentUpdate({ blogs, locale = "en" }) {
  const t = getMessages(locale);
  return (
    <div className="mt-10">
      <div className="flex gap-3 justify-start items-center mb-10 w-full">
        <Newspaper />
        <span className="text-lg font-semibold">{t.recent}</span>
      </div>
      <ul className="grid grid-cols-1 gap-10 w-full">
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link href={localizedPath(`/blog/${blog.slug}`, locale)} lang={blog.language === "zh" ? "zh-CN" : "en"}>
              <div className="relative rounded-2xl hover:shadow-[0_0px_2px_rgb(140,140,140)] shadow-[0_0px_1.2px_rgb(140,140,140)] opacity-70 hover:opacity-90">
                {blog.image ? (
                  <div className="relative aspect-[240/135] w-full overflow-hidden rounded-2xl">
                    <Image src={blog.image} alt="" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-[240/135] w-full flex-col justify-between rounded-2xl border border-cyan-200/10 bg-gradient-to-br from-cyan-300/20 via-slate-200/5 to-indigo-400/20 p-6">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100/70">{t.tags[blog.tag] ?? blog.tag}</span>
                    <span className="max-w-lg text-2xl font-semibold text-foreground/90">{blog.title}</span>
                  </div>
                )}

                <div className="absolute right-0 bottom-0 left-0 p-4 rounded-lg backdrop-blur-md bg-black/60 dark:bg-black/70">
                  <h2 className="mb-2 font-bold text-white">{blog.title}</h2>
                  <p className="mb-4 text-sm text-gray-300 dark:text-gray-200">
                    {blog.publishedAt ?? ""} | {t.tags[blog.tag] ?? blog.tag}{" "}
                    <ArticleLanguage language={blog.language} locale={locale} />
                  </p>
                  <p className="text-sm text-gray-200 dark:text-gray-100">
                    {blog.summary}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
