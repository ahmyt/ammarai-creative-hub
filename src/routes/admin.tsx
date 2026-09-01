import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Container, Section } from "@/components/site/primitives";
import { contentKinds } from "@/lib/content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Content studio | AmmarAI" },
      { name: "description", content: "Manage AmmarAI tools, use cases, features and blog posts." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Content studio | AmmarAI" },
      { property: "og:description", content: "Internal content management for AmmarAI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { session, loading, isEditor, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Section className="py-20">
        <Container>
          <p className="text-sm text-muted-foreground">Loading the studio…</p>
        </Container>
      </Section>
    );
  }

  if (!session) {
    return (
      <Section className="py-20">
        <Container className="max-w-lg">
          <h1 className="text-3xl">Content studio</h1>
          <p className="mt-3 text-sm text-muted-foreground">You need to sign in to continue.</p>
          <Link
            to="/auth"
            className="mt-6 inline-block rounded-md bg-ink px-4 py-3 text-sm font-semibold text-ink-foreground"
          >
            Sign in
          </Link>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="eyebrow">Content studio</p>
            <h1 className="mt-2 text-2xl">AmmarAI CMS</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">{session.user.email}</span>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                void navigate({ to: "/auth" });
              }}
              className="rounded-md px-3 py-2 text-xs font-semibold ring-1 ring-border hover:bg-card"
            >
              Sign out
            </button>
          </div>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2">
          <Link
            to="/admin"
            activeOptions={{ exact: true }}
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border hover:text-foreground [&.active]:bg-ink [&.active]:text-ink-foreground"
          >
            Overview
          </Link>
          {contentKinds.map((k) => (
            <Link
              key={k.kind}
              to="/admin/$kind"
              params={{ kind: k.kind }}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border hover:text-foreground [&.active]:bg-ink [&.active]:text-ink-foreground"
            >
              {k.label}
            </Link>
          ))}
        </nav>

        {!isEditor ? (
          <div className="mt-8 rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-lg font-semibold">No editing access yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your account has no editor role{isAdmin ? "" : ""}. An admin can grant access, or you
              can claim the first admin seat from the Overview tab if nobody has done so yet.
            </p>
          </div>
        ) : null}

        <div className="mt-8">
          <Outlet />
        </div>
      </Container>
    </Section>
  );
}
