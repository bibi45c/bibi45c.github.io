import { getMessages } from "@/lib/i18n";

export default function ArticleLanguage({ language, locale = "en" }) {
  const t = getMessages(locale);
  return (
    <span className="inline-flex rounded-full border border-foreground/20 px-2 py-0.5 text-xs" aria-label={`${t.articleLanguage}: ${language === "zh" ? "中文" : "English"}`}>
      <span lang={language === "zh" ? "zh-CN" : "en"}>{language === "zh" ? "中文" : "English"}</span>
    </span>
  );
}
