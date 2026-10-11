import Description from "@/components/Description";
import MotionDivWrapper from "@/components/MotionDivWrapper";
import { getMessages } from "@/lib/i18n";

export default function AboutPage({ locale = "en" }) {
  const t = getMessages(locale);
  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-10"
    >
      <Description page={t.nav.about} />
      <section className="max-w-3xl space-y-5 rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-8 text-sm leading-7 text-muted-foreground">
        <p className="text-foreground">
          {t.aboutIntro}
        </p>
        <p>
          {t.aboutDetail}
        </p>
      </section>
    </MotionDivWrapper>
  );
}
