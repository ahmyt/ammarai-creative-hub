import { useEffect, useMemo, useRef, useState } from "react";
import type { Example } from "@/data/types";
import type { ToolDemoMedia } from "@/data/tool-demos";
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
  demoVideos,
  className,
}: {
  examples: Example[];
  toolName: string;
  demoVideos?: (ToolDemoMedia | undefined)[] | undefined;
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
  const media = demoVideos?.[index];
  const demoVideo = media?.url ? media : undefined;
  const demoCode = media?.code ? media : undefined;
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
      setWritten(demoCode?.code ?? example.output);
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

    if (phase === "writing" && demoCode) {
      const full = demoCode.code ?? "";
      if (written.length >= full.length) {
        const t = setTimeout(() => setPhase("resting"), 1200);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setWritten(full.slice(0, written.length + 3)), 12);
      return () => clearTimeout(t);
    }

    if (phase === "writing" && demoVideo) {
      const hold = demoVideo.kind === "audio" ? 12000 : demoVideo.kind === "image" ? 4200 : 5200;
      const t = setTimeout(() => setPhase("resting"), hold);
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
  }, [active, reduced, phase, typed, written, example, outputWords, examples.length, demoVideo, demoCode]);

  if (!example) return null;

  const outputKind = demoCode
    ? "code"
    : demoVideo?.kind === "audio"
      ? "audio"
      : demoVideo?.kind === "image"
        ? "image"
        : demoVideo
          ? "video"
          : "text";

  const outputVerb =
    outputKind === "code"
      ? "AmmarAI codes"
      : outputKind === "audio"
        ? "AmmarAI speaks"
        : outputKind === "image" || outputKind === "video"
          ? "AmmarAI renders"
          : "AmmarAI writes";

  const inputVerb = media?.inputImage
    ? "You upload + type"
    : media?.inputAudio
      ? "You record"
      : media?.inputFileLabel
        ? "You attach + ask"
        : "You type";

  const progress =
    phase === "typing"
      ? (typed.length / Math.max(example.input.length, 1)) * 0.35
      : phase === "thinking"
        ? 0.42
        : phase === "writing"
          ? demoCode
            ? 0.45 + (written.length / Math.max((demoCode.code ?? "").length, 1)) * 0.5
            : demoVideo
              ? 0.7
              : 0.45 +
                ((written ? written.split(" ").length : 0) / Math.max(outputWords.length, 1)) * 0.5
          : 1;

  const statusLabel =
    phase === "typing"
      ? "Writing the prompt"
      : phase === "thinking"
        ? "Generating"
        : phase === "writing"
          ? "Delivering output"
          : "Complete";

  return (
    <div
      ref={containerRef}
      className={cn(
        "group/demo overflow-hidden rounded-3xl bg-card shadow-[0_28px_70px_-42px_rgba(60,40,20,0.42)] ring-1 ring-border",
        className,
      )}
    >
      {/* Chrome */}
      <div className="relative border-b border-border bg-gradient-to-b from-secondary/70 to-secondary/25 px-4 pb-3 pt-3.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span
              className={cn(
                "absolute inset-0 rounded-full bg-accent",
                phase !== "resting" && active ? "demo-ping" : "",
              )}
            />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="min-w-0 text-[13px] font-semibold tracking-tight text-foreground">
            <span className="truncate">{toolName}</span>
          </p>
          <span className="rounded-full bg-accent/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent ring-1 ring-accent/25">
            Live demo
          </span>
          <span className="ml-auto flex items-center gap-2.5">
            <span
              aria-live="polite"
              className="hidden text-[11px] font-medium tabular-nums text-muted-foreground sm:inline"
            >
              {statusLabel}
            </span>
            {examples.length > 1 ? (
              <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
                {index + 1}/{examples.length}
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause the demo" : "Play the demo"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-foreground/70 ring-1 ring-border transition-colors hover:bg-secondary hover:text-foreground"
            >
              {playing ? (
                <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
                  <rect x="2" y="1.5" width="3" height="9" rx="1" />
                  <rect x="7" y="1.5" width="3" height="9" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
                  <path d="M3 1.7 10 6 3 10.3z" />
                </svg>
              )}
            </button>
          </span>
        </div>
        {/* Progress rail */}
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-border/70">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-200 ease-linear"
            style={{ width: `${Math.min(100, Math.max(2, progress * 100))}%` }}
          />
        </div>
      </div>

      <div className="demo-grid px-4 py-5 sm:px-6 sm:py-7">
        {/* Input */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-ink-foreground">
              You
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {inputVerb}
            </p>
          </div>
          <div className="mt-2.5 rounded-2xl rounded-tl-md bg-card px-4 py-3.5 shadow-[0_1px_0_rgba(0,0,0,0.02)] ring-1 ring-border">
            {media?.inputImage ? (
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-secondary/60 p-2 ring-1 ring-border/70">
                <img
                  src={media.inputImage}
                  alt={media.inputImageAlt ?? "Source image for the sample"}
                  loading="lazy"
                  className="h-14 w-20 shrink-0 rounded-lg object-cover ring-1 ring-border/60"
                />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-foreground">
                    Source image attached
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {media.inputImageAlt ?? "Uploaded still"}
                  </span>
                </span>
              </div>
            ) : null}
            {media?.inputAudio ? (
              <div className="mb-3 rounded-xl bg-secondary/60 p-2 ring-1 ring-border/70">
                <p className="mb-2 truncate text-xs font-semibold text-foreground">
                  {media.inputAudioLabel ?? "Recording attached"}
                </p>
                <audio
                  key={media.inputAudio}
                  src={media.inputAudio}
                  controls
                  preload="none"
                  className="w-full"
                  aria-label={`${toolName} sample input recording`}
                />
              </div>
            ) : null}
            {media?.inputFileLabel ? (
              <p className="mb-3 inline-flex items-center gap-2 rounded-lg bg-secondary/70 px-2.5 py-1.5 text-xs font-semibold text-foreground ring-1 ring-border/70">
                <span aria-hidden="true">📄</span>
                {media.inputFileLabel}
              </p>
            ) : null}
            <p className="min-h-[2.5rem] text-pretty font-mono text-[13px] leading-relaxed text-foreground">
              {typed}
              {phase === "typing" ? (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
              ) : null}
            </p>
          </div>
        </div>

        {/* Connector */}
        <div className="flex items-center gap-3 py-3.5" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full ring-1 transition-colors",
              phase === "thinking"
                ? "bg-accent text-accent-foreground ring-accent"
                : "bg-card text-muted-foreground ring-border",
            )}
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current">
              <path d="M6 1.5 6 8.2 3.4 5.6 2.4 6.6 6 10.2 9.6 6.6 8.6 5.6 6 8.2z" />
            </svg>
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 items-center rounded-full bg-accent/15 px-2 text-[9px] font-bold uppercase tracking-wider text-accent">
              AI
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {outputVerb}
            </p>
            {phase === "thinking" ? (
              <span className="flex gap-1" aria-label="Generating">
                <Dot delay="0ms" />
                <Dot delay="140ms" />
                <Dot delay="280ms" />
              </span>
            ) : null}
          </div>

          <div className="relative mt-2.5 overflow-hidden rounded-2xl rounded-tr-md bg-card p-4 shadow-[0_18px_40px_-32px_rgba(60,40,20,0.5)] ring-1 ring-accent/25">
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden="true"
            />
            {phase === "thinking" ? (
              <div className="space-y-2.5 py-1" aria-hidden="true">
                {["w-11/12", "w-full", "w-8/12"].map((w) => (
                  <div key={w} className={cn("relative h-3 overflow-hidden rounded-full bg-secondary", w)}>
                    <span className="demo-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                  </div>
                ))}
              </div>
            ) : demoCode ? (
              <div className="demo-reveal">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-foreground">
                    {demoCode.language ?? "code"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">generated file</span>
                </div>
                <pre className="mt-3 max-h-80 overflow-auto rounded-xl bg-ink px-4 py-3.5 text-[12px] leading-relaxed text-ink-foreground ring-1 ring-border/40">
                  <code className="whitespace-pre font-mono">
                    {written}
                    {phase === "writing" ? (
                      <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
                    ) : null}
                  </code>
                </pre>
                <p className="mt-3 text-pretty text-xs leading-relaxed text-muted-foreground">
                  {demoCode.caption ?? example.output}
                </p>
              </div>
            ) : demoVideo ? (
              <div className="demo-reveal">
                {demoVideo.kind === "audio" ? (
                  <div className="rounded-xl bg-secondary/60 p-3 ring-1 ring-border/70">
                    <audio
                      key={demoVideo.url}
                      src={demoVideo.url}
                      controls
                      preload="metadata"
                      className="w-full"
                      aria-label={`${toolName} sample output audio`}
                    />
                  </div>
                ) : (
                  <figure className="overflow-hidden rounded-xl bg-ink ring-1 ring-border/50">
                    {demoVideo.kind === "image" ? (
                      <img
                        key={demoVideo.url}
                        src={demoVideo.url}
                        alt={demoVideo.caption ?? `${toolName} sample output image`}
                        loading="lazy"
                        className="w-full object-cover"
                      />
                    ) : (
                      <video
                        key={demoVideo.url}
                        src={demoVideo.url}
                        className="w-full"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={`${toolName} sample output video`}
                      />
                    )}
                  </figure>
                )}
                <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/85">
                  {demoVideo.caption}
                </p>
                <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
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

        {/* Example switcher */}
        {examples.length > 1 ? (
          <div className="mt-5 flex items-center gap-3">
            <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:inline">
              Try
            </span>
            <div className="flex gap-1.5 overflow-x-auto rounded-full bg-secondary/70 p-1 ring-1 ring-border/70 sm:flex-wrap sm:overflow-visible">
              {examples.map((ex, i) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                    i === index
                      ? "bg-ink text-ink-foreground shadow-[0_6px_14px_-8px_rgba(0,0,0,0.6)]"
                      : "text-foreground/65 hover:bg-card hover:text-foreground",
                  )}
                >
                  {ex.label}
                </button>
              ))}
            </div>
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
