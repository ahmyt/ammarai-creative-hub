import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  placeholder?: string;
};

type Action = { label: string; title: string; wrap?: [string, string]; prefix?: string };

const actions: Action[] = [
  { label: "B", title: "Bold", wrap: ["**", "**"] },
  { label: "I", title: "Italic", wrap: ["*", "*"] },
  { label: "</>", title: "Inline code", wrap: ["`", "`"] },
  { label: "H2", title: "Heading", prefix: "## " },
  { label: "•", title: "Bullet list", prefix: "- " },
  { label: "1.", title: "Numbered list", prefix: "1. " },
  { label: "❝", title: "Quote", prefix: "> " },
];

export function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("`"))
      nodes.push(
        <code key={key++} className="rounded bg-card px-1 py-0.5 text-[0.9em]">
          {tok.slice(1, -1)}
        </code>,
      );
    else if (tok.startsWith("[")) {
      const label = tok.slice(1, tok.indexOf("]"));
      const href = tok.slice(tok.indexOf("(") + 1, -1);
      nodes.push(
        <a key={key++} href={href} className="underline underline-offset-4">
          {label}
        </a>,
      );
    } else nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function RichTextArea({ value, onChange, rows = 4, placeholder }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);
  const [full, setFull] = useState(false);

  const apply = (action: Action) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    let next = value;
    let caret = end;
    if (action.wrap) {
      const [a, b] = action.wrap;
      next = value.slice(0, start) + a + (selected || "text") + b + value.slice(end);
      caret = start + a.length + (selected || "text").length + b.length;
    } else if (action.prefix) {
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      next = value.slice(0, lineStart) + action.prefix + value.slice(lineStart);
      caret = end + action.prefix.length;
    }
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(caret, caret);
    });
  };

  const link = () => {
    const el = ref.current;
    if (!el) return;
    const url = window.prompt("Link URL", "https://");
    if (!url) return;
    const selected = value.slice(el.selectionStart, el.selectionEnd) || "link text";
    const next =
      value.slice(0, el.selectionStart) + `[${selected}](${url})` + value.slice(el.selectionEnd);
    onChange(next);
  };

  const words = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div
      className={
        full
          ? "fixed inset-0 z-50 flex flex-col gap-2 bg-background p-4"
          : "rounded-md ring-1 ring-border"
      }
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-card/60 px-2 py-1.5">
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            title={a.title}
            onClick={() => apply(a)}
            className="rounded px-2 py-1 text-xs font-semibold hover:bg-background"
          >
            {a.label}
          </button>
        ))}
        <button
          type="button"
          title="Insert link"
          onClick={link}
          className="rounded px-2 py-1 text-xs font-semibold hover:bg-background"
        >
          🔗
        </button>
        <span className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="rounded px-2 py-1 text-xs font-semibold hover:bg-background"
          >
            {preview ? "Write" : "Preview"}
          </button>
          <button
            type="button"
            onClick={() => setFull((f) => !f)}
            className="rounded px-2 py-1 text-xs font-semibold hover:bg-background"
          >
            {full ? "Exit" : "Expand"}
          </button>
        </span>
      </div>

      {preview ? (
        <div className="min-h-24 flex-1 space-y-2 overflow-auto px-3 py-2.5 text-sm">
          {value.split(/\n{2,}/).map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </div>
      ) : (
        <textarea
          ref={ref}
          value={value}
          placeholder={placeholder ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={`w-full resize-y bg-transparent px-3 py-2.5 text-sm leading-relaxed outline-none ${full ? "flex-1" : ""}`}
        />
      )}
      <p className="border-t border-border px-3 py-1 text-[11px] text-muted-foreground">
        {words} words · {value.length} characters · **bold**, *italic*, `code`, [link](url)
      </p>
    </div>
  );
}
