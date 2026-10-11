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
      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-foreground/20 bg-foreground/5 px-3 text-xs font-medium transition-colors hover:bg-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-200"
      onClick={(event) => {
        event.currentTarget.href = localizedPath(`${pathname}${window.location.search}${window.location.hash}`, target);
      }}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span lang={target === "zh" ? "zh-CN" : "en"}>{target === "zh" ? "中文" : "EN"}</span>
    </a>
  );
}
