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

The managed OAuth broker lives at `/~oauth/initiate`, a path that only exists on
Lovable hosting — on your own server it returns 404. So the app detects the host:

- On `*.lovable.app` / localhost it uses the broker directly.
- On your domain it starts the flow against
  `https://ammarai-creative-hub.lovable.app/~oauth/initiate` and returns through
  `https://ammarai-creative-hub.lovable.app/auth/forward?to=<your-origin>/auth`,
  which hands the session tokens back to your domain; `/auth` then signs you in
  and goes to `/admin`. If the managed broker returns to the Lovable homepage
  instead of honoring the forward URL, the root layout detects the OAuth session
  fragment and immediately relays it to `https://ammarai.com/auth` as a fallback.
  If the broker has already consumed that fragment and opened `/admin` on the
  Lovable-hosted site, that established session is relayed to the same canonical
  auth route as a second fallback, so the CMS remains on `ammarai.com`.

This lives in `src/lib/oauth-selfhost.ts`, `src/routes/auth.tsx` and
`src/routes/auth.forward.tsx`. If you deploy on a domain other than
`ammarai.com`, add that hostname to `ALLOWED_TARGET_HOSTS` in
`src/routes/auth.forward.tsx`. Email/password sign-in needs no configuration.

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

---

## Contact form email via Plesk SMTP

The contact form stores every message in the database first, then sends a
notification to the CMS-configured notify address (default
`support@ammarai.com`) plus a confirmation to the visitor. On your Plesk
(Node) deployment it sends through your Plesk mailbox via SMTP. Set these
environment variables in **Plesk → Websites & Domains → ammarai.com →
Node.js → Custom environment variables**:

| Variable | Example | Notes |
| --- | --- | --- |
| `SMTP_HOST` | `mail.ammarai.com` | Outgoing server hostname; see Plesk → Mail → Mail Settings |
| `SMTP_PORT` | `587` | `587` = STARTTLS, `465` = SSL |
| `SMTP_SECURE` | `false` | `false` for port 587, `true` for 465 |
| `SMTP_USER` | `support@ammarai.com` | Full Plesk mailbox address |
| `SMTP_PASS` | `••••••••` | Mailbox password |
| `SMTP_FROM` | `support@ammarai.com` | Optional; defaults to `SMTP_USER` |

The CMS Contact page fields `fromName` and `notifyEmail` still apply. The
authenticated `SMTP_USER` is always used as the envelope sender. `SMTP_FROM`
must be that mailbox or an alias that Plesk explicitly permits; a different
CMS `fromEmail` does not override it.

Port 587 requires `SMTP_SECURE=false` so STARTTLS can be negotiated. Port 465
requires `SMTP_SECURE=true`. If `SMTP_HOST` is not set, the app falls back to
the Lovable email path (used on Lovable hosting only), and the message is
still safely stored in the database either way.

After adding or changing the variables, restart the deployed Node app so the
new environment is loaded. A successful form response now means the SMTP
server accepted both the support notification and visitor confirmation. If
either send fails, the page states that the message was saved but email
delivery failed; inspect the Node app log for the safe SMTP error code and
response code.

### Bounced by a blacklist (e.g. Spamhaus / Outlook 550 5.7.1)

If external recipients (Hotmail/Outlook, Gmail) bounce with
`550 5.7.1 ... blocked using Spamhaus`, the message was accepted by your
Plesk mail server but rejected by the recipient because the **server's IP
address is on a spam blacklist**. This is a mail-server reputation issue, not
an app bug — the app code needs no change. Fix it on the server:

1. **Check and delist the IP**: look up the server IP (e.g. `185.223.31.164`)
   at <https://check.spamhaus.org/>. A PBL listing means the IP must not send
   mail directly without a proper hostname (fix HELO/rDNS below, then request
   removal). An SBL/XBL listing means spam or malware was sent from the
   server — secure it first (check the mail queue, change mailbox passwords,
   scan for malware), then request delisting.
2. **Set the mail server hostname (HELO)**: in Plesk → Tools & Settings →
   Mail Server Settings, ensure the server identifies itself with a valid
   FQDN (e.g. `mail.ammarai.com`) that resolves to the server IP.
3. **Set reverse DNS (PTR record)**: ask your hosting provider to point the
   server IP's reverse DNS to `mail.ammarai.com`. A missing or mismatched PTR
   record is a common Spamhaus/Outlook rejection trigger.
4. **Lock down relaying**: ensure outgoing mail requires SMTP authentication
   (Plesk default) so the server cannot be used as an open relay, and clear
   any spam backlog in the mail queue.
5. **Check DNS auth records** wherever the ammarai.com zone is managed:
   SPF must include the Plesk server IP
   (`v=spf1 mx a ip4:185.223.31.164 -all` style), and DKIM + DMARC should be
   enabled for the domain (Plesk can generate DKIM keys under Mail Settings).

After delisting, propagation to receiving providers can take up to 24–48
hours. Re-test by submitting the contact form to an external address.
