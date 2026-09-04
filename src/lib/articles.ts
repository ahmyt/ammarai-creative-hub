import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SyndicatedArticle {
  id: string;
  slug: string;
  title: string;
  content_html: string | null;
  content_markdown: string | null;
  meta_description: string | null;
  hero_image_url: string | null;
  json_ld: unknown;
  faq_json_ld: unknown;
  language_code: string;
  published_at: string | null;
  synced_at: string;
  is_hidden: boolean;
}

const COLUMNS =
  "id, slug, title, content_html, content_markdown, meta_description, hero_image_url, json_ld, faq_json_ld, language_code, published_at, synced_at, is_hidden";

export async function fetchSyndicatedArticles(): Promise<SyndicatedArticle[]> {
  const { data, error } = await supabase
    .from("syndicated_articles")
    .select(COLUMNS)
    .eq("language_code", "en")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("Failed to load syndicated articles", error.message);
    return [];
  }
  return (data ?? []) as unknown as SyndicatedArticle[];
}

export const syndicatedArticlesQuery = queryOptions({
  queryKey: ["syndicated-articles"],
  queryFn: fetchSyndicatedArticles,
  staleTime: 60_000,
});

/** Admin view: includes hidden articles and every language. */
export const allSyndicatedArticlesQuery = queryOptions({
  queryKey: ["syndicated-articles", "all"],
  queryFn: async (): Promise<SyndicatedArticle[]> => {
    const { data, error } = await supabase
      .from("syndicated_articles")
      .select(COLUMNS)
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as SyndicatedArticle[];
  },
  staleTime: 0,
});

export function articleDate(article: SyndicatedArticle): string {
  const value = article.published_at ?? article.synced_at;
  return value.slice(0, 10);
}

export function articleExcerpt(article: SyndicatedArticle): string {
  return article.meta_description ?? "";
}
