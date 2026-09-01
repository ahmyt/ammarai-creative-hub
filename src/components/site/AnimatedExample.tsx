import { useEffect, useMemo, useRef, useState } from "react";
import type { Example } from "@/data/types";
import { cn } from "@/lib/utils";

type Phase = "typing" | "thinking" | "writing" | "resting";

const TYPE_MS = 22;
const THINK_MS = 700;
const WRITE_MS = 26;
const REST_MS = 2600;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Replays a tool's example as a live-looking session: the prompt types itself in,
 * the model "thinks", then the output streams out word by word.
 */
export function AnimatedExample({
  examples,
  toolName,
  className,
}: {
  examples: Example[];
  toolName: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [written, setWritten] = useState("");
  const [playing, setPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const example = examples[index];
  const outputWords = useMemo(() => (example?.output ?? "").split(" "), [example?.output]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Reset whenever the selected example changes.
  useEffect(() => {
    setTyped("");
    setWritten("");
    setPhase("typing");
  }, [index]);

  const active = playing && inView && !reduced && examples.length > 0;

  useEffect(() => {
    if (!example) return;
    if (reduced) {
      setTyped(example.input);
      setWritten(example.output);
      setPhase("resting");
      return;
    }
    if (!active) return;

    if (phase === "typing") {
      if (typed.length >= example.input.length) {
        const t = setTimeout(() => setPhase("thinking"), 240);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyped(example.input.slice(0, typed.length + 1)), TYPE_MS);
      return () => clearTimeout(t);
    }

    if (phase === "thinking") {
      const t = setTimeout(() => setPhase("writing"), THINK_MS);
      return () => clearTimeout(t);
    }

    if (phase === "writing") {
      const count = written ? written.split(" ").length : 0;
      if (count >= outputWords.length) {
        const t = setTimeout(() => setPhase("resting"), 400);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setWritten(outputWords.slice(0, count + 1).join(" ")),
        WRITE_MS + (count % 5) * 8,
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % examples.length);
    }, REST_MS);
    return () => clearTimeout(t);
  }, [active, reduced, phase, typed, written, example, outputWords, examples.length]);

  if (!example) return null;

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden rounded-2xl bg-card ring-1 ring-border", className)}
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {toolName} · live example
        </p>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="ml-auto rounded-full px-2.5 py-1 text-[11px] font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <div className="px-5 py-6 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {example.label}
        </p>

        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Your input
          </p>
          <p className="mt-1.5 min-h-[3rem] text-pretty font-mono text-[13px] leading-relaxed text-foreground">
            {typed}
            {phase === "typing" ? (
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
            ) : null}
          </p>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              AmmarAI output
            </p>
            {phase === "thinking" ? (
              <span className="flex gap-1" aria-label="Generating">
                <Dot delay="0ms" />
                <Dot delay="140ms" />
                <Dot delay="280ms" />
              </span>
            ) : null}
          </div>
          <p
            aria-live="polite"
            className="mt-1.5 min-h-[5rem] text-pretty text-sm leading-relaxed text-muted-foreground"
          >
            {written}
            {phase === "writing" ? (
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
            ) : null}
          </p>
        </div>

        {examples.length > 1 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {examples.map((ex, i) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className={
                  i === index
                    ? "rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-ink-foreground"
                    : "rounded-full px-3 py-1.5 text-[11px] font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
                }
              >
                {ex.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
      style={{ animationDelay: delay }}
    />
  );
}
