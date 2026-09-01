import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: As = "h2",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <As className="text-balance text-3xl leading-[1.08] sm:text-4xl">{title}</As>
      {intro ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "sand" | "ink";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        tone === "sand" && "bg-sand",
        tone === "ink" && "bg-ink text-ink-foreground",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
  interactive,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card p-5 ring-1 ring-border",
        interactive && "transition-all duration-200 hover:-translate-y-0.5 hover:ring-accent/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function NumberedList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="mt-6">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-5 border-t border-border py-5 last:border-b">
          <span className="font-display text-sm font-semibold text-accent tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("prose-editorial", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
