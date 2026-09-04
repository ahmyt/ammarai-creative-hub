# Add AI SEO Analyzer as a seventh flagship tool

A new flagship tool page for AmmarAI's SEO Performance Analyzer, with an interactive example that types `https://esimnow.net` as the input and returns a visual report matching the panels in your screenshots.

## What the tool actually does (from the screenshots)

Three analysis modes:

1. **URL Analysis** — enter a URL, get: SEO Score gauge, Page Information (title, description, keywords, load time, status), Issues Found, Recommendations, Technical SEO (mobile-friendly / HTTPS / sitemap / robots.txt), Content Analysis (word count, headings, images, links)
2. **Text Analysis** — paste text, get: Content Stats (words, characters, minutes read), Readability gauge, SEO Score, Top Keywords with density bars, Recommended SEO Keywords, SEO Improvement Suggestions
3. **Keywords** — check keywords, get: Keyword Overview (monthly searches, difficulty, CPC, competition level), Opportunities, Keyword Analysis table (volume, difficulty, CPC, competition, trend)

This maps onto the four capabilities you selected: site audit / health score, keyword research & rankings, competitor positioning via difficulty and SERP competition, and on-page content optimization.

## What gets built

**1. New tool page: AI SEO Analyzer** (`/ai-seo-analyzer`)

Full flagship page in the existing format — hero, what it is, what you can do, how it works (the 3 modes as steps), capabilities, audiences, use cases, tips, mistakes, FAQs, related tools. Fully CMS-editable like every other tool.

**2. Interactive example — three tabs, `esimnow.net` as input**

| Tab | Input shown typing | Output |
|---|---|---|
| URL Analysis | `https://esimnow.net` | SEO score gauge + page info + issues + technical SEO card |
| Text Analysis | eSIM landing page copy pasted in | Content stats + readability gauge + top keyword density bars + improvement suggestions |
| Keywords | `esim for travel`, `buy esim online` | Keyword overview (searches / difficulty / CPC / competition) + opportunities + keyword analysis table |

Each output is a rendered report visual in the same card style as your screenshots — score gauges, coloured status pills, keyword bars, data tables — but restyled into AmmarAI's light editorial palette so it matches the rest of the site rather than looking pasted in. Data in the visuals is realistic for an eSIM site (score in the high 80s, a couple of real issues like a long meta description, eSIM-related keywords with plausible volume/CPC).

**3. Site-wide integration**

- Joins the flagship row on the homepage (heading updates from "Six flagship tools" to "Seven flagship tools")
- Added to the AI Tools directory under the `AI SEO` category
- Wired into the discovery search for *seo, audit, score, rankings, keywords, readability, meta, competitors*
- Cross-linked from the existing SEO-adjacent tools (SEO content generator, meta description generator, plagiarism detector)
- Picked up automatically by the sitemap
- Its own page title, description and social tags

## Technical notes

- New `src/data/tools-seo-analyzer.ts` exporting the tool record, registered in `src/data/tools.ts`; `featuredTools` slice raised from 6 to 7.
- Three report visuals generated into `src/assets/` and mirrored into `public/media/`, so they also render on the Plesk build via the existing `assetUrl()` mapping.
- Registered in `src/data/tool-demos.ts` as three `kind: "image"` entries keyed to the tool slug, one per example index — this reuses the existing image-output path in `AnimatedExample.tsx`, so no component changes are needed.
- Output visuals stay CMS-overridable through the existing `demoVideoUrl` / `demoVideoCaption` fields, so you can swap in your own screenshots later from the CMS.
