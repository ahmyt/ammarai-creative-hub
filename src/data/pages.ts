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
  },
];
