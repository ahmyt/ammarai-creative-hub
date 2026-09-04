# Plan: Fix the Spamhaus block on 185.223.31.164

## What the error means

The customer notification email is being rejected because your Plesk server's own IP address (`185.223.31.164`) is listed on Spamhaus. Microsoft (Hotmail/Outlook) checks that list before accepting any mail, so the message never reaches the customer's mailbox. This is not a website or code problem — the code is working (support email arrives, contact form saves).

The important consequence: **while the IP stays listed, nothing sent from this server will reach Outlook/Hotmail customers**, no matter which port or login method we use. The fix is reputation/infrastructure, not more code changes.

## Step 1 — Clean up and request delisting (required, done in Plesk/host panel)

1. Make sure nothing on the server is sending spam (check Plesk mail queue, disable any open relay, update CMS/plugins, change mailbox passwords if suspicious activity exists).
2. Confirm proper mail identity settings in Plesk:
   - Valid HELO/FQDN (e.g. `mail.ammarai.com`)
   - Matching reverse DNS (PTR) record for `185.223.31.164` pointing to `mail.ammarai.com` — set via the hosting provider's panel
   - SPF, DKIM and DMARC records for `ammarai.com`
3. Go to https://www.spamhaus.org/query/ip/185.223.31.164 and request removal. Delisting usually takes hours to a couple of days once the cause is cleaned up.

## Step 2 — Code-side improvement (optional, done in this project)

While waiting for delisting, I can make the contact form more resilient so customer messages are not lost even when confirmation email fails:

1. Confirmation email failure no longer shows the visitor a scary error — instead show "Message received" and note that a confirmation may be delayed.
2. Store the confirmation email status (sent / bounced) on the saved message in the CMS, so you can see at a glance which customers actually received the confirmation and resend manually if needed.
3. Keep all existing SMTP diagnostics (`/api/contact` self-test) untouched.

## Step 3 — Alternative: relay through an external SMTP (fastest path to working delivery)

If delisting takes too long or the IP keeps getting relisted, the reliable option is to send through a trusted relay instead of the server's own IP:

- A dedicated mailbox on a reputable provider (e.g. your existing hosting email on a different server, or a transactional email service).
- No code change needed — just point `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` in the Plesk Node.js app environment to that provider and restart the app. The existing SMTP code already supports any SMTP server.

## What I need from you

Approve this plan if you want me to do Step 2 (the resilience improvements). Steps 1 and 3 happen in your Plesk/hosting panels — I'll guide you through the exact clicks once the code part is done.
