import ProjectPage from "@/components/pages/ProjectPage";
import { pageMetadata } from "@/lib/i18n";

export const metadata = pageMetadata("projects", "zh");
export default function Page() { return <ProjectPage locale="zh" />; }
