export function parseViewCount(value) {
  if (typeof value === "string") {
    if (!/^\d+(?:,\d{3})*$/.test(value.trim())) return null;
    value = Number(value.replaceAll(",", ""));
  }
  return Number.isSafeInteger(value) && value >= 0 ? value : null;
}

export function articleCounterPaths(slug) {
  return ["/blog/" + slug, "/zh/blog/" + slug];
}

function compareDates(a, b) {
  const dateDifference = (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0);
  return dateDifference || a.slug.localeCompare(b.slug);
}

export function getRecommendationPosts(posts, snapshot, siteCode) {
  const ranked = posts.length >= 2
    && Boolean(snapshot?.updatedAt && Number.isFinite(Date.parse(snapshot.updatedAt)))
    && (!siteCode || snapshot.siteCode === siteCode)
    && posts.every(post => parseViewCount(snapshot?.counts?.[post.slug]) !== null);

  const ordered = [...posts].sort((a, b) => {
    const difference = ranked
      ? parseViewCount(snapshot.counts[b.slug]) - parseViewCount(snapshot.counts[a.slug])
      : 0;
    return difference || compareDates(a, b);
  });
  return {
    ranked,
    popular: ordered.slice(0, 2).map(post => ({
      ...post,
      views: ranked ? parseViewCount(snapshot.counts[post.slug]) : null,
    })),
  };
}

export function selectRandomPost(posts, excludedSlugs, currentSlug, random = Math.random) {
  const excluded = new Set(excludedSlugs);
  const pool = posts.filter(post => !excluded.has(post.slug));
  const otherPosts = pool.filter(post => post.slug !== currentSlug);
  const candidates = otherPosts.length ? otherPosts : pool;
  if (!candidates.length) return null;
  return candidates[Math.floor(random() * candidates.length)] ?? candidates[0];
}
