import Blogs from "@/components/Blogs";
import Description from "@/components/Description";
import MotionDivWrapper from "@/components/MotionDivWrapper";
import { getBlogs } from "@/lib/blog";
import { getMessages } from "@/lib/i18n";

export default async function BlogListPage({ locale = "en" }) {
  const blogs = await getBlogs(locale);
  const t = getMessages(locale);

  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-col gap-10 "
    >
      <Description page={t.nav.blog} />
      <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{t.blogIntro}</p>
      <Blogs blogs={blogs} locale={locale} />
    </MotionDivWrapper>
  );
}
