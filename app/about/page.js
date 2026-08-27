import Description from "@/components/Description";
import MotionDivWrapper from "@/components/MotionDivWrapper";

export default function AboutPage() {
  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-10"
    >
      <Description page="About" />
      <section className="max-w-3xl space-y-5 rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-8 text-sm leading-7 text-muted-foreground">
        <p className="text-foreground">
          This site is being rebuilt as a durable technical notebook and
          portfolio for bibi45.
        </p>
        <p>
          It will contain selected writing on data engineering, AI systems,
          DevSecOps, software development, and project retrospectives. The
          source, articles, and downloadable portfolio material will remain in
          Git so the site does not depend on a rented server or database.
        </p>
      </section>
    </MotionDivWrapper>
  );
}
