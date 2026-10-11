import Link from "next/link";

export default function NotFound() {
  return <section className="mt-20 text-center"><h1 className="text-xl font-semibold">404 — Page not found</h1><Link className="mt-6 inline-block underline" href="/">Back to Home</Link></section>;
}
