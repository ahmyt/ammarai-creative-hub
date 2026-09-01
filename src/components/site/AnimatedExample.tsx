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

/** Bold inline labels like "Hook:" / "Step 1:" so streamed output reads with structure. */
function renderOutput(text: string) {
  const parts = text.split(/((?:^|\s)[A-Z][A-Za-z0-9 ]{1,14}:)/g);
  return parts.map((part, i) => {
    const match = part.match(/^(\s*)([A-Z][A-Za-z0-9 ]{1,14}:)$/);
    if (!match) return <span key={i}>{part}</span>;
    return (
      <span key={i}>
        {match[1]}
        <strong className="font-semibold text-foreground">{match[2]}</strong>
      </span>
    );
  });
}

/**
 * Replays a tool's example as a live-looking session: the prompt types itself in,
 * the model "thinks", then the output streams out word by word.
 */
export function AnimatedExample({
  examples,
  toolName,
  demoVideo,
  className,
}: {
  examples: Example[];
  toolName: string;
  demoVideo?: { url: string; caption: string };
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

    if (phase === "writing" && demoVideo) {
      const t = setTimeout(() => setPhase("resting"), 5200);
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
      className={cn(
        "overflow-hidden rounded-2xl bg-card shadow-[0_2px_24px_-8px_rgba(0,0,0,0.08)] ring-1 ring-border",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-secondary/40 px-4 py-3 sm:px-5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        </span>
        <p className="text-xs font-semibold tracking-tight text-foreground/80">
          {toolName}
          <span className="ml-2 font-normal text-muted-foreground">live example</span>
        </p>
        <span className="ml-auto flex items-center gap-2">
          {examples.length > 1 ? (
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {index + 1} of {examples.length}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-foreground/70 ring-1 ring-border transition-colors hover:bg-secondary hover:text-foreground"
          >
            {playing ? "Pause" : "Play"}
          </button>
        </span>
      </div>

      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <div>
          <p className="text-xs font-semibold text-foreground/70">You type</p>
          <div className="mt-2 rounded-xl rounded-tl-sm bg-secondary/60 px-4 py-3 ring-1 ring-border/60">
            <p className="min-h-[3rem] text-pretty font-mono text-[13px] leading-relaxed text-foreground">
              {typed}
              {phase === "typing" ? (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
              ) : null}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-foreground/70">
              {demoVideo ? "AmmarAI renders" : "AmmarAI writes"}
            </p>
            {phase === "thinking" ? (
              <span className="flex gap-1" aria-label="Generating">
                <Dot delay="0ms" />
                <Dot delay="140ms" />
                <Dot delay="280ms" />
              </span>
            ) : null}
          </div>
          <div className="mt-2 rounded-xl rounded-tr-sm bg-accent/[0.06] px-4 py-3 ring-1 ring-accent/15">
            {demoVideo ? (
              <div>
                <video
                  key={demoVideo.url}
                  src={demoVideo.url}
                  className="w-full rounded-lg bg-secondary ring-1 ring-border/60"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={`${toolName} sample output video`}
                />
                <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/85">
                  {demoVideo.caption}
                </p>
                <p className="mt-2 text-pretty text-xs leading-relaxed text-muted-foreground">
                  {example.output}
                </p>
              </div>
            ) : (
              <p
                aria-live="polite"
                className="min-h-[5rem] text-pretty text-sm leading-relaxed text-foreground/85"
              >
                {renderOutput(written)}
                {phase === "writing" ? (
                  <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
                ) : null}
              </p>
            )}
          </div>
        </div>


        {examples.length > 1 ? (
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {examples.map((ex, i) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  i === index
                    ? "bg-ink text-ink-foreground"
                    : "text-foreground/70 ring-1 ring-border hover:bg-secondary hover:text-foreground",
                )}
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
