import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { contentKinds, contentRowsQuery, staticItems, type ContentKind } from "@/lib/content";
import { emptyDraft, fieldSpecs } from "@/lib/cms-fields";
import { ListField } from "@/components/cms/ListField";
import { RichTextArea } from "@/components/cms/RichTextArea";

export const Route = createFileRoute("/admin/$kind/$slug")({
  loader: ({ params }) => {
    const meta = contentKinds.find((k) => k.kind === params.kind);
    if (!meta) throw notFound();
    return { meta };
  },
  component: ContentEditor,
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ContentEditor() {
  const { kind, slug } = Route.useParams();
  const { meta } = Route.useLoaderData();
  const typedKind = kind as ContentKind;
  const isNew = slug === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: rows = [], isLoading } = useQuery(contentRowsQuery);

  const specs = fieldSpecs[typedKind];
  const base = useMemo(
    () => staticItems(typedKind).find((i) => i["slug"] === slug),
    [typedKind, slug],
  );
  const row = rows.find((r) => r.kind === typedKind && r.slug === slug);

  const [draftSlug, setDraftSlug] = useState(isNew ? "" : slug);
  const [values, setValues] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    const source = isNew
      ? emptyDraft(typedKind)
      : { ...emptyDraft(typedKind), ...(base ?? {}), ...(row?.data ?? {}) };
    const nextValues: Record<string, string> = {};
    const nextFlags: Record<string, boolean> = {};
    for (const spec of specs) {
      const value = source[spec.name];
      if (spec.type === "boolean") nextFlags[spec.name] = Boolean(value);
      else if (spec.type === "json") nextValues[spec.name] = JSON.stringify(value ?? [], null, 2);
      else nextValues[spec.name] = typeof value === "string" ? value : "";
    }
    setValues(nextValues);
    setFlags(nextFlags);
  }, [isLoading, rows.length, slug, kind]);

  const save = async () => {
    setStatus(null);
    const finalSlug = isNew ? slugify(draftSlug) : slug;
    if (!finalSlug) {
      setStatus("A URL slug is required.");
      return;
    }

    const payload: Record<string, unknown> = { slug: finalSlug };
    for (const spec of specs) {
      if (spec.type === "boolean") {
        payload[spec.name] = flags[spec.name] ?? false;
        continue;
      }
      if (spec.type === "json") {
        try {
          payload[spec.name] = JSON.parse(values[spec.name] || "[]");
        } catch {
          setStatus(`"${spec.label}" is not valid JSON.`);
          return;
        }
        continue;
      }
      payload[spec.name] = values[spec.name] ?? "";
    }

    setSaving(true);
    const { error } = await supabase.from("content").upsert(
      {
        kind: typedKind,
        slug: finalSlug,
        data: payload as never,
        is_hidden: row?.is_hidden ?? false,
      },
      { onConflict: "kind,slug" },
    );
    setSaving(false);

    if (error) {
      setStatus(error.message);
      return;
    }
    await queryClient.invalidateQueries();
    setStatus("Saved. The live site updates on next load.");
    if (isNew) void navigate({ to: "/admin/$kind/$slug", params: { kind, slug: finalSlug } });
  };

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin/$kind"
        params={{ kind }}
        className="text-xs font-semibold text-muted-foreground underline underline-offset-4"
      >
        ← Back to {meta.label.toLowerCase()}
      </Link>

      <h2 className="mt-4 text-xl">
        {isNew ? `New ${meta.singular.toLowerCase()}` : `Editing /${slug}`}
      </h2>
      {!isNew && base ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Built-in page. Saving stores an override; resetting from the list restores the original.
        </p>
      ) : null}

      <div className="mt-6 space-y-5">
        {isNew ? (
          <Field label="URL slug">
            <input
              value={draftSlug}
              onChange={(e) => setDraftSlug(e.target.value)}
              placeholder="ai-new-tool"
              className="w-full rounded-md bg-card px-3 py-2.5 text-sm ring-1 ring-border"
            />
          </Field>
        ) : null}

        {specs.map((spec) => {
          if (spec.type === "boolean") {
            return (
              <label key={spec.name} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={flags[spec.name] ?? false}
                  onChange={(e) => setFlags({ ...flags, [spec.name]: e.target.checked })}
                />
                {spec.label}
              </label>
            );
          }
          if (spec.type === "text") {
            return (
              <Field key={spec.name} label={spec.label}>
                <input
                  value={values[spec.name] ?? ""}
                  onChange={(e) => setValues({ ...values, [spec.name]: e.target.value })}
                  className="w-full rounded-md bg-card px-3 py-2.5 text-sm ring-1 ring-border"
                />
              </Field>
            );
          }
          if (spec.type === "json") {
            return (
              <Field key={spec.name} label={spec.label} hint={spec.hint || undefined}>
                <ListField
                  value={values[spec.name] ?? "[]"}
                  onChange={(next) => setValues({ ...values, [spec.name]: next })}
                  item={spec.item}
                  hint={spec.hint}
                />
              </Field>
            );
          }
          return (
            <Field key={spec.name} label={spec.label}>
              <RichTextArea
                value={values[spec.name] ?? ""}
                onChange={(next) => setValues({ ...values, [spec.name]: next })}
                rows={3}
              />
            </Field>
          );
        })}
      </div>

      <div className="sticky bottom-0 mt-8 flex items-center gap-4 border-t border-border bg-background py-4">
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em]">{label}</p>
      {hint ? <p className="mt-1 font-mono text-[11px] text-muted-foreground">{hint}</p> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}
