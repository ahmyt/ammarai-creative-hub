# Daily blog writer → your own OpenAI key (Plesk)

## Why
`LOVABLE_API_KEY` is a managed, write-only secret — its value is never shown, so it cannot be copied into Plesk. The daily blog writer currently calls the Lovable AI Gateway with that key, so it can never run on your Plesk host. You chose to switch the writer to **your own OpenAI API key** so everything self-hosts on `ammarai.com` with no Lovable dependency.

Scope: only the **daily blog writer**. BabyLoveGrowth sync is unaffected (it already uses `BABYLOVEGROWTH_API_KEY`, which you hold). No cron URLs change — `pg_cron` already calls `https://ammarai.com/...`, which is exactly where the OpenAI key will live.

## Changes

### 1. Refactor `src/lib/daily-blog.server.ts` → OpenAI direct
In the `generate()` function only:
- Endpoint: `https://api.openai.com/v1/chat/completions` (was the Lovable gateway).
- Auth: `Bearer ${process.env["OPENAI_API_KEY"]}`; throw `Missing OPENAI_API_KEY` if absent.
- Model: `gpt-5.6-sol` by default (the flagship OpenAI model you wanted — confirmed available directly via OpenAI's API with your own key); allow override via `process.env["OPENAI_MODEL"]` (e.g. `gpt-5.6-terra` for a cheaper near-flagship tier, or `gpt-5.4` if your account can't access the 5.6 family). Cost is negligible for ~1 post/day.
- Keep the existing `response_format: { type: "json_schema", json_schema: { name, strict: true, schema } }` block unchanged — it is already OpenAI-compatible (all objects have `additionalProperties: false` and full `required` arrays). Note: `gpt-5.6-*` models use `max_completion_tokens` (not `max_tokens`) if a length cap is added later; the current call sets no cap, so no change needed now.
- Response parsing stays the same (`choices[0].message.content`), including the ```` ```json ```` fence strip.
- Error handling: keep 429 → "rate limit, try later"; drop the Lovable-only 402 path; surface any other non-OK status as `OpenAI request failed (status) writing about <tool>` so the cron/admin UI shows a clear message (per gateway error semantics, 429 is the only retryable case here — we do not auto-retry).

Everything else in the file (`pickTool`, `buildHtml`, `inlineMarkdown`, `imageFor`, `writeDailyPost`, the category-image figures, FAQ/JSON-LD) stays byte-identical. No new dependencies — it is a plain `fetch`, already used.

### 2. Secrets (Plesk + project)
- You obtain an OpenAI API key at https://platform.openai.com (API keys section), with billing set up. You pay OpenAI directly per generated post.
- Add to **Plesk Node.js environment variables**: `OPENAI_API_KEY` (required) and optionally `OPENAI_MODEL` (defaults to `gpt-5.6-sol`; set to `gpt-5.6-terra`/`gpt-5.4` if your account tier doesn't allow 5.6-sol). Restart the app.
- For testing in this Lovable project, I will request `OPENAI_API_KEY` via the secure secret form (the same value you put on Plesk) so the writer works in preview too. It never appears in code or chat.

### 3. Documentation only
Update the Plesk env-var note to drop `LOVABLE_API_KEY` for the daily blog and add `OPENAI_API_KEY` / `OPENAI_MODEL`. No other code changes; no migration.

## Verification
1. After the key is set, run the writer via the admin **"Write today's post"** action (which calls `writeDailyPost`).
2. Confirm a new article appears in the CMS Synced Articles list and at `/blog/<slug>`.
3. Spot-check the post: no stray `**` markers, a category image renders, FAQ renders as collapsible `<details>`, and a "Recommended for you" section is present (those are handled by the blog route, unchanged).
4. Typecheck passes.

## Out of scope
- BabyLoveGrowth sync (unchanged).
- Cron schedule/URL (already points at ammarai.com — correct for Plesk).
- Any change to `LOVABLE_API_KEY` itself or other Lovable-managed secrets.
