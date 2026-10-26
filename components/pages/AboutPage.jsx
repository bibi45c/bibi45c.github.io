import Description from "@/components/Description";
import { getMessages } from "@/lib/i18n";

export default function AboutPage({ locale = "en" }) {
  const t = getMessages(locale);
  return (
    <div className="flex max-w-3xl animate-page-in flex-col gap-6">
      <Description page={t.nav.about} />
      <section className="max-w-[36rem] space-y-4 [&:lang(zh)]:max-w-[32em]">
        <p className="text-17 leading-[1.7] text-foreground [&:lang(zh)]:leading-[1.85]">
          {t.aboutIntro}
        </p>
        <p className="text-15 leading-[1.7] text-muted-foreground [&:lang(zh)]:leading-[1.85]">
          {t.aboutDetail}
        </p>
      </section>
    </div>
  );
}
