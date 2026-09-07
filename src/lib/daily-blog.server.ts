// Server-only: writes one SEO blog post per day about an AmmarAI tool using the
// Lovable AI gateway, then stores it alongside the synced articles.
import sanitizeHtml from "sanitize-html";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { tools } from "@/data/tools";
import { SITE } from "@/lib/site";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

export interface DailyBlogResult {
  slug: string;
  title: string;
  toolSlug: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Pick the tool that has gone the longest without a generated post. */
async function pickTool(supabase: SupabaseClient<Database>) {
  const { data } = await supabase
    .from("syndicated_articles")
    .select("external_id, published_at")
    .like("external_id", "daily:%")
    .order("published_at", { ascending: false });

  const used: string[] = ((data ?? []) as { external_id: string | null }[])
    .map((row) => (row.external_id ?? "").replace(/^daily:/, ""))
    .filter(Boolean);
  const usedSet = new Set(used);

  const fresh = tools.filter((tool) => !usedSet.has(tool.slug));
  if (fresh.length > 0) {
    return fresh[Math.floor(Math.random() * fresh.length)]!;
  }
  // Everything covered: reuse the least-recently written-about tool.
  const oldestFirst = [...used].reverse();
  for (const slug of oldestFirst) {
    const tool = tools.find((t) => t.slug === slug);
    if (tool) return tool;
  }
  return tools[0]!;
}

interface GeneratedPost {
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  faqs: { question: string; answer: string }[];
}

async function generate(toolName: string, prompt: string): Promise<GeneratedPost> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const response = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a senior SEO content writer for AmmarAI, an all-in-one AI creation platform. " +
            "Write practical, specific, non-hyped articles for marketers and creators. " +
            "Reply with JSON only, no markdown fences.",
        },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "blog_post",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["title", "metaDescription", "intro", "sections", "faqs"],
            properties: {
              title: { type: "string" },
              metaDescription: { type: "string" },
              intro: { type: "string" },
              sections: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["heading", "paragraphs", "bullets"],
                  properties: {
                    heading: { type: "string" },
                    paragraphs: { type: "array", items: { type: "string" } },
                    bullets: { type: "array", items: { type: "string" } },
                  },
                },
              },
              faqs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["question", "answer"],
                  properties: { question: { type: "string" }, answer: { type: "string" } },
                },
              },
            },
          },
        },
      },
    }),
  });

  if (response.status === 429) throw new Error("AI rate limit reached, try again later");
  if (response.status === 402) throw new Error("AI credits exhausted");
  if (!response.ok) {
    throw new Error(`AI gateway failed (${response.status}) writing about ${toolName}`);
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content ?? "";
  const cleaned = content.replace(/^```(?:json)?|```$/g, "").trim();
  return JSON.parse(cleaned) as GeneratedPost;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHtml(post: GeneratedPost): string {
  const parts: string[] = [`<p>${escapeHtml(post.intro)}</p>`];
  for (const section of post.sections) {
    parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
    for (const paragraph of section.paragraphs) parts.push(`<p>${escapeHtml(paragraph)}</p>`);
    if (section.bullets?.length) {
      parts.push(
        `<ul>${section.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`,
      );
    }
  }
  if (post.faqs.length) {
    parts.push(`<h2>Frequently asked questions</h2>`);
    for (const faq of post.faqs) {
      parts.push(`<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`);
    }
  }
  return sanitizeHtml(parts.join("\n"), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h2", "h3"],
    allowedAttributes: { a: ["href", "rel", "target"] },
  });
}

export async function writeDailyPost(
  supabase: SupabaseClient<Database>,
): Promise<DailyBlogResult> {
  const tool = await pickTool(supabase);

  const prompt = [
    `Write a 1,100-1,400 word SEO blog post about AmmarAI's "${tool.name}" tool.`,
    `Tool summary: ${tool.summary}`,
    `Primary keyword: ${tool.name.toLowerCase()}. Search intent: people looking for how to do this with AI.`,
    `Structure: an engaging intro (2-3 sentences), 5-7 sections with H2 headings, short paragraphs,`,
    `at least two sections with practical bullet lists, and 5 frequently asked questions with 2-4 sentence answers.`,
    `Mention AmmarAI naturally and reference the tool page at ${SITE.url}/${tool.slug}.`,
    `Do not invent statistics, prices, customer names or guarantees. No emojis.`,
    `The title must be under 60 characters and include the primary keyword.`,
    `The metaDescription must be under 155 characters.`,
  ].join(" ");

  const post = await generate(tool.name, prompt);

  const baseSlug = slugify(post.title) || `${tool.slug}-guide`;
  let slug = baseSlug;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { data: existing } = await supabase
      .from("syndicated_articles")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${attempt + 2}`;
  }

  const faqJsonLd = post.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const now = new Date().toISOString();
  const row = {
    slug,
    external_id: `daily:${tool.slug}`,
    title: post.title,
    content_html: buildHtml(post),
    content_markdown: null,
    meta_description: post.metaDescription,
    hero_image_url: null,
    json_ld: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      datePublished: now,
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@type": "Organization", name: SITE.name },
    },
    faq_json_ld: faqJsonLd,
    language_code: "en",
    published_at: now,
    synced_at: now,
    is_hidden: false,
  };

  const { error } = await supabase
    .from("syndicated_articles")
    .upsert(row as never, { onConflict: "slug" });
  if (error) throw new Error(error.message);

  return { slug, title: post.title, toolSlug: tool.slug };
}
