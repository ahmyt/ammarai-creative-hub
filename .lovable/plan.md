# Fix Google sign-in "redirect_uri_mismatch" on ammarai.com

## What the error means
Google's "Error 400: redirect_uri_mismatch" means your Google Cloud OAuth client
doesn't have the sign-in service's callback address registered yet. Your
credentials are correct and the request reaches Google — this is the last
configuration step, not a code problem. No code changes are needed.

## What you do (one-time, in Google Cloud Console)
1. Open [Google Cloud Console](https://console.cloud.google.com/) → APIs &
   Services → Credentials, and open the OAuth 2.0 Client ID you created for
   AmmarAI (application type: Web application).
2. Under **Authorized redirect URIs**, add exactly this address — no extra
   spaces, no trailing slash:
   `https://jxobtlhajvcpyjcgktzj.supabase.co/auth/v1/callback`
3. Click **Save**. (Google's changes can take a few minutes to propagate.)
4. While you're there, check the **OAuth consent screen** (APIs & Services →
   OAuth consent screen): publishing status should be "In production" (or add
   your Google account as a test user if it's still "Testing"), and the
   authorized domains should include `ammarai.com`.

## Then verify together
5. On your phone/browser: open `https://ammarai.com/auth`, click
   "Continue with Google" → you should see the Google account chooser, then
   return signed in to `/admin`.

## If it still fails after that
- `redirect_uri_mismatch` again → the URI wasn't saved exactly as above.
- A different error (e.g. access blocked / 403 org policy) → consent screen
  publishing status; I'll help from the new screenshot.

## Notes
- Nothing to redeploy: the Plesk code is already correct; this is purely a
  Google Cloud Console setting.
- The Lovable preview sign-in is unaffected and keeps using managed credentials.
