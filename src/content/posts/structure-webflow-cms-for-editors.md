---
title: "Structure Webflow CMS for easy editing"
excerpt: "Design the CMS around the person who will edit it: clear field names, sensible defaults and nothing they can break by accident."
category: "CMS"
date: 2026-08-27
author: "Tope Gideon"
---

A CMS is only useful if the people using it can update the site without calling you. The best Webflow CMS setups are designed from the *editor's* point of view, not the designer's. Here's how I approach it.

## Start from the content, not the layout

Before opening the Designer, list what the client will publish: blog posts, team members, case studies, locations. Each repeating type of thing becomes a collection. If it appears more than once with the same shape, it belongs in the CMS.

## One collection per type of thing

Keep collections focused. A "Projects" collection shouldn't also hold FAQs and testimonials. Separate collections are easier to sort, filter and reuse across pages.

## Use references instead of retyping

If a category, author or service appears on many items, make it its own collection and connect it with a **reference** or **multi-reference** field. Change it once and every item updates. That also stops "Web Design" and "Web design" becoming two categories.

## Name fields for the editor

- "Short summary (shown on cards)" beats "Text 2".
- Use the field's help text to say where it appears and any length limits.
- Prefer plain text fields to rich text when you don't want formatting to vary.

## Set defaults and required fields

Mark the fields the design can't do without as required, and add sensible defaults (a placeholder image, a default author). A new item should look right even if the editor only fills in the basics.

## Add an order and a visibility switch

Two small fields save a lot of support requests: a **number** field for manual ordering, and a **switch** such as "Featured on home". They let editors control what shows where, without touching the design.

## Hand over properly

1. Give the client the Editor with only the permissions they need.
2. Record a short walkthrough of adding and reordering an item.
3. Leave one clearly-labelled sample item they can duplicate.

> If a client has to ask "where do I change this?", the CMS structure is the problem, not the client.

Planning a CMS-driven site? [Tell me what you need to publish](/contact#request) and I'll sketch the structure with you.
