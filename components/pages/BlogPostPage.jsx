import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogBySlug } from "@/lib/blog";
import ViewCount from "@/components/ViewCount";
import ArticleLanguage from "@/components/ArticleLanguage";
import { getMessages, localizedPath } from "@/lib/i18n";

export default async function BlogPostPage({ slug, locale = "en" }) {
  const blog = await getBlogBySlug(slug, locale);

  if (!blog) {
    notFound();
  }

  const { metadata, content } = blog;
  const { title, summary, image, author, publishedAt, tag, language, translated } = metadata;
  const t = getMessages(locale);

  return (
    <section className="flex mx-auto">
      <aside className="relative hidden pt-14 2xl:block">
        <Link
          href={localizedPath("/blog", locale)}
          className="sticky flex items-center gap-1 py-2 pl-4 pr-5 rounded-full top-10  text-foreground font-semibold bg-[#f2f2f21a] "
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </Link>
      </aside>

      <article lang={language === "zh" ? "zh-CN" : "en"} className="w-full min-w-0 max-w-3xl mx-auto mt-16">
        <header>
          {image && (
            <div className="relative w-full flex justify-center items-center mb-10 overflow-hidden rounded-lg aspect-[240/135]">
              <Image
                src={image}
                alt={title || ""}
                className="object-cover"
                fill
              />
            </div>
          )}

          <p lang={locale === "zh" ? "zh-CN" : "en"} className="mb-2 text-sm text-muted-foreground">
            {publishedAt ?? ""} | {t.tags[tag] ?? tag}{" "}
            <ArticleLanguage language={language} locale={locale} />
            {translated && <span className="ml-2 text-xs">{t.translated}</span>}
            <ViewCount path={localizedPath(`/blog/${slug}`, locale).replace(/\/$/, "")} label={t.views} prefix=" | " />
          </p>

          <h1 className="mb-2 text-3xl sm:text-4xl font-bold">{title}</h1>

          <p className="mb-6 text-muted-foreground">{author}</p>

          <p className="">{summary}</p>
        </header>

        {language !== locale && (
          <p lang={locale === "zh" ? "zh-CN" : "en"} className="mt-8 rounded-xl border border-foreground/15 bg-foreground/5 p-4 text-sm leading-6 text-muted-foreground">{t.originalOnly}</p>
        )}

        <main className="mt-16 prose max-w-none prose-invert prose-p:text-foreground prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-strong:font-bold prose-a:text-blue-400 prose-a:opacity-80 prose-code:text-foreground prose-img:opacity-90 prose-p:tracking-tight prose-p:text-sm prose-li:text-sm">
          <MDXRemote source={content} />
        </main>
      </article>
    </section>
  );
}

export async function blogMetadata(slug, locale = "en") {
  const blog = await getBlogBySlug(slug, locale);
  if (!blog) return {};
  const { title, summary, availableLanguages } = blog.metadata;
  const path = `/blog/${slug}`;
  const bilingual = availableLanguages.length > 1;
  return {
    title: `${title} | bibi45`,
    description: summary,
    alternates: {
      canonical: localizedPath(path, bilingual ? locale : "en"),
      ...(bilingual ? { languages: { en: localizedPath(path, "en"), "zh-CN": localizedPath(path, "zh"), "x-default": localizedPath(path, "en") } } : {}),
    },
  };
}
