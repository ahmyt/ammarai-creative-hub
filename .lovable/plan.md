# Add AI SEO Suite as a seventh flagship tool

A new flagship tool page for AmmarAI's SEO toolkit, with an interactive example that types a real URL (`esimnow.net`) as input and returns a visual SEO report as output.

## What gets built

**1. New tool: AI SEO Suite** (`/ai-seo-suite`)

A full tool page matching the existing flagship pages (hero, what it is, what you can do, how it works, capabilities, audiences, use cases, tips, mistakes, FAQs, related tools) — all CMS-editable like every other tool.

Covering the four capabilities you selected:
- **Site audit / health score** — crawl a URL, return an overall health score and prioritised technical issues
- **Keyword research & rankings** — volume, difficulty, and tracked position data
- **Competitor & backlink analysis** — domain comparison and backlink profile
- **On-page content optimization** — meta tags, headings, and per-page content suggestions

**2. Interactive example with a real URL and visual results**

The example screen shows the input as a typed URL:

```text
Input:   https://esimnow.net
         [Full site audit  ·  Keywords  ·  Competitors]
```

The output is a generated **report image** rather than plain text — a clean dashboard-style visual in the site's light editorial palette showing:
- a circular health score gauge
- issue counts by severity (critical / warning / notice)
- a keyword table with position, volume, difficulty
- a small traffic/backlink trend chart

Three example tabs, each with its own input and its own report image:

| Tab | Input | Output image |
|---|---|---|
| Site audit | `https://esimnow.net` — run a full technical audit | Health-score dashboard with issue breakdown |
| Keyword rankings | `https://esimnow.net` — find ranking keywords and gaps | Keyword table with positions, volume, difficulty |
| Competitor gap | `esimnow.net` vs two competitor domains | Side-by-side comparison + backlink profile |

**3. Site-wide integration**

- Added to the flagship row on the homepage (heading updates from "Six flagship tools" to "Seven flagship tools")
- Added to the AI Tools directory and the `AI SEO` category
- Wired into the search intent matcher for terms like *seo, audit, rankings, keywords, backlinks, competitors*
- Cross-linked from the existing SEO-adjacent tools
- Included in the sitemap automatically
- Its own page title, description, and social tags

## Technical notes

- New file `src/data/tools-seo-suite.ts` exporting the tool record, registered in `src/data/tools.ts`. `featuredTools` slice raised from 6 to 7.
- Three report images generated into `src/assets/` and mirrored into `public/media/` so they also work on the Plesk build (matching the existing `assetUrl()` behaviour).
- Demo media registered in `src/data/tool-demos.ts` as three `kind: "image"` entries keyed to the tool slug, one per example index — this uses the existing image-output path in `AnimatedExample.tsx`, so no component changes are needed.
- Output images stay CMS-overridable through the existing `demoVideoUrl` / `demoVideoCaption` fields.

## Note on the screenshots

The SEO screenshots you mentioned didn't arrive in the upload — only the earlier AI Chat Bot images came through. I'll build the report visuals in AmmarAI's current light editorial style based on the four capabilities you selected. If you re-attach the screenshots afterwards, I can rework the output visuals to match them exactly.
