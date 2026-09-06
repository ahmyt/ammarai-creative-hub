# Fix CMS login, decouple Google sign-in from Lovable, and point the sitemap at ammarai.com

## What I found
- The "Failed to fetch" on login is caused by the **Lovable Cloud backend being
  paused** — the browser can't reach the database/auth API at all. This breaks
  email/password AND Google sign-in. (Unpublishing the app didn't cause this by
  itself, but the backend is paused right now.)
- `ammarai.com` is **not** in the auth redirect allow-list — only Lovable hosts
  are. So even native Google sign-in to your domain is currently rejected.
- Google sign-in on ammarai.com depends on the **published Lovable app**: its
  OAuth "broker" lives at `ammarai-creative-hub.lovable.app/~oauth/initiate`.
  With the app unpublished, that URL 404s — which is why you chose to decouple.
- The sitemap (`src/routes/sitemap[.]xml.ts`) and `robots.txt` still use the
  Lovable host while canonicals/og:url/llms.txt all use `ammarai.com`.

## Part 1 — Restore login (unblock now)
1. Resume the Lovable Cloud backend so database/auth calls succeed again. You
   can do this from Cloud / project settings, or I can resume it on approval.
2. After resume, email/password login works again immediately (no code change).

## Part 2 — Sitemap + robots base URL (SEO)
3. `src/routes/sitemap[.]xml.ts`: `BASE_URL` → `https://ammarai.com`.
4. `public/robots.txt`: `Sitemap:` → `https://ammarai.com/sitemap.xml`.

## Part 3 — Decouple Google sign-in from the Lovable host
This switches self-hosted Google sign-in to **native** Supabase OAuth using
**your own Google credentials**, so it no longer needs the Lovable-hosted broker.

**You do (one-time, in Google + Lovable dashboards):**
5. In Google Cloud Console, create an OAuth **Client ID** (Web application) with
   authorized redirect URI:
   `https://jxobtlhajvcpyjcgktzj.supabase.co/auth/v1/callback`
6. Copy the Client ID + Secret into Lovable Cloud → Users → Auth Settings →
   Sign In Methods → Google (use your own credentials instead of managed).

**I do (code + auth config):**
7. Whitelist `https://ammarai.com/**` (and `https://www.ammarai.com/**`) in the
   auth redirect allow-list.
8. `src/routes/auth.tsx`: on the self-hosted origin call native
   `supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: <origin>/admin } })`
   instead of the broker. Keep `lovable.auth.signInWithOAuth` for the preview.
9. Remove the broker plumbing that only existed for the Lovable host:
   `src/lib/oauth-selfhost.ts` (broker), `src/routes/auth.forward.tsx`, and the
   token-relay logic in `src/routes/__root.tsx` and `src/routes/admin.tsx`.

## Verify
- After Part 1: login succeeds (email/password) with no "Failed to fetch".
- `curl /sitemap.xml` → all `<loc>` start with `https://ammarai.com/`.
- After Parts 2–3 deployed to Plesk + Google credentials added: "Continue with
  Google" on `https://ammarai.com/auth` reaches Google and returns signed in to
  `/admin`, with no dependency on the Lovable host.

## Notes
- Part 3 requires the Google credentials (steps 5–6) before native sign-in will
  work; until then, email/password is the working login method.
