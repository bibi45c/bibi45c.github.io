"use client";
import { motion } from "framer-motion";
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
      <nav aria-label={locale === "zh" ? "主导航" : "Main navigation"} className="hidden flex-1 justify-center sm:flex h-14">
        <ul className="items-center justify-center hidden bg-[#f2f2f21a] rounded-full sm:flex px-2 py-1 ">
          {navigationItems.map((item) => {
            const isSelected = page == item.href;
            return (
              <motion.li key={item.key} className="relative">
                {isSelected && (
                  <>
                    <motion.div
                      className="absolute left-1/4 w-1/2 mx-auto border-t-[3px] rounded-full shadow-[0_20px_100px_8px_#fff]"
                      layoutId="selected"
                    ></motion.div>
                    <motion.div
                      className="absolute top-0.5 bottom-0.5 w-full bg-[#f2f2f20d] rounded-full"
                      layoutId="selecteddiv"
                    ></motion.div>
                  </>
                )}
                <Link href={localizedPath(item.href, locale)} aria-current={isSelected ? "page" : undefined}>
                  <motion.div
                    whileHover={{
                      backgroundColor: "#f2f2f20d",
                    }}
                    className={`px-3 md:px-4 py-3 rounded-full ${locale === "zh" ? "tracking-normal" : "tracking-tight"} font-bold text-sm`}
                  >
                    {t.nav[item.key]}
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-1 items-center justify-center sm:hidden">
        <MobileMenu page={page} locale={locale} />
      </div>
    </>
  );
}
