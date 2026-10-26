import Description from "@/components/Description";
import Image from "next/image";
import { getMessages } from "@/lib/i18n";

const linkClass = "text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:text-strong hover:decoration-accent";

export default function ProjectPage({ locale = "en" }) {
  const t = getMessages(locale);
  return (
    <div className="flex max-w-3xl animate-page-in flex-col gap-12">
      <Description page={t.nav.projects} />
      <section>
        <a
          href={locale === "zh" ? "/architecture/hex-tactics/" : "/architecture/hex-tactics/en.html"}
          aria-label={t.projectPreview}
          className="group block overflow-hidden rounded-row border border-line transition-colors hover:border-tint/[0.14]"
        >
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/architecture/hex-tactics/preview-dark.png" />
            <Image src="/architecture/hex-tactics/preview-light.png" alt={t.projectAlt} width={1440} height={900} className="h-auto w-full opacity-[0.82] transition-opacity group-hover:opacity-100" />
          </picture>
        </a>
        <div className="mt-6 text-15 leading-[1.7] text-muted-foreground [&:lang(zh)]:leading-[1.85]">
          <h2 className="text-20 font-semibold text-strong">{t.projectTitle}</h2>
          <p className="mt-3">{t.projectSummary}</p>
          <nav aria-label={t.projectLinks} className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-14 font-medium">
            <a lang="en" className={linkClass} href="/architecture/hex-tactics/en.html">Open English →</a>
            <a lang="zh-CN" className={linkClass} href="/architecture/hex-tactics/">打开中文 →</a>
            <a className={linkClass} href="https://github.com/bibi45c/UEA-CMP-SEM2-GAME-Turn_Based_Strategy">{t.source}</a>
          </nav>
          <p className="mt-5 font-mono text-12 text-faint">{t.projectEvidence}</p>
        </div>
      </section>
      <section className="border-t border-line pt-6 text-15 leading-[1.7] text-muted-foreground [&:lang(zh)]:leading-[1.85]">
        <h2 className="text-18 font-semibold text-strong">{t.caseStudies}</h2>
        <p className="mt-3">{t.caseStudiesDetail}</p>
      </section>
    </div>
  );
}
