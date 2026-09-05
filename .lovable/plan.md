# Value comparison section on the homepage

## Recommendation

**Yes — add it.** A "Stop paying for five AI tools" comparison block is a good fit for AmmarAI. It converts the breadth message ("60+ tools") into a concrete cost-savings argument, which supports the existing pricing-page headline ("One subscription instead of seven"). Done as a plain SaaS table it can look cheap; done in the Editorial Studio aesthetic it reinforces the premium positioning.

## What to build

A new homepage section, placed **after the Features section** ("What makes sixty tools feel like one product") and before the Use Cases section — at that point the visitor understands the breadth, and the comparison persuades them to act before the CTA.

### Content (two-column comparison)

Headline: **Stop paying for five AI tools**
Eyebrow: `The math`
Subhead: One short line reinforcing the single-subscription value.

**Left column — "The old way"** (muted, sand/paper treatment)
- ChatGPT / Claude / Gemini subscription
- Separate image tool
- Separate video tool
- Separate voice tool
- Constant tab switching
- Total: **$80–120+/month**

**Right column — "AmmarAI"** (ink/dark hero treatment, accent checkmarks)
- Writing + Chat
- Image generation
- Video generation
- Voiceover & transcription
- Shared brand voice and history
- One subscription. One workspace.

CTA below the section: **Start free — no card required** → `REGISTER_URL`

### Design treatment (on-brand, not generic)

- Use the existing `Section`, `Container`, `SectionHeading`, and `Card` primitives — no new components.
- Right (AmmarAI) column on the **ink** surface (`tone="ink"` is already supported) so it visually "wins"; left column on the sand surface for contrast.
- Fraunces display serif for the headline and the price totals, matching the pricing page.
- Accent `✓` markers on the AmmarAI side (same pattern as pricing checkmarks); muted `—` or hairline on the old-way side.
- Hairline rules between rows, matching the editorial `rule` utility.
- Mobile: stack vertically with AmmarAI column first (lead with the winner), or old-way then AmmarAI with a clear divider — recommend AmmarAI-first on mobile to keep the persuasive column on screen.
- No hard-coded colors; all tokens (`--accent`, `--ink`, `--sand`, `--border`, `--muted-foreground`).

### Implementation details

- Add the section inline in `src/routes/index.tsx` between the Features and Use Cases sections.
- Add a small `comparison` content array (two columns of `{ label, included }` rows + a total line) as a local const, mirroring how `homeFaqs` is defined.
- CTA uses the existing `ExternalButton` with `href={REGISTER_URL}`.
- CMS: **not** CMS-managed for v1 — this is a fixed marketing block. (Can be made editable later via `src/data/pages.ts` if you want to tune the copy from the admin.)

## Out of scope

- No changes to pricing page, routing, or CMS.
- No new dependencies or components.

## Verification

- `bunx tsgo --noEmit` passes.
- Visual check via Playwright on the homepage: both columns render, AmmarAI column on ink surface, CTA links to the register URL, layout stacks cleanly on mobile viewport (411px).
