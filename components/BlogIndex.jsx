"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import ArticleLanguage from "./ArticleLanguage";
import { formatMessage, getMessages, localizedPath, postCountLabel } from "@/lib/i18n";
import { countTags, tagFromSlug, tagSlug } from "@/lib/tags";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function groupByYear(posts) {
  const groups = new Map();
  for (const post of posts) {
    const year = post.publishedAt?.slice(0, 4) || "—";
    if (!groups.has(year)) groups.set(year, { year, posts: [], slugs: new Set() });
    const group = groups.get(year);
    group.posts.push(post);
    group.slugs.add(tagSlug(post.tag));
  }
  return [...groups.values()];
}

// Tag filter and year archive for the blog index. The exported HTML lists every post (the no-JS view);
// `?tag=` is read after hydration and kept in sync with replaceState, so filtering adds no history entries.
export default function BlogIndex({ posts, locale = "en" }) {
  const t = getMessages(locale);
  const tags = useMemo(() => countTags(posts), [posts]);
  const years = useMemo(() => groupByYear(posts), [posts]);
  const [filter, setFilter] = useState({ tag: "all", ready: false });

  useIsomorphicLayoutEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("tag");
    const known = tagFromSlug(requested, tags.map(({ tag }) => tag));
    setFilter({ tag: known ? requested : "all", ready: true });
  }, [tags]);

  useEffect(() => {
    // React renders the filter from here on, so the pre-hydration CSS hook (see SiteLayout) is no longer needed.
    if (filter.ready) document.documentElement.removeAttribute("data-tag");
  }, [filter.ready]);

  function select(tag) {
    setFilter({ tag, ready: true });
    try {
      const url = new URL(window.location.href);
      if (tag === "all") url.searchParams.delete("tag");
      else url.searchParams.set("tag", tag);
      window.history.replaceState(window.history.state, "", url);
    } catch {
      // Filtering still works where the URL cannot be rewritten.
    }
  }

  const matches = (post) => filter.tag === "all" || tagSlug(post.tag) === filter.tag;
  const shown = posts.filter(matches).length;
  const filters = [{ slug: "all", label: t.allPosts, count: posts.length }, ...tags.map(({ tag, slug, count }) => ({ slug, label: t.tags[tag] ?? tag, count }))];

  return (
    <>
      <div role="group" aria-label={t.filterByTopic} className="mt-6 flex flex-wrap gap-x-5">
        {filters.map(({ slug, label, count }) => (
          <button
            key={slug}
            type="button"
            className="filter"
            aria-pressed={filter.tag === slug}
            aria-controls="blog-archive"
            onClick={() => select(slug)}
          >
            {label}
            <span className="filter-count">{count}</span>
          </button>
        ))}
      </div>
      <p className="mt-1 font-mono text-12 text-faint" aria-live="polite" data-blog-count>
        {formatMessage(t.showingOf, { shown, total: posts.length })}
      </p>

      <div id="blog-archive" className="mt-4 flex flex-col gap-10">
        {years.map(({ year, posts: yearPosts, slugs }) => {
          const count = yearPosts.filter(matches).length;
          return (
            <section key={year} className="relative pt-14 sm:pt-18" aria-labelledby={`year-${year}`} data-year data-tags={[...slugs].join(" ")} hidden={!count}>
              <h2 id={`year-${year}`}>
                <span className="year-mark" aria-hidden="true">{year}</span>
                <span className="sr-only">{year}</span>
                <span className="absolute right-0 top-8 font-mono text-12 font-normal text-faint sm:top-12" data-blog-count>
                  {postCountLabel(t, count)}
                </span>
              </h2>
              <ul className="relative">
                {yearPosts.map((post) => (
                  <li key={post.slug} data-entry data-tag={tagSlug(post.tag)} hidden={!matches(post)}>
                    <Link
                      href={localizedPath(`/blog/${post.slug}`, locale)}
                      className="group grid grid-cols-[minmax(0,1fr)] gap-0.5 py-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-6 sm:py-[9px]"
                    >
                      <span lang={post.language === "zh" ? "zh-CN" : "en"} className="text-15 font-medium leading-[1.5] text-muted-foreground transition-colors group-hover:text-strong sm:text-17 sm:leading-[1.45]">
                        {post.title}
                      </span>
                      <span className="flex flex-wrap gap-x-2 font-mono text-12 text-faint transition-colors group-hover:text-muted-foreground sm:flex-nowrap sm:whitespace-nowrap">
                        {post.publishedAt && <time dateTime={post.publishedAt}>{post.publishedAt.slice(5, 10)}</time>}
                        <span aria-hidden="true">·</span>
                        <span>{t.tags[post.tag] ?? post.tag}</span>
                        <span aria-hidden="true">·</span>
                        <ArticleLanguage language={post.language} locale={locale} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
