import Link from "next/link";

export default function Avatar({ page }) {
  return (
    <div className="flex items-center justify-start col-span-1">
      <Link href="/">
        <div
          aria-label="Jiayu Jiang home"
          className={`flex size-12 items-center justify-center rounded-full border border-foreground/30 bg-foreground/5 text-sm font-bold tracking-wider text-foreground/80 transition duration-700 hover:bg-foreground/10 ${page == "/" ? "translate-y-20 scale-150" : ""}`}
        >
          JJ
        </div>
      </Link>
    </div>
  );
}
