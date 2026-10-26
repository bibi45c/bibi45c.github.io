import HeroAnimation from "./HeroAnimation";
import Socials from "./Socials";
import { getMessages } from "@/lib/i18n";

export default function Hero({ locale = "en", className = "" }) {
  const t = getMessages(locale);
  return (
    <section className={className}>
      <h1 className="text-34 font-semibold tracking-[-0.02em] text-strong lg:text-46 [&:lang(zh)]:leading-[1.3] [&:lang(zh)]:tracking-normal">
        {t.greeting}
      </h1>
      <HeroAnimation />
      <p className="mt-5 font-mono text-13 text-muted-foreground">{t.hashtag}</p>
      <p className="mt-4 max-w-[33rem] text-17 leading-[1.7] text-foreground [&:lang(zh)]:max-w-[30em] [&:lang(zh)]:leading-[1.85]">
        {t.introduction}
      </p>
      <Socials className="mt-5" />
    </section>
  );
}
