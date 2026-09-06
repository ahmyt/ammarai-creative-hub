# Sitemap and robots.txt: already fixed in code, needs deploying

## What I found

The change you approved is already applied in the project. I verified it just now:

| Check | Result |
| --- | --- |
| Sitemap addresses | All 111 pages use `https://ammarai.com` |
| Leftover Lovable links in sitemap | None |
| robots.txt sitemap line | `Sitemap: https://ammarai.com/sitemap.xml` |

So there is no code work left to do for this item.

## The remaining problem

Your live site is still serving an older build:

- `https://ammarai.com/robots.txt` still points to the old `ammarai-creative-hub.lovable.app` sitemap
- `https://ammarai.com/sitemap.xml` still lists every page under the old Lovable address

This is purely because the updated files have not been uploaded to your Plesk
server yet. Nothing is wrong with the code.

## What needs to happen

This is a deployment step on your side — the same process you have used for the
earlier updates:

1. Publish/export the latest build of the site.
2. Upload it to Plesk for ammarai.com, replacing the previous build.
3. Restart the Node.js app in Plesk (Websites & Domains > ammarai.com > Node.js > Restart App).

## How we confirm it worked

After the deploy, I will re-check the live site and confirm:

- `https://ammarai.com/robots.txt` shows the ammarai.com sitemap line
- `https://ammarai.com/sitemap.xml` lists pages under ammarai.com with no Lovable addresses

Once that is confirmed, the sitemap can be submitted in Google Search Console so
Google indexes the correct addresses.

## Note on the other approved item

Google sign-in on ammarai.com is also code-complete but still needs the one-time
Google credentials setup described in `SELF_HOSTING.md` (section 4). Email and
password sign-in works today with no setup.

## Optional: I can do more here

If you would rather I take action instead of just verifying, tell me and I can:

- Re-scan the site for any other pages still pointing at the old Lovable address
- Add the sitemap reference to Google Search Console guidance for you
