# Fix "Missing BABYLOVEGROWTH_API_KEY" on the Plesk deployment

## Problem

Clicking **Sync now** on ammarai.com (Plesk) now fails with:

> Missing BABYLOVEGROWTH_API_KEY

Confirmed cause: `src/lib/babylovegrowth.server.ts` reads `process.env.BABYLOVEGROWTH_API_KEY` at call time. The key is stored in the Lovable secret store, so the preview has it — but the Plesk Node.js app environment does not. This is the same class of issue as the missing `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` you just fixed.

## Fix — your action on Plesk (no code change needed)

1. In **Plesk → Websites & Domains → ammarai.com → Node.js → Custom environment variables**, add:

   - `BABYLOVEGROWTH_API_KEY` = your BabyLoveGrowth integration API key

   Use the same key value you originally provided for this integration (it's in your BabyLoveGrowth dashboard under Integrations / API keys).

2. **Restart the Node.js app** in Plesk so the new variable is loaded. No rebuild is required — this variable is read at runtime, not baked into the build.

## Verification

- Sign in at `/auth` → `/admin/articles` → click **Sync now** → articles sync without the missing-key error.
- Optional sanity check: the previous Supabase env fix plus this one means manual sync on Plesk needs exactly three server env vars: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `BABYLOVEGROWTH_API_KEY`.

## Notes

- I'll also add this variable to `SELF_HOSTING.md` step 3 so the Plesk env-var checklist is complete for future redeploys (small doc edit).
- The automatic cron sync is unaffected — it runs on Lovable hosting where the key already exists.
- The key stays server-only; it is never sent to the browser.
