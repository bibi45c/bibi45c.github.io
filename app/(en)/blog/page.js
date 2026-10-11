import BlogListPage from "@/components/pages/BlogListPage";
import { pageMetadata } from "@/lib/i18n";

export const metadata = pageMetadata("blog", "en");
export default function Page() { return <BlogListPage locale="en" />; }
