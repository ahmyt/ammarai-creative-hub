# Fix Google sign-in for the CMS on the Plesk-hosted site

## Why it fails

Google sign-in goes through the cloud auth service (Lovable Cloud). After Google
authenticates, the auth service only redirects back to URLs on its **allowed
redirect list**. The list currently covers the Lovable-hosted site
(`*.lovable.app`), not your Plesk domain (`ammarai.com`). So the OAuth round-trip
on `https://ammarai.com/auth` is rejected or returns to the wrong origin —
email/password sign-in works fine because it never leaves the page.

The code itself is already correct: `src/routes/auth.tsx` uses
`redirectTo: ${window.location.origin}/admin`, so on Plesk it asks to return to
`https://ammarai.com/admin` — that origin just isn't whitelisted yet.

## Fix

1. **Whitelist the Plesk domain in cloud auth settings** (I do this via the
   backend configuration tool):
   - Site URL / additional redirect URLs: add `https://ammarai.com` and
     `https://ammarai.com/**` (plus `https://www.ammarai.com/**` if you use www).
2. **Confirm the Google provider stays enabled** — it already is; no Google
   Cloud Console change is needed because Google's redirect URI is the cloud
   auth callback (`/auth/v1/callback`), which doesn't change with your domain.
3. **Verify** — after the config change, test "Continue with Google" at
   `https://ammarai.com/auth`: it should redirect to Google, come back to
   `https://ammarai.com/admin`, and land signed in.

## Technical notes

- No code changes required; this is an auth-configuration fix on the backend.
- The Lovable preview/published site keeps working — both origins are allowed.
- If you later change domains again, the new origin must be added the same way.
- If Google still fails after whitelisting, the fallback is email/password
  sign-in, which is unaffected.
