import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

const SETTINGS_ID = "babylovegrowth";

async function authenticate(request: Request): Promise<Response | null> {
  const platform = await authenticateCronRequest(request);
  if (!platform) return null;

  // Fall back to the database-held token used by the pg_cron schedule.
  const match = /^Bearer ([^\s,]+)$/.exec(request.headers.get("authorization") ?? "");
  const token = match?.[1];
  if (!token) return platform;

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("sync_cron_tokens")
    .select("token")
    .eq("id", SETTINGS_ID)
    .maybeSingle();
  if (error || !data) return platform;

  const { createHash, timingSafeEqual } = await import("node:crypto");
  const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();
  const known = String((data as { token: string }).token);
  if (known.length !== token.length || !timingSafeEqual(digest(token), digest(known))) {
    return platform;
  }
  return null;
}

export const Route = createFileRoute("/api/public/cron/babylovegrowth")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = await authenticate(request);
        if (unauthorized) return unauthorized;

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          // Honour the admin-chosen interval: skip if the last run is still fresh.
          const { data: settings } = await supabaseAdmin
            .from("sync_settings")
            .select("interval_hours, last_run_at")
            .eq("id", SETTINGS_ID)
            .maybeSingle();
          const row = settings as { interval_hours: number; last_run_at: string | null } | null;
          const intervalHours = row?.interval_hours ?? 24;
          if (row?.last_run_at) {
            const nextDue = new Date(row.last_run_at).getTime() + intervalHours * 3_600_000;
            if (Date.now() < nextDue) {
              return Response.json({ ok: true, skipped: true, intervalHours });
            }
          }

          const { syncArticles } = await import("@/lib/babylovegrowth.server");
          const result = await syncArticles();

          await supabaseAdmin
            .from("sync_settings")
            .update({ last_run_at: new Date().toISOString() } as never)
            .eq("id", SETTINGS_ID);

          return Response.json({ ok: true, skipped: false, ...result });
        } catch (error) {
          console.error("[babylovegrowth] sync failed", error);
          return Response.json(
            { ok: false, error: error instanceof Error ? error.message : "Sync failed" },
            { status: 500 },
          );
        }
      },
    },
  },
});
