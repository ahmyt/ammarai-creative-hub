import type { Tool } from "./types";

export const seoAnalyzerTools: Tool[] = [
  {
    slug: "ai-seo-analyzer",
    name: "AI SEO Analyzer",
    category: "AI SEO",
    featured: true,
    popular: true,
    summary:
      "Analyse a URL, a block of text or a keyword and get a scored report — technical checks, readability, keyword volume and difficulty, and what to fix first.",
    title: "AI SEO Analyzer: Score Any Page, Text or Keyword | AmmarAI",
    description:
      "Run a URL, a draft or a keyword through the AI SEO Analyzer and get a scored report: technical checks, page issues, readability, keyword volume, difficulty and CPC.",
    h1: "Find out what is holding a page back before you rewrite it",
    lede: "Paste a URL, a draft or a keyword. The SEO Analyzer returns a scored report — technical checks, the issues it found, readability, keyword density, search volume and difficulty — so you know what to change and in what order.",
    ctaLabel: "Analyze a URL",
    what: [
      "The AI SEO Analyzer runs three kinds of check from one screen. URL Analysis crawls a live page and reports its SEO score, title and meta description, load time and status code, the issues it found, and whether the technical basics — HTTPS, mobile rendering, sitemap, robots.txt — are in place. Text Analysis takes a draft instead of a URL and reports word count, reading time, readability, keyword density and specific edits. Keywords takes a term and reports monthly volume, difficulty, CPC and competition, with related terms worth targeting.",
      "The point is ordering. Most SEO advice is a list of everything that could matter; this gives you the handful of things that matter on this page, ranked, with a score you can re-run after the fix to confirm it moved.",
    ],
    canDo: [
      "Score any live URL and see the issues behind the number",
      "Check the technical basics — HTTPS, mobile, sitemap, robots.txt — in one card",
      "Read a page's title, meta description, load time and status as the crawler sees them",
      "Analyse a draft for readability, keyword density and reading time before you publish",
      "Look up monthly volume, difficulty, CPC and competition for a keyword",
      "Compare related keyword variants and pick the one you can realistically rank for",
      "Re-run the analysis after edits to confirm the score actually improved",
    ],
    how: [
      {
        title: "Pick the analysis you need",
        body: "URL Analysis for a live page, Text Analysis for a draft, Keywords for search-demand research.",
      },
      {
        title: "Paste the URL, text or keyword",
        body: "One field. No account setup, no site verification, no crawler to configure.",
      },
      {
        title: "Read the scored report",
        body: "Score, issues, technical checks and recommendations arrive as separate cards rather than one wall of text.",
      },
      {
        title: "Fix and re-run",
        body: "Make the changes it named, run the same analysis again, and check the score moved.",
      },
    ],
    examples: [
      {
        label: "URL analysis",
        input: "https://esimnow.net",
        output:
          "SEO score 88/100. Page title and meta description read back as the crawler sees them, load time 0.34s, status 200. Two issues: the meta description is too short, and the hero section has no H2. HTTPS, mobile rendering, sitemap and robots.txt all pass.",
      },
      {
        label: "Text analysis",
        input:
          "Analyse the eSIM landing page copy before it goes live — 412 words on travel data plans, coverage and activation.",
        output:
          "412 words, 2,388 characters, about a 2 minute read. Readability 71/100, fairly easy. Keyword density led by \"esim\" at 2.4% and \"travel data\" at 1.8%. Four edits suggested, starting with getting the primary keyword into the first paragraph.",
      },
      {
        label: "Keyword research",
        input: "esim for travel",
        output:
          "18,100 monthly searches, difficulty 64/100, CPC $1.42, medium competition. Related terms ranked by opportunity: \"esim data plan europe\" at 3,600 searches and difficulty 44 is the realistic first target, ahead of the head term.",
      },
    ],
    capabilities: [
      {
        title: "Three analyses, one screen",
        body: "URL, text and keyword checks sit side by side, so research and on-page work happen in the same place instead of across three subscriptions.",
      },
      {
        title: "Scores you can re-run",
        body: "Every report ends in a number. Fix what it named, run it again, and the difference tells you whether the change was worth making.",
      },
      {
        title: "Technical checks in plain language",
        body: "HTTPS, mobile rendering, sitemap and robots.txt reported as pass or fail, not as a crawl log you have to interpret.",
      },
      {
        title: "Demand data behind the keyword",
        body: "Volume, difficulty, CPC and competition together, so you can tell an ambitious target from an achievable one before writing anything.",
      },
    ],
    audiences: [
      {
        who: "Small business owners",
        why: "Check your own site without hiring an agency to tell you the meta description is too short.",
      },
      {
        who: "Content writers",
        why: "Run the draft through Text Analysis before filing it, not after the editor sends it back.",
      },
      {
        who: "Marketers",
        why: "Size up search demand for a campaign topic before committing budget to it.",
      },
      {
        who: "Agencies",
        why: "Produce a scored before-and-after for a client in the time it takes to paste two URLs.",
      },
    ],
    useCases: [
      {
        title: "Pre-launch page check",
        body: "Run the staging URL through URL Analysis the day before launch. The technical card catches a missing robots.txt or a non-200 status while there is still time to fix it.",
      },
      {
        title: "Deciding what to write next",
        body: "Run three candidate topics through Keywords and compare volume against difficulty. The one with 3,600 searches at difficulty 44 usually beats the one with 18,100 at 64.",
      },
      {
        title: "Editing a draft that reads heavy",
        body: "Text Analysis puts a number on readability and shows which sentences are dragging it down, which is easier to act on than \"make it punchier\".",
      },
      {
        title: "Auditing an inherited site",
        body: "Work through the top twenty URLs, note the scores, and you have a prioritised backlog by the end of the morning.",
      },
    ],
    tips: [
      "Analyse the live URL, not a local copy — load time and status only mean something on the real server.",
      "Treat difficulty and volume together. A high-volume term you cannot rank for is worth less than a modest one you can.",
      "Re-run the same analysis after each fix so you can attribute the score change to a specific edit.",
      "Use Text Analysis on the draft, not the published page, so the fixes land before anyone reads it.",
      "Keyword density is a signal, not a target. If a term is at 2.4% and the copy reads naturally, leave it alone.",
    ],
    mistakes: [
      "Chasing the score to 100. Past the high eighties you are usually optimising things no reader notices.",
      "Fixing every issue in the list at once, then having no idea which change moved the number.",
      "Targeting head terms only, and never ranking for any of them.",
      "Rewriting for keyword density until the copy stops sounding like a person wrote it.",
      "Running the analysis once and never again after the page changes.",
    ],
    faqs: [
      {
        q: "What is a good SEO score?",
        a: "Anything in the eighties is healthy. The score is most useful as a before-and-after measure on the same page rather than as a comparison between different sites.",
      },
      {
        q: "Does it crawl the whole site or a single page?",
        a: "URL Analysis reports on the page you give it. To audit a section, run the key URLs one at a time and compare the scores.",
      },
      {
        q: "Where does the keyword data come from?",
        a: "Search volume, difficulty, CPC and competition are pulled from live search data at the time you run the analysis, so the numbers reflect current demand.",
      },
      {
        q: "Can I analyse text that is not published yet?",
        a: "Yes — that is what Text Analysis is for. Paste the draft and you get readability, keyword density and edits before anything goes live.",
      },
      {
        q: "Does it fix the issues for me?",
        a: "It names them and recommends the change. For the rewriting itself, hand the recommendations to the AI Writer or the SEO Content Generator.",
      },
    ],
    related: [
      "ai-seo-content-generator",
      "meta-description-generator",
      "ai-writer",
      "ai-plagiarism-detector",
    ],
  },
];
