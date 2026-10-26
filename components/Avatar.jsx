import Link from "next/link";
import Image from "next/image";
import { getMessages, localizedPath } from "@/lib/i18n";

export default function Avatar({ locale = "en" }) {
  return (
    <Link
      href={localizedPath("/", locale)}
      aria-label={getMessages(locale).homeLabel}
      className="block size-10 justify-self-start overflow-hidden rounded-pill border border-[color:var(--glass-edge)]"
    >
      <Image
        src="/avatar-black-shirt-wide-shoulders-v1.png"
        alt="bibi45"
        width={40}
        height={40}
        className="size-full object-cover"
      />
    </Link>
  );
}
