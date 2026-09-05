# Add breathing room around headings in synced blog articles

## Problem
Synced BabyLoveGrowth articles render their HTML body inside a `prose-editorial` wrapper
(`src/routes/blog.$slug.tsx`). The `prose-editorial` utility in `src/styles.css` only styles
`p`, `strong`, `a`, `ul`, and `li` — it has **no rules for headings** (`h2`, `h3`, `h4`).
So when the article HTML contains a heading tag, it renders with default browser margins
and sits crowded against the paragraph above and below it (visible in the screenshot:
"How Should Teams Handle Security and Privacy?" is jammed against the next paragraph).

The static (`data/posts.ts`) blog posts don't have this problem because their sections are
hand-built with explicit `mt-10` spacing; only the synced HTML-injected articles are affected.

## Fix
Add heading spacing rules inside the existing `@utility prose-editorial` block in
`src/styles.css`, so headings get clear separation from surrounding paragraphs:

- `h2` — larger top margin (breath above), smaller bottom margin
- `h3`, `h4` — moderate top margin, small bottom margin
- Reuse the editorial type scale tokens already used elsewhere on the site
  (font sizes matching the static post sections: `text-2xl sm:text-3xl` for h2).
- Keep `strong` as-is (inline bold, no block margin) so it doesn't conflict.

This is a CSS-only change to one utility. No component, route, or data changes.

## Scope
- One file: `src/styles.css` (the `prose-editorial` @utility block, ~lines 140–184).
- Affects only synced article pages (`/blog/<slug>` for syndicated articles). Static posts
  and other `prose-editorial` usages are unaffected because they already wrap paragraphs,
  not headings, or add their own explicit margins.

## Verification
- `bunx tsgo --noEmit` (sanity — CSS-only change shouldn't break types).
- Load a synced article in the preview and confirm headings have clear vertical
  separation from the paragraphs around them, matching the static post rhythm.
