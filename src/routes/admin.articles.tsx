import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { allSyndicatedArticlesQuery, articleDate } from "@/lib/articles";
import {
  getSyncSettings,
  setSyncInterval,
  syncBabyLoveGrowthArticles,
} from "@/lib/babylovegrowth.functions";

const INTERVAL_OPTIONS = [1, 6, 12, 24, 48, 72] as const;

function intervalLabel(hours: number): string {
  return hours === 1 ? "Every hour" : `Every ${hours} hours`;
}

export const Route = createFileRoute("/admin/articles")({
  staticData: { sitemap: false },
  component: AdminArticles,
});

const PAGE_SIZE = 20;

function AdminArticles() {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | null>(null);

  const { data: articles = [], isLoading } = useQuery({
    ...allSyndicatedArticlesQuery,
    enabled: isAdmin,
  });

  const runSync = useServerFn(syncBabyLoveGrowthArticles);
  const sync = useMutation({
    mutationFn: () => runSync({ data: undefined } as never),
    onSuccess: (result) => {
      setStatus(
        `Synced ${result.upserted} of ${result.fetched} articles${
          result.errors.length ? ` · ${result.errors.length} failed` : ""
        }`,
      );
      void queryClient.invalidateQueries({ queryKey: ["syndicated-articles"] });
    },
    onError: (error: Error) => setStatus(error.message),
  });

  const toggleHidden = useMutation({
    mutationFn: async ({ id, hidden }: { id: string; hidden: boolean }) => {
      const { error } = await supabase
        .from("syndicated_articles")
        .update({ is_hidden: hidden } as never)
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["syndicated-articles"] }),
    onError: (error: Error) => setStatus(error.message),
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) => a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q),
    );
  }, [articles, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  if (!isAdmin) {
    return <p className="text-sm text-muted-foreground">Only admins can manage synced articles.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Synced articles</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Articles pulled in automatically and published on the blog.
          </p>
        </div>
        <button
          type="button"
          onClick={() => sync.mutate()}
          disabled={sync.isPending}
          className="rounded-md bg-ink px-4 py-2 text-xs font-semibold text-ink-foreground disabled:opacity-60"
        >
          {sync.isPending ? "Syncing…" : "Sync now"}
        </button>
      </div>

      {status ? <p className="mt-3 text-sm text-muted-foreground">{status}</p> : null}

      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setPage(1);
        }}
        placeholder="Search by title or slug"
        className="mt-5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />

      {isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading articles…</p>
      ) : visible.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No articles yet. Run a sync to fetch them.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {visible.map((article) => (
            <li
              key={article.id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-xl bg-card p-4 ring-1 ring-border"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold">{article.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  /blog/{article.slug} · {articleDate(article)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
                    article.is_hidden
                      ? "bg-muted text-muted-foreground ring-border"
                      : "bg-accent/10 text-accent ring-accent/30"
                  }`}
                >
                  {article.is_hidden ? "Hidden" : "Published"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    toggleHidden.mutate({ id: article.id, hidden: !article.is_hidden })
                  }
                  className="rounded-md px-3 py-1.5 text-xs font-semibold ring-1 ring-border hover:bg-background"
                >
                  {article.is_hidden ? "Publish" : "Hide"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {pages > 1 ? (
        <div className="mt-6 flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="rounded-md px-3 py-1.5 font-semibold ring-1 ring-border disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-muted-foreground">
            Page {current} of {pages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={current === pages}
            className="rounded-md px-3 py-1.5 font-semibold ring-1 ring-border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
