---
title: "Webflow class naming: keep it boring"
excerpt: "A predictable naming system makes a project faster to build, easier to hand over and much safer to edit later."
category: "Workflow"
date: 2026-09-10
author: "Tope Gideon"
---

Clever class names feel good for about a week. Then a teammate (or you, six months later) opens the project and can't tell what `blue-box-2-copy` does. Boring, predictable names fix that, and it's why many teams work in a shared convention such as Finsweet's Client-First.

## What a naming system gives you

- **Speed:** you stop inventing names and reuse the same building blocks on every project.
- **Handover:** anyone who knows the system can find things immediately.
- **Safety:** you know which classes are global (change carefully) and which belong to one section (change freely).

## The core ideas

Whatever system you choose, the useful patterns are the same:

1. **Global layout classes** for things repeated everywhere: a page wrapper, a horizontal padding class, a max-width container, and vertical section padding.
2. **Global type classes** for headings and text sizes, so a heading style is changed once, in one place.
3. **Custom classes named by section**, for example `section_hero` and `hero_content`, so it's obvious where a class lives.
4. **Combo classes** only for small variations (like `is-dark`), not for whole redesigns.

## A quick example

```
section_hero
  padding-global
    container-large
      padding-section-large
        hero_component
          heading-style-h1
          text-size-medium
```

Anyone reading that structure knows what each layer is for without opening a single style panel.

## Habits that keep a project clean

- Rename as you go. Don't leave *Div Block 14* behind.
- Reuse a global class before creating a new one.
- Keep spacing on wrappers rather than on individual elements, so it's easy to change.
- Use the Style Manager to delete unused classes before you hand the site over.

If you need a Webflow build that a whole team can pick up and extend, [get in touch](/contact#request).
