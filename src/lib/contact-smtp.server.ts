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
  confirmation:
    { status: "sent"; messageId: string; response: string } | { status: "failed"; error: unknown };
};

const envValue = (name: string): string | undefined => {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  const first = raw.at(0);
  const last = raw.at(-1);
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return raw.slice(1, -1).trim() || undefined;
  }
  return raw;
};

const requiredEnv = (name: "SMTP_HOST" | "SMTP_USER" | "SMTP_PASS"): string => {
  const value = envValue(name);
  if (!value) throw new Error(`${name} is not configured`);
  return value;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  authDisabled: boolean;
  user: string;
};

export type SmtpDiagnostic = Pick<SmtpConfig, "host" | "port" | "secure"> & {
  authEnabled: boolean;
};

const getSmtpConfig = (): SmtpConfig => {
  const host = requiredEnv("SMTP_HOST").toLowerCase().replace(/\.$/, "");
  const port = Number(envValue("SMTP_PORT") ?? "465");
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number");
  }

  const isLoopback =
    host === "127.0.0.1" || host === "localhost" || host === "::1" || host === "[::1]";
  // Local port 25 is a trusted same-server handoff. Never attempt SMTP AUTH
  // here: Plesk commonly rejects AUTH on its loopback listener with a 454.
  // Every remote host and every other port still requires credentials.
  const authDisabled = isLoopback && port === 25;
  const configuredSecure = envValue("SMTP_SECURE")?.toLowerCase();
  const secure = authDisabled
    ? false
    : configuredSecure === undefined
      ? port === 465
      : configuredSecure === "true";
  const user = authDisabled
    ? (envValue("SMTP_USER") ?? "support@ammarai.com")
    : requiredEnv("SMTP_USER");

  return { host, port, secure, authDisabled, user };
};

export const getSmtpDiagnostic = (): SmtpDiagnostic => {
  const config = getSmtpConfig();
  return {
    host: config.host,
    port: config.port,
    secure: config.secure,
    authEnabled: !config.authDisabled,
  };
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
  const config = getSmtpConfig();
  // When the mail server is on the same machine (loopback), its TLS
  // certificate is issued for the public hostname, not 127.0.0.1. The
  // connection never leaves the server, so skipping the hostname check is
  // safe. SMTP_TLS_REJECT_UNAUTHORIZED=false forces the same for any host.
  const isLoopback =
    config.host === "127.0.0.1" ||
    config.host === "localhost" ||
    config.host === "::1" ||
    config.host === "[::1]";
  const allowAnyCert =
    isLoopback || envValue("SMTP_TLS_REJECT_UNAUTHORIZED")?.toLowerCase() === "false";

  const auth = config.authDisabled
    ? undefined
    : { user: config.user, pass: requiredEnv("SMTP_PASS") };

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    ...(auth ? { auth } : {}),
    ...(allowAnyCert ? { tls: { rejectUnauthorized: false } } : {}),
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return { transporter, config };
};

/** Opens the SMTP connection and authenticates. Used by the diagnostics endpoint. */
export async function verifySmtpConnection(): Promise<SmtpDiagnostic> {
  const { transporter, config } = createTransporter();
  await transporter.verify();
  return { ...getSmtpDiagnostic(), authEnabled: !config.authDisabled };
}

export async function sendContactEmails(input: ContactEmailInput): Promise<ContactEmailDelivery> {
  const { transporter, config } = createTransporter();

  await transporter.verify();

  // Keep the envelope sender tied to the configured local mailbox. Mail
  // servers often reject or silently discard messages that spoof a sender.
  const envelopeFrom = config.user;
  const fromAddress = envValue("SMTP_FROM") ?? config.user;
  const from = input.fromName
    ? `"${input.fromName.replace(/"/g, "")}" <${fromAddress}>`
    : fromAddress;

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

  // The customer confirmation is best-effort: a rejection (e.g. the sending
  // IP is temporarily blocklisted) must not fail the whole submission. The
  // notification to the team above still throws on failure.
  let confirmation: ContactEmailDelivery["confirmation"];
  try {
    const info = await transporter.sendMail({
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
    confirmation = { status: "sent", ...deliveryResult(info) };
  } catch (error) {
    confirmation = { status: "failed", error };
  }

  return {
    notification: deliveryResult(notification),
    confirmation,
  };
}
