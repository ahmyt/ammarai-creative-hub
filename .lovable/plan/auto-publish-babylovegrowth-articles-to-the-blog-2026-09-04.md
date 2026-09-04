# Auto-publish BabyLoveGrowth articles to the blog

Pull articles from the BabyLoveGrowth service into our own database on a schedule, and publish them on the blog. No visitor request ever calls their API, so we stay inside their rate limits and pages stay fast.

## What you'll get

- New articles appear on the blog automatically, without you doing anything.
- Each article gets its own page at `/blog/<slug>` with its cover image, title, meta description, publish date, and search-engine structured data.
- The blog list mixes these articles with the existing ones, newest first.
- A "Sync now" button in the CMS so you can pull immediately instead of waiting for the schedule.
- Nothing is duplicated: re-running the sync updates the existing article with the same slug.

## How it works

1. The API key is stored as a private server secret (`BABYLOVEGROWTH_API_KEY`) — never in the code or in the browser.
2. A sync job pages through their list endpoint (50 at a time until a short page comes back), fetches each article's full content, and saves it to our database.
3. A scheduled task runs the sync a few times a day.
4. Blog pages read only from our database.

## Technical detail

**Secret**: add `BABYLOVEGROWTH_API_KEY` (value supplied) via the secrets tool. Read only inside server handlers.

**Migration** — new table `public.syndicated_articles`:
`id uuid pk`, `slug text unique not null`, `external_id text`, `title text`, `content_html text`, `content_markdown text`, `meta_description text`, `hero_image_url text`, `json_ld jsonb`, `faq_json_ld jsonb`, `language_code text default 'en'`, `published_at timestamptz`, `synced_at timestamptz default now()`, `is_hidden boolean default false`.
Grants: `SELECT` to `anon, authenticated`; `ALL` to `service_role`. RLS on; public SELECT policy `using (not is_hidden)`; writes only via service role. Index on `published_at desc`.

**Client library** `src/lib/babylovegrowth.server.ts`: typed fetch helpers for `GET /v1/articles?limit&offset` and `GET /v1/articles/{id}` with `X-API-Key` + `Content-Type` headers, Zod-validated responses, and a `syncArticles()` that pages (limit 50, stop on short page) and upserts by `slug` with `supabaseAdmin`. Returns `{ fetched, upserted, errors }`.

**Endpoints**
- `src/routes/api/public/cron/babylovegrowth.ts` — `POST`, guarded by the generated `authenticateCronRequest` (Bearer `LOVABLE_CRON_SECRET`), runs `syncArticles()`, returns counts.
- Schedule: `pg_cron` + `pg_net` job every 6 hours calling `https://ammarai.com/api/public/cron/babylovegrowth` with the cron bearer secret (the site runs on Plesk, so the schedule lives in the database and calls the public URL).
- `src/lib/babylovegrowth.functions.ts` — an admin-only `createServerFn` (`requireSupabaseAuth` + `has_role` admin check) so the CMS "Sync now" button can trigger the same sync.

**Blog rendering**
- `src/lib/content.ts` gains a query for syndicated articles; `blog.index.tsx` merges them into the list (sorted by date, newest first, showing hero thumbnail + meta description as excerpt).
- `src/routes/blog.$slug.tsx` loader: existing post first, else syndicated article; renders `content_html` inside a `prose-editorial` wrapper, sanitized server-side. Head gets title, `meta_description`, `og:image`/`twitter:image` from `hero_image_url` (absolute URL), plus `jsonLd` and `faqJsonLd` as `<script type="application/ld+json">`.
- Syndicated slugs are added to `src/lib/sitemap.ts` output.
- Non-English articles (`languageCode !== 'en'`) are stored but hidden from the blog list for now.

**CMS**: `src/routes/admin.messages.tsx` pattern reused for a new `admin.articles` page listing synced articles with last-sync time, a hide/show toggle, and the "Sync now" button.
