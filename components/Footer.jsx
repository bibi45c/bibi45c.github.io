import ViewCount from "@/components/ViewCount";
import { getMessages } from "@/lib/i18n";

export default function Footer({ locale = "en" }) {
  const t = getMessages(locale);
  return (
    <div className="w-full mt-20 text-muted-foreground ">
      <div className="w-full border border-muted-foreground opacity-10 "></div>
      <div className="flex flex-col items-center justify-center h-24 gap-1 font-mono text-sm opacity-70">
        <p>
          &copy; {new Date().getFullYear()} bibi45. {t.copyright}
        </p>
        <div className=" opacity-90">{t.builtWith}</div>
        <ViewCount path="TOTAL" label={t.totalViews} />
      </div>
    </div>
  );
}
