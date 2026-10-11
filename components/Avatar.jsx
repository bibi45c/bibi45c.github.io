import Link from "next/link";
import Image from "next/image";
import { getMessages, localizedPath } from "@/lib/i18n";

export default function Avatar({ page, locale = "en" }) {
  return (
    <div className="flex items-center justify-start col-span-1">
      <Link href={localizedPath("/", locale)} aria-label={getMessages(locale).homeLabel}>
        <Image
          src="/avatar-black-shirt-wide-shoulders-v1.png"
          alt="bibi45"
          width={48}
          height={48}
          className={`size-12 rounded-full border border-foreground/30 object-cover transition duration-700 ${page == "/" ? "translate-y-20 scale-150" : ""}`}
        />
      </Link>
    </div>
  );
}
