import type { Page } from "./types";

export const pages: Page[] = [
  {
    slug: "contact",
    name: "Contact",
    title: "Contact AmmarAI: Sales, Support and Partnerships | AmmarAI",
    description:
      "Get in touch about plans, agency and team accounts, technical questions or partnership enquiries.",
    eyebrow: "Contact",
    h1: "Tell us what you are trying to build",
    lede: "The more specific you are about the work, the more specific the answer. We reply to everything within two working days.",
    formHeading: "Send a message",
    sentHeading: "Message received",
    sentBody:
      "Thanks for getting in touch — your message is with us and we reply to everything within two working days. A confirmation is on its way to your inbox.",
    channels: [
      {
        title: "Support",
        body: "Questions about a tool, an allowance or something behaving oddly. Include what you were generating and we can be far more useful.",
        label: "support@ammarai.com",
      },
      {
        title: "Teams and agencies",
        body: "Seat-based workspaces, multiple client brands and high-volume bulk generation.",
        label: "teams@ammarai.com",
      },
      {
        title: "Partnerships",
        body: "Integrations, affiliate arrangements and anything involving the two of us building something together.",
        label: "partners@ammarai.com",
      },
    ],
    senderDomain: "",
    fromName: "AmmarAI",
    fromEmail: "",
    notifyEmail: "support@ammarai.com",
  },
  {
    slug: "home",
    name: "Home",
    title: "AmmarAI: One AI Platform for Writing, Video, Voice and Code",
    description:
      "60+ AI tools in one workspace: write, chat, generate images and video, create voiceovers, transcribe audio, analyze documents and code.",
    eyebrow: "Home",
    h1: "One AI for everything you create",
    lede: "",
    formHeading: "",
    sentHeading: "",
    sentBody: "",
    channels: [],
    comparisonEyebrow: "The math",
    comparisonTitle: "Stop paying for five AI tools",
    comparisonIntro:
      "Stack a chat subscription, an image tool, a video tool and a voice tool and you are out $80\u2013120 a month \u2014 and still switching tabs. AmmarAI replaces all of them with one workspace.",
    comparisonOldLabel: "The old way",
    comparisonOldItems: [
      "ChatGPT / Claude / Gemini subscription",
      "Separate image tool",
      "Separate video tool",
      "Separate voice tool",
      "Constant tab switching",
    ],
    comparisonOldTotalLabel: "Total",
    comparisonOldTotal: "$80\u2013120+/month",
    comparisonNewLabel: "AmmarAI",
    comparisonNewItems: [
      "Writing + Chat",
      "Image generation",
      "Video generation",
      "Voiceover & transcription",
      "Shared brand voice and history",
      "One subscription. One workspace.",
    ],
    comparisonNewTotalLabel: "Total",
    comparisonNewTotal: "One subscription",
    comparisonCtaLabel: "Start free \u2014 no card required",
    comparisonSecondaryLabel: "Compare plans",
  },
];
