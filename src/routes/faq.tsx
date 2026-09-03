import { createFileRoute } from "@tanstack/react-router";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { ExternalButton } from "@/components/site/Button";
import { SITE, REGISTER_URL } from "@/lib/site";

const title = "AmmarAI FAQ: Plans, Output, Ownership and Limits | AmmarAI";
const description =
  "Straight answers about what the platform does, what it costs, who owns the output and where AI generation falls short.";

const groups = [
  {
    heading: "The platform",
    faqs: [
      {
        q: "What is AmmarAI?",
        a: "An AI creation workspace bringing writing, chat, image, video, voice, transcription, vision, document analysis and code tools into one place, sharing one brand voice, one history and one subscription.",
      },
      {
        q: "Do I need separate subscriptions for images or voice?",
        a: "No. Every tool is included on every plan. Plans differ in monthly allowances, file and document limits, model tiers and team features.",
      },
      {
        q: "Is there an app or is it browser-based?",
        a: "It runs in the browser on desktop and mobile, with no installation required.",
      },
    ],
  },
  {
    heading: "Plans and billing",
    faqs: [
      {
        q: "Is the free plan time-limited?",
        a: "No. The free plan is permanent with a monthly allowance that resets each cycle.",
      },
      {
        q: "Can I cancel any time?",
        a: "Yes. Cancellation takes effect at the end of the current billing period and your history stays accessible on the free tier.",
      },
      {
        q: "Which plan suits a small team?",
        a: "Professional covers most two to five person teams. Ultimate adds shared workspaces, bulk generation and the highest allowances, which is where agencies land.",
      },
    ],
  },
  {
    heading: "Output and ownership",
    faqs: [
      {
        q: "Do I own the content I generate?",
        a: "On paid plans, generated content can be used commercially in your products and marketing. Do not prompt for trademarked characters, brands or the likeness of real people.",
      },
      {
        q: "Is the content unique?",
        a: "Text is generated rather than copied, but generic input produces generic output. Adding your own examples, data and experience is what makes a piece distinctive.",
      },
      {
        q: "Can AI content be detected?",
        a: "Detectors exist and are unreliable in both directions, flagging human writing and missing machine writing. Editing substantially and adding real expertise is the durable answer.",
      },
    ],
  },
  {
    heading: "Limits and accuracy",
    faqs: [
      {
        q: "Can the AI be wrong?",
        a: "Yes, and confidently so. Verify facts, statistics, quotations, legal and medical content, and anything a decision depends on.",
      },
      {
        q: "Will this rank my pages on Google?",
        a: "No tool can promise rankings. The platform helps with structure, coverage, metadata and production speed. Competition, authority and genuine usefulness decide the rest.",
      },
      {
        q: "Where is generated media weakest?",
        a: "Close-up human detail in images and video, text rendered inside images, long video durations, and small print in poor-quality scans. Each tool page states its own limits.",
      },
    ],
  },
];

const allFaqs = groups.flatMap((g) => g.faqs);

export const Route = createFileRoute("/faq")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(allFaqs)) }}
      />
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Questions</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Straight answers, including the unflattering ones
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              What the platform does, what it costs, who owns the output and where generative AI
              still falls short.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container size="narrow">
          {groups.map((group) => (
            <div key={group.heading} className="mt-12 first:mt-0">
              <SectionHeading title={group.heading} as="h2" />
              <div className="mt-5">
                <FaqAccordion items={group.faqs} />
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Still deciding?</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            {SITE.tagline} The free plan answers most questions faster than we can.
          </p>
          <div className="mt-8">
            <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
