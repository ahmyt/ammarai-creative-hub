import { useState } from "react";
import { RichTextArea } from "./RichTextArea";
import type { ItemSpec } from "@/lib/cms-fields";

type Props = {
  value: string; // JSON string
  onChange: (next: string) => void;
  item: ItemSpec;
  hint: string;
};

function parse(value: string): { ok: true; list: unknown[] } | { ok: false } {
  try {
    const parsed = JSON.parse(value || "[]");
    if (!Array.isArray(parsed)) return { ok: false };
    return { ok: true, list: parsed };
  } catch {
    return { ok: false };
  }
}

export function ListField({ value, onChange, item, hint }: Props) {
  const [raw, setRaw] = useState(false);
  const parsed = parse(value);

  if (!parsed.ok || raw) {
    return (
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          className="w-full rounded-md bg-card px-3 py-2.5 font-mono text-xs leading-relaxed ring-1 ring-border"
        />
        <div className="mt-1 flex items-center gap-3">
          <p className="font-mono text-[11px] text-muted-foreground">{hint}</p>
          {parsed.ok ? (
            <button
              type="button"
              onClick={() => setRaw(false)}
              className="text-[11px] font-semibold underline underline-offset-4"
            >
              Back to editor
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-destructive">
              Invalid JSON — fix to use the visual editor
            </span>
          )}
        </div>
      </div>
    );
  }

  const list = parsed.list;
  const commit = (next: unknown[]) => onChange(JSON.stringify(next, null, 2));

  const blank = () =>
    item.kind === "string"
      ? ""
      : Object.fromEntries(item.fields.map((f) => [f.name, ""] as const));

  const update = (index: number, next: unknown) =>
    commit(list.map((entry, i) => (i === index ? next : entry)));

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row);
    commit(next);
  };

  return (
    <div className="space-y-3">
      {list.map((entry, index) => (
        <div key={index} className="rounded-lg bg-card p-3 ring-1 ring-border">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {item.kind === "string" ? item.label : item.label} {index + 1}
            </span>
            <span className="ml-auto flex gap-1">
              <button
                type="button"
                title="Move up"
                onClick={() => move(index, -1)}
                className="rounded px-2 py-1 text-xs ring-1 ring-border hover:bg-background"
              >
                ↑
              </button>
              <button
                type="button"
                title="Move down"
                onClick={() => move(index, 1)}
                className="rounded px-2 py-1 text-xs ring-1 ring-border hover:bg-background"
              >
                ↓
              </button>
              <button
                type="button"
                title="Duplicate"
                onClick={() =>
                  commit([...list.slice(0, index + 1), structuredClone(entry), ...list.slice(index + 1)])
                }
                className="rounded px-2 py-1 text-xs ring-1 ring-border hover:bg-background"
              >
                ⧉
              </button>
              <button
                type="button"
                title="Remove"
                onClick={() => commit(list.filter((_, i) => i !== index))}
                className="rounded px-2 py-1 text-xs font-semibold text-destructive ring-1 ring-border hover:bg-background"
              >
                ✕
              </button>
            </span>
          </div>

          {item.kind === "string" ? (
            <RichTextArea
              value={typeof entry === "string" ? entry : ""}
              onChange={(next) => update(index, next)}
              rows={3}
            />
          ) : (
            <div className="space-y-3">
              {item.fields.map((field) => {
                const record = (entry ?? {}) as Record<string, unknown>;
                const current = record[field.name];
                const asString = typeof current === "string" ? current : "";
                if (field.type === "list") {
                  return (
                    <div key={field.name}>
                      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {field.label}
                      </p>
                      <ListField
                        value={JSON.stringify(Array.isArray(current) ? current : [], null, 2)}
                        onChange={(next) => {
                          const p = parse(next);
                          update(index, { ...record, [field.name]: p.ok ? p.list : [] });
                        }}
                        item={{ kind: "string", label: field.label }}
                        hint='["item"]'
                      />
                    </div>
                  );
                }
                return (
                  <div key={field.name}>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {field.label}
                    </p>
                    {field.type === "textarea" ? (
                      <RichTextArea
                        value={asString}
                        onChange={(next) => update(index, { ...record, [field.name]: next })}
                        rows={3}
                      />
                    ) : (
                      <input
                        value={asString}
                        onChange={(e) => update(index, { ...record, [field.name]: e.target.value })}
                        className="w-full rounded-md bg-background px-3 py-2 text-sm ring-1 ring-border"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => commit([...list, blank()])}
          className="rounded-md bg-ink px-3 py-2 text-xs font-semibold text-ink-foreground"
        >
          + Add {item.label.toLowerCase()}
        </button>
        <button
          type="button"
          onClick={() => setRaw(true)}
          className="text-[11px] font-semibold text-muted-foreground underline underline-offset-4"
        >
          Edit as JSON
        </button>
      </div>
    </div>
  );
}
