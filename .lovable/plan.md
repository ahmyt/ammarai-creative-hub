# Fix mixed-up page editor in the CMS

## Problem

In the CMS, Pages → Edit shows one shared form for every page. The Contact page editor shows Home's comparison-section fields, and the Home editor shows Contact's form/email/channel fields. This is because the editor uses a single field list for the whole "page" kind instead of per-page fields.

## What we'll build

Make the page editor show only the fields that belong to the page being edited:

- **Contact page** shows: page name, SEO title, meta description, eyebrow, heading, hero paragraph, form heading, "message sent" heading/body, contact channels, and the email delivery settings (sender domain, from name/address, notify address).
- **Home page** shows: page name, SEO title, meta description, eyebrow, heading, and all the value-comparison fields (both columns, totals, button labels).
- Shared fields (name, SEO title, description, eyebrow, heading) stay on both.

## Technical details

1. `src/lib/cms-fields.ts` — split the single `page` field list into per-page lists:
   - Add a `pageFieldSpecs(slug)` helper returning the shared fields plus either the Contact fields (`contact` slug) or the Home comparison fields (`home` slug).
   - Keep `fieldSpecs.page` as the union for `emptyDraft` so new pages still initialize cleanly.
2. `src/routes/admin.$kind.$slug.tsx` — when the kind is `page`, use `pageFieldSpecs(slug)` for rendering and saving instead of the full list.
3. Saving safety: build the save payload starting from any previously saved override data, then apply the visible fields — so fields hidden on one page's form are never wiped when saving the other.

## Verification

- Typecheck passes.
- Edit Pages → Contact: only contact-related fields appear; Pages → Home: only home/comparison fields appear.
- Save Home, then reload Contact: contact fields retain their values (no accidental clearing).
