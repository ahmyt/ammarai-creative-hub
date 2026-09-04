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

/**
 * Content-aware category derived from the article's title, description and
 * body. Falls back to "AI Guides" when nothing matches.
 */
const CATEGORY_KEYWORDS: [string, string[]][] = [
  ["AI SEO", ["seo", "search engine", "ranking", "rank on google", "serp", "backlink", "keyword research", "organic traffic", "meta description", "schema markup"]],
  ["AI Marketing", ["marketing", "campaign", "conversion", "advertising", "ads", "funnel", "branding", "copy that converts", "lead generation", "email campaign"]],
  ["AI Writing", ["writing", "copywriting", "blog post", "content writing", "storytelling", "essay", "article writing", "headline"]],
  ["AI Video", ["video", "animation", "lip-sync", "footage", "thumbnail"]],
  ["AI Voice", ["voice", "voiceover", "text to speech", "tts", "narration", "dubbing"]],
  ["AI Audio", ["audio", "podcast", "music", "sound", "transcription", "speech to text"]],
  ["AI Social Media", ["instagram", "tiktok", "social media", "linkedin", "twitter", "x post", "caption", "hashtag", "followers"]],
  ["AI Business", ["business", "startup", "entrepreneur", "sales", "revenue", "growth strategy", "productivity", "workflow"]],
  ["AI E-commerce", ["e-commerce", "ecommerce", "shopify", "product description", "online store", "checkout"]],
  ["AI Image", ["image generation", "image generator", "photo", "illustration", "art", "design"]],
];

export function articleCategory(article: SyndicatedArticle): string {
  const title = (article.title ?? "").toLowerCase();
  const description = (article.meta_description ?? "").toLowerCase();
  const bodySource = article.content_markdown ?? article.content_html ?? "";
  const body = bodySource
    .replace(/<[^>]+>/g, " ")
    .toLowerCase()
    .slice(0, 3000);

  let best: string | null = null;
  let bestScore = 0;
  for (const [category, keywords] of CATEGORY_KEYWORDS) {
    let score = 0;
    for (const keyword of keywords) {
      if (title.includes(keyword)) score += 5;
      if (description.includes(keyword)) score += 3;
      if (body.includes(keyword)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = category;
    }
  }
  return best ?? "AI Guides";
}

/** Rough reading time based on the article body, e.g. "8 min read". */
export function articleReadingTime(article: SyndicatedArticle): string {
  const source = article.content_markdown ?? article.content_html ?? "";
  const text = source
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~[\]()!-]/g, " ")
    .trim();
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
