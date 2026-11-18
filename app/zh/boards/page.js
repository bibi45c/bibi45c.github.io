import BoardsPage from "@/components/pages/BoardsPage";
import { pageMetadata } from "@/lib/i18n";

export const metadata = pageMetadata("boards", "zh");
export default function Page() { return <BoardsPage locale="zh" />; }
