import AboutPage from "@/components/pages/AboutPage";
import { pageMetadata } from "@/lib/i18n";

export const metadata = pageMetadata("about", "en");
export default function Page() { return <AboutPage locale="en" />; }
