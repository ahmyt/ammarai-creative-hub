# Plan: Keyword-Researched Daily Blog Posts

## Problem

The daily blog writer (`src/lib/daily-blog.server.ts`) currently uses each tool's name as the "primary keyword" — it does no real keyword research. Posts are SEO-aware (title length, meta desc, FAQ schema) but not grounded in actual search data: no search volume, no related terms, no question variations, no intent analysis.

## Goal

Before generating each daily post, the writer uses real Semrush keyword data (primary keyword, search volume, difficulty, related terms, question variations) to ground the OpenAI prompt. Posts target keywords people actually search for, not just internal tool names.

## Architecture

The daily writer runs on Plesk at runtime (cron + OpenAI) and has no Semrush access there. So keyword data is **pre-researched once** and stored as a static data file the writer reads from. This avoids any runtime API dependency on Plesk.

```text
[Build phase: agent runs Semrush for each tool]
        |
        v
src/data/tool-keywords.ts  (static keyword data per tool slug)
        |
        v
src/lib/daily-blog.server.ts  (reads keyword data, builds richer prompt)
        |
        v
OpenAI gpt-5.6-sol  (generates post targeting real keywords)
```

## Steps

### 1. Research keywords for all 68 tools (Semrush)

For each tool slug, run `semrush--keyword_research` with a natural search term (not the internal tool name — e.g., "ai video generator" not "ai-text-to-video"). Collect per tool:
- **primary keyword** (highest-volume relevant term with manageable difficulty)
- **search volume** and **difficulty**
- **5-8 related keywords** (with volume)
- **5 question variations** (what people actually ask)

Group near-duplicate tools (e.g., the multiple blog/writing generators) to avoid redundant research — one keyword set can serve closely related tools. Expected: ~50-60 distinct Semrush calls.

### 2. Create `src/data/tool-keywords.ts`

A typed export keyed by tool slug:

```typescript
export interface ToolKeywords {
  primaryKeyword: string;
  searchVolume: number;
  difficulty: number;
  relatedKeywords: { keyword: string; volume: number }[];
  questions: string[];
}
export const toolKeywords: Record<string, ToolKeywords> = { ... };
```

Tools without Semrush data fall back to the tool name (current behavior).

### 3. Upgrade the daily writer prompt

In `writeDailyPost()`, look up `toolKeywords[tool.slug]`. If found, build a richer prompt that includes:
- The real **primary keyword** (with volume/difficulty context)
- Instruction to use **related keywords naturally** throughout the post
- Instruction to answer the **question variations** in the FAQ section
- Title must include the primary keyword, not just the tool name
- Meta description must include the primary keyword

If no keyword data exists for a tool, fall back to the current prompt (tool name as keyword).

### 4. No changes to runtime infrastructure

- No new Plesk env vars
- No new API keys on Plesk
- No changes to cron schedule, OpenAI call, or database schema
- The keyword data file is bundled at build time

## What changes for the user

- Each daily post targets a real searched keyword with known volume
- Posts include related terms people search for alongside the primary keyword
- FAQ sections answer the actual questions searchers ask
- Titles and meta descriptions are optimized for the real keyword, not the internal tool name

## Refreshing keyword data

Keyword data goes stale over time. To refresh, re-run the Semrush research (step 1) and update `tool-keywords.ts`. This is a manual maintenance task — no automatic refresh. I can re-run it on request when search trends shift.
