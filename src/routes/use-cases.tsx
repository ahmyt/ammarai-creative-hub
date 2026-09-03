import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { siteContentQuery } from "@/lib/content";
import { Container, Section, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { SITE, REGISTER_URL } from "@/lib/site";

const title = "AI Use Cases by Role and Industry | AmmarAI";
const description =
  "See how marketers, creators, small businesses, agencies, students, developers and e-commerce teams use AmmarAI day to day.";

export const Route = createFileRoute("/use-cases")({
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
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  component: UseCasesIndex,
});

function UseCasesIndex() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const useCases = content.useCases;
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Use Cases" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">By role</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              The same platform, used very differently
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              A solo creator and a twelve-person agency reach for completely different parts of the
              library. These pages describe the actual workflows, not the marketing version.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <Card key={uc.slug} interactive className="p-6">
                <p className="eyebrow">{uc.audience}</p>
                <h2 className="mt-3 text-base font-semibold">
                  <Link
                    to="/$slug"
                    params={{ slug: uc.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {uc.name}
                  </Link>
                </h2>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {uc.summary}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Find your workflow</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            {SITE.tagline}
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
