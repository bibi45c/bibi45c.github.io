// Topic tags come from each article's frontmatter `tag`; the home topic index and the blog filter share these helpers.

export function tagSlug(tag) {
  return String(tag).trim().toLowerCase().replace(/\s+/g, "-");
}

export function tagFromSlug(slug, tags) {
  return tags.find(tag => tagSlug(tag) === slug) ?? null;
}

// Tags with their article counts, most used first (ties by name, so the order is stable between builds).
export function countTags(posts) {
  const counts = new Map();
  for (const { tag } of posts) {
    if (tag) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
