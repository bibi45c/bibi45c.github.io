import "./global.css";
import { Roboto_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";
import GoatCounterTracker from "@/components/GoatCounterTracker";
import { site } from "@/lib/site";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${robotoMono.className} scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted`}
    >
      <body className="min-h-svh bg-site text-foreground">
        <GoatCounterTracker />
        <div className="flex flex-col items-center px-4 pt-10 mx-auto max-w-4xl lg:max-w-5xl sm:px-12 md:px-20 lg:px-12 xl:max-w-7xl min-h-svh">
          <Header />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </div>
      </body>
    </html>
  );
}
