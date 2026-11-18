import BoardsPage from "@/components/pages/BoardsPage";
import { pageMetadata } from "@/lib/i18n";

export const metadata = pageMetadata("boards", "en");
export default function Page() { return <BoardsPage locale="en" />; }
