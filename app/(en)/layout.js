import SiteLayout from "@/components/SiteLayout";
import { getMessages } from "@/lib/i18n";

export const metadata = {
  metadataBase: new URL("https://juiceless.cn"),
  title: "bibi45 | Developer",
  description: getMessages("en").description,
};

export default function Layout({ children }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
