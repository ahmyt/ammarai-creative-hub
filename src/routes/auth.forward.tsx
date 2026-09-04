import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * OAuth forwarder for self-hosted deployments.
 *
 * Cloud auth only redirects to whitelisted origins (this Lovable-hosted site).
 * A self-hosted copy (e.g. Plesk on ammarai.com) starts Google sign-in with
 * redirectTo = this page + `?to=<its origin>/auth`. Google returns here with
 * the session tokens in the URL hash; we forward the hash to the `to` URL so
 * the self-hosted Supabase client picks up the session (detectSessionInUrl).
 *
 * `to` is restricted to known deployment origins to avoid an open redirect
 * that could leak tokens to an attacker-controlled site.
 */
const ALLOWED_TARGET_HOSTS = new Set(["ammarai.com", "www.ammarai.com"]);

export const Route = createFileRoute("/auth/forward")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Signing you in — AmmarAI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthForward,
});

function AuthForward() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (!to) {
      setError("Missing destination.");
      return;
    }
    let target: URL;
    try {
      target = new URL(to);
    } catch {
      setError("Invalid destination.");
      return;
    }
    if (target.protocol !== "https:" || !ALLOWED_TARGET_HOSTS.has(target.hostname)) {
      setError("Destination is not allowed.");
      return;
    }
    // Carry the auth tokens (URL fragment) to the self-hosted origin.
    window.location.replace(target.toString() + window.location.hash);
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      {error ? (
        <p className="text-sm text-muted-foreground">
          Sign-in redirect failed: {error} Please go back and try again.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">Completing sign-in…</p>
      )}
    </div>
  );
}
