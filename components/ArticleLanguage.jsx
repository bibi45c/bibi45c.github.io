import { getMessages } from "@/lib/i18n";

// Plain metadata text ("English" / "中文"); the surrounding meta row sets the mono type.
export default function ArticleLanguage({ language, locale = "en" }) {
  const t = getMessages(locale);
  const name = language === "zh" ? "中文" : "English";
  return (
    <span lang={language === "zh" ? "zh-CN" : "en"} aria-label={`${t.articleLanguage}: ${name}`}>
      {name}
    </span>
  );
}
