import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * OAuth forwarder for self-hosted deployments.
 *
 * The managed OAuth broker lives at `/~oauth/initiate` on Lovable hosting only.
 * A self-hosted copy (e.g. Plesk on ammarai.com) starts Google sign-in against
 * the absolute broker URL on this Lovable-hosted site and sets
 * redirect_uri = this page + `?to=<its origin>/auth`. The broker returns here
 * with the session tokens (query and/or hash); we forward them to the `to` URL
 * so the self-hosted app can establish the session.
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
    // Carry every returned auth param (query + hash) over to the self-hosted origin.
    params.delete("to");
    params.forEach((value, key) => target.searchParams.set(key, value));
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
