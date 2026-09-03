# Self-host AmmarAI on Plesk with a self-hosted Supabase backend

## Context — where things actually live

- **There is no database file in your download.** The database is a hosted PostgreSQL instance on Lovable Cloud (Supabase). The app connects to it remotely over HTTPS using the keys in `.env` (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`). The schema is defined in `supabase/migrations/*.sql`, but those files reference `auth.users` — a table that only exists inside a Supabase project — so they **cannot** run on Plesk's plain MySQL/Postgres. They run inside a self-hosted Supabase instance.
- **The app server is built for Cloudflare Workers** (Nitro `cloudflare-module` preset). Plesk runs Node.js processes. We switch the build to the Node preset so Plesk can run it.
- **Good news:** the Lovable npm packages (`@lovable.dev/vite-tanstack-config`, `@lovable.dev/cloud-auth-js`) are public on npm, so `npm install`/`bun install` works on Plesk with no private registry. The only Lovable coupling in the app code is Google sign-in (the broker); email/password auth is plain Supabase and works against any instance.

This plan has two tracks: **(A)** set up a self-hosted Supabase on Plesk, and **(B)** adapt the app to run as a Node server on Plesk pointed at that Supabase. The Lovable-hosted preview/published site is **not** affected by these code changes (the Node preset only applies outside a Lovable build).

---

## Track A — Self-hosted Supabase on Plesk (infra you run)

Plesk supports Docker. Self-hosted Supabase is a Docker Compose stack that provides Postgres + GoTrue (Auth) + PostgREST (Data API) + Realtime + Storage + Studio — everything the app uses.

1. **Install the Docker extension in Plesk** (Extensions → Docker), if not present.
2. **Deploy self-hosted Supabase** following the official `supabase/self-hosting` Docker guide (clone the repo, edit `.env` to set `POSTGRES_PASSWORD`, `JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY`, `SITE_URL=https://yourdomain.com`, and public API/Studio URLs). Run `docker compose up -d`. Put it behind your domain, e.g. `https://supabase.yourdomain.com` (API on `:8000`, Studio on `:3000`).
3. **Apply the schema** to the new Postgres. Run the SQL from `supabase/migrations/*.sql` against the new database, **with one fix** (see Track A.4 below). This creates `user_roles`, the `content` table, `has_role`, `claim_first_admin`, `set_updated_at`, the update trigger, all RLS policies, and GRANTs. I'll provide a single consolidated, corrected SQL file you can run in the Supabase SQL editor or `psql`.
4. **Fix the `content.kind` CHECK.** The migration defines `kind text CHECK (kind IN ('tool','use_case','feature','post'))`, which excludes `'page'` — but the live CMS uses pages (the cloud DB dropped this check). The consolidated SQL I provide will **drop the CHECK** (or extend it to include `'page'`) so page content saves correctly, matching production behaviour.
5. **Migrate existing content data.** Export the rows from the cloud `content` table (it's publicly readable via the Data API) and insert them into your new `content` table. I'll provide a small export/import approach (a SQL dump of `public.content` or a JSON export you re-insert). Auth users are **not** cloned — you sign up fresh on the new instance and use the **Claim first admin** button on the `/admin` overview to become admin.
6. **Configure email/auth** in the self-hosted Supabase `.env`: set an SMTP server for signup confirmation emails (or disable email confirmation for testing), and add Google OAuth credentials (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`) with the redirect URL set to your self-hosted Supabase Auth callback, e.g. `https://supabase.yourdomain.com/auth/v1/callback`.

---

## Track B — Adapt the app to run as a Node server on Plesk (code changes I make)

### B1. Switch the SSR build from Cloudflare to Node
Edit `vite.config.ts` to pin the Nitro preset to `node-server`:
```ts
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  nitro: { preset: "node-server" },
});
```
This only takes effect **outside a Lovable build** (Lovable sets `LOVABLE_NITRO_PRESET=cloudflare-module` internally), so the Lovable preview and published site keep working on Cloudflare unchanged.

### B2. Add a production start script
In `package.json`, add:
```json
"start": "node .output/server/index.mjs"
```
`vite build` (the existing `build` script) emits `.output/server/index.mjs` under the node-server preset; `npm run start` runs the server, which listens on `PORT` (default 3000).

### B3. Rewire Google sign-in off the Lovable broker
The `Continue with Google` button in `src/routes/auth.tsx` calls the Lovable broker (`lovable.auth.signInWithOAuth`). On a self-hosted instance this must call Supabase Auth directly. Replace that call with:
```ts
const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: window.location.origin + "/admin" },
});
if (error) setMessage("Google sign-in failed. Try again or use email.");
```
Remove the `@/integrations/lovable` import from `auth.tsx`. (The `cloud-auth-js` dep can stay installed; it's simply no longer used.) Email/password sign-in already uses plain Supabase and needs no change. `previewAuthStorage` self-disables on non-Lovable domains, so no change there.

### B4. Environment variables on Plesk
Set these in the Plesk Node.js app environment (and rebuild so the `VITE_*` ones bake into the client bundle):
- `SUPABASE_URL` = `https://supabase.yourdomain.com`
- `SUPABASE_PUBLISHABLE_KEY` = your self-hosted anon key
- `SUPABASE_SERVICE_ROLE_KEY` = your self-hosted service-role key
- `VITE_SUPABASE_URL` = same as `SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = same anon key
- `VITE_SUPABASE_PROJECT_ID` = your self-hosted project ref (any stable id)
- `PORT` = the port Plesk expects (e.g. 3000)

### B5. Deploy on Plesk
1. Upload the project files to the Plesk domain's document root / app directory.
2. In Plesk → **Domains → yourdomain.com → Node.js**, set the app root, Node version (20+), run `npm install` then `npm run build`, set the startup file/command to `npm run start` (or `node .output/server/index.mjs`), and set the env vars from B4.
3. Configure Plesk to proxy requests to the Node port (Passenger, or a reverse proxy / Apache `ProxyPass` to `localhost:PORT`). TanStack Start serves all routes (SSR HTML + assets) from the single Node server, so one proxy target covers everything.

---

## Verification

- `npm run build` succeeds and emits `.output/server/index.mjs`.
- `npm run start` serves the homepage; `/sitemap.xml` returns valid XML.
- Sign up via `/auth` (email), then `/admin` → **Claim first admin** gives admin access; CMS can create/edit/hide content that appears on the live site.
- Google sign-in redirects to Google and returns to `/admin`.
- Lovable preview still builds and runs unchanged (regression check).

## Notes / honest risks
- Switching the Nitro preset is standard for TanStack Start but **must be tested with a real build** before relying on it; I'll run `npm run build` here to confirm it compiles for node-server.
- Self-hosted Supabase is a sizable Docker stack; resource needs (RAM) are higher than a plain DB. Plesk's Docker support varies by host — confirm Docker is available on your Plesk server.
- Auth users are not migrated; everyone signs up again. CMS content data is migrated (export/import). If you'd rather keep the existing Lovable Cloud database instead of self-hosting Supabase, that's a far simpler path — say so and I'll drop Track A and only do the Node/Plesk adaptation pointing at the existing cloud DB.
