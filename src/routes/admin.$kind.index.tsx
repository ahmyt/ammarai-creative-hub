import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { contentKinds, contentRowsQuery, staticItems, type ContentKind } from "@/lib/content";
import { titleOf } from "@/lib/cms-fields";

export const Route = createFileRoute("/admin/$kind/")({
  loader: ({ params }) => {
    const meta = contentKinds.find((k) => k.kind === params.kind);
    if (!meta) throw notFound();
    return { meta };
  },
  component: KindList,
});

function KindList() {
  const { kind } = Route.useParams();
  const { meta } = Route.useLoaderData();
  const typedKind = kind as ContentKind;
  const queryClient = useQueryClient();
  const { data: rows = [] } = useQuery(contentRowsQuery);
  const [filter, setFilter] = useState("");

  const items = useMemo(() => {
    const base = staticItems(typedKind);
    const baseSlugs = new Set(base.map((b) => b["slug"] as string));
    const relevant = rows.filter((r) => r.kind === typedKind);
    const rowBySlug = new Map(relevant.map((r) => [r.slug, r]));
    const created = relevant
      .filter((r) => !baseSlugs.has(r.slug))
      .map((r) => ({ item: { ...r.data, slug: r.slug }, row: r, source: "custom" as const }));
    const existing = base.map((item) => ({
      item: { ...item, ...(rowBySlug.get(item["slug"] as string)?.data ?? {}) },
      row: rowBySlug.get(item["slug"] as string),
      source: "built-in" as const,
    }));
    return [...created, ...existing].filter((entry) =>
      `${titleOf(entry.item)} ${entry.item["slug"]}`.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [rows, typedKind, filter]);

  const toggleHidden = async (slug: string, next: boolean, data: Record<string, unknown>) => {
    await supabase
      .from("content")
      .upsert({ kind: typedKind, slug, data: data as never, is_hidden: next }, {
        onConflict: "kind,slug",
      });
    await queryClient.invalidateQueries();
  };

  const reset = async (slug: string) => {
    await supabase.from("content").delete().eq("kind", typedKind).eq("slug", slug);
    await queryClient.invalidateQueries();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl">{meta.label}</h2>
        <div className="flex gap-2">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter…"
            className="rounded-md bg-card px-3 py-2 text-sm ring-1 ring-border"
          />
          <Link
            to="/admin/$kind/$slug"
            params={{ kind, slug: "new" }}
            className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground"
          >
            New {meta.singular.toLowerCase()}
          </Link>
        </div>
      </div>

      <div className="mt-6 divide-y divide-border rounded-xl bg-card ring-1 ring-border">
        {items.map(({ item, row, source }) => {
          const slug = item["slug"] as string;
          return (
            <div key={slug} className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{titleOf(item)}</p>
                <p className="truncate text-xs text-muted-foreground">
                  /{slug} · {source}
                  {row?.is_hidden ? " · hidden" : ""}
                  {row && !row.is_hidden && source === "built-in" ? " · edited" : ""}
                </p>
              </div>
              <Link
                to="/admin/$kind/$slug"
                params={{ kind, slug }}
                className="rounded-md px-3 py-1.5 text-xs font-semibold ring-1 ring-border hover:bg-background"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => void toggleHidden(slug, !row?.is_hidden, item)}
                className="rounded-md px-3 py-1.5 text-xs font-semibold ring-1 ring-border hover:bg-background"
              >
                {row?.is_hidden ? "Show" : "Hide"}
              </button>
              {row ? (
                <button
                  type="button"
                  onClick={() => void reset(slug)}
                  className="rounded-md px-3 py-1.5 text-xs font-semibold text-destructive ring-1 ring-border hover:bg-background"
                >
                  {source === "custom" ? "Delete" : "Reset"}
                </button>
              ) : null}
            </div>
          );
        })}
        {items.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">Nothing here yet.</p>
        ) : null}
      </div>
    </div>
  );
}
