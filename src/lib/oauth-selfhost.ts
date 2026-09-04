import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Google sign-in for self-hosted deployments (e.g. Plesk on ammarai.com).
 *
 * The managed broker path `/~oauth/initiate` only exists on Lovable hosting,
 * so a self-hosted origin gets a 404. Here we point the broker at the absolute
 * URL on the Lovable-hosted copy and return through `/auth/forward`, which
 * hands the tokens back to this origin.
 */
export const LOVABLE_HOST_ORIGIN = "https://ammarai-creative-hub.lovable.app";

export function isLovableHosted(hostname: string) {
  return (
    hostname.endsWith(".lovable.app") ||
    hostname.endsWith(".lovableproject.com") ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  );
}

const selfHostedAuth = createLovableAuth({
  oauthBrokerUrl: `${LOVABLE_HOST_ORIGIN}/~oauth/initiate`,
});

export async function signInWithGoogleSelfHosted() {
  const forwardUrl = `${LOVABLE_HOST_ORIGIN}/auth/forward?to=${encodeURIComponent(
    `${window.location.origin}/auth`,
  )}`;
  return selfHostedAuth.signInWithOAuth("google", { redirect_uri: forwardUrl });
}

/**
 * When the forwarder returns tokens on this origin, establish the session.
 * Returns true when a session was created.
 */
export async function consumeForwardedTokens(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const search = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const access_token = search.get("access_token") ?? hash.get("access_token");
  const refresh_token = search.get("refresh_token") ?? hash.get("refresh_token");
  if (!access_token || !refresh_token) return false;

  const { error } = await supabase.auth.setSession({ access_token, refresh_token });
  window.history.replaceState({}, "", window.location.pathname);
  return !error;
}
