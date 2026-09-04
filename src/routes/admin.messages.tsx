import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin/messages")({
  staticData: { sitemap: false },
  component: AdminMessages,
});

const STATUS_STYLES: Record<string, string> = {
  sent: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20",
  failed: "bg-red-500/10 text-red-700 ring-red-600/20",
  not_sent: "bg-muted text-muted-foreground ring-border",
};

const STATUS_LABELS: Record<string, string> = {
  sent: "Confirmation sent",
  failed: "Confirmation failed",
  not_sent: "No confirmation",
};

function AdminMessages() {
  const { isAdmin } = useAuth();
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["contact-messages"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id, name, email, message, created_at, confirmation_status")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data;
    },
  });

  if (!isAdmin) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Contact messages</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every contact-form submission is stored here, even when email delivery fails. The badge
          shows whether the visitor's confirmation email was delivered.
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading messages…</p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id} className="rounded-xl bg-card p-5 ring-1 ring-border">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {m.name} <span className="font-normal text-muted-foreground">&lt;{m.email}&gt;</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                    STATUS_STYLES[m.confirmation_status] ?? STATUS_STYLES["not_sent"]
                  }`}
                >
                  {STATUS_LABELS[m.confirmation_status] ?? m.confirmation_status}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
