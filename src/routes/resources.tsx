import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/posts";
import { featuredTools, popularTools } from "@/data/tools";
import { features } from "@/data/features";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ToolCard } from "@/components/site/ToolCard";

const title = "Resources: Guides, Playbooks and Tool Picks | AmmarAI";
const description =
  "Practical guides to using AI well: writing workflows, video and voice production, SEO, prompting and platform features.";

export const Route = createFileRoute("/resources")({
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
  component: Resources,
});

function Resources() {
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Resources" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Learn</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Everything worth reading before you generate anything
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Guides written for people doing the work, with the limits stated honestly. Start with
              prompting, then pick the workflow closest to your job.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <SectionHeading eyebrow="Guides" title="Read these first" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <Card key={post.slug} interactive className="p-6">
                <p className="eyebrow">{post.category}</p>
                <h3 className="mt-3 text-base font-semibold">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Start here" title="The tools most people open first" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...featuredTools, ...popularTools].slice(0, 6).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Platform" title="How the workspace itself works" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.slice(0, 6).map((f) => (
              <Card key={f.slug} interactive className="p-6">
                <h3 className="text-base font-semibold">
                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {f.name}
                  </Link>
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {f.summary}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
