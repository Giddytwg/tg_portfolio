# Tope Gideon — portfolio site (Astro)

Built with **Astro**: plain HTML/CSS/JS output, no client-side framework, only one build step (`npm run build`). This replaces the old zero-build flat-file version — the trade-off is you now need Node and a terminal command to preview or publish changes, in exchange for real pages per project/post (better for SEO) and no more hand-copied header/footer/nav on every page.

## Running it

```
npm install
npm run dev       # http://localhost:4321, edits show instantly
npm run build      # writes the finished site to dist/
npm run preview    # serves dist/ locally, to check the real build
```

## What's in here

```
src/
  content/
    projects.json        ← EDIT to add/change a project (one array, same as before)
    posts/*.md            ← EDIT to add/change a blog post — one Markdown file per post
    config.ts              schema for the two collections above (rarely needs touching)
  layouts/
    Layout.astro            <head>, header/menu, footer, sticky-cta — shared by every page
  components/
    Faq.astro                the Q&A block used on Home and Contact
    ProjectRow.astro          the "Recent projects" list row (Home)
    ProjectCard.astro         the grid card (Projects page)
    PostCard.astro            the blog card (Home, Blog, "Keep reading")
  lib/
    site.js                   email, social links, nav — change once, used everywhere
    content.js                 small helpers (URLs, image paths, read time, related posts)
  pages/
    index.astro, about.astro, contact.astro, privacy.astro, 404.astro
    projects/index.astro, projects/[id].astro     ← [id] is the ONE page that renders every project
    blog/index.astro, blog/[id].astro              ← [id] is the ONE page that renders every post

public/
  css/            the four stylesheets, unchanged — base.css is where colors/fonts/spacing live
  js/main.js       menu, FAQ, filters, contact form, analytics — unchanged, plain JS
  assets/          images, fonts, icons, logos
  favicon.ico, robots.txt
```

## How to edit things

**A project** — open `src/content/projects.json`, copy one entry, give it a new `id` (used in the URL `/projects/<id>` and to find its two screenshots), fill in the rest. Put `<id>.webp` (1400px) and `<id>-700.webp` (700px) in `public/assets/images/projects/`.

**A blog post** — add a new file to `src/content/posts/`, named `<slug>.md`. Start with the frontmatter block (see any existing post for the exact fields), then write the article in Markdown below the `---`. Every `## heading` automatically becomes an entry in "On this page".

**Colors, fonts, spacing** — `public/css/base.css`, under `:root`.

**A specific component's look** — `public/css/components.css` or `public/css/pages.css`, same class names as before.

**Nav links, email, social links** — `src/lib/site.js`, one place, used by every page's header/footer/menu.

**Page text that isn't a project or post** (Home, About, Contact, Privacy, 404) — open the matching file in `src/pages/` and edit the text directly, same as editing HTML.

## Deploying

Any static host that runs `npm run build` and serves `dist/` works (Vercel, Netlify, Cloudflare Pages all auto-detect Astro — just point them at this folder). `@astrojs/sitemap` generates `sitemap-index.xml` automatically on every build.

## Notes

- `main.js` is the same file as the old site's, unchanged — menu, FAQ accordion, filters, the contact form (mailto fallback), scroll-reveal, the cookie-consent banner for GA4, all work exactly as before.
- Fonts (Archivo, Manrope) are still self-hosted from `public/assets/fonts` — no external font request.
- Copy is written for a US audience (US spelling).
