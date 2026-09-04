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

export const Route = createFileRoute("/api/contact")({
  staticData: { sitemap: false },
  server: {
    handlers: {
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
        const url = process.env["SUPABASE_URL"] ?? import.meta.env.VITE_SUPABASE_URL;
        const key =
          process.env["SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
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

        // Email delivery is best-effort: the stored row is the source of truth.
        try {
          // Created by the email template scaffolding once a sender domain is set up.
          // Resolved at runtime so the app builds before that step is done.
          const specifier = "@/lib/email-templates/send-email";
          const mod = (await import(/* @vite-ignore */ specifier)) as {
            sendTemplateEmail: (
              template: string,
              to: string,
              opts: Record<string, unknown>,
            ) => Promise<{ sent: boolean; reason?: string }>;
          };
          const idemBase = `contact-${messageId}`;
          await mod.sendTemplateEmail("contact-notification", notifyTo, {
            templateData: { name, email, message },
            idempotencyKey: `${idemBase}-notify`,
            ...sendOptions,
          });
          const confirmation = await mod.sendTemplateEmail("contact-confirmation", email, {
            templateData: { name },
            idempotencyKey: `${idemBase}-confirm`,
            ...sendOptions,
          });
          if (!confirmation.sent) {
            console.log(`Contact confirmation not sent (${confirmation.reason})`);
          }
        } catch (emailError) {
          console.error("Contact email delivery failed", emailError);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
