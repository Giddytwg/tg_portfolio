import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

// Every project as one array in one file — same "just edit a list" pattern as the old js/data.js.
// `id` is used in the URL (projects/<id>) and to find the two screenshots in public/assets/images/projects/.
const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: z.object({
    name: z.string(),
    category: z.enum(["Webflow", "React"]),
    stack: z.array(z.string()),
    overview: z.string(),
    link: z.string().url(),
  }),
});

// One Markdown file per post in src/content/posts/ — the filename (minus .md) is the URL slug.
// Newest-first ordering is applied where posts are listed (see src/pages/blog/index.astro), not by file order.
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/posts" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.date(),
    author: z.string(),
  }),
});

export const collections = { projects, posts };
