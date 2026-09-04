import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin/messages")({
  staticData: { sitemap: false },
  component: AdminMessages,
});

const STATUS_STYLES: Record<string, string> = {
  sent: "bg-accent/10 text-accent ring-accent/30",
  failed: "bg-destructive/10 text-destructive ring-destructive/30",
  not_sent: "bg-muted text-muted-foreground ring-border",
};

const STATUS_LABELS: Record<string, string> = {
  sent: "Accepted by mail server",
  failed: "Confirmation failed",
  not_sent: "No confirmation attempted",
};

function AdminMessages() {
  const { isAdmin } = useAuth();
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["contact-messages"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select(
          "id, name, email, message, created_at, confirmation_status, confirmation_message_id, confirmation_response, confirmation_attempted_at, confirmation_error",
        )
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
          shows what happened when the visitor's confirmation email was handed to the mail server.
          "Accepted by mail server" means the mail server took the message — use the reference below
          to trace the rest of the journey in the mail log.
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
              {m.confirmation_attempted_at ||
              m.confirmation_message_id ||
              m.confirmation_response ||
              m.confirmation_error ? (
                <dl className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                  {m.confirmation_attempted_at ? (
                    <div className="flex flex-wrap gap-2">
                      <dt className="font-semibold text-foreground">Attempted</dt>
                      <dd>{new Date(m.confirmation_attempted_at).toLocaleString()}</dd>
                    </div>
                  ) : null}
                  {m.confirmation_message_id ? (
                    <div className="flex flex-wrap gap-2">
                      <dt className="font-semibold text-foreground">Reference</dt>
                      <dd className="break-all">{m.confirmation_message_id}</dd>
                    </div>
                  ) : null}
                  {m.confirmation_response ? (
                    <div className="flex flex-wrap gap-2">
                      <dt className="font-semibold text-foreground">Mail server reply</dt>
                      <dd className="break-all">{m.confirmation_response}</dd>
                    </div>
                  ) : null}
                  {m.confirmation_error ? (
                    <div className="flex flex-wrap gap-2">
                      <dt className="font-semibold text-destructive">Problem</dt>
                      <dd className="break-all">{m.confirmation_error}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </li>
          ))}

        </ul>
      )}
    </div>
  );
}
