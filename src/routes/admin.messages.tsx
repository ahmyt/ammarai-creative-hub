import { useMemo, useState } from "react";
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
  not_sent: "No delivery recorded (old build)",
};

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

function AdminMessages() {
  const { isAdmin } = useAuth();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(20);

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(
      (m) =>
        m.email.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q),
    );
  }, [messages, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const onSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const onPageSizeChange = (value: (typeof PAGE_SIZE_OPTIONS)[number]) => {
    setPageSize(value);
    setPage(1);
  };

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

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by email, name, or message…"
            className="w-full rounded-md border border-border bg-card py-2 pl-3 pr-3 text-sm text-foreground outline-none ring-accent placeholder:text-muted-foreground focus:ring-2"
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Per page
          <select
            value={pageSize}
            onChange={(e) =>
              onPageSizeChange(Number(e.target.value) as (typeof PAGE_SIZE_OPTIONS)[number])
            }
            className="rounded-md border border-border bg-card px-2 py-1.5 text-sm text-foreground"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading messages…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {query ? "No messages match your search." : "No messages yet."}
        </p>
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            Showing {pageItems.length} of {filtered.length}
            {query ? ` matching` : ""} messages.
          </p>
          <ul className="space-y-3">
            {pageItems.map((m) => (
              <li key={m.id} className="rounded-xl bg-card p-5 ring-1 ring-border">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {m.name} <span className="font-normal text-muted-foreground"><{m.email}></span>
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

          {totalPages > 1 ? (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition hover:bg-secondary disabled:opacity-50"
              >
                ← Previous
              </button>
              <span className="text-xs text-muted-foreground">
                Page {safePage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition hover:bg-secondary disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
