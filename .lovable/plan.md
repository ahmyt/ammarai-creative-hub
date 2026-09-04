# Fix Contact Confirmation Emails via Plesk Mail

## Goal

Customer confirmation emails are being rejected by Outlook/Hotmail because the Plesk server's IP (185.223.31.164) is listed on the Spamhaus blacklist. Support notifications arrive because you email yourself; external recipients bounce. Two parts: (A) confirm the Plesk SMTP configuration, (B) fix the blacklist/reputation issue so external mail is accepted.

## A. Verify Plesk SMTP configuration

The existing code needs no changes — it already works with any standard SMTP server. In **Plesk → Websites & Domains → ammarai.com → Node.js → Custom environment variables**, set:

```text
SMTP_HOST=mail.ammarai.com        (Plesk → Mail → Mail Settings shows the exact hostname)
SMTP_PORT=587                     (STARTTLS; use 465 + SMTP_SECURE=true if SSL port is enabled)
SMTP_SECURE=false                 (true only when using port 465)
SMTP_USER=support@ammarai.com     (full Plesk mailbox address)
SMTP_PASS=<Plesk mailbox password>
SMTP_FROM=support@ammarai.com
```

Then restart the Node.js app in Plesk and test the contact form. The updated code now returns a clear error with the server response if sending fails, instead of silently succeeding.

## B. Fix the Spamhaus listing (the actual cause of the bounce)

The code cannot fix this — it requires mail-server actions on Plesk:

1. **Check and request delisting**: look up 185.223.31.164 at spamhaus.org/lookup. If it's a policy list (PBL) entry, the server's hostname/HELO must be set correctly (see below); if it's an SBL/XBL listing (spam or malware from the server), secure the server first, then request removal.
2. **Set a proper HELO/hostname**: in Plesk → Tools & Settings → Mail Server Settings, set the mail server to identify itself with a valid FQDN (e.g. mail.ammarai.com) that resolves to the server IP.
3. **Set rDNS (PTR record)**: ask your hosting provider to point the IP's reverse DNS to mail.ammarai.com. Missing/mismatched PTR is a common Spamhaus/Outlook trigger.
4. **Enable authentication for outgoing mail** so open relaying is impossible, and check the mail queue for spam backlogs.
5. **DNS records in cPanel** (where ammarai.com DNS/email zone lives): ensure SPF includes the Plesk server IP, plus valid DKIM and DMARC records for the domain.

## What I will change in code

- `SELF_HOSTING.md`: replace the cPanel-focused email section with Plesk SMTP instructions (ports, where to find the hostname, restart step) and a short "bounced by blacklist" troubleshooting section covering the Spamhaus/rDNS/PTR steps above.
- No functional code changes are needed — SMTP is already generic.

## Verification

- After config: submit the contact form; support notification and customer confirmation should both arrive.
- If a bounce recurs, the new error message will show the receiving server's exact rejection, making the next step obvious.
