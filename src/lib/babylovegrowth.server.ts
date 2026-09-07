// Server-only: syncs BabyLoveGrowth articles into our own database so that
// public pages never call their rate-limited API.
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SITE } from "@/lib/site";

// BabyLoveGrowth baked absolute URLs into article HTML while the site lived on
// Lovable-hosted domains. Rewrite those origins to the production domain on
// every sync so internal links always point at the live site.
const LEGACY_ORIGINS = [
  "https://ammarai-creative-hub.lovable.app",
  "https://id-preview--ab4a5e87-30cb-4379-b661-4f70b8317377.lovable.app",
];

function rewriteLegacyOrigins(text: string | null): string | null {
  if (!text) return text;
  let result = text;
  for (const origin of LEGACY_ORIGINS) {
    result = result.split(origin).join(SITE.url);
  }
  return result;
}

const BASE_URL = "https://api.babylovegrowth.ai/api/integrations";
const PAGE_SIZE = 50;
const MAX_PAGES = 20;

const summarySchema = z.object({
  id: z.union([z.string(), z.number()]),
  slug: z.string().min(1),
  title: z.string().min(1).optional(),
  languageCode: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

const articleSchema = summarySchema.extend({
  content_html: z.string().optional().nullable(),
  content_markdown: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  hero_image_url: z.string().optional().nullable(),
  jsonLd: z.unknown().optional(),
  faqJsonLd: z.unknown().optional(),
  publishedAt: z.string().optional().nullable(),
});

type ArticleSummary = z.infer<typeof summarySchema>;
type Article = z.infer<typeof articleSchema>;

function apiKey(): string {
  const key = process.env["BABYLOVEGROWTH_API_KEY"];
  if (!key) throw new Error("Missing BABYLOVEGROWTH_API_KEY");
  return key;
}

async function apiGet(path: string): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "X-API-Key": apiKey(), "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`BabyLoveGrowth ${path} failed with ${response.status}`);
  }
  return response.json();
}

function cleanHtml(html: string | null | undefined): string | null {
  if (!html) return null;
  return sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "figure",
      "figcaption",
      "h1",
      "h2",
      "iframe",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "loading", "width", "height"],
      iframe: ["src", "title", "allow", "allowfullscreen", "loading"],
      "*": ["id"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
    },
  });
}

function asJson(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
}

export async function listArticles(limit = PAGE_SIZE, offset = 0): Promise<ArticleSummary[]> {
  const payload = await apiGet(`/v1/articles?limit=${limit}&offset=${offset}`);
  const raw = Array.isArray(payload)
    ? payload
    : ((payload as { articles?: unknown[]; data?: unknown[] }).articles ??
      (payload as { data?: unknown[] }).data ??
      []);
  return z.array(summarySchema).parse(raw);
}

export async function getArticle(id: string | number): Promise<Article> {
  const payload = await apiGet(`/v1/articles/${id}`);
  const raw =
    payload && typeof payload === "object" && "article" in (payload as Record<string, unknown>)
      ? (payload as { article: unknown }).article
      : payload;
  return articleSchema.parse(raw);
}

export interface SyncResult {
  fetched: number;
  upserted: number;
  errors: string[];
}

export async function syncArticles(
  supabase: SupabaseClient<Database>,
): Promise<SyncResult> {
  const result: SyncResult = { fetched: 0, upserted: 0, errors: [] };

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const summaries = await listArticles(PAGE_SIZE, page * PAGE_SIZE);
    result.fetched += summaries.length;

    for (const summary of summaries) {
      try {
        const article = await getArticle(summary.id);
        const row = {
          slug: article.slug,
          external_id: String(article.id),
          title: article.title ?? article.slug,
          content_html: cleanHtml(article.content_html),
          content_markdown: article.content_markdown ?? null,
          meta_description: article.meta_description ?? null,
          hero_image_url: article.hero_image_url ?? null,
          json_ld: asJson(article.jsonLd),
          faq_json_ld: asJson(article.faqJsonLd),
          language_code: article.languageCode ?? "en",
          published_at: article.publishedAt ?? article.created_at ?? null,
          synced_at: new Date().toISOString(),
        };
        const { error } = await supabase
          .from("syndicated_articles")
          .upsert(row as never, { onConflict: "slug" });
        if (error) {
          result.errors.push(`${article.slug}: ${error.message}`);
        } else {
          result.upserted += 1;
        }
      } catch (error) {
        result.errors.push(
          `${summary.slug}: ${error instanceof Error ? error.message : "unknown error"}`,
        );
      }
    }

    if (summaries.length < PAGE_SIZE) break;
  }

  return result;
}
