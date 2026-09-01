import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/posts";
import { Container, Section } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const title = "Blog: Practical AI Guides and Workflows | AmmarAI";
const description =
  "Long-form guides on writing, video, voice, SEO and productivity with AI, written for people shipping real work.";

export const Route = createFileRoute("/blog/")({
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
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Writing</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Guides from people who use these tools every day
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              No hype, no ten-times-your-output promises. Just how the workflows are actually run
              and where they break.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container size="narrow">
          <ul className="border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border py-7">
                <p className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="text-accent">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </p>
                <h2 className="mt-3 text-balance text-2xl leading-snug">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </div>
  );
}
