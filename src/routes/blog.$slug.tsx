import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Post } from "@/data/types";
import { siteContentQuery } from "@/lib/content";
import { articleDate, syndicatedArticlesQuery, type SyndicatedArticle } from "@/lib/articles";
import { Container, Section, BulletList } from "@/components/site/primitives";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { SITE, REGISTER_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params, context }) => {
    const content = await context.queryClient.ensureQueryData(siteContentQuery);
    const post = content.posts.find((p) => p.slug === params.slug);
    if (post) return { post, article: null };

    const articles = await context.queryClient.ensureQueryData(syndicatedArticlesQuery);
    const article = articles.find((a) => a.slug === params.slug && !a.is_hidden);
    if (!article) throw notFound();
    return { post: null, article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const metaTitle = loaderData.post
      ? loaderData.post.metaTitle
      : `${loaderData.article!.title} | ${SITE.name}`;
    const description = loaderData.post
      ? loaderData.post.description
      : (loaderData.article!.meta_description ?? SITE.tagline);
    const image = loaderData.article?.hero_image_url;
    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: description },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image?.startsWith("https://")
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post, article } = Route.useLoaderData();
  if (!post && article) return <SyndicatedArticleView article={article} />;
  return <StaticPostView post={post!} />;
}

function SyndicatedArticleView({ article }: { article: SyndicatedArticle }) {
  const jsonLd = article.json_ld ?? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description ?? undefined,
    datePublished: article.published_at ?? article.synced_at,
    image: article.hero_image_url ?? undefined,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {article.faq_json_ld ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article.faq_json_ld) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: article.title, path: `/blog/${article.slug}` },
            ]),
          ),
        }}
      />

      <Section className="pb-6 pt-10 sm:pt-14">
        <Container size="narrow">
          <Breadcrumbs
            items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: "Guide" }]}
          />
          <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <time dateTime={articleDate(article)}>{articleDate(article)}</time>
          </p>
          <h1 className="mt-4 text-balance text-4xl leading-[1.08] sm:text-5xl">{article.title}</h1>
          {article.meta_description ? (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {article.meta_description}
            </p>
          ) : null}
          {article.hero_image_url ? (
            <img
              src={article.hero_image_url}
              alt={article.title}
              loading="lazy"
              className="mt-8 w-full rounded-xl border border-border object-cover"
            />
          ) : null}
        </Container>
      </Section>

      <Section className="py-8">
        <Container size="narrow">
          <div
            className="prose-editorial syndicated-article"
            dangerouslySetInnerHTML={{ __html: article.content_html ?? "" }}
          />
        </Container>
      </Section>

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Try it on your own work</h2>
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
    </article>
  );
}

function StaticPostView({ post }: { post: Post }) {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const postBySlug = new Map(content.posts.map((p) => [p.slug, p]));
  const related = post.related
    .map((slug) => postBySlug.get(slug))
    .filter((p): p is Post => Boolean(p) && p!.slug !== post.slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: post.title, path: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />

      <Section className="pb-6 pt-10 sm:pt-14">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: post.category },
            ]}
          />
          <p className="mt-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="text-accent">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.date}</time>
          </p>
          <h1 className="mt-4 text-balance text-4xl leading-[1.08] sm:text-5xl">{post.title}</h1>
          <div className="prose-editorial mt-6">
            {post.intro.map((p) => (
              <p key={p.slice(0, 40)} className="text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-8">
        <Container size="narrow">
          {post.sections.map((section) => (
            <section key={section.heading} className="mt-10 first:mt-0">
              <h2 className="text-balance text-2xl sm:text-3xl">{section.heading}</h2>
              <div className="prose-editorial mt-4">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {section.bullets ? <BulletList items={section.bullets} className="mt-4" /> : null}
            </section>
          ))}
        </Container>
      </Section>

      <Section tone="sand">
        <Container size="narrow">
          <h2 className="text-2xl sm:text-3xl">Takeaways</h2>
          <BulletList items={post.takeaways} className="mt-5" />
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section>
          <Container size="narrow">
            <h2 className="text-2xl sm:text-3xl">Keep reading</h2>
            <ul className="mt-5 border-t border-border">
              {related.map((r) => (
                <li key={r.slug} className="border-b border-border py-4">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
                    className="text-base font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {r.title}
                  </Link>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {r.excerpt}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Try it on your own work</h2>
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
    </article>
  );
}
