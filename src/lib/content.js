// Small helpers for computed values derived from the projects/posts content
// collections (URLs, image paths, read time, related posts…). Kept in one
// place so pages and components don't repeat this logic.

export function projectUrl(id) { return `/projects/${id}`; }
export function projectImage(id) { return `/assets/images/projects/${id}.webp`; }
export function projectThumb(id) { return `/assets/images/projects/${id}-700.webp`; }
export function stackLabel(stack) { return stack.join(" · "); }

/** The project before/after this one in the list, wrapping around at each end. */
export function projectNeighbours(projects, id) {
  const i = projects.findIndex((p) => p.id === id);
  if (i < 0) return { prev: null, next: null };
  return { prev: projects[(i - 1 + projects.length) % projects.length], next: projects[(i + 1) % projects.length] };
}

export function postUrl(id) { return `/blog/${id}`; }

/** Newest first — every list/detail page sorts posts this way before using them. */
export function sortPostsNewestFirst(posts) {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function postDateLabel(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function postMinutes(rawBody) {
  return Math.max(1, Math.round(rawBody.split(/\s+/).filter(Boolean).length / 200));
}

/** Oldest post is 01, newest has the highest number — matches the big number on the cover. */
export function postNumber(sortedNewestFirst, id) {
  const i = sortedNewestFirst.findIndex((p) => p.id === id);
  return sortedNewestFirst.length - i;
}

export function postCoverVariant(sortedNewestFirst, id) {
  return sortedNewestFirst.findIndex((p) => p.id === id) % 3; // 0/1/2 → lime/paper/dark
}

/** Two other posts to show under "Keep reading", same category first. */
export function relatedPosts(sortedNewestFirst, id, count = 2) {
  const self = sortedNewestFirst.find((p) => p.id === id);
  return sortedNewestFirst
    .filter((p) => p.id !== id)
    .sort((a, b) => (b.data.category === self.data.category) - (a.data.category === self.data.category))
    .slice(0, count);
}
