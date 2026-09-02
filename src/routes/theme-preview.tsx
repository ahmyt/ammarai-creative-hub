import { createFileRoute, Link } from "@tanstack/react-router";
import { Home } from "./index";

const title = "Nocturne Prism theme preview — AmmarAI";
const description =
  "Internal preview of the purple Nocturne Prism visual direction applied to the AmmarAI homepage.";

export const Route = createFileRoute("/theme-preview")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThemePreview,
});

function ThemePreview() {
  return (
    <div className="theme-nocturne min-h-screen bg-background text-foreground">
      {/* Demo banner */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3 text-xs text-muted-foreground">
          <p>
            <span className="font-semibold text-accent">Theme demo:</span> Nocturne Prism (purple)
            — content-only preview. The live site keeps the current light theme.
          </p>
          <Link to="/" className="font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline">
            Back to current theme →
          </Link>
        </div>
      </div>
      <Home />
    </div>
  );
}
