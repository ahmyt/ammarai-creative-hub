import nodemailer from "nodemailer";
import type { SentMessageInfo } from "nodemailer";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
  notifyTo: string;
  fromName?: string | undefined;
  fromEmail?: string | undefined;
};

export type ContactEmailDelivery = {
  notification: { messageId: string; response: string };
  confirmation: { messageId: string; response: string };
};

const requiredEnv = (name: "SMTP_HOST" | "SMTP_USER" | "SMTP_PASS"): string => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
};

const deliveryResult = (info: SentMessageInfo): { messageId: string; response: string } => ({
  messageId: String(info.messageId ?? ""),
  response: String(info.response ?? "accepted"),
});

/**
 * Sends the contact-form notification and confirmation emails through the
 * deployment's own SMTP mailbox (e.g. Plesk mail). Configured via env vars:
 *   SMTP_HOST (required), SMTP_PORT (default 465), SMTP_SECURE ("true"/"false"),
 *   SMTP_USER, SMTP_PASS, SMTP_FROM (defaults to SMTP_USER).
 * Runs only on Node hosts; the edge/preview runtime never imports this file.
 */
const createTransporter = () => {
  const host = requiredEnv("SMTP_HOST");
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");

  const port = Number(process.env["SMTP_PORT"] ?? "465");
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number");
  }
  const secure = (process.env["SMTP_SECURE"] ?? String(port === 465)) !== "false";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
};

/** Opens the SMTP connection and authenticates. Used by the diagnostics endpoint. */
export async function verifySmtpConnection(): Promise<void> {
  await createTransporter().verify();
}

export async function sendContactEmails(input: ContactEmailInput): Promise<ContactEmailDelivery> {
  const user = requiredEnv("SMTP_USER");
  const transporter = createTransporter();

  await transporter.verify();

  // Keep the envelope sender tied to the authenticated mailbox. Many cPanel
  // servers reject or silently discard messages that spoof another sender.
  const envelopeFrom = user;
  const fromAddress = process.env["SMTP_FROM"]?.trim() || user;
  const from = input.fromName ? `"${input.fromName.replace(/"/g, "")}" <${fromAddress}>` : fromAddress;

  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message);

  const notification = await transporter.sendMail({
    from,
    to: input.notifyTo,
    envelope: { from: envelopeFrom, to: input.notifyTo },
    replyTo: input.email,
    subject: `New contact message from ${input.name}`.slice(0, 200),
    text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    html: `
      <h2 style="font-family:sans-serif">New contact message</h2>
      <p style="font-family:sans-serif"><strong>Name:</strong> ${safeName}<br/>
      <strong>Email:</strong> ${safeEmail}</p>
      <p style="font-family:sans-serif;white-space:pre-wrap">${safeMessage}</p>`,
  });

  const confirmation = await transporter.sendMail({
    from,
    to: input.email,
    envelope: { from: envelopeFrom, to: input.email },
    subject: "We received your message — AmmarAI",
    text: `Hi ${input.name},\n\nThanks for reaching out. We've received your message and will get back to you shortly.\n\n— The AmmarAI Team`,
    html: `
      <p style="font-family:sans-serif">Hi ${safeName},</p>
      <p style="font-family:sans-serif">Thanks for reaching out. We've received your message and will get back to you shortly.</p>
      <p style="font-family:sans-serif">— The AmmarAI Team</p>`,
  });

  return {
    notification: deliveryResult(notification),
    confirmation: deliveryResult(confirmation),
  };
}
