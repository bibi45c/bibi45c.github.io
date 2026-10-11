import MotionDivWrapper from "@/components/MotionDivWrapper";
import { getBlogs } from "@/lib/blog";
import Hero from "@/components/Hero";
import RecentUpdate from "@/components/RecentUpdate";
import ReadNext from "@/components/ReadNext";
import popularity from "@/data/article-popularity.json";
import { getRecommendationPosts } from "@/lib/recommendations.mjs";

export default async function HomePage({ locale = "en" }) {
  const blogs = await getBlogs(locale);
  const recentBlogs = blogs.slice(0, 3);
  const posts = blogs.map(({ slug, title, tag, language, publishedAt }) => ({ slug, title, tag, language, publishedAt }));
  const { popular, ranked } = getRecommendationPosts(posts, popularity, process.env.NEXT_PUBLIC_GOATCOUNTER_CODE);

  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <section className="grid items-center gap-12 mb-16 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-16">
        <div className="min-w-0">
          <Hero locale={locale} />
        </div>
        <aside className="w-full min-w-0 max-w-[480px] lg:max-w-none" aria-labelledby="read-next-title">
          <ReadNext posts={posts} popular={popular} ranked={ranked} locale={locale} />
        </aside>
      </section>

      <div className="max-w-3xl">
        <RecentUpdate blogs={recentBlogs} locale={locale} />
      </div>
    </MotionDivWrapper>
  );
}
