import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Feature, Page, Post, Tool, UseCase } from "@/data/types";
import { tools as staticTools } from "@/data/tools";
import { useCases as staticUseCases } from "@/data/use-cases";
import { features as staticFeatures } from "@/data/features";
import { posts as staticPosts } from "@/data/posts";
import { pages as staticPages } from "@/data/pages";

export type ContentKind = "tool" | "use_case" | "feature" | "post" | "page";

export const contentKinds: { kind: ContentKind; label: string; singular: string }[] = [
  { kind: "tool", label: "Tools", singular: "Tool" },
  { kind: "use_case", label: "Use cases", singular: "Use case" },
  { kind: "feature", label: "Features", singular: "Feature" },
  { kind: "post", label: "Blog posts", singular: "Blog post" },
  { kind: "page", label: "Pages", singular: "Page" },
];

export interface ContentRow {
  kind: ContentKind;
  slug: string;
  data: Record<string, unknown>;
  is_hidden: boolean;
  sort_order: number;
}

export interface SiteContent {
  tools: Tool[];
  useCases: UseCase[];
  features: Feature[];
  posts: Post[];
  pages: Page[];
}

export const staticContent: SiteContent = {
  tools: staticTools,
  useCases: staticUseCases,
  features: staticFeatures,
  posts: staticPosts,
  pages: staticPages,
};

export function staticItems(kind: ContentKind): Record<string, unknown>[] {
  switch (kind) {
    case "tool":
      return staticTools as unknown as Record<string, unknown>[];
    case "use_case":
      return staticUseCases as unknown as Record<string, unknown>[];
    case "feature":
      return staticFeatures as unknown as Record<string, unknown>[];
    case "post":
      return staticPosts as unknown as Record<string, unknown>[];
    case "page":
      return staticPages as unknown as Record<string, unknown>[];
  }
}

function mergeKind<T extends { slug: string }>(
  base: readonly T[],
  rows: ContentRow[],
  kind: ContentKind,
): T[] {
  const relevant = rows.filter((r) => r.kind === kind);
  const bySlug = new Map(relevant.map((r) => [r.slug, r]));
  const baseSlugs = new Set(base.map((b) => b.slug));

  const merged: T[] = [];
  for (const item of base) {
    const row = bySlug.get(item.slug);
    if (!row) {
      merged.push(item);
      continue;
    }
    if (row.is_hidden) continue;
    merged.push({ ...item, ...(row.data as Partial<T>), slug: item.slug });
  }

  const created = relevant
    .filter((r) => !baseSlugs.has(r.slug) && !r.is_hidden)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((r) => ({ ...(r.data as T), slug: r.slug }));

  return [...created, ...merged];
}

export function mergeContent(rows: ContentRow[]): SiteContent {
  return {
    tools: mergeKind(staticTools, rows, "tool"),
    useCases: mergeKind(staticUseCases, rows, "use_case"),
    features: mergeKind(staticFeatures, rows, "feature"),
    posts: mergeKind(staticPosts, rows, "post"),
    pages: mergeKind(staticPages, rows, "page"),
  };
}

export async function fetchContentRows(): Promise<ContentRow[]> {
  const { data, error } = await supabase
    .from("content")
    .select("kind,slug,data,is_hidden,sort_order");
  if (error) {
    console.error("Failed to load CMS content", error.message);
    return [];
  }
  return (data ?? []) as unknown as ContentRow[];
}

export async function loadSiteContent(): Promise<SiteContent> {
  try {
    return mergeContent(await fetchContentRows());
  } catch (error) {
    console.error("Falling back to bundled content", error);
    return staticContent;
  }
}

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: loadSiteContent,
  staleTime: 30_000,
});

export const contentRowsQuery = queryOptions({
  queryKey: ["content-rows"],
  queryFn: fetchContentRows,
  staleTime: 0,
});
