"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getMessages, localizedPath } from "@/lib/i18n";
import { selectRandomPost } from "@/lib/recommendations.mjs";
import styles from "@/components/ProfileNote.module.css";

const storageKey = "bibi45:read-next:random";

function remember(slug) {
  try {
    sessionStorage.setItem(storageKey, slug);
  } catch {
    // The random picker also works when browser storage is unavailable.
  }
}

export default function ReadNext({ posts, popular, ranked, locale = "en" }) {
  const t = getMessages(locale);
  const excludedSlugs = popular.map(post => post.slug);
  const pool = posts.filter(post => !excludedSlugs.includes(post.slug));
  // A deterministic first render keeps the exported HTML and hydration in sync.
  const [randomSlug, setRandomSlug] = useState(pool[0]?.slug ?? null);

  useEffect(() => {
    const excluded = popular.map(post => post.slug);
    let saved;
    try {
      saved = sessionStorage.getItem(storageKey);
    } catch {}
    const savedPost = posts.find(post => post.slug === saved && !excluded.includes(post.slug));
    const picked = savedPost ?? selectRandomPost(posts, excluded);
    if (picked) {
      setRandomSlug(picked.slug);
      remember(picked.slug);
    }
  }, [posts, popular]);

  const randomPost = pool.find(post => post.slug === randomSlug) ?? pool[0];
  function shuffle() {
    const picked = selectRandomPost(posts, excludedSlugs, randomPost?.slug);
    if (!picked) return;
    setRandomSlug(picked.slug);
    remember(picked.slug);
  }

  function article(post) {
    const language = post.language === "zh" ? "中文" : "English";
    return (
      <Link className={styles.row} href={localizedPath("/blog/" + post.slug, locale)}>
        <span className={styles.rowContent}>
          <span className={styles.rowTitle} lang={post.language === "zh" ? "zh-CN" : "en"}>
            {post.title}
          </span>
          <span className={styles.rowMeta}>
            <span>{t.tags[post.tag] ?? post.tag}</span>
            <span aria-hidden="true"> · </span>
            <span aria-label={t.articleLanguage + ": " + language}>{language}</span>
            {typeof post.views === "number" && (
              <>
                <span aria-hidden="true"> · </span>
                <span>{t.views}: {post.views.toLocaleString(locale === "zh" ? "zh-CN" : "en")}</span>
              </>
            )}
          </span>
        </span>
        <ArrowUpRight size={16} className={styles.arrow} aria-hidden="true" />
      </Link>
    );
  }

  return (
    <div className={"glass glass-lift " + styles.card}>
      <h2 id="read-next-title" className={styles.title}>{t.readNext}</h2>
      <p className={styles.intro}>{ranked ? t.readNextIntro : t.readNextRecentIntro}</p>
      <section className={styles.group} aria-label={ranked ? t.mostRead : t.recentPicks}>
        <h3 className={"label " + styles.label}>{ranked ? t.mostRead : t.recentPicks}</h3>
        {popular.map(post => <div key={post.slug}>{article(post)}</div>)}
      </section>
      {randomPost && (
        <section className={styles.group} aria-label={t.randomPick}>
          <div className={styles.groupHead}>
            <h3 className={"label " + styles.label}>{t.randomPick}</h3>
            <button type="button" className={styles.shuffle} onClick={shuffle} disabled={pool.length < 2}>
              <RotateCw size={13} aria-hidden="true" />
              {t.anotherPost}
            </button>
          </div>
          <div className={styles.randomEntry} aria-live="polite" aria-atomic="true">
            {article(randomPost)}
          </div>
        </section>
      )}
    </div>
  );
}
