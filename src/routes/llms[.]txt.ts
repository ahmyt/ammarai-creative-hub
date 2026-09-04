import { createFileRoute } from "@tanstack/react-router";
import { loadSiteContent } from "@/lib/content";
import { fetchSyndicatedArticles } from "@/lib/articles";

const BASE_URL = "https://ammarai.com";

export const Route = createFileRoute("/llms.txt")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const content = await loadSiteContent().catch(() => ({
          tools: [],
          useCases: [],
          features: [],
          posts: [],
          pages: [],
        }));
        const syndicated = await fetchSyndicatedArticles().catch(() => []);
        const visibleSyndicated = syndicated
          .filter((a) => !a.is_hidden)
          .map((a) => a.title);

        const lines: string[] = [];
        lines.push("# AmmarAI");
        lines.push("");
        lines.push(
          "> One AI workspace for everything you create — writing, chat, images, video, voiceovers, transcription, document analysis and code across " +
            content.tools.length +
            " tools. Brand voice, templates, assistants, bulk generation and team workspaces in one place. Free plan available.",
        );
        lines.push("");

        lines.push("## AI Tools");
        for (const tool of content.tools) {
          lines.push(`- [${tool.name}](${BASE_URL}/${tool.slug}): ${tool.summary}`);
        }
        lines.push("");

        lines.push("## Platform Features");
        for (const feature of content.features) {
          lines.push(
            `- [${feature.name}](${BASE_URL}/features/${feature.slug}): ${feature.summary}`,
          );
        }
        lines.push("");

        lines.push("## Use Cases");
        for (const useCase of content.useCases) {
          lines.push(
            `- [${useCase.name}](${BASE_URL}/${useCase.slug}): ${useCase.summary}`,
          );
        }
        lines.push("");

        lines.push("## Blog");
        for (const post of content.posts) {
          lines.push(`- [${post.title}](${BASE_URL}/blog/${post.slug})`);
        }
        if (visibleSyndicated.length > 0) {
          lines.push("");
          lines.push("Published synced articles:");
          for (const title of visibleSyndicated) {
            lines.push(`- ${title}`);
          }
        }
        lines.push("");

        lines.push("## Company");
        const companyLinks: { label: string; path: string; desc: string }[] = [
          { label: "About", path: "/about", desc: "What AmmarAI is and who it is for" },
          {
            label: "Pricing",
            path: "/pricing",
            desc: "Free, Starter, Professional and Ultimate plans",
          },
          {
            label: "AI Tools directory",
            path: "/ai-tools",
            desc: `Browse all ${content.tools.length} tools`,
          },
          { label: "FAQ", path: "/faq", desc: "Common questions about the platform" },
          { label: "Resources", path: "/resources", desc: "Guides and help" },
          { label: "Contact", path: "/contact", desc: "Sales, support and partnerships" },
        ];
        for (const link of companyLinks) {
          lines.push(`- [${link.label}](${BASE_URL}${link.path}): ${link.desc}`);
        }
        lines.push("");

        return new Response(lines.join("\n"), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
