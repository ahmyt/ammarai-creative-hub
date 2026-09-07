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
  // Extract the trailing filename from the CDN path and serve the bundled
  // local copy from /media/. Always returning the local path keeps SSR and
  // client rendering identical (no hydration mismatch) and works on any
  // origin — Lovable, localhost, or self-hosted (Plesk).
  const filename = url.split("/").pop();
  if (!filename) return url;
  return `/media/${filename}`;
}
