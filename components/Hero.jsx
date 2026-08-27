import HeroAnimation from "./HeroAnimation";
import Socials from "./Socials";

export default function Hero() {
  return (
    <div>
      <p className="mb-6 font-semibold">
        <span className="text-transparent sm:bg-gradient-to-r to-foreground bg-gradient-to-t from-muted-foreground bg-clip-text lg:text-[54px] text-[40px]">
          Hi, I&apos;m bibi45
        </span>
      </p>
      <div className="mb-8 h-10 sm:mb-10">
        <HeroAnimation text1={"<DataEngineering/>"} text2="<AISystems/>" />
      </div>
      <p className="mb-8 text-xl text-transparent sm:mb-10 sm:text-[26px] bg-gradient-to-r from-green-200 via-green-100 opacity-60 to-green-200 bg-clip-text w-fit">
        #bibi45 #技术笔记
      </p>

      <p className="mb-4 text-sm text-transparent bg-clip-text bg-gradient-to-b sm:mb-6 sm:text-base to-muted-foreground from-foreground">
        I write about data engineering, AI systems, software development, and
        the practical details behind building reliable technical work.
      </p>

      <Socials />
    </div>
  );
}
