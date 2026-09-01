import { Link } from "@tanstack/react-router";
import type { Tool } from "@/data/types";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, className }: { tool: Tool; className?: string }) {
  return (
    <Link
      to="/$slug"
      params={{ slug: tool.slug }}

      className={cn(
        "group flex flex-col rounded-xl bg-card p-5 ring-1 ring-border transition-all duration-200 hover:-translate-y-0.5 hover:ring-accent/50",
        className,
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {tool.category}
      </span>
      <h3 className="mt-2 flex items-start justify-between gap-3 font-sans text-base font-semibold leading-snug text-foreground">
        <span>{tool.name}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
        {tool.summary}
      </p>
    </Link>
  );
}

export function RelatedTools({ slugs, tools }: { slugs: string[]; tools: Map<string, Tool> }) {
  const items = slugs.map((s) => tools.get(s)).filter((t): t is Tool => Boolean(t));
  if (items.length === 0) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
