"use client";

import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { getMessages, localizedPath } from "@/lib/i18n";

export const navigationItems = [
  {
    key: "home",
    href: "/",
  },
  {
    key: "blog",
    href: "/blog",
  },
  {
    key: "projects",
    href: "/project",
  },
  {
    key: "about",
    href: "/about",
  },
];

export default function Navbar({ page, locale = "en" }) {
  const t = getMessages(locale);
  return (
    <>
      <nav aria-label={locale === "zh" ? "主导航" : "Main navigation"} className="hidden sm:block">
        <ul className="flex gap-0.5">
          {navigationItems.map((item) => (
            <li key={item.key}>
              <Link
                href={localizedPath(item.href, locale)}
                aria-current={page === item.href ? "page" : undefined}
                className="cap-item"
              >
                {t.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sm:hidden">
        <MobileMenu page={page} locale={locale} />
      </div>
    </>
  );
}
