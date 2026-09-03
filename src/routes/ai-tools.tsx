import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { categoryOrder, suggestTools } from "@/data/tools";
import { siteContentQuery } from "@/lib/content";
import { Container, Section } from "@/components/site/primitives";
import { ToolCard } from "@/components/site/ToolCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { SITE, REGISTER_URL } from "@/lib/site";

const title = "All AI Tools: 60+ Generators in One Workspace | AmmarAI";
const description =
  "Browse every AmmarAI tool: writing, chat, images, video, voice, transcription, vision, documents, SEO, e-commerce and code.";

export const Route = createFileRoute("/ai-tools")({
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
  component: ToolsDirectory,
});

function ToolsDirectory() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const tools = content.tools;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const usedCategories = useMemo(
    () => categoryOrder.filter((c) => tools.some((t) => t.category === c)),
    [tools],
  );

  const suggestions = useMemo(() => {
    const bySlug = new Map(tools.map((t) => [t.slug, t]));
    return suggestTools(query)
      .map((t) => bySlug.get(t.slug))
      .filter((t): t is (typeof tools)[number] => Boolean(t));
  }, [query, tools]);

  const filtered = useMemo(() => {
    if (query.trim()) return suggestions;
    return category === "All" ? tools : tools.filter((t) => t.category === category);
  }, [query, category, suggestions, tools]);

  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "AI Tools" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">The library</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Every AI tool, one workspace, one subscription
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {tools.length} tools across writing, chat, image, video, voice, transcription, vision,
              documents, marketing, SEO, e-commerce and code. Describe what you are trying to make
              and the directory will point you at the right one.
            </p>
          </div>

          <div className="mt-8 max-w-xl">
            <label htmlFor="tool-search" className="sr-only">
              Search the tool library
            </label>
            <input
              id="tool-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: write product descriptions, make a voiceover, edit a photo…"
              className="w-full rounded-md bg-card px-4 py-3.5 text-sm text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-2 focus:outline-offset-2 focus:outline-ring"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setQuery("");
              }}
              aria-pressed={category === "All" && !query}
              className={
                category === "All" && !query
                  ? "rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-ink-foreground"
                  : "rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
              }
            >
              All
            </button>
            {usedCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setQuery("");
                }}
                aria-pressed={category === c && !query}
                className={
                  category === c && !query
                    ? "rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-ink-foreground"
                    : "rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
                }
              >
                {c}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
            {query ? " matched" : category === "All" ? "" : ` in ${category}`}
          </p>
          {filtered.length === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">
              Nothing matched that. Try a plainer description of the job, such as “blog post”,
              “voiceover” or “product photo”.
            </p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Every tool is on the free plan</h2>
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
