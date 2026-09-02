import { createFileRoute } from "@tanstack/react-router";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { SITE } from "@/lib/site";
import { tools } from "@/data/tools";

const title = "About AmmarAI: One Workspace for AI Creation | AmmarAI";
const description =
  "Why AmmarAI exists, what we believe about AI tools, and the limits we state openly rather than hide behind marketing.";

const principles = [
  {
    title: "One workspace beats seven tabs",
    body: "Most teams pay for a writer, an image tool, a video tool, a transcription service and a chat subscription. The work then lives in five places. Consolidation is the point.",
  },
  {
    title: "State the limits",
    body: "Generated text can be confidently wrong. Generated hands are still difficult. No tool can promise rankings. Every tool page here says where verification is required.",
  },
  {
    title: "Context beats cleverness",
    body: "The difference between mediocre and excellent output is almost never the model. It is the brief, the examples and the source material you provide.",
  },
  {
    title: "Editing is the job",
    body: "AI removes the blank page, not the craft. The pieces worth publishing are the ones a person shaped afterwards.",
  },
];

export const Route = createFileRoute("/about")({
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
  component: About,
});

function About() {
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">About</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              We built the workspace we wanted to stop paying for five times
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {SITE.name} brings {tools.length} AI tools into one place: writing, chat, images,
              video, voice, transcription, vision, documents and code, sharing one brand voice, one
              history and one bill.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="What we believe" title="Four principles behind the product" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {principles.map((p) => (
              <Card key={p.title} className="p-6">
                <h2 className="text-base font-semibold text-foreground">{p.title}</h2>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <SectionHeading title="What we are not" />
          <div className="prose-editorial mt-5">
            <p>
              We are not an autopilot. Nothing here publishes itself, and any vendor promising that
              is describing a liability rather than a feature. Generated drafts need a person who
              knows the subject to check the claims and add the specifics.
            </p>
            <p>
              We are also not an SEO guarantee. The tools help with structure, coverage, metadata and
              speed, which are the parts within your control. Rankings depend on competition,
              authority and whether your page is genuinely the best answer available.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalButton href={"/auth"} size="lg">
              Start creating free
            </ExternalButton>
            <ButtonLink to="/contact" variant="outline" size="lg">
              Talk to us
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </div>
  );
}
