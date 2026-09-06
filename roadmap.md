# Roadmap

## Done
- Resume Lovable Cloud backend (was paused → login "failed to fetch"). Now healthy.
- Point sitemap.xml + robots.txt at https://ammarai.com (was lovable.app).
- Decouple self-hosted Google sign-in from the Lovable broker (native OAuth on ammarai.com; managed broker kept for preview).

## User action needed (one-time, for Google sign-in on ammarai.com)
- Google Cloud Console: create OAuth Client ID (Web) with the callback URL shown in Cloud → Auth Settings → Google.
- Cloud → Auth Settings → Google: paste Client ID + Secret (use own credentials).
- Cloud → Auth Settings → Redirect URLs: add https://ammarai.com/** (and https://www.ammarai.com/** if used).
- Redeploy latest build to Plesk.

Email/password login: works now, no setup needed.
