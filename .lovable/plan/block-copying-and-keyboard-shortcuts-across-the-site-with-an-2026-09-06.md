# Block copying and keyboard shortcuts across the site (with an on/off switch)

Add a site-wide content-protection layer, controlled from the admin area so you can switch it on or off at any time without a code change.

## What visitors will experience (when it is ON)

- Text cannot be selected or copied (copy/cut attempts are cancelled).
- Right-click menu is disabled on all pages.
- Images cannot be dragged out or saved by drag.
- Blocked shortcuts: Ctrl/Cmd + C, X, A, S, P, U, and F12 / Ctrl+Shift+I, J, C (developer tools and view source).
- Everything the site needs still works: links, buttons, the tool search box, the contact form, and the admin area.

## The switch

- In the admin area, under Pages -> Home, a "Protect content (block copy, right-click and shortcuts)" setting you can set to on or off.
- Saved with the rest of the site content; visitors see the change on their next page load.
- It ships turned on, and you can turn it off whenever you like.

## Important exceptions

- Form inputs and text areas keep normal typing, selecting and pasting — otherwise the search box, contact form and the CMS editor become unusable.
- The whole admin area (login and content management) is excluded, so you can still work normally there.

## Honest limitation

These measures stop casual copying only. Anyone technical can still read the page source or disable scripts, so this cannot make content truly uncopyable. Search engines are unaffected.

## Technical outline

- New client-only component `src/components/site/ContentProtection.tsx`:
  - `useEffect` listeners on `document` for `contextmenu`, `copy`, `cut`, `dragstart`, `selectstart`, and `keydown`.
  - Handler bails out when the event target is inside `input`, `textarea`, or `[contenteditable]`.
  - Blocks the listed key combinations via `preventDefault()`.
  - Adds/removes a `body.no-select` class on mount/unmount.
- `src/styles.css`: `.no-select` rule with `user-select: none` (plus `-webkit-`/`-moz-` prefixes) and `-webkit-touch-callout: none`, with an override restoring `user-select: text` for `input, textarea, [contenteditable]`.
- Mount `<ContentProtection />` once in `src/routes/__root.tsx` inside the layout, disabled when the current path starts with `/admin` or `/auth` (via `useRouterState` location).
- Toggle storage: add a `protectContent?: boolean` field to the `Page` type (`src/data/types.ts`), default `true` on the `home` entry in `src/data/pages.ts`, and a boolean field spec in the home-page group of `src/lib/cms-fields.ts` (add boolean support to the CMS field editor in `src/routes/admin.$kind.$slug.tsx` if not present).
- `ContentProtection` reads the value via `siteContentQuery` (`useSuspenseQuery`, home page entry) and returns `null` when the toggle is off.
- No SSR impact: all listeners registered inside `useEffect`.
