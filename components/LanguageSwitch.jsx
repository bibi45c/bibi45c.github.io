"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMessages, localizedPath } from "@/lib/i18n";

export default function LanguageSwitch({ locale }) {
  const pathname = usePathname();
  const target = locale === "en" ? "zh" : "en";
  const t = getMessages(locale);

  return (
    <a
      href={localizedPath(pathname, target)}
      hrefLang={target === "zh" ? "zh-CN" : "en"}
      aria-label={t.switchLanguage}
      title={t.switchLanguage}
      className="cap-item px-3 text-13"
      onClick={(event) => {
        event.currentTarget.href = localizedPath(`${pathname}${window.location.search}${window.location.hash}`, target);
      }}
    >
      <Languages size={14} aria-hidden="true" />
      <span lang={target === "zh" ? "zh-CN" : "en"}>{target === "zh" ? "中文" : "EN"}</span>
    </a>
  );
}
