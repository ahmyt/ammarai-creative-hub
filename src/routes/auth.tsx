import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Container, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Sign in to the AmmarAI content studio" },
      {
        name: "description",
        content: "Sign in to manage AmmarAI tool pages, use cases, features and blog posts.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Sign in to the AmmarAI content studio" },
      { property: "og:description", content: "Team access to the AmmarAI content studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setMessage(error ? error.message : "Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else void navigate({ to: "/admin" });
    }
    setBusy(false);
  };

  const google = async () => {
    setMessage(null);
    // The cloud auth service only redirects back to whitelisted origins (the
    // Lovable-hosted site). When self-hosted (e.g. Plesk on ammarai.com), we
    // return to a forwarder page on the Lovable domain, which hands the
    // session tokens (URL hash) back to this origin.
    const host = window.location.hostname;
    const onLovable =
      host.endsWith(".lovable.app") || host === "localhost" || host === "127.0.0.1";
    const redirectTo = onLovable
      ? `${window.location.origin}/admin`
      : `https://ammarai-creative-hub.lovable.app/auth/forward?to=${encodeURIComponent(
          `${window.location.origin}/auth`,
        )}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) {
      setMessage("Google sign-in failed. Try again or use email.");
      return;
    }
    // signInWithOAuth redirects the browser to the provider; no local navigation needed.
  };

  return (
    <Section className="py-16">
      <Container className="max-w-md">
        <p className="eyebrow">Content studio</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">
          {mode === "signin" ? "Sign in" : "Create an account"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Team access only. Once signed in you can edit every tool, use case, feature and blog post
          on the site.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.14em]">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md bg-card px-4 py-3 text-sm ring-1 ring-border focus:outline-2 focus:outline-offset-2 focus:outline-ring"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.14em]">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md bg-card px-4 py-3 text-sm ring-1 ring-border focus:outline-2 focus:outline-offset-2 focus:outline-ring"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-ink px-4 py-3 text-sm font-semibold text-ink-foreground disabled:opacity-60"
          >
            {busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={google}
          className="mt-3 w-full rounded-md px-4 py-3 text-sm font-semibold ring-1 ring-border transition-colors hover:bg-card"
        >
          Continue with Google
        </button>

        {message ? <p className="mt-4 text-sm text-muted-foreground">{message}</p> : null}

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-sm text-accent underline underline-offset-4"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>

        <p className="mt-8 text-sm">
          <Link to="/" className="text-muted-foreground underline underline-offset-4">
            Back to the site
          </Link>
        </p>
      </Container>
    </Section>
  );
}
