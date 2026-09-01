import type { Feature } from "./types";

export const features: Feature[] = [
  {
    slug: "multi-model-ai",
    name: "Multi-model AI",
    title: "Multi-Model AI: The Right Model For Each Task | AmmarAI",
    description:
      "Route every task to a model suited to it, from fast drafting to careful reasoning, without juggling five subscriptions.",
    h1: "One workspace, several models, chosen per task",
    lede: "Different jobs want different models. AmmarAI routes each task to one that suits it, so you are not paying for five subscriptions to get one good answer.",
    summary: "Each task runs on a model suited to it, without you managing providers.",
    body: [
      "A single model is rarely best at everything. Fast, cheap models are ideal for bulk drafting, variations and reformatting. Slower reasoning models earn their cost on analysis, structure and code. Image, video, voice and transcription are separate systems again.",
      "Rather than making you choose, the platform maps tools to appropriate models and lets you upgrade the model on tasks where quality matters more than speed. You see which tier a tool is using and can change it.",
    ],
    highlights: [
      {
        title: "Task-appropriate defaults",
        body: "Every tool ships with a sensible default so you get good output without configuring anything.",
      },
      {
        title: "Upgrade where it counts",
        body: "Switch to a higher-capability model on the pieces that carry real weight, such as a pillar article or a contract review.",
      },
      {
        title: "One bill, one interface",
        body: "Text, image, video, voice and transcription in one place instead of five separate tools and invoices.",
      },
    ],
    tools: ["ai-chat", "ai-writer", "ai-code-generator", "ai-document-analyzer"],
    faqs: [
      {
        q: "Can I pick the model myself?",
        a: "Yes on paid plans. Tools have sensible defaults and you can move to a higher-capability tier when a task deserves it.",
      },
      {
        q: "Does a better model always mean better output?",
        a: "No. Model choice matters less than the quality of your brief. A precise prompt on a fast model usually beats a vague prompt on a slow one.",
      },
    ],
  },
  {
    slug: "brand-voice",
    name: "Brand voice",
    title: "Brand Voice: Consistent Tone Across Every Tool | AmmarAI",
    description:
      "Save your tone, vocabulary and rules once and apply them across writing, social, email and product copy.",
    h1: "Define your voice once, apply it everywhere",
    lede: "Save the way your brand writes, including the words you avoid, and every tool starts from that rather than from a generic default.",
    summary: "Save tone, vocabulary and rules once and reuse them across every writing tool.",
    body: [
      "Most AI writing sounds the same because everyone starts from the same blank prompt. A brand voice profile fixes that at the source: you describe your register, provide examples of writing you consider on brand, and list words and claims to avoid.",
      "Once saved, the profile is applied automatically wherever text is generated: articles, product descriptions, emails, social posts and ad copy. Teams get consistency without every person having to be a good prompt writer.",
    ],
    highlights: [
      {
        title: "Learn from examples",
        body: "Paste writing you already like and the profile derives register, sentence rhythm and vocabulary from it.",
      },
      {
        title: "Banned words and claims",
        body: "List the phrasing you never want to see, including legal and compliance restrictions.",
      },
      {
        title: "Multiple profiles",
        body: "Keep separate voices for different brands, products or clients and switch between them.",
      },
    ],
    tools: ["ai-writer", "ai-tone-changer", "ai-rewriter", "social-media-post-generator"],
    faqs: [
      {
        q: "How many examples does it need?",
        a: "Three to five representative pieces are usually enough. More examples of consistent writing help more than a large mixed sample.",
      },
      {
        q: "Does it work across every tool?",
        a: "It applies to text generation throughout the platform. Image, video and voice tools have their own style settings.",
      },
    ],
  },
  {
    slug: "templates-library",
    name: "Templates library",
    title: "Templates Library: Reusable Structures That Work | AmmarAI",
    description:
      "Start from proven structures for articles, ads, emails and listings, or save your own as reusable templates.",
    h1: "Stop rebuilding the same brief every week",
    lede: "Proven structures for the formats you produce repeatedly, plus the ability to save your own so a good result becomes a repeatable one.",
    summary: "Proven starting structures for common formats, plus your own saved templates.",
    body: [
      "Most content work is repeat work: the weekly newsletter, the product launch post, the case study, the ad set. Rebuilding the brief each time wastes effort and produces inconsistent results.",
      "Templates capture a structure, a tone and the inputs a format needs. When one produces a result you like, save it. The next person on your team starts from that instead of a blank field.",
    ],
    highlights: [
      {
        title: "Format-specific structures",
        body: "Templates carry the shape a format actually needs, not a generic outline.",
      },
      {
        title: "Save your own",
        body: "Turn a successful generation into a reusable template with defined input fields.",
      },
      {
        title: "Shared across a team",
        body: "Team plans share templates so quality does not depend on who happens to be writing.",
      },
    ],
    tools: ["ai-article-generator", "ai-email-generator", "ai-ad-generator", "newsletter-generator"],
    faqs: [
      {
        q: "Can I edit the built-in templates?",
        a: "Yes. Duplicate any template, change the structure and inputs, and save it as your own.",
      },
      {
        q: "Do templates lock the output format?",
        a: "They set the starting structure. You can override any part of it during generation.",
      },
    ],
  },
  {
    slug: "bulk-generation",
    name: "Bulk generation",
    title: "Bulk Generation: Produce at Catalogue Scale | AmmarAI",
    description:
      "Run one prompt structure across hundreds of rows to generate descriptions, metadata and variations in a single pass.",
    h1: "One structure, hundreds of outputs",
    lede: "Upload a spreadsheet, map the columns, and generate consistent output for every row: product descriptions, meta descriptions, ad variants and more.",
    summary: "Run one structure across hundreds of rows for catalogue-scale output.",
    body: [
      "Generating one product description is a two-minute task. Generating twelve hundred is a project. Bulk generation turns the second into the first by applying one approved structure across a data file.",
      "The workflow is deliberately unglamorous: get one output right, confirm it, then run the same structure across the set and review a sample before exporting. Consistency across the catalogue matters more than brilliance in any single row.",
    ],
    highlights: [
      {
        title: "Spreadsheet in, spreadsheet out",
        body: "Upload CSV or paste rows, map fields to prompt inputs, export the results in the same shape.",
      },
      {
        title: "Approve before you scale",
        body: "Lock a single approved example as the pattern so the whole run inherits it.",
      },
      {
        title: "Sampled review",
        body: "Spot-check a random sample rather than reading every row, then re-run only what fails.",
      },
    ],
    tools: [
      "ai-product-description-generator",
      "meta-description-generator",
      "amazon-product-title-generator",
      "ai-vision",
    ],
    faqs: [
      {
        q: "How many rows can I run?",
        a: "Limits scale with your plan; the Ultimate plan is the one built for large catalogues.",
      },
      {
        q: "Will every row sound identical?",
        a: "They will share a structure, which is usually what you want at catalogue scale. Variation settings prevent literal repetition of phrasing.",
      },
    ],
  },
  {
    slug: "file-uploads",
    name: "File uploads",
    title: "File Uploads: Bring Your Own Documents and Media | AmmarAI",
    description:
      "Upload documents, images and audio so the AI works from your material instead of general knowledge.",
    h1: "Work from your files, not from generic knowledge",
    lede: "Upload documents, spreadsheets, images and audio, and the tools reason about your material rather than the internet's average opinion.",
    summary: "Upload documents, images and audio so output is grounded in your own material.",
    body: [
      "The single biggest quality upgrade in any AI workflow is context. Output built from your report, your transcript, your product photo and your brand guidelines is specific in a way that generated-from-nothing output never is.",
      "Uploads feed directly into the analysis, transcription, vision and writing tools, so a source file can travel through several steps without being re-pasted.",
    ],
    highlights: [
      {
        title: "Documents and spreadsheets",
        body: "PDFs, Word documents, text and CSV files for analysis, summarisation and extraction.",
      },
      {
        title: "Images",
        body: "Photos, screenshots and diagrams for description, extraction and tagging.",
      },
      {
        title: "Audio and video",
        body: "Recordings for transcription, then straight into summaries and repurposed content.",
      },
    ],
    tools: ["ai-document-analyzer", "ai-vision", "ai-transcription", "ai-summary-generator"],
    faqs: [
      {
        q: "What are the size limits?",
        a: "Limits depend on your plan, with larger documents and longer recordings available on higher tiers.",
      },
      {
        q: "Should I upload confidential material?",
        a: "Check your organisation's policy first. Treat any upload as you would any third-party service.",
      },
    ],
  },
  {
    slug: "ai-assistants",
    name: "Custom AI assistants",
    title: "Custom AI Assistants: Persistent, Briefed Helpers | AmmarAI",
    description:
      "Create assistants with a fixed brief, tone and reference material for recurring tasks and shared team use.",
    h1: "Brief it once. Reuse it forever.",
    lede: "Create an assistant with a permanent brief, its own reference material and a defined tone, then use it every day without re-explaining anything.",
    summary: "Assistants with a fixed brief and reference material for recurring work.",
    body: [
      "A prompt is single use. An assistant is a saved role: the support-reply assistant that knows your policies, the editor that enforces your style guide, the analyst that always returns the same table shape.",
      "Assistants can be shared with a team, which turns one person's hard-won prompt craft into a tool everyone benefits from.",
    ],
    highlights: [
      {
        title: "Persistent instructions",
        body: "Role, tone, format and constraints stay fixed across every conversation.",
      },
      {
        title: "Attached knowledge",
        body: "Give an assistant reference documents it should always consult.",
      },
      {
        title: "Team sharing",
        body: "Publish an assistant to your workspace so colleagues use the same briefed helper.",
      },
    ],
    tools: ["ai-chat", "ai-writer", "ai-document-analyzer", "ai-tone-changer"],
    faqs: [
      {
        q: "How is an assistant different from a template?",
        a: "A template shapes one output. An assistant is a conversational role you return to, with memory of its brief and its attached material.",
      },
      {
        q: "Can assistants be private?",
        a: "Yes. Keep them personal or publish them to the workspace.",
      },
    ],
  },
  {
    slug: "team-workspaces",
    name: "Team workspaces",
    title: "Team Workspaces: Shared Assets and Consistent Output | AmmarAI",
    description:
      "Share brand voices, templates and assistants across a team so output stays consistent whoever produces it.",
    h1: "Consistency that does not depend on who is at the keyboard",
    lede: "Shared brand voices, templates, assistants and history, so a new team member's first draft looks like your fifth year of work.",
    summary: "Shared brand assets and history so team output stays consistent.",
    body: [
      "Individual AI use produces individual results. The moment two people generate content for the same brand, you need shared assets or the voice drifts within a week.",
      "Workspaces hold the brand profiles, templates and assistants centrally. New joiners inherit the accumulated craft instead of starting from a blank prompt box.",
    ],
    highlights: [
      {
        title: "Shared brand assets",
        body: "One canonical brand voice and template set for the whole team.",
      },
      {
        title: "Seat management",
        body: "Add and remove members and see usage across the workspace.",
      },
      {
        title: "Multiple brands",
        body: "Agencies can keep client workspaces separate while sharing internal templates.",
      },
    ],
    tools: ["ai-writer", "ai-tone-changer", "ai-article-generator", "social-media-post-generator"],
    faqs: [
      {
        q: "Which plans include team features?",
        a: "Shared workspaces are part of the Ultimate plan, with seat-based access for collaborators.",
      },
      {
        q: "Can we separate clients?",
        a: "Yes. Keep a workspace per client so brand voices and templates never bleed across accounts.",
      },
    ],
  },
  {
    slug: "history-and-versions",
    name: "History and versions",
    title: "History and Versions: Nothing Good Gets Lost | AmmarAI",
    description:
      "Every generation is saved and searchable, so you can recover an earlier draft or reuse a prompt that worked.",
    h1: "The draft you liked three iterations ago is still there",
    lede: "Every generation is stored, searchable and restorable, so iterating is not a gamble on losing the version that was actually working.",
    summary: "Every generation saved, searchable and restorable.",
    body: [
      "Iteration only feels safe when going back is possible. History keeps every generation with the prompt that produced it, so you can compare, restore or reuse.",
      "It also turns prompt craft into an asset: search what you did last quarter, find the brief that produced the best-performing piece, and run it again.",
    ],
    highlights: [
      {
        title: "Full generation history",
        body: "Output and the prompt that made it, stored together.",
      },
      {
        title: "Searchable",
        body: "Find past work by tool, keyword or date instead of regenerating from memory.",
      },
      {
        title: "Restore and branch",
        body: "Return to any earlier version and continue from there.",
      },
    ],
    tools: ["ai-writer", "ai-chat", "ai-image-generator", "ai-rewriter"],
    faqs: [
      {
        q: "How long is history kept?",
        a: "Retention scales with your plan, with longer history on paid tiers.",
      },
      {
        q: "Can I delete history?",
        a: "Yes, individual items or in bulk.",
      },
    ],
  },
  {
    slug: "export-and-integrations",
    name: "Export and integrations",
    title: "Export and Integrations: Get Work Out Cleanly | AmmarAI",
    description:
      "Export to the formats your workflow already uses, from clean HTML and Markdown to audio, video and CSV.",
    h1: "Output that lands where you actually work",
    lede: "Clean exports for every format the platform produces, so nothing needs reformatting by hand before it ships.",
    summary: "Clean exports in the formats your publishing workflow already uses.",
    body: [
      "An AI tool that produces content you then spend twenty minutes reformatting has given back most of the time it saved. Exports are designed to drop straight into a CMS, a spreadsheet or an editing timeline.",
      "Text exports as clean HTML or Markdown with real heading structure. Bulk runs export as CSV in the shape they arrived. Audio and video export in standard formats at usable quality.",
    ],
    highlights: [
      {
        title: "Structured text export",
        body: "Markdown and HTML that preserve heading hierarchy rather than a wall of paragraphs.",
      },
      {
        title: "Media formats",
        body: "Standard audio and video files ready for editing or publishing.",
      },
      {
        title: "Spreadsheet round-trip",
        body: "Bulk output returns in the same column structure you uploaded.",
      },
    ],
    tools: ["ai-article-generator", "ai-voice-generator", "ai-video-generator", "ai-transcription"],
    faqs: [
      {
        q: "Does exported HTML carry junk markup?",
        a: "No. Exports use semantic headings, lists and paragraphs without inline styling noise.",
      },
      {
        q: "Can I export bulk runs?",
        a: "Yes, as CSV matching your uploaded structure.",
      },
    ],
  },
  {
    slug: "privacy-and-control",
    name: "Privacy and control",
    title: "Privacy and Control: Your Content Stays Yours | AmmarAI",
    description:
      "Clear ownership of generated output, control over your data, and honest limits on what AI generation can promise.",
    h1: "Clear ownership, clear limits",
    lede: "You own what you generate on paid plans, you control your stored data, and we are direct about what generative AI can and cannot guarantee.",
    summary: "Ownership of your output, control over your data, honest limits.",
    body: [
      "Content you generate on a paid plan is yours to use commercially. Uploaded files remain yours and can be deleted at any time, along with the history that references them.",
      "We are equally clear about limits. Generated text can be confidently wrong, generated images can contain artefacts, and no tool can guarantee search rankings. Review matters, and any vendor telling you otherwise is selling something.",
    ],
    highlights: [
      {
        title: "Commercial use",
        body: "Output generated on paid plans can be used in your products and marketing.",
      },
      {
        title: "Delete on demand",
        body: "Remove uploads and history whenever you choose.",
      },
      {
        title: "Stated limits",
        body: "Documented weaknesses per tool, so you know where verification is required.",
      },
    ],
    tools: ["ai-document-analyzer", "ai-image-generator", "ai-chat", "ai-transcription"],
    faqs: [
      {
        q: "Do I own the generated content?",
        a: "On paid plans, yes, for commercial use. Do not prompt for trademarked characters, brands or the likeness of real people.",
      },
      {
        q: "Can AI-generated content be detected?",
        a: "Detection tools exist and are unreliable in both directions. The durable answer is to edit substantially and add real expertise rather than to chase a detector score.",
      },
    ],
  },
];

export const featureBySlug = new Map(features.map((f) => [f.slug, f]));
