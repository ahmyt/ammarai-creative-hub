import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(5000),
});

const DEFAULT_NOTIFY_EMAIL = "support@ammarai.com";

type EmailSettings = {
  senderDomain?: string | undefined;
  fromName?: string | undefined;
  fromEmail?: string | undefined;
  notifyEmail?: string | undefined;
};

const str = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

const safeEmailError = (error: unknown): Record<string, unknown> => {
  if (!(error instanceof Error)) return { message: "Unknown email delivery error" };
  const smtpError = error as Error & {
    code?: unknown;
    command?: unknown;
    responseCode?: unknown;
  };
  return {
    name: error.name,
    message: error.message,
    ...(typeof smtpError.code === "string" ? { code: smtpError.code } : {}),
    ...(typeof smtpError.command === "string" ? { command: smtpError.command } : {}),
    ...(typeof smtpError.responseCode === "number"
      ? { responseCode: smtpError.responseCode }
      : {}),
  };
};

export const Route = createFileRoute("/api/contact")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      // SMTP self-test: GET /api/contact verifies the configured SMTP
      // connection and returns a safe error code — no credentials or payloads.
      GET: async () => {
        if (!process.env["SMTP_HOST"]) {
          return Response.json({ smtp: "not_configured" });
        }
        try {
          const { verifySmtpConnection } = await import("@/lib/contact-smtp.server");
          await verifySmtpConnection();
          return Response.json({ smtp: "ok" });
        } catch (error) {
          return Response.json({ smtp: "failed", error: safeEmailError(error) }, { status: 502 });
        }
      },
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body" }, { status: 400 });
        }

        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Please check your name, email and message and try again." },
            { status: 400 },
          );
        }
        const { name, email, message } = parsed.data;

        // Store the message first — it must never be lost, even if email fails.
        // Fall back to the build-time VITE_* config so self-hosted deployments
        // (e.g. Plesk) work without server-only env vars. These are the public
        // publishable key and URL only — safe to ship in the bundle.
        const url = process.env["SUPABASE_URL"] ?? import.meta.env["VITE_SUPABASE_URL"];
        const key =
          process.env["SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
        if (!url || !key) {
          console.error("Contact endpoint is missing Supabase configuration");
          return Response.json(
            { error: "Something went wrong on our side. Please email support@ammarai.com directly." },
            { status: 500 },
          );
        }
        const supabase = createClient<Database>(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const h = new Headers(init?.headers);
              if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
                h.delete("Authorization");
              }
              h.set("apikey", key);
              return fetch(input, { ...init, headers: h });
            },
          },
        });

        const messageId = crypto.randomUUID();
        const { error: insertError } = await supabase
          .from("contact_messages")
          .insert({ id: messageId, name, email, message });

        if (insertError) {
          console.error("Failed to store contact message", insertError);
          return Response.json(
            { error: "Something went wrong on our side. Please email support@ammarai.com directly." },
            { status: 500 },
          );
        }

        // Sender settings are editable in the CMS (Pages → Contact).
        let settings: EmailSettings = {};
        const { data: pageRow } = await supabase
          .from("content")
          .select("data")
          .eq("kind", "page")
          .eq("slug", "contact")
          .maybeSingle();
        if (pageRow?.data && typeof pageRow.data === "object") {
          const d = pageRow.data as Record<string, unknown>;
          settings = {
            senderDomain: str(d["senderDomain"]),
            fromName: str(d["fromName"]),
            fromEmail: str(d["fromEmail"]),
            notifyEmail: str(d["notifyEmail"]),
          };
        }
        const notifyTo = settings.notifyEmail || DEFAULT_NOTIFY_EMAIL;
        const sendOptions = {
          ...(settings.senderDomain ? { senderDomain: settings.senderDomain } : {}),
          ...(settings.fromEmail
            ? { from: settings.fromName ? `${settings.fromName} <${settings.fromEmail}>` : settings.fromEmail }
            : {}),
        };

        // The stored row remains the source of truth, but delivery failures are
        // returned to the browser so it never shows a false confirmation.
        try {
          const smtpHost = process.env["SMTP_HOST"];
          if (smtpHost) {
            // Self-hosted deployments (e.g. Plesk) send through their own
            // mailbox via SMTP. Loaded dynamically so the edge/preview build,
            // which has no SMTP support, is unaffected.
            const { sendContactEmails } = await import("@/lib/contact-smtp.server");
            const delivery = await sendContactEmails({
              name,
              email,
              message,
              notifyTo,
              fromName: settings.fromName,
              fromEmail: settings.fromEmail,
            });
            console.info("Contact SMTP delivery accepted", {
              messageId,
              notificationMessageId: delivery.notification.messageId,
              notificationResponse: delivery.notification.response,
              confirmationMessageId: delivery.confirmation.messageId,
              confirmationResponse: delivery.confirmation.response,
            });
          } else {
            // Lovable-hosted delivery path, available once a sender domain is
            // set up. Resolved at runtime so the app builds before that step.
            const specifier = "@/lib/email-templates/send-email";
            const mod = (await import(/* @vite-ignore */ specifier)) as {
              sendTemplateEmail: (
                template: string,
                to: string,
                opts: Record<string, unknown>,
              ) => Promise<{ sent: boolean; reason?: string }>;
            };
            const idemBase = `contact-${messageId}`;
            const notification = await mod.sendTemplateEmail("contact-notification", notifyTo, {
              templateData: { name, email, message },
              idempotencyKey: `${idemBase}-notify`,
              ...sendOptions,
            });
            const confirmation = await mod.sendTemplateEmail("contact-confirmation", email, {
              templateData: { name },
              idempotencyKey: `${idemBase}-confirm`,
              ...sendOptions,
            });
            if (!notification.sent || !confirmation.sent) {
              throw new Error(
                `Managed email rejected: notification=${notification.reason ?? "unknown"}, confirmation=${confirmation.reason ?? "unknown"}`,
              );
            }
          }
        } catch (emailError) {
          console.error("Contact email delivery failed", {
            messageId,
            error: safeEmailError(emailError),
          });
          return Response.json(
            {
              saved: true,
              emailSent: false,
              error:
                "Your message was saved, but email delivery failed. Our team can still view it in the CMS.",
            },
            { status: 502 },
          );
        }

        return Response.json({ ok: true, saved: true, emailSent: true });
      },
    },
  },
});
