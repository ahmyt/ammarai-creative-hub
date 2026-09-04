export const SITE = {
  name: "AmmarAI",
  tagline: "One AI for everything you create.",
  appUrl: "https://app.ammarai.com",
  description:
    "Write, chat, create images and video, generate voiceovers, transcribe audio, analyze documents, and code in one AI workspace.",
};

/** External app URLs for user sign-up and sign-in (the product dashboard). */
export const REGISTER_URL = "https://app.ammarai.com/register";
export const LOGIN_URL = "https://app.ammarai.com/login";

export const primaryNav = [
  { label: "AI Tools", to: "/ai-tools" },
  { label: "Features", to: "/features" },
  { label: "Use Cases", to: "/use-cases" },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/resources" },
] as const;

export type StaticPath =
  | "/"
  | "/ai-tools"
  | "/features"
  | "/use-cases"
  | "/pricing"
  | "/resources"
  | "/blog"
  | "/faq"
  | "/about"
  | "/contact"
  | "/auth";

export type SiteLink = { label: string; to: StaticPath } | { label: string; slug: string };

export const footerNav: { heading: string; links: SiteLink[] }[] = [

  {
    heading: "Platform",
    links: [
      { label: "AI Tools directory", to: "/ai-tools" },
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    heading: "Create",
    links: [
      { label: "AI Writer", slug: "ai-writer" },
      { label: "AI Image Generator", slug: "ai-image-generator" },
      { label: "AI Video Generator", slug: "ai-video-generator" },
      { label: "AI Voice Generator", slug: "ai-voice-generator" },
      { label: "AI Code Generator", slug: "ai-code-generator" },
    ],
  },
  {
    heading: "Use cases",
    links: [
      { label: "AI for Marketing", slug: "ai-for-marketing" },
      { label: "AI for Content Creators", slug: "ai-for-content-creators" },
      { label: "AI for Small Business", slug: "ai-for-small-business" },
      { label: "AI for SEO", slug: "ai-for-seo" },
      { label: "AI for Students", slug: "ai-for-students" },
    ],
  },

  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Resources", to: "/resources" },
      { label: "Contact", to: "/contact" },
      { label: "Content studio", to: "/auth" },
    ],
  },
];

export const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    blurb: "Try the whole platform and find the tools you will actually use.",
    features: [
      "Access to the AI tool library",
      "Monthly allowance of words, images and audio",
      "AI chat with the standard model",
      "Basic transcription and document reading",
      "Single workspace, one seat",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Starter",
    price: "$9.99",
    period: "/month",
    blurb: "For individuals publishing regularly across a couple of channels.",
    features: [
      "Everything in Free",
      "Higher monthly word and image allowance",
      "Longer documents and transcripts",
      "Saved brand tone and reusable prompts",
      "Export to common document formats",
    ],
    cta: "Choose Starter",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$29.99",
    period: "/month",
    blurb: "For marketers, creators and small teams shipping work every day.",
    features: [
      "Everything in Starter",
      "Advanced models for writing, image and video",
      "Voice generation and long-form transcription",
      "Custom AI assistants and templates",
      "Priority processing",
    ],
    cta: "Choose Professional",
    highlight: true,
  },
  {
    name: "Ultimate",
    price: "$59.99",
    period: "/month",
    blurb: "For agencies and teams running high-volume production.",
    features: [
      "Everything in Professional",
      "Highest allowances across every tool",
      "Team collaboration and shared workspaces",
      "Bulk generation workflows",
      "Extended file uploads and document analysis",
    ],
    cta: "Choose Ultimate",
    highlight: false,
  },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  description: SITE.description,
  url: "/",
};

export function softwareApplicationJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: path,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free plan available",
    },
  };
}
