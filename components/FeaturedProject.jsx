import Link from "next/link";
import ProjectThumb from "./ProjectThumb";
import { getMessages, localizedPath } from "@/lib/i18n";

export default function FeaturedProject({ locale = "en", className = "" }) {
  const t = getMessages(locale);
  const href = locale === "zh" ? "/architecture/hex-tactics/" : "/architecture/hex-tactics/en.html";

  return (
    <section className={className} aria-labelledby="feat-title">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
        <h2 id="feat-title" className="label">{t.featuredProject}</h2>
        <Link href={localizedPath("/project", locale)} className="whitespace-nowrap font-mono text-12 text-muted-foreground transition-colors hover:text-strong">
          {t.allProjects} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <a href={href} className="group mt-4 block">
        <ProjectThumb src="/architecture/hex-tactics/preview-dark.png" alt={t.projectAlt} title="Hex Tactics" kind={t.projectKind} />
        <span className="mt-3 block text-15 font-semibold leading-[1.45] text-foreground transition-colors group-hover:text-strong">{t.projectTitle}</span>
        <span className="mt-1 block text-14 leading-[1.6] text-muted-foreground [&:lang(zh)]:leading-[1.75]">{t.projectOneLiner}</span>
        <span className="mt-2 inline-flex items-center gap-1 font-mono text-12 text-muted-foreground transition-colors group-hover:text-strong">
          {t.openMap} <span aria-hidden="true">↗</span>
        </span>
      </a>
    </section>
  );
}
