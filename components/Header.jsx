"use client";

import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import Avatar from "./Avatar";
import Navbar from "./Navbar";
import { site } from "@/lib/site";
import LanguageSwitch from "./LanguageSwitch";
import { unlocalizedPath } from "@/lib/i18n";

// Three columns so the capsule is truly centred: avatar | navigation + language | GitHub.
export default function Header({ locale = "en" }) {
  const pathname = usePathname();
  const page = unlocalizedPath(pathname).split("/").slice(0, 2).join("/");

  return (
    <header className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3">
      <Avatar locale={locale} />

      <div className="glass flex items-center rounded-pill p-1">
        <Navbar page={page} locale={locale} />
        <span className="mx-1 h-4 w-px bg-tint/[0.14]" aria-hidden="true" />
        <LanguageSwitch locale={locale} />
      </div>

      <a
        href={site.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="inline-flex size-10 items-center justify-center justify-self-end rounded-pill text-muted-foreground transition-colors hover:text-strong"
      >
        <Github size={20} aria-hidden="true" />
      </a>
    </header>
  );
}
