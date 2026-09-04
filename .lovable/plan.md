# Make Plesk loopback SMTP authentication-free by default

The production diagnostic confirms the effective connection is `127.0.0.1:25` with `secure:false`, but `authEnabled:true`. Therefore the deployed code is current, while `SMTP_AUTH_DISABLED` is not reaching the Node process as the expected `true` value. The resulting `AUTH PLAIN` command causes Plesk's `454` response.

## Changes

1. **Remove the fragile opt-in for local delivery**
   - Automatically omit SMTP authentication whenever the destination is a loopback address (`127.0.0.1`, `localhost`, or IPv6 loopback) on port 25.
   - Keep authentication mandatory for every non-loopback host and for other ports.
   - Continue using `SMTP_USER` / `SMTP_FROM` as the sender identity without sending the mailbox password to the local server.

2. **Keep diagnostics explicit**
   - `GET /api/contact` will continue returning the safe effective configuration.
   - With `127.0.0.1:25`, it must report `authEnabled:false` regardless of whether Plesk exposes `SMTP_AUTH_DISABLED`.

3. **Simplify deployment instructions**
   - Remove `SMTP_AUTH_DISABLED` from the required local Plesk setup.
   - Document that loopback port 25 is automatically authentication-free, while public SMTP hosts still require credentials.

4. **Verify**
   - Test quoted and unquoted loopback settings locally.
   - Run focused code-quality checks.
   - After deployment and restart, confirm `https://ammarai.com/api/contact` returns `smtp:"ok"` and `authEnabled:false`, then submit the contact form.

## Expected result

The app will no longer send `AUTH PLAIN` to the local Plesk mail server, eliminating this `454` authentication failure. This does not remove the separate Spamhaus restriction on delivery to Outlook/Hotmail; that still requires IP delisting or a reputable relay.
