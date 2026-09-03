import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";
import { tools } from "@/data/tools";
import { useCases } from "@/data/use-cases";
import { posts } from "@/data/posts";
import { features } from "@/data/features";

const BASE_URL = "https://ammarai-creative-hub.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const addDynamic = (routeId: "/$slug" | "/blog/$slug" | "/features/$slug", slugs: string[]) => {
          const to = routeId;
          if (!isSitemapRouteIncluded(router.routesById[routeId])) return;
          for (const slug of slugs) {
            const location = router.buildLocation({
              to,
              params: { slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, routeId);
            if (path) entries.push({ path });
          }
        };

        addDynamic("/$slug", [
          ...tools.map((t) => t.slug),
          ...useCases.map((u) => u.slug),
        ]);
        addDynamic("/blog/$slug", posts.map((p) => p.slug));
        addDynamic("/features/$slug", features.map((f) => f.slug));

        if (entries.length === 0) {
          return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
