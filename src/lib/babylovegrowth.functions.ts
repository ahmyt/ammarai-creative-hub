import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SETTINGS_ID = "babylovegrowth";

type AdminContext = {
  supabase: {
    rpc: (
      fn: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: { message: string } | null }>;
    from: (table: string) => unknown;
  };
  userId: string;
};

async function requireAdmin(context: AdminContext) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
  return context.supabase;
}

export const syncBabyLoveGrowthArticles = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context as unknown as AdminContext);
    const { syncArticles } = await import("@/lib/babylovegrowth.server");
    return syncArticles();
  });

export const getSyncSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabase = await requireAdmin(context as unknown as AdminContext);
    const query = supabase.from("sync_settings") as {
      select: (cols: string) => {
        eq: (
          col: string,
          val: string,
        ) => { maybeSingle: () => Promise<{ data: unknown; error: { message: string } | null }> };
      };
    };
    const { data, error } = await query
      .select("interval_hours, last_run_at")
      .eq("id", SETTINGS_ID)
      .maybeSingle();
    if (error) throw new Error(error.message);
    const row = data as { interval_hours: number; last_run_at: string | null } | null;
    return { intervalHours: row?.interval_hours ?? 24, lastRunAt: row?.last_run_at ?? null };
  });

export const setSyncInterval = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ intervalHours: z.number().int().min(1).max(720) }).parse(data),
  )
  .handler(async ({ context, data }) => {
    const supabase = await requireAdmin(context as unknown as AdminContext);
    const table = supabase.from("sync_settings") as {
      update: (row: Record<string, unknown>) => {
        eq: (col: string, val: string) => Promise<{ error: { message: string } | null }>;
      };
    };
    const { error } = await table
      .update({ interval_hours: data.intervalHours, updated_at: new Date().toISOString() })
      .eq("id", SETTINGS_ID);
    if (error) throw new Error(error.message);
    return { intervalHours: data.intervalHours };
  });
