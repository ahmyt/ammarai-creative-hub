import nodemailer from "nodemailer";

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

/**
 * Sends the contact-form notification and confirmation emails through the
 * deployment's own SMTP mailbox (e.g. Plesk mail). Configured via env vars:
 *   SMTP_HOST (required), SMTP_PORT (default 465), SMTP_SECURE ("true"/"false"),
 *   SMTP_USER, SMTP_PASS, SMTP_FROM (defaults to SMTP_USER).
 * Runs only on Node hosts; the edge/preview runtime never imports this file.
 */
export async function sendContactEmails(input: ContactEmailInput): Promise<void> {
  const host = process.env["SMTP_HOST"];
  if (!host) return;

  const port = Number(process.env["SMTP_PORT"] ?? "465");
  const secure = (process.env["SMTP_SECURE"] ?? String(port === 465)) !== "false";
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    ...(user ? { auth: { user, pass: pass ?? "" } } : {}),
  });

  const fromAddress = input.fromEmail || process.env["SMTP_FROM"] || user;
  if (!fromAddress) throw new Error("SMTP_FROM (or SMTP_USER) is not configured");
  const from = input.fromName ? `"${input.fromName.replace(/"/g, "")}" <${fromAddress}>` : fromAddress;

  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message);

  await transporter.sendMail({
    from,
    to: input.notifyTo,
    replyTo: input.email,
    subject: `New contact message from ${input.name}`.slice(0, 200),
    text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    html: `
      <h2 style="font-family:sans-serif">New contact message</h2>
      <p style="font-family:sans-serif"><strong>Name:</strong> ${safeName}<br/>
      <strong>Email:</strong> ${safeEmail}</p>
      <p style="font-family:sans-serif;white-space:pre-wrap">${safeMessage}</p>`,
  });

  await transporter.sendMail({
    from,
    to: input.email,
    subject: "We received your message — AmmarAI",
    text: `Hi ${input.name},\n\nThanks for reaching out. We've received your message and will get back to you shortly.\n\n— The AmmarAI Team`,
    html: `
      <p style="font-family:sans-serif">Hi ${safeName},</p>
      <p style="font-family:sans-serif">Thanks for reaching out. We've received your message and will get back to you shortly.</p>
      <p style="font-family:sans-serif">— The AmmarAI Team</p>`,
  });
}
