import ViewCount from "@/components/ViewCount";
import { builtAt, commit, postCount } from "@/lib/build-info";
import { formatMessage, getMessages } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer({ locale = "en" }) {
  const t = getMessages(locale);
  return (
    <footer className="flex w-full flex-col gap-3 border-t border-line pb-8 pt-6 font-mono text-12 leading-5 text-muted-foreground md:flex-row md:items-end md:justify-between md:gap-6">
      <div className="flex flex-col">
        <p>
          &copy; {new Date().getFullYear()} bibi45. {t.copyright}
        </p>
        <p>{t.builtWith}</p>
        <ViewCount path="TOTAL" label={t.totalViews} />
      </div>
      <p className="flex flex-wrap items-center gap-x-2 text-11 tracking-[0.02em] text-faint tabular-nums">
        <span className="size-[5px] rounded-pill bg-accent/60" aria-hidden="true" />
        <span>{formatMessage(t.statusPosts, { count: postCount })}</span>
        <span aria-hidden="true">·</span>
        <span>
          {t.statusBuilt} <time dateTime={builtAt}>{builtAt}</time>
        </span>
        <span aria-hidden="true">·</span>
        {commit === "dev" ? (
          <span>{commit}</span>
        ) : (
          <a
            href={`${site.repository}/commit/${commit}`}
            aria-label={formatMessage(t.statusCommit, { commit })}
            className="transition-colors hover:text-foreground"
          >
            {commit}
          </a>
        )}
      </p>
    </footer>
  );
}
