# Verify Google sign-in with your own credentials

## What I checked
- The login service now answers Google sign-in requests by redirecting to
  Google with **your own OAuth client ID** — your credentials are correctly
  saved.
- `https://ammarai.com/auth` is accepted as a return address, so sign-in can
  complete on your domain.
- The website code already uses direct Google sign-in on ammarai.com (no
  dependency on the Lovable host), so **no code change is needed**.

## Steps
1. Deploy the latest code to Plesk and restart the Node.js app (the live site
   may still be running an older build).
2. Test: on https://ammarai.com/auth click "Continue with Google" — you should
   reach the Google account chooser (showing your own app name/branding) and
   come back signed in to /admin.
3. If Google shows a "redirect_uri_mismatch" error instead: in Google Cloud
   Console, edit your OAuth client and add this exact authorized redirect URI:
   `https://jxobtlhajvcpyjcgktzj.supabase.co/auth/v1/callback`

## Note
- In the Lovable preview, the button keeps using the managed Google sign-in —
  that path already works and needs nothing from you.
- Email + password login remains available as a fallback on both.
