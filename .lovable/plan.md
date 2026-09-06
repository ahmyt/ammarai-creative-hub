# Fix "Unsupported provider: missing OAuth secret" on Google sign-in

## What the error means

Google sign-in is switched **off** in the project's login settings — no Google
credentials are stored there. The button correctly sends you to the login
service, which then refuses because it has no Google secret. This happens on
both the preview and ammarai.com. Email + password sign-in is unaffected.

## The fix

1. Turn on Google sign-in for this project using Lovable's built-in, managed
   Google credentials. No Google Cloud account needed, nothing for you to paste.
2. Add ammarai.com (and www.ammarai.com) to the list of addresses the login
   service is allowed to send people back to, so sign-in also completes on your
   own domain.
3. Leave the sign-in page code as it is: preview keeps using the managed
   sign-in, and your own domain calls Google directly.

## If you would rather use your own Google credentials

That path stays open: create a Google OAuth client, paste the ID and secret into
the project's Google sign-in settings, and step 1 above is replaced by that.
Managed credentials are the faster route and can be swapped later.

## Verify

- Preview: "Continue with Google" reaches the Google account chooser and returns
  signed in at /admin.
- After deploying the current build to Plesk: same on https://ammarai.com/auth.

## Note

Your own domain only completes Google sign-in once the site there is running the
latest deployed build.
