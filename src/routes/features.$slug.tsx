import { createFileRoute, notFound } from "@tanstack/react-router";
import { siteContentQuery } from "@/lib/content";
import { toolBySlug } from "@/data/tools";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/Breadcrumbs";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { RelatedTools } from "@/components/site/ToolCard";
import { ExternalButton, ButtonLink } from "@/components/site/Button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/features/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params, context }) => {
    const content = await context.queryClient.ensureQueryData(siteContentQuery);
    const feature = content.features.find((f) => f.slug === params.slug);
    if (!feature) throw notFound();
    return { feature };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const { feature } = loaderData;
    return {
      meta: [
        { title: feature.title },
        { name: "description", content: feature.description },
        { property: "og:title", content: feature.title },
        { property: "og:description", content: feature.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FeatureDetail,
});

function FeatureDetail() {
  const { feature } = Route.useLoaderData();

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(feature.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", path: "/" },
              { label: "Features", path: "/features" },
              { label: feature.name, path: `/features/${feature.slug}` },
            ]),
          ),
        }}
      />

      <Section className="pb-10 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Features", to: "/features" },
              { label: feature.name },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Platform feature</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">{feature.h1}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {feature.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} size="lg">
                Start creating free
              </ExternalButton>
              <ButtonLink to="/features" variant="outline" size="lg">
                All features
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="prose-editorial max-w-3xl">
            {feature.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Highlights" title="What this gives you day to day" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {feature.highlights.map((h) => (
              <Card key={h.title} className="p-6">
                <h3 className="text-base font-semibold text-foreground">{h.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {h.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Where it applies" title="Tools that use this feature" />
          <div className="mt-8">
            <RelatedTools slugs={feature.tools} tools={toolBySlug} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <FaqAccordion heading={`${feature.name} FAQ`} items={feature.faqs} />
        </Container>
      </Section>
    </article>
  );
}
