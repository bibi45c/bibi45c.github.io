import Description from "@/components/Description";
import MotionDivWrapper from "@/components/MotionDivWrapper";
import Image from "next/image";

export default function ProjectPage() {
  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-col gap-10"
    >
      <Description page="Projects" />
      <section className="max-w-3xl overflow-hidden rounded-2xl border border-foreground/15 bg-foreground/[0.03]">
        <a href="/architecture/hex-tactics/en.html" aria-label="Open the Hex Tactics interactive architecture in English">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/architecture/hex-tactics/preview-dark.png" />
            <Image src="/architecture/hex-tactics/preview-light.png" alt="Hex Tactics runtime architecture: exploration, shared combat rules and synchronous event feedback" width={1440} height={900} className="h-auto w-full" />
          </picture>
        </a>
        <div className="p-6 text-sm leading-7 text-muted-foreground sm:p-8">
          <h2 className="mb-3 text-xl font-semibold text-foreground">Hex Tactics — Interactive architecture / 交互架构图</h2>
          <p>Explore the Unity tactical RPG&apos;s exploration and combat systems, shared rules and source references. Both language editions include theme controls, search and export.</p>
          <p className="mt-2">查看探索与战斗系统、共用规则和源码证据。中英文版本均支持主题切换、搜索与导出。</p>
          <nav aria-label="Hex Tactics architecture links" className="mt-5 flex flex-wrap gap-x-6 gap-y-3 font-medium text-foreground">
            <a className="underline underline-offset-4" href="/architecture/hex-tactics/en.html">Open English →</a>
            <a className="underline underline-offset-4" href="/architecture/hex-tactics/">打开中文 →</a>
            <a className="underline underline-offset-4" href="https://github.com/bibi45c/UEA-CMP-SEM2-GAME-Turn_Based_Strategy">Source repository ↗</a>
          </nav>
          <p className="mt-5 text-xs">Architecture evidence: main 42f3a2b. This map is a pinned runtime snapshot, not a gameplay acceptance result.</p>
        </div>
      </section>
      <section className="max-w-3xl rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-8 text-sm leading-7 text-muted-foreground">
        <p className="mb-4 text-foreground">Case studies are being prepared.</p>
        <p>
          This section will publish evidence-based write-ups for selected data,
          AI, game-development, and ubiquitous-computing projects. Each entry
          will distinguish verified implementation details from plans and
          exploratory work.
        </p>
      </section>
    </MotionDivWrapper>
  );
}
