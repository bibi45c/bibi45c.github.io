import Link from "next/link";

export default function NotFound() {
  return <section className="mt-20 text-center"><h1 className="text-xl font-semibold">404 — 页面未找到</h1><Link className="mt-6 inline-block underline" href="/zh/">返回首页</Link></section>;
}
