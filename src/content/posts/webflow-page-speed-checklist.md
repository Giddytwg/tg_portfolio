---
title: "Webflow page-speed checklist"
excerpt: "Seven fixes that usually make the biggest difference to how fast a Webflow site feels, and how to check that they worked."
category: "Performance"
date: 2026-09-24
author: "Tope Gideon"
---

Most slow Webflow sites aren't slow because of Webflow. They're slow because of what gets added on top: oversized images, five font weights nobody uses, and third-party scripts loaded on every page. Here's the checklist I run through before calling a build finished.

## 1. Measure before you touch anything

Run the page through PageSpeed Insights and note two things: the **lab** score (a simulated test) and the **field data** (real visitors, when the site has enough traffic). Fix what the report flags for your slowest page type first, usually the home page or a CMS template.

## 2. Compress and size your images

Images are the most common culprit. Export at the size they're actually displayed (not the original camera size), use WebP or AVIF, and give every image explicit width and height so the page doesn't jump while loading.

- Hero image: load it eagerly. It's usually your Largest Contentful Paint element.
- Everything below the fold: set loading to **lazy**.
- Backgrounds set in CSS can't be lazy-loaded the same way. Prefer real image elements where you can.

## 3. Load fewer fonts, and fewer weights

Every extra family and weight is another request. Pick one display font and one body font, keep to the weights you actually use, and avoid loading italics you never show. If you self-host, preload only the one or two files used above the fold.

## 4. Be strict about third-party scripts

Chat widgets, analytics, heatmaps and pixels add up. Load them only on the pages that need them (Webflow lets you add custom code per page), and defer anything that isn't needed for the first paint.

## 5. Keep the first screen light

Heavy above-the-fold animations, autoplaying video and large Lottie files delay everything else. If an effect isn't helping the visitor understand or act, cut it or load it after the page is interactive.

## 6. Watch for layout shift

Content that moves after it appears is frustrating and hurts your Cumulative Layout Shift score. Reserve space for images, embeds and ads, and avoid inserting banners above content after load.

## 7. Clean up before launch

- Remove unused classes, hidden sections and old test pages.
- Turn on Webflow's minify options for HTML, CSS and JavaScript.
- Re-test on a real mid-range phone, not just your laptop.

> Fix the biggest problem first, re-measure, repeat. Chasing a perfect 100 is less useful than a site that feels instant to real visitors.

Want a second pair of eyes on a slow site? [Send me the link](/contact#request) and I'll tell you where I'd start.
