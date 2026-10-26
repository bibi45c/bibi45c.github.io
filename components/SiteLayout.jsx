import "@/app/global.css";
import { JetBrains_Mono, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";
import GoatCounterTracker from "@/components/GoatCounterTracker";
import PlumBackground from "@/components/PlumBackground";

const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// Runs before first paint on the blog index: `html[data-tag]` lets CSS hide non-matching posts until BlogIndex
// hydrates, which is why <html> suppresses the hydration warning for that attribute.
const blogTagScript = `(function(){try{var p=location.pathname.replace(/\\/+$/,"");if(p!=="/blog"&&p!=="/zh/blog")return;var t=new URLSearchParams(location.search).get("tag");if(t&&/^[a-z0-9-]+$/.test(t))document.documentElement.setAttribute("data-tag",t)}catch(e){}})();`;

export default function SiteLayout({ children, locale = "en" }) {
  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      className={`${sans.variable} ${mono.variable} scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: blogTagScript }} />
      </head>
      <body className="font-sans">
        <GoatCounterTracker />
        <PlumBackground />
        <div className="relative z-[1] mx-auto flex min-h-svh w-full max-w-4xl flex-col px-4 pt-7 sm:px-12 md:px-16 lg:max-w-5xl lg:px-12 xl:max-w-7xl">
          <Header locale={locale} />
          <MainWrapper>{children}</MainWrapper>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
