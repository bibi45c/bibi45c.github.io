import SiteLayout from "@/components/SiteLayout";
import { getMessages } from "@/lib/i18n";

export const metadata = {
  metadataBase: new URL("https://juiceless.cn"),
  title: "bibi45 | 技术博客",
  description: getMessages("zh").description,
};

export default function Layout({ children }) {
  return <SiteLayout locale="zh">{children}</SiteLayout>;
}
