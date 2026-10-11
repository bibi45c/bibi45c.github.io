"use client";

import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
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
        <Button className="bg-secondary text-muted-foreground shadow-[0_0px_3px_0.5px_#2f2f2f] hover:bg-[#f2f2f20d] rounded-full pr-2">
          <span className="pr-1">
            {t.nav[currentItem.key]}
          </span>
          <ChevronDown size={15} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="mt-10 ml-6 mr-10 border-none text-muted-foreground rounded-xl"
        side="top"
        closeLabel={locale === "zh" ? "关闭菜单" : "Close menu"}
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{locale === "zh" ? "主导航" : "Main navigation"}</SheetTitle>
          <SheetDescription className="sr-only">{locale === "zh" ? "选择要浏览的页面。" : "Choose a page to visit."}</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col pl-5 mt-5 space-y-1">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link
                href={localizedPath(item.href, locale)}
                aria-current={page === item.href ? "page" : undefined}
                className={cn(
                  page === item.href ? "font-bold" : "",
                  "flex items-center py-3"
                )}
              >
                {t.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
