# Fix blog sync on the Plesk (ammarai.com) deployment

## Problem

On ammarai.com (Plesk), clicking **Sync now** in CMS → Synced articles fails with:

> Missing Supabase environment variable(s): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY.

Two causes, both confirmed:

1. **Missing server env vars on Plesk.** `requireSupabaseAuth` reads `process.env.SUPABASE_URL` / `process.env.SUPABASE_PUBLISHABLE_KEY` at call time. They are set in the Lovable preview (verified), but are not set in the Plesk Node.js app environment, so the middleware throws before anything else runs.

2. **Latent blocker — service role key is unavailable.** Even after setting those two vars, `syncArticles()` upserts articles through `supabaseAdmin` (the service-role client), which needs `SUPABASE_SERVICE_ROLE_KEY`. Lovable Cloud does **not** expose that key to you, so it can never be pasted into Plesk. The sync would fail one step later with "Missing SUPABASE_SERVICE_ROLE_KEY".

The Lovable preview is unaffected (env vars present, service role available) — that's why sync works there but not on Plesk.

## Fix

Make the **admin-triggered (manual) sync** run as the signed-in admin user under RLS — the same way CMS content edits already work — so it needs only `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY`, never the service role key. The **automatic cron sync** keeps using `supabaseAdmin`, because it runs on the Lovable-hosted URL (where the service role key is available), not on Plesk.

### 1. Migration — allow admins to insert synced articles

`syndicated_articles` already has admin SELECT and UPDATE policies but no INSERT policy, so an RLS-scoped upsert is blocked on the insert side. Add:

```sql
CREATE POLICY "Admins can insert articles"
  ON public.syndicated_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

(No `GRANT` change needed — `authenticated` already has INSERT on the table; only the policy was missing.)

### 2. Code — pass the caller's client into syncArticles

`src/lib/babylovegrowth.server.ts`:
- Change `syncArticles()` to accept a Supabase client argument instead of importing `supabaseAdmin` internally.
- Keep all fetching/sanitization/upsert logic identical; only the client used for the upsert changes.

`src/lib/babylovegrowth.functions.ts`:
- In `syncBabyLoveGrowthArticles`, pass `context.supabase` (the authenticated admin client, RLS-scoped) into `syncArticles()` after the existing `requireAdmin` check. No service role import.

`src/routes/api/public/cron/babylovegrowth.ts`:
- Continue passing `supabaseAdmin` into `syncArticles()`. The cron targets the Lovable-hosted stable URL, where the service role key exists — so auto-sync keeps working unchanged.

Result: manual sync works on Plesk with only the two public env vars; auto-sync keeps working on Lovable hosting.

### 3. Infrastructure (your action on Plesk) — set the two env vars

In **Plesk → Websites & Domains → ammarai.com → Node.js → Custom environment variables**, add (values are in this repo's `.env`):

- `SUPABASE_URL` = `https://jxobtlhajvcpyjcgktzj.supabase.co`
- `SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_XPJSY-lfhYhOjUSM1N4IEQ_bs4KZ0rA`

(These are the same values already documented for `VITE_*` in `SELF_HOSTING.md` step 3 — they are public keys, safe to set on the server.) Then **rebuild and restart** the Node.js app so the new env and code load. No `SUPABASE_SERVICE_ROLE_KEY` is needed on Plesk after this change.

## Verification

After deploying the new build + env vars on Plesk:
- Sign in at `/auth` → `/admin/articles` → click **Sync now** → articles upsert without the missing-env error.
- Auto-sync (cron) continues to run on the Lovable-hosted URL independently.

## Notes

- This does not change what data is written or how articles are sanitized — only which Supabase client performs the upsert (RLS admin vs service role).
- The preview's sync behavior is unchanged (admin RLS upsert works there too).
