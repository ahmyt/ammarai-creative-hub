# Point the sitemap at the production domain (ammarai.com)

## Problem
The sitemap (`src/routes/sitemap[.]xml.ts`) and `robots.txt` use the Lovable
preview host `https://ammarai-creative-hub.lovable.app` as the base URL, but
the production site is `https://ammarai.com`. Every other SEO surface already
agrees on `ammarai.com`:

- `src/lib/site.ts` → `SITE.url = "https://ammarai.com"`
- `src/routes/llms[.]txt.ts` → `BASE_URL = "https://ammarai.com"`
- `src/routes/index.tsx` → canonical + og:url use `SITE.url`

So the sitemap's 109 URLs are the only place using the Lovable host, which
mismatches the canonical domain Google sees.

## Change

1. **`src/routes/sitemap[.]xml.ts`** — change
   `const BASE_URL = "https://ammarai-creative-hub.lovable.app"` to
   `const BASE_URL = "https://ammarai.com"`.

2. **`public/robots.txt`** — change the
   `Sitemap: https://ammarai-creative-hub.lovable.app/sitemap.xml` line to
   `Sitemap: https://ammarai.com/sitemap.xml`.

No route list changes — the 109 entries (tools, use cases, blog posts,
features, and static pages) are correct; only the host needs to change.

## Verify
- `curl http://localhost:8080/sitemap.xml` and confirm all `<loc>` URLs now
  start with `https://ammarai.com/`.
- Confirm the XML is still valid and the URL count stays ~109.
- Redeploy to Plesk so the production sitemap reflects the change.
