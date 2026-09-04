import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(5000),
});

const NOTIFY_EMAIL = "support@ammarai.com";

export const Route = createFileRoute("/api/contact")({
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
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
        const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
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

        const { data: row, error: insertError } = await supabase
          .from("contact_messages")
          .insert({ name, email, message })
          .select("id")
          .single();

        if (insertError || !row) {
          console.error("Failed to store contact message", insertError);
          return Response.json(
            { error: "Something went wrong on our side. Please email support@ammarai.com directly." },
            { status: 500 },
          );
        }

        // Email delivery is best-effort: the stored row is the source of truth.
        try {
          const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
          const idemBase = `contact-${row.id}`;
          await sendTemplateEmail("contact-notification", NOTIFY_EMAIL, {
            templateData: { name, email, message },
            idempotencyKey: `${idemBase}-notify`,
          });
          const confirmation = await sendTemplateEmail("contact-confirmation", email, {
            templateData: { name },
            idempotencyKey: `${idemBase}-confirm`,
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
