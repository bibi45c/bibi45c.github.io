import { getBlogs } from "@/lib/blog";
import Hero from "@/components/Hero";
import RecentUpdate from "@/components/RecentUpdate";
import ReadNext from "@/components/ReadNext";
import FeaturedProject from "@/components/FeaturedProject";
import TopicIndex from "@/components/TopicIndex";
import popularity from "@/data/article-popularity.json";
import { getRecommendationPosts } from "@/lib/recommendations.mjs";

// DOM order is the mobile reading order; .home-grid places Read next, Featured project and Topics in the right column on desktop.
export default async function HomePage({ locale = "en" }) {
  const blogs = await getBlogs(locale);
  const recentBlogs = blogs.slice(0, 3);
  const posts = blogs.map(({ slug, title, tag, language, publishedAt }) => ({ slug, title, tag, language, publishedAt }));
  const { popular, ranked } = getRecommendationPosts(posts, popularity, process.env.NEXT_PUBLIC_GOATCOUNTER_CODE);

  return (
    <div className="home-grid animate-page-in">
      <Hero locale={locale} className="home-hero" />
      <aside className="home-readnext" aria-labelledby="read-next-title">
        <ReadNext posts={posts} popular={popular} ranked={ranked} locale={locale} />
      </aside>
      <RecentUpdate blogs={recentBlogs} locale={locale} className="home-recent" />
      <FeaturedProject locale={locale} className="home-feat" />
      <TopicIndex blogs={posts} locale={locale} className="home-topics" />
    </div>
  );
}
