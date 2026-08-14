---
category: talks
draft: true
end_datetime: 2026-08-25 14:35:00-05:00
hidden: true
permalink: /talks/yes-we-allow-substitutions-no-we-don-t-serve-spaghetti/
presenter_slugs:
- jack-linke
room: Sauganash Ballroom
start_datetime: 2026-08-25 13:50:00-05:00
tags:
- Architecture
- use case
- Maintenance
title: Yes, we allow substitutions. No, we don't serve spaghetti.
track: t0
---

When users want a custom status field, a slightly different workflow, or a new export format, it might seem like a quick and easy win to whip these custom solutions together. But over time, they add up.

I know because I've been there.

While building a multi-tenant Django SaaS for irrigation water utilities, I read dozens of blog articles and StackOverflow posts on how to make software configurable, and at one point or another I tried most of the common approaches: choices with CharField and conditional statements, JSONField-based configs, runtime settings, feature flags, hand-rolled relational models, and lots more. Each one helped (up to a point), and most eventually showed their limits.

This talk organizes those approaches and others into a few clear layers of configurability and walks you through where each works well and where they tend to fail. We'll look at tools like django-constance, django-waffle, and packages for configurability with multi-tenant patterns. We'll also talk about the trade-offs of each in a real system. I will also show two approaches that helped bring things back under control for my own project: one focused on structuring configuration as data (for things like tenant-specific choices), and another focused on swapping behavior with selectable backends. These aren't "the answer", but they provide examples of approaches that can simplify and standardize your code, and they have worked out well for me.

You'll leave with an understanding of the pros & cons of various approaches to giving your users configurability, and you'll have a better sense of which tools and approaches to reach for before things get way out of hand and spaghetti is the only thing left on your menu.

This talk is practical and experience-driven. I messed up many times before finding the tools and patterns that give my users what they need without making my codebase a mess, and I offer an opportunity to learn from my mistakes and get it right more quickly. My goal isn't to sell you on a single perfect solution, but to help you recognize the warning signs of spaghetti configurability early and choose approaches that will still make sense six months (or years) into the project.