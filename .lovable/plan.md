# Add llms.txt describing the site's content

Generate a `/llms.txt` file (the standard that gives AI assistants and LLM crawlers a clean, structured Markdown summary of a site) for AmmarAI, served dynamically from a new server route so it stays accurate as content grows.

## What gets built

**New route `src/routes/llms[.]txt.ts`** (server route, plain text, cached 1 hour — same pattern as the existing `sitemap.xml` route). It loads content through the existing `loadSiteContent()` helper so CMS edits, hidden items and CMS-created pages are reflected automatically, plus published synced articles via the existing articles helper. Routes marked `staticData: { sitemap: false }` so it never appears in the XML sitemap.

## Exact output it will serve at https://ammarai.com/llms.txt

```text
# AmmarAI

> One AI workspace for everything you create — writing, chat, images, video, voiceovers, transcription, document analysis and code across 68 tools. Brand voice, templates, assistants, bulk generation and team workspaces in one place. Free plan available.

## AI Tools

- [AI Writer](https://ammarai.com/ai-writer): A flexible writing workspace for drafts, long-form articles, rewrites, and brand-consistent content.
- [AI Chat](https://ammarai.com/ai-chat): A conversational AI that keeps context, answers questions, researches topics, and can hand work off to other tools.
- [AI Image Generator](https://ammarai.com/ai-image-generator): Generate high-quality images from text prompts — product shots, marketing visuals, social graphics.
- [AI Video Generator](https://ammarai.com/ai-video-generator): Create short videos from text prompts or still images, with transitions, captions and voiceover.
- [AI Voiceover & Voice Clone](https://ammarai.com/ai-voice-generator): Natural voiceovers in 150+ languages; clone your voice or choose neural voices.
- [AI Text to Speech](https://ammarai.com/ai-text-to-speech): Convert articles, documents and scripts into clear spoken audio.
- [AI Speech to Text](https://ammarai.com/ai-speech-to-text): Fast, accurate speech-to-text, including live dictation and recorded audio.
- [AI Transcription](https://ammarai.com/ai-transcription): Transcribe audio and video into text with speaker labels and timestamps.
- [AI Avatar Video Generator](https://ammarai.com/ai-avatar-generator): Turn any image into a talking avatar video with realistic lip-sync and expressions.
- [AI Image to Video](https://ammarai.com/ai-image-to-video): Animate a still image into a short clip with camera movement and controlled motion.
- [AI Text to Video](https://ammarai.com/ai-text-to-video): Generate a video clip directly from a written description of the shot you want.
- [AI Code Generator](https://ammarai.com/ai-code-generator): Generate code in multiple languages from natural-language descriptions.
- [AI Vision](https://ammarai.com/ai-vision): Analyze images, chat with uploaded documents, or analyze any webpage.
- [AI Document Analyzer](https://ammarai.com/ai-document-analyzer): Chat with uploaded PDF, Word and CSV files; get summaries and extracted data.
- [AI Article Generator](https://ammarai.com/ai-article-generator): Produce full, structured articles built around a topic and search intent.
- [AI Rewriter](https://ammarai.com/ai-rewriter): Rework existing text — change tone, tighten, simplify or restructure.
- [AI SEO Analyzer](https://ammarai.com/ai-seo-analyzer): Score any URL, text or keyword — technical checks, readability, volume and difficulty.
- [AI Plagiarism Detector](https://ammarai.com/ai-plagiarism-detector): Scan text against online sources for duplicated or AI-generated content.
- [External Chatbot Builder](https://ammarai.com/external-chatbot): Create and deploy website chatbots trained on your content.
- [AI Presentation Maker](https://ammarai.com/ai-presentation-maker): Generate complete slide decks from a topic or brief, with PPTX export.
- [AI URL to Video & Influencer](https://ammarai.com/ai-url-to-video): Paste a product URL and get a complete video ad — or turn long videos into short clips.
- [Sound Studio](https://ammarai.com/sound-studio): Merge audio, add background music, and fine-tune voiceovers.
- [AI Music Generator](https://ammarai.com/ai-music-generator): Generate original music and background tracks for videos, ads and podcasts.
- [AI Chat Bots](https://ammarai.com/ai-chat-bots): A gallery of creative virtual AI assistants trained with expert knowledge.
- [AI Blog Generator](https://ammarai.com/ai-blog-generator): Turn a topic into a structured, publish-ready blog post.
- [AI Blog Title Generator](https://ammarai.com/ai-blog-title-generator): Title options for any topic — direct, curiosity-led, number-based.
- [AI Blog Intro Generator](https://ammarai.com/ai-blog-intro-generator): An opening paragraph that hooks readers and sets up the post.
- [AI Blog Conclusion Generator](https://ammarai.com/ai-blog-conclusion-generator): A strong closing paragraph and call to action.
- [AI Content Rewriter](https://ammarai.com/ai-content-rewriter): Rephrase content into fresh wording while keeping the original meaning.
- [AI Paragraph Generator](https://ammarai.com/ai-paragraph-generator): A single well-written paragraph on any topic.
- [AI Summary Generator](https://ammarai.com/ai-summary-generator): Condense long text into a short, accurate summary.
- [AI Email Generator](https://ammarai.com/ai-email-generator): Clear, professional emails for any purpose with the tone and length you choose.
- [AI Cold Email Generator](https://ammarai.com/ai-cold-email-generator): Outreach emails built to get a reply.
- [AI Follow-Up Email Generator](https://ammarai.com/ai-follow-up-email-generator): A polite, effective nudge for an unanswered email.
- [AI Email Subject Line Generator](https://ammarai.com/ai-email-subject-line-generator): Subject lines that get opened instead of ignored.
- [AI Press Release Generator](https://ammarai.com/ai-press-release-generator): A properly formatted press release for any announcement.
- [AI Company Bio Generator](https://ammarai.com/ai-company-bio-generator): A clear, professional company bio for website, pitch deck or press kit.
- [AI Business Name Generator](https://ammarai.com/ai-business-name-generator): Business name ideas based on industry, style and audience.
- [AI Story Generator](https://ammarai.com/ai-story-generator): Creative short stories from a premise, genre or character idea.
- [AI Essay Writer](https://ammarai.com/ai-essay-writer): Structured essays with a clear thesis, supporting arguments and conclusion.
- [AI Grammar Checker](https://ammarai.com/ai-grammar-checker): Catch grammar, punctuation and phrasing issues in any writing.
- [AI Text Extender](https://ammarai.com/ai-text-extender): Expand short text into a fuller, more detailed version.
- [AI Tone Changer](https://ammarai.com/ai-tone-changer): Rewrite text in a different tone — formal, casual, friendly or persuasive.
- [AI Ad Generator](https://ammarai.com/ai-ad-generator): Ad copy for any channel from a single product description.
- [Facebook Ad Generator](https://ammarai.com/facebook-ad-generator): Facebook and Instagram feed ad copy with primary text, headline and description.
- [Google Ads Generator](https://ammarai.com/google-ads-generator): Google Search ad headlines and descriptions within character limits.
- [LinkedIn Ad Generator](https://ammarai.com/linkedin-ad-generator): LinkedIn Sponsored Content and message ad copy in a B2B register.
- [Instagram Caption Generator](https://ammarai.com/instagram-caption-generator): Instagram captions with a strong first line.
- [Instagram Hashtag Generator](https://ammarai.com/instagram-hashtag-generator): Relevant Instagram hashtag sets sized and mixed for discoverability.
- [Social Media Post Generator](https://ammarai.com/social-media-post-generator): Platform-specific posts for Instagram, Facebook, X and LinkedIn.
- [YouTube Description Generator](https://ammarai.com/youtube-description-generator): YouTube descriptions optimized for search and preview.
- [YouTube Title Generator](https://ammarai.com/youtube-title-generator): Click-worthy YouTube titles honest to the video's content.
- [YouTube Tag Generator](https://ammarai.com/youtube-tag-generator): Relevant YouTube tags for search and suggested-video discoverability.
- [TikTok Script Generator](https://ammarai.com/tiktok-script-generator): Short-form scripts with a hook built to land in the first 3 seconds.
- [Video Script Generator](https://ammarai.com/video-script-generator): Structured video scripts for YouTube, explainers, ads and presentations.
- [Newsletter Generator](https://ammarai.com/newsletter-generator): Newsletter issues with subject line, intro and structured body sections.
- [AI Product Description Generator](https://ammarai.com/ai-product-description-generator): Turn product specs into persuasive, on-brand product page copy.
- [Amazon Product Description Generator](https://ammarai.com/amazon-product-description-generator): Amazon-ready descriptions and A+ content copy.
- [Amazon Product Title Generator](https://ammarai.com/amazon-product-title-generator): Amazon titles respecting character limits and category conventions.
- [Product Benefits Generator](https://ammarai.com/product-benefits-generator): Translate features into the outcomes customers care about.
- [Product Features Generator](https://ammarai.com/product-features-generator): Organize and describe technical features clearly and consistently.
- [Product Comparison Generator](https://ammarai.com/product-comparison-generator): Honest side-by-side product comparisons that help buyers choose.
- [AI SEO Content Generator](https://ammarai.com/ai-seo-content-generator): Search-intent content around a topic and keyword, built to be edited.
- [Meta Description Generator](https://ammarai.com/meta-description-generator): Meta descriptions sized and phrased to earn clicks.
- [FAQ Generator](https://ammarai.com/faq-generator): FAQ content answering the question variants people actually search.
- [SEO Blog Generator](https://ammarai.com/seo-blog-generator): Full long-form blog posts structured around a keyword and search intent.
- [SEO Content Rewriter](https://ammarai.com/seo-content-rewriter): Rewrite content to improve clarity, structure and topical coverage for SEO.
- [Keyword-Based Rewriter](https://ammarai.com/keyword-based-rewriter): Rewrite copy to naturally incorporate target keywords, without stuffing.

## Platform Features

- [Multi-model AI](https://ammarai.com/features/multi-model-ai): Each task runs on a model suited to it, without managing providers.
- [Brand voice](https://ammarai.com/features/brand-voice): Save tone, vocabulary and rules once and reuse across every writing tool.
- [Templates library](https://ammarai.com/features/templates-library): Proven starting structures for common formats, plus your own saved templates.
- [Bulk generation](https://ammarai.com/features/bulk-generation): Run one structure across hundreds of rows for catalogue-scale output.
- [File uploads](https://ammarai.com/features/file-uploads): Upload documents, images and audio so output is grounded in your material.
- [Custom AI assistants](https://ammarai.com/features/ai-assistants): Assistants with a fixed brief and reference material for recurring work.
- [Team workspaces](https://ammarai.com/features/team-workspaces): Shared brand assets and history so team output stays consistent.
- [History and versions](https://ammarai.com/features/history-and-versions): Every generation saved, searchable and restorable.
- [Export and integrations](https://ammarai.com/features/export-and-integrations): Clean exports in the formats your publishing workflow already uses.
- [Privacy and control](https://ammarai.com/features/privacy-and-control): Ownership of your output, control over your data, honest limits.

## Use Cases

- [AI for Marketing Teams](https://ammarai.com/ai-for-marketing): Turn a single campaign brief into ads, emails, and landing pages.
- [AI for Content Creators](https://ammarai.com/ai-for-content-creators): Turn one idea into scripts, captions, and titles.
- [AI for Small Business](https://ammarai.com/ai-for-small-business): Write website copy, ads, and customer emails yourself.
- [AI for Entrepreneurs](https://ammarai.com/ai-for-entrepreneurs): Turn a new idea into a landing page, pitch copy and outreach emails fast.
- [AI for Students](https://ammarai.com/ai-for-students): Summarize readings, brainstorm outlines, check grammar.
- [AI for Developers](https://ammarai.com/ai-for-developers): Generate boilerplate, draft documentation, explain technical work.
- [AI for Agencies](https://ammarai.com/ai-for-agencies): Produce deliverables across multiple client accounts at once.
- [AI for E-commerce](https://ammarai.com/ai-for-ecommerce): Product descriptions, titles and listing copy across a whole catalog.
- [AI for Social Media Managers](https://ammarai.com/ai-for-social-media): Captions, hashtags and post ideas so the calendar never runs empty.
- [AI for SEO Professionals](https://ammarai.com/ai-for-seo): Optimized blog posts, meta descriptions and FAQ content at volume.
- [AI for Personal Productivity](https://ammarai.com/ai-for-productivity): Draft emails, summarize documents, clear routine writing faster.

## Blog

- [How to Use AI for Content Creation (Without Losing Your Voice)](https://ammarai.com/blog/how-to-use-ai-for-content-creation)
- [How to Write a Blog Post With AI (Step by Step)](https://ammarai.com/blog/how-to-write-a-blog-post-with-ai)
- [How to Create AI Videos: A Realistic Production Guide](https://ammarai.com/blog/how-to-create-ai-videos)
- [How to Generate AI Voiceovers That Don't Sound Robotic](https://ammarai.com/blog/how-to-generate-ai-voiceovers)
- [How to Rewrite Content With AI Without Making It Worse](https://ammarai.com/blog/how-to-rewrite-content-with-ai)
- [How to Use AI for SEO Without Getting Penalized for Thin Content](https://ammarai.com/blog/how-to-use-ai-for-seo)
- [AI Tools for Small Businesses: Where the Real ROI Is](https://ammarai.com/blog/ai-tools-for-small-businesses)
- [AI Tools for Marketers: What to Automate and What to Keep Human](https://ammarai.com/blog/ai-tools-for-marketers)
- [AI Productivity Workflows That Actually Save Time](https://ammarai.com/blog/ai-productivity-workflows)
- [How to Write Better AI Prompts: A Practical Framework](https://ammarai.com/blog/how-to-write-better-ai-prompts)
- Plus published synced articles from the BabyLoveGrowth feed.

## Company

- [About](https://ammarai.com/about): What AmmarAI is and who it is for
- [Pricing](https://ammarai.com/pricing): Free, Starter, Professional and Ultimate plans
- [AI Tools directory](https://ammarai.com/ai-tools): Browse all 68 tools
- [FAQ](https://ammarai.com/faq): Common questions about the platform
- [Resources](https://ammarai.com/resources): Guides and help
- [Contact](https://ammarai.com/contact): Sales, support and partnerships
```

## Notes

- Links point at the production domain `https://ammarai.com`.
- Tools, use cases, features, blog posts and pages are pulled live from the content layer, so CMS edits, hidden items and new pages appear automatically; published synced articles are appended to the Blog section.
- `/admin` and `/auth` are excluded.
- `Content-Type: text/plain; charset=utf-8`, `Cache-Control: public, max-age=3600`.

## Verification

- `bunx tsgo --noEmit` passes.
- Fetch `http://localhost:8080/llms.txt` and confirm the Markdown matches the block above.
