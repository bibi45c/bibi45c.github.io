"use client";

import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import Navbar from "./Navbar";
import GithubIcon from "@/public/icons/GithubIcon";
import Link from "next/link";
import { site } from "@/lib/site";
import LanguageSwitch from "./LanguageSwitch";
import { unlocalizedPath } from "@/lib/i18n";

export default function Header({ locale = "en" }) {
  const pathname = usePathname();
  const page = unlocalizedPath(pathname).split("/").slice(0, 2).join("/");

  return (
    <header className="flex w-full items-center justify-between gap-3">
      <Avatar page={page} locale={locale} />

      <Navbar page={page} locale={locale} />

      <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
        <LanguageSwitch locale={locale} />
        <Link
          href={site.github}
          target="_blank"
          aria-label="GitHub"
          className="opacity-80 hover:opacity-100"
        >
          <GithubIcon />
        </Link>
      </div>
    </header>
  );
}
