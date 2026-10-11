import HomePage from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/i18n";

export const metadata = pageMetadata("home", "en");
export default function Page() { return <HomePage locale="en" />; }
