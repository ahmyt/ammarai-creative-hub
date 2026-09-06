# Roadmap

## Done
- Resume Lovable Cloud backend (was paused -> login "failed to fetch"). Healthy.
- Sitemap + robots.txt now use https://ammarai.com (111 URLs, zero lovable.app refs; verified in served output).
- Decoupled self-hosted Google sign-in from the Lovable broker (native OAuth on ammarai.com; managed broker kept for preview).
- Full sweep: no remaining old-host URLs in production output (only intentional preview-host detection logic remains).
- Typecheck passes.

## User action needed
1. Redeploy latest build to Plesk for ammarai.com, then restart the Node.js app.
   Live site still serves the old build (robots.txt + sitemap.xml still show the old Lovable address).
2. After deploy: ask me to re-verify https://ammarai.com/robots.txt and /sitemap.xml.
3. Google sign-in on ammarai.com (one-time): create Google OAuth Client ID with the callback URL from
   Cloud > Auth Settings > Google; paste Client ID + Secret there; add https://ammarai.com/** to Redirect URLs.
   See SELF_HOSTING.md section 4. Email/password login already works.
4. Optional: submit https://ammarai.com/sitemap.xml in Google Search Console after redeploy.
