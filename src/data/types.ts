export type ToolCategory =
  | "AI Writing"
  | "AI Chat"
  | "AI Marketing"
  | "AI SEO"
  | "AI Social Media"
  | "AI Business"
  | "AI E-commerce"
  | "AI Email"
  | "AI Image"
  | "AI Video"
  | "AI Voice"
  | "AI Audio"
  | "AI Transcription"
  | "AI Vision"
  | "AI Documents"
  | "AI Code"
  | "AI Education"
  | "AI Productivity";

export type Section = { title: string; body: string };
export type Step = { title: string; body: string };
export type Example = { label: string; input: string; output: string };
export type Faq = { q: string; a: string };
export type Audience = { who: string; why: string };

export interface Tool {
  /** Clean URL slug without leading slash, e.g. "ai-writer" */
  slug: string;
  name: string;
  category: ToolCategory;
  /** Card description in the directory — one clear sentence. */
  summary: string;
  /** SEO */
  title: string;
  description: string;
  h1: string;
  /** Hero paragraph under the H1 */
  lede: string;
  ctaLabel: string;
  featured?: boolean;
  popular?: boolean;
  recent?: boolean;
  /** Opening explainer — 1-3 paragraphs, "What is X?" */
  what: string[];
  /** "What can you do with X" bullet list */
  canDo: string[];
  /** Step-by-step */
  how: Step[];
  /** Realistic input/output samples */
  examples: Example[];
  /** Key capabilities */
  capabilities: Section[];
  /** Who it is for */
  audiences: Audience[];
  /** Concrete workflows */
  useCases: Section[];
  /** Best practices */
  tips: string[];
  /** Things to avoid */
  mistakes: string[];
  faqs: Faq[];
  /** Slugs of related tools */
  related: string[];
  /** Optional sample output video shown in the animated example (CMS-editable) */
  demoVideoUrl?: string;
  demoVideoCaption?: string;
  /** Hide the built-in sample video for this tool */
  hideDemoVideo?: boolean;
}

export interface UseCase {
  slug: string;
  name: string;
  audience: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  summary: string;
  intro: string[];
  challenges: Section[];
  workflows: Section[];
  toolkit: { slug: string; why: string }[];
  outcomes: string[];
  faqs: Faq[];
}

export interface Feature {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  summary: string;
  body: string[];
  highlights: Section[];
  tools: string[];
  faqs: Faq[];
}

export interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  takeaways: string[];
  related: string[];
}
