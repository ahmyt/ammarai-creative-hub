# Content-aware categories for synced blog articles

## Problem
Synced BabyLoveGrowth articles are all labeled "AI Guides" — `articleCategory()` in `src/lib/articles.ts` ignores the article and returns a fixed string. The label should reflect what the article is actually about (e.g. AI Marketing, AI SEO, AI Writing).

## Approach
Derive the category at display time from the article's title and meta description (plus body as fallback) using a keyword classifier in `src/lib/articles.ts`. No database change needed — the category is computed from content we already store.

## Changes

1. **`src/lib/articles.ts`** — replace the hardcoded `articleCategory()` with a classifier:
   - Map existing site categories to keyword sets (e.g. "AI SEO" → seo, ranking, backlinks, keywords; "AI Marketing" → marketing, campaign, conversion, ads; "AI Writing" → writing, copywriting, blog; "AI Video" → video; "AI Voice"/"AI Audio" → voice, audio, podcast; "AI Social Media" → instagram, tiktok, social; "AI Business" → business, startup, sales; etc.).
   - Score matches against `title` (highest weight), then `meta_description`, then a sample of the body text.
   - Fall back to "AI Guides" when nothing matches, so no article ever shows a blank label.

2. **No route changes needed** — `blog.index.tsx` and `blog.$slug.tsx` already call `articleCategory(article)`; they pick up the new behavior automatically.

3. **Admin articles list** (`src/routes/admin.articles.tsx`) — show the derived category badge per article if a category column/label exists there (verify during implementation).

## Verification
- `bunx tsgo --noEmit` passes.
- Preview `/blog`: synced articles show varied, content-appropriate labels with reading time.
- Spot-check one article page to confirm the header label matches its topic.
