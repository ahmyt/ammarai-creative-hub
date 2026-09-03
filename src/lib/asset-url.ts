/**
 * Resolve Lovable CDN asset URLs.
 *
 * Media files (logo, demo videos/audio) are referenced by relative CDN paths
 * like `/__l5e/assets-v1/{asset_id}/{filename}`. Those paths only resolve when
 * the site is served by Lovable. When the app is hosted elsewhere (e.g. Plesk),
 * serve the same files from the local `/media/` directory instead — the binary
 * copies are bundled in `public/media/` so the site is fully self-contained.
 */
export function assetUrl(url: string): string {
  if (!url.startsWith("/__l5e/")) return url;
  // Extract the trailing filename from the CDN path and serve it locally.
  const filename = url.split("/").pop();
  if (!filename) return url;
  const localPath = `/media/${filename}`;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.endsWith(".lovable.app") || host === "localhost" || host === "127.0.0.1") {
      return url; // on Lovable hosting, use the CDN path directly
    }
    return localPath; // self-hosted: serve the bundled local copy
  }
  // SSR: serve the local copy (works on any origin, including Plesk).
  return localPath;
}
