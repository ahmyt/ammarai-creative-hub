# Fix Google sign-in 404 on the Plesk site

## Why it 404s

The managed Google helper sends the browser to the **relative** path
`/~oauth/initiate`. On Lovable hosting that path is intercepted by Lovable's
edge proxy; your Plesk Node server has no such route, so
`https://ammarai.com/~oauth/initiate?...` returns the app's 404 page. The
OAuth secret problem from before is genuinely fixed — this is a different,
hosting-level issue.

## Fix: route the Plesk site's Google flow through the Lovable domain

1. **Detect the host.** On `*.lovable.app` / localhost, keep the current
   managed helper exactly as-is (it works today).
2. **On other hosts (ammarai.com):** start the flow against the *absolute*
   broker URL on the Lovable-hosted copy
   (`https://ammarai-creative-hub.lovable.app/~oauth/initiate`), and ask it to
   return to a small forwarder page on that same Lovable domain.
3. **Restore the forwarder page** (`/auth/forward`), locked to `ammarai.com` /
   `www.ammarai.com` over HTTPS only. It hands the returned auth tokens back to
   your domain.
4. **Complete the session on your domain.** `/auth` reads the returned tokens,
   establishes the session, and navigates to `/admin`.
5. **Verify** on the Lovable preview (unchanged path) and then after you
   redeploy to Plesk.

## If the broker refuses the cross-domain return

The broker may only accept return URLs it recognises. If step 2 is rejected,
the fallback is: Google sign-in stays available on the Lovable-hosted admin
(`https://ammarai-creative-hub.lovable.app/auth`), and the Plesk site uses
email/password — same accounts, same database, same CMS. I'll tell you which
outcome we get rather than leaving it ambiguous.

## Technical notes

- `src/routes/auth.tsx`: branch on `window.location.hostname`. Lovable/local →
  `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })`.
  Other hosts → a local helper built with
  `createLovableAuth({ oauthBrokerUrl: "https://ammarai-creative-hub.lovable.app/~oauth/initiate" })`
  and `redirect_uri` pointing at the forwarder.
- Re-add `src/routes/auth.forward.tsx` (noindex, `ALLOWED_TARGET_HOSTS`
  allowlist, HTTPS-only, forwards both hash and query).
- On `/auth`, on mount, if tokens are present in the URL, call
  `supabase.auth.setSession(...)`, clean the URL, then go to `/admin`.
- Do not edit `src/integrations/lovable/*` (auto-generated); the custom broker
  client lives in a separate file.
- Update the Google section of `SELF_HOSTING.md`, and redeploy from GitHub to
  Plesk afterwards.
