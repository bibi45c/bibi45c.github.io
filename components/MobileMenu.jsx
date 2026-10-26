"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown } from "lucide-react";
import { navigationItems } from "./Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getMessages, localizedPath } from "@/lib/i18n";

export function MobileMenu({ page, locale = "en" }) {
  const pathname = usePathname();
  const t = getMessages(locale);
  const currentItem = navigationItems.find((item) => item.href === page) ?? navigationItems[0];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={(state) => setOpen(state)}>
      <SheetTrigger asChild>
        <button type="button" className="cap-item cap-menu" data-current={currentItem.href === page ? "" : undefined}>
          {t.nav[currentItem.key]}
          <ChevronDown size={14} aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent
        className="mx-4 mt-4 rounded-card border border-line bg-surface/95 p-4 text-muted-foreground shadow-none"
        side="top"
        closeLabel={locale === "zh" ? "关闭菜单" : "Close menu"}
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{locale === "zh" ? "主导航" : "Main navigation"}</SheetTitle>
          <SheetDescription className="sr-only">{locale === "zh" ? "选择要浏览的页面。" : "Choose a page to visit."}</SheetDescription>
        </SheetHeader>
        <ul className="mt-6 flex flex-col">
          {navigationItems.map((item) => (
            <li key={item.key}>
              <Link
                href={localizedPath(item.href, locale)}
                aria-current={page === item.href ? "page" : undefined}
                className="flex min-h-11 items-center gap-2 rounded-row px-3 text-15 font-medium transition-colors hover:text-strong aria-[current=page]:text-strong"
              >
                {t.nav[item.key]}
                {page === item.href && <span className="size-[3px] rounded-pill bg-accent" aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
