# Plan: Fix "No confirmation attempted" in CMS Messages

## What the screenshot tells us

The badge "No confirmation attempted" means the stored message still has the default status — the delivery outcome was never written back to it. Three possible causes:

1. **The row predates the tracking feature** — messages sent before the latest build was deployed on Plesk will always show this badge. Nothing can retroactively fill those in.
2. **The live site is running an older build** — the tracking code only exists in the latest build; Plesk must be redeployed and the Node app restarted.
3. **The status update is silently swallowed** — in the current code, the write-back of the confirmation outcome never checks for errors, and when the notification email fails, the code returns early and skips the write-back entirely. Both gaps are real bugs worth fixing regardless.

## Changes

**1. Make the delivery-outcome write-back reliable (`src/routes/api/contact.ts`)**
- Check the result of the status update; if it fails, log it and include a safe note in the API response so a failed write-back is visible instead of silent.
- Record the confirmation outcome even when the team notification fails (today that path returns early with a 502 and never updates the row, which is exactly how a message ends up stuck on "No confirmation attempted").

**2. Clarify the badge text (`src/routes/admin.messages.tsx`)**
- Rename "No confirmation attempted" to "No delivery recorded (old build)" — making clear these rows predate delivery tracking.

## What you do after I make the changes

1. Deploy the latest build to Plesk and restart the Node.js app.
2. Submit one fresh test message from the contact form.
3. Open CMS → Messages: the new row should show **"Accepted by mail server"** with a delivery reference, or **"Confirmation failed"** with a safe error code.
4. Rows from before the redeploy will keep the old badge — that is expected; they were sent before tracking existed.

## Note on the actual delivery problem

This fixes the *tracking*, not the underlying issue that external recipients (e.g. Hotmail) may still reject mail from the server while its IP reputation is poor (the earlier Spamhaus listing). With reliable tracking in place, the next test will show a delivery reference you can trace in the Plesk mail log (`/var/log/maillog` or `/var/log/mail.log`) to see exactly what the recipient's server replied.
