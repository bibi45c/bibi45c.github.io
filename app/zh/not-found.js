import Link from "next/link";

export default function NotFound() {
  return <section className="mt-20 text-center"><h1 className="text-20 font-semibold text-strong">404 — 页面未找到</h1><Link className="mt-6 inline-block text-15 text-foreground underline decoration-accent/50 underline-offset-4 transition-colors hover:text-strong" href="/zh/">返回首页</Link></section>;
}
