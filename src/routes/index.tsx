import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { tools, featuredTools, popularTools, recentTools, usedCategories, suggestTools, toolsByCategory } from "@/data/tools";
import { useCases } from "@/data/use-cases";
import { features } from "@/data/features";
import { posts } from "@/data/posts";
import { SITE, organizationJsonLd } from "@/lib/site";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { ToolCard } from "@/components/site/ToolCard";
import { ExternalButton, ButtonLink } from "@/components/site/Button";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";

const title = "AmmarAI: One AI Platform for Writing, Video, Voice and Code";
const description =
  "60+ AI tools in one workspace: write, chat, generate images and video, create voiceovers, transcribe audio, analyze documents and code.";

const homeFaqs = [
  {
    q: "What is AmmarAI?",
    a: "A single AI workspace covering writing, chat, image and video generation, voice, transcription, vision, document analysis and code, so you are not paying for and switching between six separate services.",
  },
  {
    q: "Is it free to start?",
    a: "Yes. The free plan is permanent and includes every tool with a monthly allowance, which is enough to produce real work before deciding to pay.",
  },
  {
    q: "Who is it for?",
    a: "Marketers, creators, small businesses, agencies, e-commerce teams, students and developers. The use case pages describe each workflow in detail.",
  },
  {
    q: "Does it replace writers and designers?",
    a: "No. It removes the blank page and the repetitive production work. The output still needs a person who knows the subject to verify claims and add the specifics that make it worth reading.",
  },
];

export const Route = createFileRoute("/")({
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
  component: Home,
});

function Home() {
  const [query, setQuery] = useState("");
  const suggestions = useMemo(() => suggestTools(query).slice(0, 5), [query]);

  const categoryPreview = useMemo(
    () =>
      usedCategories.slice(0, 8).map((c) => ({
        category: c,
        count: toolsByCategory(c).length,
        sample: toolsByCategory(c).slice(0, 3),
      })),
    [],
  );

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      {/* Hero */}
      <Section className="pb-14 pt-16 sm:pb-20 sm:pt-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">{tools.length} tools · one subscription</p>
              <h1 className="mt-5 text-balance text-5xl leading-[1.02] sm:text-6xl">
                One AI for everything you create
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Write, chat, generate images and video, produce voiceovers, transcribe recordings,
                read documents and ship code. All of it in one workspace that keeps your brand voice
                and your history in one place.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ExternalButton href={`${SITE.appUrl}/signup`} size="lg">
                  Start creating free
                </ExternalButton>
                <ButtonLink to="/ai-tools" variant="outline" size="lg">
                  Explore {tools.length} tools
                </ButtonLink>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                No card required on the free plan. Cancel a paid plan any time.
              </p>
            </div>

            {/* Discovery panel */}
            <Card className="p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.45)]">
              <p className="eyebrow">Find the right tool</p>
              <label htmlFor="home-search" className="sr-only">
                Describe what you want to make
              </label>
              <input
                id="home-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe what you want to make…"
                className="mt-4 w-full rounded-md bg-background px-4 py-3 text-sm text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-2 focus:outline-offset-2 focus:outline-ring"
              />
              <div className="mt-4 min-h-[13rem]">
                {query.trim() === "" ? (
                  <div>
                    <p className="text-xs text-muted-foreground">Try one of these:</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "a blog post about pricing",
                        "product descriptions",
                        "a voiceover for a reel",
                        "transcribe an interview",
                        "an ad for Instagram",
                      ].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setQuery(s)}
                          className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : suggestions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nothing matched. Try plainer words, like “video”, “email” or “photo”.
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {suggestions.map((tool) => (
                      <li key={tool.slug} className="py-2.5">
                        <Link
                          to="/$slug"
                          params={{ slug: tool.slug }}
                          className="group flex items-start justify-between gap-3"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-foreground group-hover:text-accent">
                              {tool.name}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                              {tool.summary}
                            </span>
                          </span>
                          <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Featured */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="Flagship tools"
            title="The tools most people come here for"
            intro="Each one has a full guide covering what it does well, where it fails and how to brief it properly."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Categories */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The library"
            title="Organised by the job, not by the technology"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryPreview.map((group) => (
              <Card key={group.category} className="p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-foreground">{group.category}</h3>
                  <span className="text-xs tabular-nums text-muted-foreground">{group.count}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {group.sample.map((t) => (
                    <li key={t.slug}>
                      <Link
                        to="/$slug"
                        params={{ slug: t.slug }}
                        className="text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/ai-tools" variant="outline">
              See all {tools.length} tools
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Popular + recent */}
      <Section tone="sand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Popular" title="Used most this month" />
              <ul className="mt-6 border-t border-border">
                {popularTools.slice(0, 6).map((tool) => (
                  <li key={tool.slug} className="border-b border-border py-3.5">
                    <Link
                      to="/$slug"
                      params={{ slug: tool.slug }}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="font-semibold text-foreground hover:text-accent">
                        {tool.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{tool.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="New" title="Recently added" />
              <div className="mt-6 grid gap-4">
                {recentTools.slice(0, 3).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why one workspace"
            title="What makes sixty tools feel like one product"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Use cases */}
      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Use cases" title="Built around how people actually work" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.slice(0, 6).map((uc) => (
              <Card key={uc.slug} interactive className="p-6">
                <p className="eyebrow">{uc.audience}</p>
                <h3 className="mt-3 text-base font-semibold">
                  <Link
                    to="/$slug"
                    params={{ slug: uc.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {uc.name}
                  </Link>
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {uc.summary}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/use-cases" variant="outline">
              All use cases
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Blog */}
      <Section>
        <Container>
          <SectionHeading eyebrow="From the blog" title="Guides worth your time" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Card key={post.slug} interactive className="p-6">
                <p className="eyebrow">{post.category}</p>
                <h3 className="mt-3 text-balance text-base font-semibold leading-snug">
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

      {/* FAQ */}
      <Section tone="sand">
        <Container size="narrow">
          <FaqAccordion heading="Common questions" items={homeFaqs} />
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ink" className="py-20">
        <Container className="text-center">
          <h2 className="text-balance text-4xl leading-tight sm:text-5xl">
            Start with the free plan
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            Every tool, no card required. Upgrade only when your output volume makes the case for
            it.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ExternalButton href={`${SITE.appUrl}/signup`} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
            <ButtonLink to="/pricing" variant="ghost" size="lg" className="text-ink-foreground">
              Compare plans
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </div>
  );
}
