/**
 * Resolve Lovable CDN asset URLs.
 *
 * Media files (logo, demo videos/audio) live on Lovable's CDN and are
 * referenced by relative paths like `/__l5e/assets-v1/...`. Those paths only
 * resolve when the site itself is served by Lovable. When the app is hosted
 * elsewhere (e.g. Plesk), prefix them with the Lovable origin so the files
 * still load. On Lovable hosting the relative path is kept as-is.
 */
const LOVABLE_CDN_ORIGIN = "https://ammarai-creative-hub.lovable.app";

export function assetUrl(url: string): string {
  if (!url.startsWith("/__l5e/")) return url;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.endsWith(".lovable.app") || host === "localhost" || host === "127.0.0.1") {
      return url;
    }
    return `${LOVABLE_CDN_ORIGIN}${url}`;
  }
  // SSR: emit the absolute URL — it is valid from any origin.
  return `${LOVABLE_CDN_ORIGIN}${url}`;
}
