import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Container, Section, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ActionButton, ButtonLink } from "@/components/site/Button";
import { siteContentQuery } from "@/lib/content";

const title = "Contact AmmarAI: Sales, Support and Partnerships | AmmarAI";
const description =
  "Get in touch about plans, agency and team accounts, technical questions or partnership enquiries.";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
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
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const page = content.pages.find((p) => p.slug === "contact");

  const eyebrow = page?.eyebrow ?? "Contact";
  const h1 = page?.h1 ?? "Tell us what you are trying to build";
  const lede =
    page?.lede ??
    "The more specific you are about the work, the more specific the answer. We reply to everything within two working days.";
  const formHeading = page?.formHeading ?? "Send a message";
  const sentHeading = page?.sentHeading ?? "Message noted";
  const sentBody = page?.sentBody ?? "";
  const channels = page?.channels ?? [];

  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">{h1}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {lede}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Card className="p-7">
              {sent ? (
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{sentHeading}</h2>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {sentBody}
                  </p>
                  <ButtonLink to="/ai-tools" variant="outline" size="sm" className="mt-6">
                    Browse the tools
                  </ButtonLink>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="flex flex-col gap-4"
                >
                  <h2 className="text-xl font-semibold text-foreground">{formHeading}</h2>
                  <div>
                    <label htmlFor="name" className="text-xs font-semibold text-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="mt-1.5 w-full rounded-md bg-background px-3.5 py-2.5 text-sm text-foreground ring-1 ring-border focus:outline-2 focus:outline-offset-2 focus:outline-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1.5 w-full rounded-md bg-background px-3.5 py-2.5 text-sm text-foreground ring-1 ring-border focus:outline-2 focus:outline-offset-2 focus:outline-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-xs font-semibold text-foreground">
                      What are you working on?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="mt-1.5 w-full rounded-md bg-background px-3.5 py-2.5 text-sm text-foreground ring-1 ring-border focus:outline-2 focus:outline-offset-2 focus:outline-ring"
                    />
                  </div>
                  <ActionButton type="submit" className="mt-1 self-start">
                    Send message
                  </ActionButton>
                </form>
              )}
            </Card>

            <div className="flex flex-col gap-5">
              {channels.map((c) => (
                <Card key={c.title} className="p-6">
                  <h2 className="text-base font-semibold text-foreground">{c.title}</h2>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-accent">{c.label}</p>
                </Card>
              ))}
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link to="/auth" className="text-accent underline underline-offset-4">
                  Sign in
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
