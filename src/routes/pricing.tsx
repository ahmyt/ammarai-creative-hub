import { createFileRoute } from "@tanstack/react-router";
import { plans, SITE } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { ExternalButton } from "@/components/site/Button";
import { cn } from "@/lib/utils";

const title = "Pricing: One Subscription for Every AI Tool | AmmarAI";
const description =
  "Free, Starter, Professional and Ultimate plans. Every tool on every plan, with allowances that scale as your volume does.";

const faqs = [
  {
    q: "Is the free plan actually usable?",
    a: "Yes. Every tool is available on the free plan with a monthly allowance. It is enough to produce real work and decide whether the platform fits before paying.",
  },
  {
    q: "What happens when I hit my allowance?",
    a: "Generation pauses until the next cycle or until you upgrade. Nothing is deleted and your history stays available.",
  },
  {
    q: "Can I change plan later?",
    a: "Yes, at any time. Upgrades apply immediately and downgrades take effect at the end of the billing period.",
  },
  {
    q: "Do I own what I generate?",
    a: "On paid plans you can use generated content commercially. Do not prompt for trademarked characters, brands or the likeness of real people.",
  },
  {
    q: "Is there a discount for annual billing?",
    a: "Annual billing is offered at a reduced effective monthly rate on all paid tiers.",
  },
];

export const Route = createFileRoute("/pricing")({
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
  component: Pricing,
});

function Pricing() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Pricing" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              One subscription instead of seven
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Every plan includes every tool. What changes is how much you can generate, how long
              your documents and recordings can be, and how much of it you can automate.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container size="wide">
          <div className="grid gap-5 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-xl bg-card p-6 ring-1 ring-border",
                  plan.highlight && "ring-2 ring-accent",
                )}
              >
                {plan.highlight ? <p className="eyebrow text-accent">Most popular</p> : null}
                <h2 className="mt-1 font-display text-xl font-semibold text-foreground">
                  {plan.name}
                </h2>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {plan.blurb}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                      <span aria-hidden="true" className="text-accent">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <ExternalButton
                  href={"/auth"}
                  variant={plan.highlight ? "primary" : "outline"}
                  className="mt-7 w-full"
                >
                  {plan.cta}
                </ExternalButton>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Prices shown in USD. Annual billing reduces the effective monthly rate on paid plans.
          </p>
        </Container>
      </Section>

      <Section tone="sand">
        <Container size="narrow">
          <SectionHeading title="Pricing questions" />
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
