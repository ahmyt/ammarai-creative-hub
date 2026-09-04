# Fix contact email delivery through cPanel SMTP

## Goal
Make the contact form accurately report whether both emails were accepted by the configured cPanel mail server, while continuing to preserve every submitted message in the backend.

## Changes
1. **Harden SMTP configuration**
   - Validate the host, port, security mode, username, password, and sender before attempting delivery.
   - Keep cPanel-compatible modes: SSL on port 465 and STARTTLS on port 587.
   - Use the authenticated mailbox as the envelope sender so a CMS value cannot accidentally violate cPanel sender restrictions.

2. **Verify and report delivery**
   - Verify the SMTP connection/authentication before sending.
   - Capture the mail server response and message ID separately for the support notification and visitor confirmation.
   - Log only safe diagnostic details; never expose or log mailbox credentials.

3. **Stop showing false success**
   - Preserve the contact message first, as the app already does.
   - If SMTP configuration, authentication, connection, or either send fails, return a clear delivery-failure status instead of silently returning success.
   - Update the contact page to distinguish “message saved but email delivery failed” from full success and avoid promising a confirmation email unless it was accepted by the mail server.

4. **Improve deployment guidance**
   - Document the exact cPanel environment-variable setup, including the need to restart the deployed Node app after changing variables.
   - Note that the CMS sender address should match the authenticated cPanel mailbox or be an alias permitted by that mailbox.

5. **Validate**
   - Test successful and failed SMTP paths without exposing credentials.
   - Verify the contact endpoint response and the corresponding user-facing state.
   - Confirm existing message storage remains intact when email delivery fails.

## Current-state findings
- The contact endpoint already selects SMTP whenever `SMTP_HOST` is present.
- SMTP exceptions are currently caught and logged, but the endpoint still returns success; this accounts for the success screen despite neither email arriving.
- No Lovable-managed sender domain is configured, so the deployed cPanel SMTP path must be configured and working for these emails to send.
