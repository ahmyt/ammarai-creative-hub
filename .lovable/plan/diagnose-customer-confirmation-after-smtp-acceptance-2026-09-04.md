# Diagnose customer confirmation after SMTP acceptance

The connection test now confirms the application can hand mail to the local Plesk server without authentication. It does **not** confirm that Plesk delivered the confirmation to the customer. The current code records Nodemailer’s accepted handoff as “sent,” but does not retain the queue/message identifiers needed to trace what happened afterward.

## Investigation

1. Submit one new contact message to a controlled external address and capture the confirmation message ID and SMTP response already written to the Node application log.
2. Search that ID/recipient in Plesk’s mail queue and mail log to distinguish:
   - still queued or deferred;
   - rejected by the receiving provider;
   - accepted by the receiving provider but filtered into junk/quarantine;
   - never handed off by Plesk.
3. Check the current sending IP reputation result only if the Plesk log shows an external rejection. The earlier Spamhaus block is a likely possibility, but the new delivery attempt must confirm whether it still applies.

## Application changes

1. Rename the customer status from **sent** to **accepted by mail server** so the CMS does not claim final delivery without a delivery event.
2. Store safe delivery diagnostics on each contact message: confirmation message ID, Plesk SMTP response, attempt time, and failure summary. Do not store credentials or sensitive server configuration.
3. Show those details in **CMS → Messages**, with clear states for accepted, failed, and not attempted, so each submission can be matched to Plesk’s queue/log.
4. Keep the public success message accurate: the message reached the team, while confirmation delivery may be delayed or filtered.

## Resolution based on the mail log

- **Queued/deferred:** resolve the Plesk outbound queue or connectivity issue and retry from Plesk.
- **Spamhaus/provider rejection:** delist `185.223.31.164` after mail-server cleanup, or route outbound mail through a reputable relay; application code cannot bypass a recipient blocklist.
- **Provider accepted:** check the recipient’s spam/junk/quarantine and confirm SPF, DKIM, DMARC, PTR, and HELO alignment.
- **No Plesk handoff:** correct the send path using the recorded SMTP response and retest.

## Verification

Submit a fresh form, confirm the CMS shows the Plesk acceptance details, trace the same message ID in Plesk, and verify the final recipient outcome without treating SMTP connection success as proof of inbox delivery.

## Latest evidence: internal mail works, external mail does not

The team notification to `support@ammarai.com` arrives because that mailbox is on the same Plesk server — it never leaves the machine. The customer confirmation must travel to an outside provider, and only that direction is failing. With no bounce returned, the message is most likely sitting in the Plesk outbound queue (deferred) or being silently dropped/filtered at the recipient side, rather than being refused outright.

This narrows the first investigation step: inspect the Plesk outbound mail queue and mail log for the confirmation recipient specifically. Queued or deferred entries point to outbound port 25 being blocked by the hosting provider or the receiving side throttling the listed IP; an accepted-then-missing message points to spam filtering and sender authentication (SPF, DKIM, DMARC, PTR, HELO).

If outbound delivery from this IP remains blocked, the reliable fix is routing outgoing mail through a reputable relay mailbox, which needs only the SMTP settings changed on the server — no application rewrite.
