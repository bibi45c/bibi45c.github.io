"use client";

import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import Navbar from "./Navbar";
import GithubIcon from "@/public/icons/GithubIcon";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const page = pathname.split("/").slice(0, 2).join("/");

  return (
    <header className="grid w-full grid-flow-col grid-cols-3 sm:grid-cols-4">
      <Avatar page={page} />

      <Navbar page={page} />

      <div className="flex items-center justify-end gap-2">
        <Link
          href={site.github}
          target="_blank"
          className="opacity-80 hover:opacity-100"
        >
          <GithubIcon />
        </Link>
      </div>
    </header>
  );
}
