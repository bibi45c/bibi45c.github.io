import Description from "@/components/Description";
import LiveBoards from "@/components/LiveBoards";
import { getMessages } from "@/lib/i18n";

export default function BoardsPage({ locale = "en" }) {
  const t = getMessages(locale);
  return (
    <div className="flex max-w-5xl animate-page-in flex-col gap-10">
      <header className="max-w-3xl">
        <Description page={t.nav.boards} />
        <p className="mt-4 text-15 leading-[1.7] text-muted-foreground [&:lang(zh)]:leading-[1.85]">{t.boardsIntro}</p>
      </header>
      <LiveBoards locale={locale} />
      <p className="border-t border-line pt-5 font-mono text-12 text-faint">{t.boardsNote}</p>
    </div>
  );
}
