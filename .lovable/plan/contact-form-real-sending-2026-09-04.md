# Contact Form — Real Sending

Make the contact form at `/contact` actually deliver messages instead of showing "nothing was transmitted".

## What you'll need to do

Set up a sender domain when prompted (a subdomain of ammarai.com, e.g. `notify.ammarai.com`). The setup is guided and automatic; emails start sending once DNS verifies, and status is visible in Cloud → Emails.

## What gets built

1. **Sender domain + email templates** — set up the email domain and scaffold the email template system (registry, send helper, preview route).

2. **`contact_messages` table** — stores every submission (name, email, message, created_at) so nothing is ever lost. Anonymous visitors can only insert; only admins can read. Messages become viewable in the CMS/admin area later if wanted.

3. **Contact server route** (`POST /api/contact`) — validates the submission (name, valid email, message length limits), saves it to the database, then sends:
   - a **notification email to you** (support@ammarai.com) with the sender's name, email, and message
   - a **confirmation email to the sender** ("we received your message, we reply within two working days") matching the site's clean editorial style

4. **Contact page form update** — submits to the new route with a sending state, a success state (CMS-editable heading/body already in place), and a graceful error message if sending fails. The misleading "this site does not yet send messages" copy is removed from the CMS page defaults.

## Technical notes

- Sending uses the built-in managed email infrastructure; no API keys or external providers needed.
- Emails won't actually send until the sender domain's DNS verifies — the form still works and stores messages in the meantime; sending activates automatically after verification.
- On your self-hosted Plesk copy, email sending depends on the Lovable email API key being present as an environment variable; if you'd rather have Plesk send via your own SMTP later, that's a separate small change.
