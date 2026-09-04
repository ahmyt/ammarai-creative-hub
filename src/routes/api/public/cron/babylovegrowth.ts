import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

export const Route = createFileRoute("/api/public/cron/babylovegrowth")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = await authenticateCronRequest(request);
        if (unauthorized) return unauthorized;

        try {
          const { syncArticles } = await import("@/lib/babylovegrowth.server");
          const result = await syncArticles();
          return Response.json({ ok: true, ...result });
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
