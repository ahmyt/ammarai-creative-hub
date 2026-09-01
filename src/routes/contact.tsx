import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, Section, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ActionButton, ButtonLink } from "@/components/site/Button";
import { SITE } from "@/lib/site";

const title = "Contact AmmarAI: Sales, Support and Partnerships | AmmarAI";
const description =
  "Get in touch about plans, agency and team accounts, technical questions or partnership enquiries.";

export const Route = createFileRoute("/contact")({
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

const channels = [
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
];

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Tell us what you are trying to build
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              The more specific you are about the work, the more specific the answer. We reply to
              everything within two working days.
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
                  <h2 className="text-xl font-semibold text-foreground">Message noted</h2>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    This marketing site does not yet send messages to a backend, so nothing was
                    transmitted. In the meantime, email us directly using the addresses listed here
                    and we will pick it up.
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
                  <h2 className="text-xl font-semibold text-foreground">Send a message</h2>
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
                Already have an account? Sign in at {SITE.appUrl.replace("https://", "")}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
