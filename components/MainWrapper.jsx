"use client";

import { usePathname } from "next/navigation";
import { unlocalizedPath } from "@/lib/i18n";

export default function MainWrapper({ children }) {
  const pathname = usePathname();
  const page = unlocalizedPath(pathname).split("/").slice(0, 2).join("/");
  return (
    <main
      className={`duration-1000 w-full  ${page == "/" ? "mt-16 sm:mt-20 mb-20" : "mt-16"} min-h-[calc(100svh-350px)]`}
    >
      {children}
    </main>
  );
}
