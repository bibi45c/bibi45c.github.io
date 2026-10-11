import Description from "@/components/Description";
import MotionDivWrapper from "@/components/MotionDivWrapper";
import Image from "next/image";
import { getMessages } from "@/lib/i18n";

export default function ProjectPage({ locale = "en" }) {
  const t = getMessages(locale);
  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-col gap-10"
    >
      <Description page={t.nav.projects} />
      <section className="max-w-3xl overflow-hidden rounded-2xl border border-foreground/15 bg-foreground/[0.03]">
        <a href={locale === "zh" ? "/architecture/hex-tactics/" : "/architecture/hex-tactics/en.html"} aria-label={t.projectPreview}>
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/architecture/hex-tactics/preview-dark.png" />
            <Image src="/architecture/hex-tactics/preview-light.png" alt={t.projectAlt} width={1440} height={900} className="h-auto w-full" />
          </picture>
        </a>
        <div className="p-6 text-sm leading-7 text-muted-foreground sm:p-8">
          <h2 className="mb-3 text-xl font-semibold text-foreground">{t.projectTitle}</h2>
          <p>{t.projectSummary}</p>
          <nav aria-label={t.projectLinks} className="mt-5 flex flex-wrap gap-x-6 gap-y-3 font-medium text-foreground">
            <a lang="en" className="underline underline-offset-4" href="/architecture/hex-tactics/en.html">Open English →</a>
            <a lang="zh-CN" className="underline underline-offset-4" href="/architecture/hex-tactics/">打开中文 →</a>
            <a className="underline underline-offset-4" href="https://github.com/bibi45c/UEA-CMP-SEM2-GAME-Turn_Based_Strategy">{t.source}</a>
          </nav>
          <p className="mt-5 text-xs">{t.projectEvidence}</p>
        </div>
      </section>
      <section className="max-w-3xl rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-8 text-sm leading-7 text-muted-foreground">
        <p className="mb-4 text-foreground">{t.caseStudies}</p>
        <p>
          {t.caseStudiesDetail}
        </p>
      </section>
    </MotionDivWrapper>
  );
}
