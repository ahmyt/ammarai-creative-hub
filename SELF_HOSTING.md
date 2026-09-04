# Hosting AmmarAI on Plesk (with the existing cloud database)

This guide covers hosting the AmmarAI site on a Plesk server while **keeping your
existing Lovable Cloud database**. No database migration is needed — the app
talks to the same cloud database over HTTPS, wherever it runs.

The app is a TanStack Start (React 19 + Vite) SSR app. By default it builds for
Cloudflare Workers; this project is configured to build as a **Node.js server**
when built outside Lovable, so Plesk can run it.

---

## 1. Where the database is

There is **no database file in the code download**. The database is your existing
Lovable Cloud PostgreSQL instance. The Plesk app connects to it remotely using
the same keys that are in this repo's `.env` — nothing to set up or migrate.
All your content, admin users, and sign-ins keep working as-is.

---

## 2. Build configuration (already done in this repo)

- `vite.config.ts` pins `nitro: { preset: "node-server", output: { dir: "dist" } }`.
  This only applies outside a Lovable build; the Lovable preview stays on Cloudflare.
- `package.json` has `"start": "node dist/server/index.mjs"`.

---

## 3. Deploy steps on Plesk

1. **Upload the project** to the Plesk domain (e.g. `httpdocs` or a sibling app dir).
2. In Plesk → **Domains → yourdomain.com → Node.js**:
   - Node.js version: **20+**
   - App root: the project directory
   - Application mode: **Production**
   - Run `npm install`, then `npm run build`
   - Application startup file/command: `npm run start`
     (or `node dist/server/index.mjs`)
3. **Set environment variables** (Plesk → Node.js → Custom environment variables).
   Copy the values from this repo's `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
   - `SUPABASE_URL` = same as `VITE_SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY` = same as `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `PORT` = the port Plesk routes to (e.g. `3000`)
   - Re-run `npm run build` **after** setting `VITE_*` vars — they bake into the
     client bundle at build time.
4. **Routing.** TanStack Start serves all routes (SSR HTML + static assets) from
   one Node process. Configure Plesk to proxy all requests to `localhost:PORT`
   (Apache `ProxyPass` / nginx reverse proxy, or Passenger). Do not serve only
   static files — SSR pages come from the Node server.

---

## 4. Google sign-in

Cloud auth only redirects to whitelisted origins (the Lovable-hosted site), so
on your own domain the app uses a built-in forwarder:

1. On your domain, "Continue with Google" sends the OAuth return to
   `https://ammarai-creative-hub.lovable.app/auth/forward?to=<your-origin>/auth`.
2. That page forwards the login tokens to your domain, where the app picks up
   the session and lands on `/admin`.

No extra configuration is needed — just make sure your deployed copy is up to
date (this lives in `src/routes/auth.tsx` and `src/routes/auth.forward.tsx`).
If you deploy on a different domain than `ammarai.com`, add that hostname to
`ALLOWED_TARGET_HOSTS` in `src/routes/auth.forward.tsx`.
Email/password sign-in works with no extra configuration.

---

## 5. Verify

- Visit `/` — homepage renders.
- Visit `/sitemap.xml` — valid XML returned.
- Sign in at `/auth` → `/admin` → edit content → see the change on the site.
- Google sign-in redirects to Google and returns to `/admin`.

---

## Troubleshooting

### `npm run build` fails with exit code 127 and `nodenv: node: command not found`

This is a Plesk environment issue, not a code problem. Some Plesk servers (e.g.
Zap Hosting) manage Node with **nodenv**, and the version selected in Plesk
(e.g. `22.23.2`) may not actually be installed in nodenv — so the `node` binary
is missing when the build runs.

**Fix 1 — pick an installed Node version:**
1. Plesk → **Websites & Domains → yourdomain.com → Node.js** (Dashboard tab).
2. Set the Node.js version to a plain installed major version — **22** or **20**
   (the ones nodenv lists), not a specific patch like `22.23.2`.
3. Save, then re-run `npm run build` from "Run Node.js commands".

**Fix 2 — run the build over SSH (most reliable):**
```bash
cd /var/www/vhosts/yourdomain.com/<your-app-folder>
export PATH="$HOME/.nodenv/shims:$HOME/.nodenv/bin:$PATH"
nodenv versions        # see what's installed
nodenv global 22       # pick an installed version
node -v                # should print a version now
npm install
npm run build          # should produce dist/server/index.mjs
```

After a successful build, set the **Application startup file** to
`dist/server/index.mjs` in Plesk Node.js settings and click **Restart App**.

---

## Notes

- **Media files (logo, demo videos/audio) are bundled in `public/media/`.**
  The app automatically serves these local copies when it detects it is running
  outside Lovable hosting (see `src/lib/asset-url.ts`). On Lovable hosting it
  still uses the CDN paths. No external dependency — the logo, videos, and audio
  all load from your Plesk domain directly.
- The Lovable-hosted preview/published app is unaffected by these changes.
- `npm install` works on Plesk without a private registry — all dependencies,
  including `@lovable.dev/*`, are public on npm.
- The Lovable build environment forces the Cloudflare preset internally, so the
  `node-server` build can only be produced outside Lovable. Run `npm run build`
  on your own machine/Plesk first and confirm it emits `dist/server/index.mjs`
  before going live.
- Update `public/robots.txt` and the sitemap origin if you move fully to your
  custom domain (currently they point at `ammarai-creative-hub.lovable.app`).
