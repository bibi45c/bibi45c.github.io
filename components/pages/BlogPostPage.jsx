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
    <section className="mx-auto flex animate-page-in">
      <aside className="relative hidden pt-14 2xl:block">
        <Link
          href={localizedPath("/blog", locale)}
          className="glass sticky top-10 flex items-center gap-1.5 rounded-pill py-2 pl-3 pr-4 text-14 font-medium text-muted-foreground transition-colors hover:text-strong"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{t.back}</span>
        </Link>
      </aside>

      <article lang={language === "zh" ? "zh-CN" : "en"} className="mx-auto w-full min-w-0 max-w-3xl">
        <header>
          {image && (
            <div className="relative mb-10 aspect-[240/135] w-full overflow-hidden rounded-row border border-line">
              <Image
                src={image}
                alt={title || ""}
                className="object-cover"
                fill
              />
            </div>
          )}

          <p lang={locale === "zh" ? "zh-CN" : "en"} className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-12 text-muted-foreground">
            {publishedAt && <time dateTime={publishedAt}>{publishedAt}</time>}
            <span aria-hidden="true">·</span>
            <span>{t.tags[tag] ?? tag}</span>
            <span aria-hidden="true">·</span>
            <ArticleLanguage language={language} locale={locale} />
            {translated && (
              <>
                <span aria-hidden="true">·</span>
                <span>{t.translated}</span>
              </>
            )}
            <ViewCount path={localizedPath(`/blog/${slug}`, locale).replace(/\/$/, "")} label={t.views} prefix="· " />
          </p>

          <h1 className="page-title mt-3.5">{title}</h1>

          {author && <p className="mt-3 text-15 text-muted-foreground">{author}</p>}

          {summary && <p className="mt-6 text-17 leading-[1.7] text-foreground [&:lang(zh)]:leading-[1.85]">{summary}</p>}
        </header>

        {language !== locale && (
          <p lang={locale === "zh" ? "zh-CN" : "en"} className="mt-8 rounded-row border border-line bg-hover p-4 text-14 leading-6 text-muted-foreground">{t.originalOnly}</p>
        )}

        <div className="prose article-prose mt-12">
          <MDXRemote source={content} />
        </div>
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
