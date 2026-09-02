import { createFileRoute, Link } from "@tanstack/react-router";
import { Home } from "./index";

export const Route = createFileRoute("/theme-preview")({
  head: () => ({
    meta: [
      { title: "Purple Theme Preview — AmmarAI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThemePreview,
});

function ThemePreview() {
  return (
    <div>
      <div className="bg-ink text-ink-foreground px-4 py-2 text-center text-sm">
        Previewing the <strong>Purple Nocturne Prism</strong> theme —{" "}
        <Link to="/" className="underline underline-offset-2">
          back to live site
        </Link>
      </div>
      <div className="theme-nocturne">
        <Home />
      </div>
    </div>
  );
}
