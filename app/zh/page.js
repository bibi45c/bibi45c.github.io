import HomePage from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/i18n";

export const metadata = pageMetadata("home", "zh");
export default function Page() { return <HomePage locale="zh" />; }
