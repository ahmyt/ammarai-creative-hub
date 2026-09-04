# Add llms.txt describing the site's content

Generate a `/llms.txt` file (the emerging standard that gives AI assistants and LLM crawlers a clean, structured summary of a site) for AmmarAI, served dynamically so it stays accurate as content grows.

## What gets built

**New route `src/routes/llms[.]txt.ts`** (server route, plain text, cached 1 hour — same pattern as the existing `sitemap.xml` route). It outputs the standard llms.txt Markdown format:

```text
# AmmarAI

> Short description of the platform (from src/lib/site.ts), what it does,
> and who it is for.

## AI Tools
- [AI Writer](https://ammarai.com/ai-writer): one-line summary
- ... all 67+ tools from src/data/tools.ts (CMS overrides merged in)

## Platform Features
- [Multi-model AI](https://ammarai.com/features/multi-model-ai): summary
- ...

## Use Cases
- [For marketers](https://ammarai.com/for-marketers): summary
- ...

## Blog
- [Post title](https://ammarai.com/blog/slug): summary
- ... including published synced BabyLoveGrowth articles

## Company
- [About](...), [Pricing](...), [Contact](...), [FAQ](...), [Resources](...)
```

## Details

- Links point at the production domain `https://ammarai.com`.
- Content is loaded through the existing `loadSiteContent()` so CMS edits, hidden items and CMS-created pages are reflected automatically; visible synced articles are included via the existing articles helper.
- Hidden CMS items and `/admin`, `/auth` routes are excluded.
- `Cache-Control: public, max-age=3600`, `Content-Type: text/plain; charset=utf-8`.
- Add a `Sitemap:`-style reference is not standard; instead optionally note llms.txt availability — no change to `robots.txt` unless you want it (some crawlers discover llms.txt by convention at the well-known path, so no robots change is required).
- Route marked `staticData: { sitemap: false }` so it never appears in the XML sitemap.

## Verification

- `bunx tsgo --noEmit` passes.
- Fetch `http://localhost:8080/llms.txt` and confirm the Markdown renders with all sections and correct URLs.
