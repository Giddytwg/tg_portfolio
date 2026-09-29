---
title: "WordPress to Webflow migration checklist"
excerpt: "The steps I follow to move a site to Webflow without losing search traffic: URL mapping, 301 redirects, metadata, sitemaps and post-launch monitoring."
category: "SEO"
date: 2026-09-26
author: "Tope Gideon"
---

Moving from WordPress to Webflow is often a good decision: faster pages, cleaner design control and a CMS your team can actually use. But a migration is also the moment most sites lose search traffic, and almost always for avoidable reasons. Here's the checklist I work from.

## 1. Audit before you build anything

Crawl the existing site and export every URL with its title tag, meta description, H1 and status code. Then pull your best-performing pages from Google Search Console and GA4. These are the pages you must not break. Keep the export: it becomes your redirect map and your before-and-after comparison.

## 2. Keep URLs the same where you can

The simplest way to keep rankings is to not change addresses. Most static pages can keep their exact URL in Webflow. One thing to plan for: Webflow CMS items live under a collection folder (for example `/blog/post-name`), so if your WordPress posts sat at the root of the domain, those URLs will change and need redirects.

## 3. Build a one-to-one redirect map

For every old URL that changes, decide exactly which new URL replaces it. Point each old address directly at its final destination, with no chains (A to B to C), and never send everything to the home page. Add the rules in Webflow under **Site settings, Hosting, 301 redirects**.

## 4. Carry over the on-page SEO

- Title tags and meta descriptions for every page
- Heading structure (one H1, logical H2s and H3s)
- Image alt text and descriptive file names
- Internal links, updated to the new URLs
- Schema / JSON-LD and Open Graph tags, added through custom code where needed

## 5. Handle the sitemap and indexing

Turn on the automatic sitemap in Webflow's SEO settings and submit it in Search Console after launch. Keep the staging site out of search results while you build, and double-check that indexing is allowed on the live domain before you go public.

## 6. Plan the DNS and SSL cutover

Lower your DNS TTL a day or two ahead so the switch propagates quickly, cut over in a quiet traffic window, and confirm the SSL certificate is active. Leave the old WordPress hosting in place until you've verified everything works.

## 7. Test straight after launch

- Crawl the new site for 404s and redirect chains
- Spot-check your top pages from the audit
- Confirm forms, tracking (GA4) and integrations still work

## 8. Monitor for the next few weeks

Small ranking movement right after a migration is normal while search engines re-process the site. Watch Search Console for coverage errors and new 404s, fix them quickly, and compare your key pages against the audit you saved in step one.

> A good migration is invisible to your visitors and to search engines. The redirect map is what makes it so.

Planning a move to Webflow? [Send me your site's URL](/contact#request) and I'll tell you what a safe migration would involve.
