import ProjectPage from "@/components/pages/ProjectPage";
import { pageMetadata } from "@/lib/i18n";

export const metadata = pageMetadata("projects", "en");
export default function Page() { return <ProjectPage locale="en" />; }
