import Description from "@/components/Description";
import MotionDivWrapper from "@/components/MotionDivWrapper";

export default function ProjectPage() {
  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-col gap-10"
    >
      <Description page="Projects" />
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
