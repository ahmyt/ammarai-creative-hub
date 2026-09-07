# Fix synced-article links pointing at the Lovable-hosted site

## Problem

In synced blog articles, the "Recommended" links (and other internal links inside the article body) go to `https://ammarai-creative-hub.lovable.app/...` instead of `ammarai.com`.

Confirmed cause: BabyLoveGrowth baked those absolute URLs into the article HTML when the site was still on the Lovable domain. Verified in the database — e.g. the article `knowledge-base-ai` contains `https://ammarai-creative-hub.lovable.app/features/brand-voice` inside its stored `content_html`. The sync code stores that HTML as-is, so the old domain is rendered verbatim on ammarai.com.

## Fix

Two parts: repair the already-synced articles, and make every future sync rewrite the domain automatically.

### 1. Database migration — rewrite existing articles

One-time update over `public.syndicated_articles` replacing the old domains inside `content_html` (and `content_markdown` for safety) with `https://ammarai.com`:

```sql
UPDATE public.syndicated_articles
SET content_html = replace(content_html, 'https://ammarai-creative-hub.lovable.app', 'https://ammarai.com'),
    content_markdown = replace(content_markdown, 'https://ammarai-creative-hub.lovable.app', 'https://ammarai.com')
WHERE content_html ILIKE '%ammarai-creative-hub.lovable.app%'
   OR content_markdown ILIKE '%ammarai-creative-hub.lovable.app%';
```

(Also covers the `id-preview--*.lovable.app` preview domain if any rows contain it.)

### 2. Code — rewrite the domain on every sync

`src/lib/babylovegrowth.server.ts`:
- After HTML sanitization (and for markdown), replace any occurrence of the known old origins — `https://ammarai-creative-hub.lovable.app` and `https://id-preview--ab4a5e87-30cb-4379-b661-4f70b8317377.lovable.app` — with the production origin `https://ammarai.com` (from `SITE.url` in `src/lib/site.ts`).
- This runs inside `syncArticles`, so both manual sync and cron sync produce clean links going forward.

No changes to rendering, sanitization rules, or link structure — only the origin string is swapped.

## Verification

- Query the database to confirm no `syndicated_articles` rows still contain `lovable.app` links.
- Open a synced article in the preview (e.g. the one with the "Recommended" section) and confirm the recommended links point to `ammarai.com/...`.
- Typecheck with `bunx tsgo --noEmit`.
- Deploy the new build to Plesk so ammarai.com picks up the fix (the migration itself applies immediately to both environments).

## Notes

- Links BabyLoveGrowth adds in the future (to new tools/pages) will keep working: they point at paths like `/features/...` that exist on ammarai.com.
- The "Made with BabyLoveGrowth technology" attribution link is external and unaffected.
