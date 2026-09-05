# Comparison section: feedback review

## Decision

**Leave the comparison section as-is.** No changes recommended.

## Reasoning

Three suggestions were reviewed against the current build (`src/routes/index.tsx`, lines 334–393):

1. **"Give the two columns clearer visual distinction"** — Already implemented. The left column is a light `bg-card` with a ring on the sand section; the right (AmmarAI) is a dark `bg-ink` block with a deeper shadow. The light-vs-dark contrast is already the strongest distinction the Editorial palette supports; further tweaks would be cosmetic with diminishing returns.

2. **"Add a simple 'Start free' button right after the comparison"** — Already present. Directly below the two columns there is a "Start free — no card required" button (→ register URL) plus a "Compare plans" link. No addition needed.

3. **"Move it higher (after Flagship Tools or after the hero)"** — Not recommended. The current placement (after Features, before Use Cases) is deliberate: the comparison's right column references "shared brand voice and history" and specific capabilities, which land as arguments only after the Features section explains why sixty tools feel like one product. Placing it after the hero pitches cost savings before the visitor knows what the product does; after Flagship Tools is more defensible but still skips the "one workspace" framing. The current spot converts breadth-understanding into a savings argument right before the CTA — the right sequence.

## Out of scope

- No code changes.
- No CMS, routing, or styling changes.

## If you later want to experiment

A legitimate A/B option is moving the section to right after Flagship Tools (keeping all content/styling identical). That can be done as a single edit if you want to test it.
