import type { ContentKind } from "./content";

export type ItemFieldSpec = {
  name: string;
  label: string;
  type: "text" | "textarea" | "list";
};

export type ItemSpec =
  | { kind: "string"; label: string }
  | { kind: "object"; label: string; fields: ItemFieldSpec[] };

export type FieldSpec =
  | { name: string; label: string; type: "text" }
  | { name: string; label: string; type: "textarea" }
  | { name: string; label: string; type: "boolean" }
  | { name: string; label: string; type: "json"; hint: string; item: ItemSpec };

const S = (label: string): ItemSpec => ({ kind: "string", label });
const O = (label: string, fields: ItemFieldSpec[]): ItemSpec => ({ kind: "object", label, fields });
const titleBody = (label: string): ItemSpec =>
  O(label, [
    { name: "title", label: "Title", type: "text" },
    { name: "body", label: "Body", type: "textarea" },
  ]);
const faqItem: ItemSpec = O("FAQ", [
  { name: "q", label: "Question", type: "text" },
  { name: "a", label: "Answer", type: "textarea" },
]);

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
    { name: "what", label: "What is it", type: "json", hint: "One paragraph per block", item: S("Paragraph") },
    { name: "canDo", label: "What you can do", type: "json", hint: "One bullet per block", item: S("Bullet") },
    { name: "how", label: "How it works", type: "json", hint: "Steps in order", item: titleBody("Step") },
    {
      name: "examples",
      label: "Examples",
      type: "json",
      hint: "Shown in the animated sample player",
      item: O("Example", [
        { name: "label", label: "Label", type: "text" },
        { name: "input", label: "Input", type: "textarea" },
        { name: "output", label: "Output", type: "textarea" },
      ]),
    },
    { name: "capabilities", label: "Capabilities", type: "json", hint: "", item: titleBody("Capability") },
    {
      name: "audiences",
      label: "Audiences",
      type: "json",
      hint: "",
      item: O("Audience", [
        { name: "who", label: "Who", type: "text" },
        { name: "why", label: "Why", type: "textarea" },
      ]),
    },
    { name: "useCases", label: "Use cases", type: "json", hint: "", item: titleBody("Use case") },
    { name: "tips", label: "Tips", type: "json", hint: "", item: S("Tip") },
    { name: "mistakes", label: "Mistakes to avoid", type: "json", hint: "", item: S("Mistake") },
    { name: "faqs", label: "FAQs", type: "json", hint: "", item: faqItem },
    { name: "related", label: "Related tool slugs", type: "json", hint: "e.g. ai-writer", item: S("Related slug") },
    {
      name: "demoVideoUrl",
      label: "Sample media URLs (one per example, comma or new line)",
      type: "text",
    },
    { name: "demoVideoCaption", label: "Sample media captions (one per example)", type: "text" },
    { name: "hideDemoVideo", label: "Hide sample media", type: "boolean" },
  ],
  use_case: [
    { name: "name", label: "Name", type: "text" },
    { name: "audience", label: "Audience", type: "text" },
    { name: "summary", label: "Card summary", type: "textarea" },
    { name: "title", label: "SEO title", type: "text" },
    { name: "description", label: "Meta description", type: "textarea" },
    { name: "h1", label: "Page heading (H1)", type: "text" },
    { name: "lede", label: "Hero paragraph", type: "textarea" },
    { name: "intro", label: "Intro paragraphs", type: "json", hint: "", item: S("Paragraph") },
    { name: "challenges", label: "Challenges", type: "json", hint: "", item: titleBody("Challenge") },
    { name: "workflows", label: "Workflows", type: "json", hint: "", item: titleBody("Workflow") },
    {
      name: "toolkit",
      label: "Toolkit",
      type: "json",
      hint: "",
      item: O("Tool", [
        { name: "slug", label: "Tool slug", type: "text" },
        { name: "why", label: "Why", type: "textarea" },
      ]),
    },
    { name: "outcomes", label: "Outcomes", type: "json", hint: "", item: S("Outcome") },
    { name: "faqs", label: "FAQs", type: "json", hint: "", item: faqItem },
  ],
  feature: [
    { name: "name", label: "Name", type: "text" },
    { name: "summary", label: "Card summary", type: "textarea" },
    { name: "title", label: "SEO title", type: "text" },
    { name: "description", label: "Meta description", type: "textarea" },
    { name: "h1", label: "Page heading (H1)", type: "text" },
    { name: "lede", label: "Hero paragraph", type: "textarea" },
    { name: "body", label: "Body paragraphs", type: "json", hint: "", item: S("Paragraph") },
    { name: "highlights", label: "Highlights", type: "json", hint: "", item: titleBody("Highlight") },
    { name: "tools", label: "Related tool slugs", type: "json", hint: "", item: S("Tool slug") },
    { name: "faqs", label: "FAQs", type: "json", hint: "", item: faqItem },
  ],
  post: [
    { name: "title", label: "Title", type: "text" },
    { name: "metaTitle", label: "SEO title", type: "text" },
    { name: "description", label: "Meta description", type: "textarea" },
    { name: "category", label: "Category", type: "text" },
    { name: "date", label: "Date (YYYY-MM-DD)", type: "text" },
    { name: "readingTime", label: "Reading time", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "intro", label: "Intro paragraphs", type: "json", hint: "", item: S("Paragraph") },
    {
      name: "sections",
      label: "Sections",
      type: "json",
      hint: "",
      item: O("Section", [
        { name: "heading", label: "Heading", type: "text" },
        { name: "paragraphs", label: "Paragraphs", type: "list" },
        { name: "bullets", label: "Bullets", type: "list" },
      ]),
    },
    { name: "takeaways", label: "Takeaways", type: "json", hint: "", item: S("Takeaway") },
    { name: "related", label: "Related post slugs", type: "json", hint: "", item: S("Related slug") },
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
