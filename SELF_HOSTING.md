# Self-hosting AmmarAI on Plesk

This guide covers hosting the AmmarAI marketing site on a Plesk server with a
**self-hosted Supabase** backend. The app is a TanStack Start (React 19 + Vite)
SSR app. By default it builds for Cloudflare Workers; this project is configured
to build as a **Node.js server** when built outside Lovable, so Plesk can run it.

---

## 1. Where the database is

There is **no database file in the code download**. The database is a hosted
PostgreSQL instance (Supabase). The app talks to it remotely over HTTPS using
keys in `.env`. To self-host, you run your own Supabase instance (Track A)
and point the app at it (Track B).

---

## 2. Track A — Set up a self-hosted Supabase on Plesk

Self-hosted Supabase is a Docker Compose stack (Postgres + Auth + Data API +
Realtime + Storage + Studio). Plesk supports Docker via an extension.

1. **Enable Docker** in Plesk: Extensions → Docker (install if missing).
2. **Deploy Supabase** following the official self-hosting guide:
   https://supabase.com/docs/guides/self-hosting/docker
   - Clone the repo, edit `.env`:
     - `POSTGRES_PASSWORD`, `JWT_SECRET` (generate strong values)
     - `ANON_KEY`, `SERVICE_ROLE_KEY` (generate Supabase-format JWTs — see guide)
     - `SITE_URL=https://yourdomain.com`
     - `API_EXTERNAL_URL=https://supabase.yourdomain.com`
     - `ADDITIONAL_REDIRECT_URLS=https://yourdomain.com`
   - `docker compose up -d`
   - Put API (`:8000`) and Studio (`:3000`) behind `https://supabase.yourdomain.com`
     using a Plesk reverse proxy / subdomain.
3. **Apply the schema.** Open the Supabase Studio SQL Editor and run the file
   `supabase/self-host-schema.sql` from this repo. It creates:
   - `public.user_roles` table + `app_role` enum
   - `public.content` table (no `kind` CHECK, so pages work)
   - `has_role`, `claim_first_admin`, `set_updated_at` functions + trigger
   - RLS policies and GRANTs
4. **Migrate existing content data.** Export the `content` rows from your current
   Lovable Cloud database and insert them into the new `content` table. The
   table is publicly readable, so you can pull rows via the Data API and re-insert.
   Auth users are **not** migrated — sign up fresh (see step 6).
5. **Configure email.** Set an SMTP server in the Supabase `.env`
   (`SMTP_*` vars) so signup confirmation emails send. For testing you can
   disable email confirmation in Dashboard → Authentication → Providers.
6. **Become admin.** Sign up at `https://yourdomain.com/auth`, then go to
   `/admin` → **Claim first admin** (this button appears when no admin exists yet).

### Google sign-in on self-hosted Supabase
The app calls Supabase Auth's Google provider directly. Configure it in your
self-hosted Supabase `.env`:
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (from Google Cloud Console →
  Credentials → OAuth client)
- Authorized redirect URI in Google Console:
  `https://supabase.yourdomain.com/auth/v1/callback`

---

## 3. Track B — Run the app as a Node server on Plesk

### Build configuration (already done in this repo)
- `vite.config.ts` pins `nitro: { preset: "node-server" }`.
  This only applies outside a Lovable build; the Lovable preview stays on Cloudflare.
- `package.json` has `"start": "node dist/server/index.mjs"`.

### Deploy steps
1. **Upload the project** to the Plesk domain (e.g. `httpdocs` or a sibling app dir).
2. In Plesk → **Domains → yourdomain.com → Node.js**:
   - Node.js version: **20+**
   - App root: the project directory
   - Application mode: **Production**
   - Run `npm install`, then `npm run build`
   - Application startup file/command: `npm run start`
     (or `node dist/server/index.mjs`)
3. **Set environment variables** (Plesk → Node.js → Custom environment variables):
   - `SUPABASE_URL` = `https://supabase.yourdomain.com`
   - `SUPABASE_PUBLISHABLE_KEY` = your self-hosted anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = your self-hosted service-role key
   - `VITE_SUPABASE_URL` = same as `SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = same anon key
   - `VITE_SUPABASE_PROJECT_ID` = a stable id for your self-hosted project
   - `PORT` = the port Plesk routes to (e.g. `3000`)
   - Re-run `npm run build` after setting `VITE_*` vars (they bake into the client bundle).
4. **Routing.** TanStack Start serves all routes (SSR HTML + static assets) from
   one Node process. Configure Plesk to proxy all requests to `localhost:PORT`
   (Apache `ProxyPass` / nginx reverse proxy, or Passenger). Do not serve only
   static files — SSR pages come from the Node server.

### Verify
- Visit `/` — homepage renders.
- Visit `/sitemap.xml` — valid XML returned.
- `/auth` sign up → `/admin` → Claim first admin → edit content → see it on the site.
- Google sign-in redirects to Google and returns to `/admin`.

---

## Notes
- The Lovable-hosted preview/published app is unaffected by these changes.
- `npm install` works on Plesk without a private registry — all dependencies,
  including `@lovable.dev/*`, are public on npm.
- Self-hosted Supabase needs ample RAM (recommend 2 GB+ free). Confirm your Plesk
  server supports Docker.
- If you prefer to keep the existing Lovable Cloud database instead, skip Track A
  and only point the Plesk app at the existing cloud keys — far simpler.
