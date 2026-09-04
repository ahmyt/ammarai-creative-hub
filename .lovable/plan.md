# Fix the persistent Plesk SMTP authentication error

The current code omits SMTP authentication only when the running process sees both an exact loopback host (`127.0.0.1`, `localhost`, or `::1`) and `SMTP_AUTH_DISABLED=true`. Because the returned error still says `AUTH PLAIN`, the running process is still constructing an authenticated SMTP connection despite the intended Plesk settings. The next fix will make that mismatch visible and remove ambiguity from the local-delivery path.

## Changes

1. **Centralize SMTP configuration parsing**
   - Parse and normalize the host, port, secure mode, and boolean settings once.
   - Treat common Plesk formatting variants safely, including whitespace and quoted environment values.
   - Keep unauthenticated delivery strictly limited to loopback hosts on local SMTP; remote servers will always require authentication.

2. **Make local port-25 delivery deterministic**
   - When the normalized configuration is loopback plus authentication disabled, construct the mail transport without any `auth` property so Nodemailer cannot issue `AUTH PLAIN`.
   - Continue using `support@ammarai.com` as the envelope and visible sender.

3. **Improve the safe self-test**
   - Extend `GET /api/contact` to report non-secret effective settings such as normalized host, port, secure mode, and whether authentication is enabled.
   - Never expose the mailbox password or other credentials.
   - This will prove whether Plesk loaded the intended environment and whether the deployed code is current.

4. **Update the Plesk instructions**
   - Document the exact loopback configuration and the expected self-test result (`smtp: ok`, loopback host, port 25, authentication disabled).
   - Note that any remaining `AUTH PLAIN` result means the running app has not loaded the intended values/build.

5. **Verify**
   - Run the project checks after the edit.
   - Test the local preview’s safe diagnostic response.
   - After deployment, use `https://ammarai.com/api/contact` to confirm the production process reports authentication disabled before submitting the form again.

## Expected outcome

The Plesk-local SMTP connection will stop attempting `AUTH PLAIN`. Contact submissions will remain stored first, and the team notification will be handed to the local Plesk mail server without triggering the `454` authentication failure. External delivery may still be rejected separately while the server IP remains listed by Spamhaus.
