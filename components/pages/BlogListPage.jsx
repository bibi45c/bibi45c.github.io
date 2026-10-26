import BlogIndex from "@/components/BlogIndex";
import Description from "@/components/Description";
import { getBlogs } from "@/lib/blog";
import { getMessages } from "@/lib/i18n";
import { countTags } from "@/lib/tags";

// Before hydration, SiteLayout's head script copies `?tag=` to <html data-tag>; these rules hide the other posts
// (and the not-yet-correct counts) so a filtered link never flashes the full list.
function prehideCss(posts) {
  const rules = countTags(posts)
    .map(({ slug }) => slug)
    .filter((slug) => /^[a-z0-9-]+$/.test(slug))
    .map((slug) => `html[data-tag="${slug}"] [data-entry]:not([data-tag="${slug}"]),html[data-tag="${slug}"] [data-year]:not([data-tags~="${slug}"]){display:none}`);
  return ["html[data-tag] [data-blog-count]{visibility:hidden}", ...rules].join("");
}

export default async function BlogListPage({ locale = "en" }) {
  const blogs = await getBlogs(locale);
  const t = getMessages(locale);
  const posts = blogs.map(({ slug, title, tag, language, publishedAt }) => ({ slug, title, tag, language, publishedAt }));

  return (
    <div className="max-w-3xl animate-page-in">
      <style dangerouslySetInnerHTML={{ __html: prehideCss(posts) }} />
      <Description page={t.nav.blog} />
      <p className="mt-3.5 max-w-xl text-15 text-muted-foreground [&:lang(zh)]:leading-[1.75]">{t.blogIntro}</p>
      <BlogIndex posts={posts} locale={locale} />
    </div>
  );
}
