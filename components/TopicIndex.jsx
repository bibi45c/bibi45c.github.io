import Link from "next/link";
import { getMessages, localizedPath, postCountLabel } from "@/lib/i18n";
import { countTags } from "@/lib/tags";

// The four most used tags with their share of all posts; each opens the blog index filtered to that tag.
export default function TopicIndex({ blogs, locale = "en", className = "" }) {
  const t = getMessages(locale);
  const topics = countTags(blogs).slice(0, 4);
  if (!topics.length) return null;

  return (
    <section className={className} aria-labelledby="topics-title">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
        <h2 id="topics-title" className="label">{t.topics}</h2>
        <Link href={localizedPath("/blog", locale)} className="whitespace-nowrap font-mono text-12 text-muted-foreground transition-colors hover:text-strong">
          {t.allTopics} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ul>
        {topics.map(({ tag, slug, count }) => {
          const name = t.tags[tag] ?? tag;
          return (
            <li key={slug} className="border-t border-line first:border-t-0">
              <Link
                href={localizedPath(`/blog/?tag=${encodeURIComponent(slug)}`, locale)}
                aria-label={`${name}, ${postCountLabel(t, count)}`}
                className="group grid grid-cols-[minmax(0,1fr)_88px_28px] items-center gap-3 py-2.5"
              >
                <span className="text-15 font-medium leading-5 text-foreground transition-colors group-hover:text-strong">{name}</span>
                <span className="topic-bar" style={{ "--share": count / blogs.length }} aria-hidden="true" />
                <span className="text-right font-mono text-12 text-muted-foreground transition-colors group-hover:text-foreground">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
