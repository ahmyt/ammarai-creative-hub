# Fix "Unsupported provider: missing OAuth secret" for Google sign-in

## What the error actually means

The screenshot error comes from the cloud auth service, not your Plesk/GitHub
deployment. The backend auth logs confirm it: every `/authorize` request returns
`400 validation_failed — missing OAuth secret`. The Google provider has never
been switched on with credentials for this project, so Google sign-in fails from
every origin — Lovable-hosted, Plesk, or local. The redirect/forwarder work done
earlier was not the blocker.

## Fix

1. Enable managed Google sign-in on the backend (Lovable-managed Google
   credentials — nothing needed from Google Cloud Console). This is the step
   that supplies the missing OAuth secret.
2. Switch the sign-in button to the managed auth helper instead of calling the
   raw Supabase OAuth API. The managed broker handles the redirect round-trip
   correctly, including custom domains such as `ammarai.com`, and works inside
   the editor preview.
3. Remove the custom forwarder workaround (`/auth/forward`) and the
   host-sniffing redirect logic in the sign-in page, since the broker already
   supports non-Lovable origins. Update the self-hosting doc's Google section
   accordingly.
4. Verify: "Continue with Google" from the preview reaches Google's account
   chooser instead of the JSON error, and lands signed in on `/admin`.

## Technical notes

- Call `supabase--configure_social_auth` with provider `google`; keep
  email/password enabled (it is your working fallback).
- `src/routes/auth.tsx`: replace `supabase.auth.signInWithOAuth({ provider:
  "google", ... })` with
  `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })`,
  then navigate to `/admin` once the session is present. `redirect_uri` must be a
  public same-origin URL, never `/admin` directly.
- Delete `src/routes/auth.forward.tsx` and its references in `SELF_HOSTING.md`.
- After the change, redeploy from GitHub to Plesk so the built bundle includes it.
