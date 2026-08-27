import Link from "next/link";
import Image from "next/image";

export default function Avatar({ page }) {
  return (
    <div className="flex items-center justify-start col-span-1">
      <Link href="/" aria-label="bibi45 home">
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
