import { createFileRoute, Link } from "@tanstack/react-router";
import { features } from "@/data/features";
import { Container, Section, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { SITE } from "@/lib/site";

const title = "Platform Features: How AmmarAI Works | AmmarAI";
const description =
  "Multi-model AI, brand voice, templates, bulk generation, uploads, assistants, team workspaces, history and clean exports.";

export const Route = createFileRoute("/features/")({
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
  component: FeaturesIndex,
});

function FeaturesIndex() {
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Features" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Platform</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              The parts that make a tool library into a workspace
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Sixty tools are only useful if they share a voice, remember your work and export
              cleanly. These are the pieces that hold the whole thing together.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.slug} interactive className="p-6">
                <h2 className="text-base font-semibold">
                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {f.name}
                  </Link>
                </h2>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {f.summary}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">See it on your own work</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            {SITE.tagline}
          </p>
          <div className="mt-8">
            <ExternalButton href={`${SITE.appUrl}/signup`} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
