import BlogPostPage, { blogMetadata } from "@/components/pages/BlogPostPage";
import { getBlogs } from "@/lib/blog";

export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getBlogs()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) { return blogMetadata(params.slug, "en"); }
export default function Page({ params }) { return <BlogPostPage slug={params.slug} locale="en" />; }
