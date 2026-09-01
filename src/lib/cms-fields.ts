import type { ContentKind } from "./content";

export type FieldSpec =
  | { name: string; label: string; type: "text" }
  | { name: string; label: string; type: "textarea" }
  | { name: string; label: string; type: "boolean" }
  | { name: string; label: string; type: "json"; hint: string };

export const fieldSpecs: Record<ContentKind, FieldSpec[]> = {
  tool: [
    { name: "name", label: "Tool name", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "summary", label: "Card summary", type: "textarea" },
    { name: "title", label: "SEO title", type: "text" },
    { name: "description", label: "Meta description", type: "textarea" },
    { name: "h1", label: "Page heading (H1)", type: "text" },
    { name: "lede", label: "Hero paragraph", type: "textarea" },
    { name: "ctaLabel", label: "Call to action label", type: "text" },
    { name: "featured", label: "Featured", type: "boolean" },
    { name: "popular", label: "Popular", type: "boolean" },
    { name: "recent", label: "Recent", type: "boolean" },
    { name: "what", label: "What is it", type: "json", hint: '["paragraph", "paragraph"]' },
    { name: "canDo", label: "What you can do", type: "json", hint: '["bullet", "bullet"]' },
    { name: "how", label: "How it works", type: "json", hint: '[{"title":"","body":""}]' },
    {
      name: "examples",
      label: "Examples",
      type: "json",
      hint: '[{"label":"","input":"","output":""}]',
    },
    { name: "capabilities", label: "Capabilities", type: "json", hint: '[{"title":"","body":""}]' },
    { name: "audiences", label: "Audiences", type: "json", hint: '[{"who":"","why":""}]' },
    { name: "useCases", label: "Use cases", type: "json", hint: '[{"title":"","body":""}]' },
    { name: "tips", label: "Tips", type: "json", hint: '["tip"]' },
    { name: "mistakes", label: "Mistakes to avoid", type: "json", hint: '["mistake"]' },
    { name: "faqs", label: "FAQs", type: "json", hint: '[{"q":"","a":""}]' },
    { name: "related", label: "Related tool slugs", type: "json", hint: '["ai-writer"]' },
    { name: "demoVideoUrl", label: "Sample video URL", type: "text" },
    { name: "demoVideoCaption", label: "Sample video caption", type: "text" },
    { name: "hideDemoVideo", label: "Hide sample video", type: "boolean" },
  ],
  use_case: [
    { name: "name", label: "Name", type: "text" },
    { name: "audience", label: "Audience", type: "text" },
    { name: "summary", label: "Card summary", type: "textarea" },
    { name: "title", label: "SEO title", type: "text" },
    { name: "description", label: "Meta description", type: "textarea" },
    { name: "h1", label: "Page heading (H1)", type: "text" },
    { name: "lede", label: "Hero paragraph", type: "textarea" },
    { name: "intro", label: "Intro paragraphs", type: "json", hint: '["paragraph"]' },
    { name: "challenges", label: "Challenges", type: "json", hint: '[{"title":"","body":""}]' },
    { name: "workflows", label: "Workflows", type: "json", hint: '[{"title":"","body":""}]' },
    { name: "toolkit", label: "Toolkit", type: "json", hint: '[{"slug":"ai-writer","why":""}]' },
    { name: "outcomes", label: "Outcomes", type: "json", hint: '["outcome"]' },
    { name: "faqs", label: "FAQs", type: "json", hint: '[{"q":"","a":""}]' },
  ],
  feature: [
    { name: "name", label: "Name", type: "text" },
    { name: "summary", label: "Card summary", type: "textarea" },
    { name: "title", label: "SEO title", type: "text" },
    { name: "description", label: "Meta description", type: "textarea" },
    { name: "h1", label: "Page heading (H1)", type: "text" },
    { name: "lede", label: "Hero paragraph", type: "textarea" },
    { name: "body", label: "Body paragraphs", type: "json", hint: '["paragraph"]' },
    { name: "highlights", label: "Highlights", type: "json", hint: '[{"title":"","body":""}]' },
    { name: "tools", label: "Related tool slugs", type: "json", hint: '["ai-writer"]' },
    { name: "faqs", label: "FAQs", type: "json", hint: '[{"q":"","a":""}]' },
  ],
  post: [
    { name: "title", label: "Title", type: "text" },
    { name: "metaTitle", label: "SEO title", type: "text" },
    { name: "description", label: "Meta description", type: "textarea" },
    { name: "category", label: "Category", type: "text" },
    { name: "date", label: "Date (YYYY-MM-DD)", type: "text" },
    { name: "readingTime", label: "Reading time", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "intro", label: "Intro paragraphs", type: "json", hint: '["paragraph"]' },
    {
      name: "sections",
      label: "Sections",
      type: "json",
      hint: '[{"heading":"","paragraphs":[""],"bullets":[""]}]',
    },
    { name: "takeaways", label: "Takeaways", type: "json", hint: '["takeaway"]' },
    { name: "related", label: "Related post slugs", type: "json", hint: '["slug"]' },
  ],
};

export function emptyDraft(kind: ContentKind): Record<string, unknown> {
  const draft: Record<string, unknown> = {};
  for (const field of fieldSpecs[kind]) {
    if (field.type === "boolean") draft[field.name] = false;
    else if (field.type === "json") draft[field.name] = [];
    else draft[field.name] = "";
  }
  return draft;
}

export function titleOf(item: Record<string, unknown>): string {
  return (
    (item["name"] as string) || (item["title"] as string) || (item["slug"] as string) || "Untitled"
  );
}
