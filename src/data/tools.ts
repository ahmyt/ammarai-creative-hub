import type { Tool, ToolCategory } from "./types";
import { coreToolsA } from "./tools-core-a";
import { coreToolsB } from "./tools-core-b";
import { writingTools } from "./tools-writing";
import { marketingTools } from "./tools-marketing";
import { commerceSeoTools } from "./tools-commerce-seo";

export const tools: Tool[] = [
  ...coreToolsA,
  ...coreToolsB,
  ...writingTools,
  ...marketingTools,
  ...commerceSeoTools,
];

export const toolBySlug = new Map(tools.map((t) => [t.slug, t]));

export function getTool(slug: string): Tool | undefined {
  return toolBySlug.get(slug);
}

export const categoryOrder: ToolCategory[] = [
  "AI Writing",
  "AI Chat",
  "AI Marketing",
  "AI SEO",
  "AI Social Media",
  "AI Business",
  "AI E-commerce",
  "AI Email",
  "AI Image",
  "AI Video",
  "AI Voice",
  "AI Audio",
  "AI Transcription",
  "AI Vision",
  "AI Documents",
  "AI Code",
  "AI Education",
  "AI Productivity",
];

export const usedCategories = categoryOrder.filter((c) => tools.some((t) => t.category === c));

export function toolsByCategory(category: ToolCategory) {
  return tools.filter((t) => t.category === category);
}

export const featuredTools = tools.filter((t) => t.featured).slice(0, 6);
export const popularTools = tools.filter((t) => t.popular).slice(0, 8);
export const recentTools = tools.filter((t) => t.recent).slice(0, 6);

/** Frontend-only intent matcher used by the discovery search. No AI backend. */
const intentMap: { keywords: string[]; slugs: string[] }[] = [
  {
    keywords: ["social", "ad", "advert", "campaign", "promo"],
    slugs: [
      "facebook-ad-generator",
      "instagram-caption-generator",
      "ai-ad-generator",
      "ai-image-generator",
      "video-script-generator",
    ],
  },
  {
    keywords: ["blog", "article", "post", "write", "essay"],
    slugs: [
      "ai-article-generator",
      "ai-blog-generator",
      "ai-writer",
      "meta-description-generator",
      "ai-blog-title-generator",
    ],
  },
  {
    keywords: ["video", "reel", "short", "youtube", "tiktok"],
    slugs: [
      "ai-video-generator",
      "ai-text-to-video",
      "ai-image-to-video",
      "video-script-generator",
      "youtube-title-generator",
    ],
  },
  {
    keywords: ["voice", "voiceover", "narration", "audio", "podcast", "speech"],
    slugs: [
      "ai-voice-generator",
      "ai-text-to-speech",
      "ai-transcription",
      "ai-speech-to-text",
      "video-script-generator",
    ],
  },
  {
    keywords: ["image", "picture", "photo", "visual", "logo", "avatar"],
    slugs: [
      "ai-image-generator",
      "ai-avatar-generator",
      "ai-image-to-video",
      "ai-vision",
      "instagram-caption-generator",
    ],
  },
  {
    keywords: ["product", "shop", "store", "ecommerce", "amazon", "listing"],
    slugs: [
      "ai-product-description-generator",
      "amazon-product-title-generator",
      "product-benefits-generator",
      "product-comparison-generator",
      "ai-image-generator",
    ],
  },
  {
    keywords: ["seo", "keyword", "rank", "search", "meta"],
    slugs: [
      "ai-seo-content-generator",
      "meta-description-generator",
      "faq-generator",
      "seo-blog-generator",
      "keyword-based-rewriter",
    ],
  },
  {
    keywords: ["email", "newsletter", "outreach", "cold", "subject"],
    slugs: [
      "ai-email-generator",
      "ai-cold-email-generator",
      "ai-email-subject-line-generator",
      "newsletter-generator",
      "ai-follow-up-email-generator",
    ],
  },
  {
    keywords: ["code", "app", "script", "function", "developer", "sql"],
    slugs: ["ai-code-generator", "ai-chat", "ai-document-analyzer", "ai-vision", "ai-writer"],
  },
  {
    keywords: ["document", "pdf", "contract", "report", "summar", "transcript"],
    slugs: [
      "ai-document-analyzer",
      "ai-summary-generator",
      "ai-transcription",
      "ai-vision",
      "ai-chat",
    ],
  },
];

export function suggestTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = new Map<string, number>();

  for (const entry of intentMap) {
    if (entry.keywords.some((k) => q.includes(k))) {
      entry.slugs.forEach((slug, i) => {
        scored.set(slug, (scored.get(slug) ?? 0) + (10 - i));
      });
    }
  }

  for (const tool of tools) {
    const haystack = `${tool.name} ${tool.summary} ${tool.category}`.toLowerCase();
    if (haystack.includes(q)) scored.set(tool.slug, (scored.get(tool.slug) ?? 0) + 6);
    else if (q.split(/\s+/).some((word) => word.length > 3 && haystack.includes(word))) {
      scored.set(tool.slug, (scored.get(tool.slug) ?? 0) + 2);
    }
  }

  return [...scored.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => toolBySlug.get(slug))
    .filter((t): t is Tool => Boolean(t))
    .slice(0, 8);
}
