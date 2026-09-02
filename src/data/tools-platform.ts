import type { Tool } from "./types";

export const platformTools: Tool[] = [
  {
    slug: "ai-plagiarism-detector",
    name: "AI Plagiarism Detector",
    category: "AI Writing",
    summary:
      "Scan any text against online sources to check for duplicated or AI-generated content, with matched source links.",
    title: "AI Plagiarism Detector: Check Originality | AmmarAI",
    description:
      "Scan any text against online sources to check for duplicated or AI-generated content, and get the matched source links.",
    h1: "Know whether the text is original before you publish it",
    lede: "Paste any draft and the Plagiarism Detector checks it against online sources, flags duplicated passages, estimates the likelihood of AI-generated text, and links you to the sources it matched.",
    ctaLabel: "Check a document",
    what: [
      "The AI Plagiarism Detector checks text for two things that matter before anything goes live: whether passages already exist elsewhere online, and whether the writing shows the statistical fingerprint of machine-generated text. You paste the content, run the scan, and get a report instead of a guess.",
      "Matches are shown passage by passage with links to the sources they came from, so you can see exactly what overlaps and decide whether it needs a rewrite, a quote or a citation. That makes it useful in both directions: checking work you are about to publish, and checking work submitted to you.",
    ],
    canDo: [
      "Scan pasted text or uploaded documents for duplicated content",
      "See flagged passages with links to the matching online sources",
      "Estimate the likelihood that a text was AI-generated",
      "Get an overall originality score for the document",
      "Re-scan after editing to confirm the rewrite resolved the match",
    ],
    how: [
      {
        title: "Paste or upload the text",
        body: "Drop in the draft, article, essay or product copy you want to check.",
      },
      {
        title: "Run the scan",
        body: "The detector compares the text against online sources and analyses writing patterns.",
      },
      {
        title: "Review flagged passages",
        body: "Each match shows the overlapping text and a link to the source, so you can judge it in context.",
      },
      {
        title: "Fix and re-check",
        body: "Rewrite, quote or cite the flagged sections, then scan again to confirm the document is clean.",
      },
    ],
    examples: [
      {
        label: "Freelance article check",
        input:
          "Scan a 1,800-word submitted article before paying the invoice.",
        output:
          "Originality 91%. Two flagged passages: a 38-word block matching a 2023 industry report (source linked) and a paragraph rated likely AI-generated. Everything else is clean.",
      },
      {
        label: "Landing page rewrite",
        input: "Re-scan the page copy after rewriting the matched sections.",
        output:
          "Originality 99%. No source matches above threshold. AI-likelihood score low across all sections.",
      },
    ],
    capabilities: [
      {
        title: "Source-linked matches",
        body: "Every flagged passage links to the page it matches, so you can verify instead of taking the score on faith.",
      },
      {
        title: "AI-content detection",
        body: "A separate signal estimates whether the text reads as machine-generated, independent of duplication.",
      },
      {
        title: "Passage-level reporting",
        body: "Results are broken down per passage rather than a single number for the whole document.",
      },
    ],
    audiences: [
      {
        who: "Editors and content leads",
        why: "Verify submitted work before it is published under your name.",
      },
      {
        who: "Educators",
        why: "Check student submissions for copied or generated passages.",
      },
      {
        who: "Agencies",
        why: "Add an originality check to the delivery process before handover.",
      },
      {
        who: "Writers",
        why: "Confirm a heavy rewrite is genuinely distinct from the source material.",
      },
    ],
    useCases: [
      {
        title: "Pre-publish check",
        body: "Run every outsourced article through the detector as the last step before it goes live.",
      },
      {
        title: "Rewrite verification",
        body: "After reworking AI-assisted drafts, scan to confirm the final text reads as original.",
      },
    ],
    tips: [
      "Read the matched source before rewriting; sometimes a citation is the right fix, not new wording.",
      "Scan at the draft stage, not after design and layout are done.",
      "Treat the AI-likelihood score as a prompt to review, not a verdict.",
    ],
    mistakes: [
      "Ignoring small matches — a string of short duplicated phrases adds up.",
      "Rewriting by swapping synonyms, which rarely clears a match and usually reads worse.",
      "Publishing without re-scanning after edits.",
    ],
    faqs: [
      {
        q: "What sources does it check against?",
        a: "The scan compares your text against publicly indexed online sources and returns links to any pages that match.",
      },
      {
        q: "Does it detect AI-generated text?",
        a: "Yes, it includes an AI-likelihood estimate alongside duplication matching. Treat it as a review signal, since no detector is perfect in either direction.",
      },
      {
        q: "Can I check a whole document?",
        a: "Yes. Paste the text or upload the file and the scan runs across the full document, reported passage by passage.",
      },
    ],
    related: ["ai-content-rewriter", "ai-grammar-checker", "ai-writer", "ai-article-generator"],
    hideDemoVideo: true,
  },
  {
    slug: "external-chatbot",
    name: "External Chatbot Builder",
    category: "AI Chat",
    summary:
      "Create and deploy customizable chatbots for your website, trained on your content, with brand styling and conversation analytics.",
    title: "External Chatbot: AI Support on Your Website | AmmarAI",
    description:
      "Create and deploy customizable chatbots for websites with brand styling, training on your content, and conversation analytics.",
    h1: "Put a trained AI assistant on your own website",
    lede: "Build a chatbot that answers visitor questions using your content, styled to match your brand, and deployed on your site with an embed — then read the analytics to see what customers actually ask.",
    ctaLabel: "Build your chatbot",
    what: [
      "The External Chatbot Builder lets you create an AI assistant that lives on your website rather than inside AmmarAI. You train it on your own material — pages, documents, help articles, product information — so its answers come from your knowledge base instead of general knowledge.",
      "The widget is styled to your brand: colours, position, greeting and tone are all configurable, so it reads as part of your site rather than a bolted-on third-party box. Once embedded, every conversation is logged, and the analytics view shows volumes, common questions and the queries the bot could not answer — which is a direct map of what your site fails to explain.",
    ],
    canDo: [
      "Train a chatbot on your pages, documents and help content",
      "Customise colours, greeting, tone and widget position to match your brand",
      "Deploy on any website with a small embed snippet",
      "Review conversation logs and analytics on common questions",
      "Update the training content as your product or policies change",
      "Set fallback behaviour for questions outside the bot's knowledge",
    ],
    how: [
      {
        title: "Create a bot and add your content",
        body: "Point it at your website pages and upload the documents, FAQs and product information it should answer from.",
      },
      {
        title: "Style the widget",
        body: "Set brand colours, the greeting message, the assistant's tone and where the widget sits on the page.",
      },
      {
        title: "Test the hard questions",
        body: "Ask it the awkward, specific questions customers actually ask, and add content where the answers fall short.",
      },
      {
        title: "Embed and monitor",
        body: "Paste the snippet into your site, then watch the analytics to see what visitors ask and where the bot needs more training.",
      },
    ],
    examples: [
      {
        label: "Storefront support bot",
        input:
          "Train on shipping policy, returns page and 40 product FAQs. Greeting: 'Hi — ask me anything about orders, shipping or returns.'",
        output:
          "A branded chat widget that resolves order-status and returns questions instantly, with analytics showing 'international shipping' as the top new query this week.",
      },
    ],
    capabilities: [
      {
        title: "Trained on your content",
        body: "Answers are grounded in the pages and documents you provide, not generic internet knowledge.",
      },
      {
        title: "Brand styling",
        body: "Colours, greeting, tone and placement are configurable so the widget matches your site.",
      },
      {
        title: "Conversation analytics",
        body: "See volumes, top questions and unanswered queries, which doubles as customer research.",
      },
    ],
    audiences: [
      {
        who: "E-commerce teams",
        why: "Deflect repetitive order, shipping and returns questions around the clock.",
      },
      {
        who: "SaaS companies",
        why: "Answer product questions from the help centre without adding support headcount.",
      },
      {
        who: "Agencies",
        why: "Ship trained, branded chatbots as a deliverable for client sites.",
      },
    ],
    useCases: [
      {
        title: "First-line support",
        body: "Let the bot handle the repeatable questions and route the rest to your team with the conversation attached.",
      },
      {
        title: "Content gap discovery",
        body: "Use the unanswered-questions report to decide which help articles and product pages to write next.",
      },
    ],
    tips: [
      "Train on the documents customers actually need, not everything you have.",
      "Write the greeting as a question prompt so visitors know what to ask.",
      "Review unanswered queries weekly and feed the answers back into training.",
    ],
    mistakes: [
      "Deploying without testing the questions your support inbox gets most.",
      "Training on stale policy pages that contradict current terms.",
      "Hiding the option to reach a human when the bot cannot help.",
    ],
    faqs: [
      {
        q: "How does the bot learn my content?",
        a: "You provide the sources — website pages, documents, FAQs — and the bot answers from that material. Update the sources and the answers update with them.",
      },
      {
        q: "How do I add it to my site?",
        a: "A small embed snippet is generated for each bot. Paste it into your site and the widget appears, styled the way you configured it.",
      },
      {
        q: "What analytics are included?",
        a: "Conversation volume, the most common questions, and the queries the bot could not answer, so you know what to improve.",
      },
    ],
    related: ["ai-chat", "ai-chat-bots", "ai-writer", "ai-summary-generator"],
    hideDemoVideo: true,
  },
  {
    slug: "ai-presentation-maker",
    name: "AI Presentation Maker",
    category: "AI Productivity",
    summary:
      "Generate complete, professionally designed slide decks from a topic or brief — layouts, visuals and PPTX export included.",
    title: "AI Presentation Maker: Decks From a Brief | AmmarAI",
    description:
      "Generate complete, professionally designed slide decks from a topic or brief, including layouts, visuals, and export to PPTX.",
    h1: "From a one-line brief to a finished deck",
    lede: "Describe the topic, the audience and the length, and the Presentation Maker produces a complete deck — structured content, designed layouts and visuals — that exports to PPTX for final polish.",
    ctaLabel: "Build a deck",
    what: [
      "The AI Presentation Maker turns a topic or short brief into a complete slide deck. It handles the two slowest parts of presentation work at once: structuring the content into a logical sequence of slides, and applying professional layouts so the deck looks designed rather than defaulted.",
      "The output is a real starting deck, not an outline you still have to build. Titles, body content, speaker-ready structure and visuals come together, and the whole thing exports to PPTX so you can refine it in the tools your company already uses.",
    ],
    canDo: [
      "Generate a full deck from a topic, brief or pasted document",
      "Choose the deck length and level of detail",
      "Apply professional layouts and visual themes automatically",
      "Include visuals matched to each slide's content",
      "Export to PPTX for editing in PowerPoint or Keynote",
      "Regenerate individual slides without rebuilding the deck",
    ],
    how: [
      {
        title: "Brief it properly",
        body: "Give the topic, the audience, the goal and the length. \"Ten slides for a board update on Q3 churn, sober tone\" beats \"presentation about churn\".",
      },
      {
        title: "Review the structure first",
        body: "Check the slide sequence before polishing. Moving an argument at structure stage takes seconds.",
      },
      {
        title: "Refine slide by slide",
        body: "Regenerate or edit individual slides where the content or layout misses.",
      },
      {
        title: "Export and present",
        body: "Download as PPTX, apply any house style your team requires, and present.",
      },
    ],
    examples: [
      {
        label: "Sales intro deck",
        input:
          "12-slide deck introducing our inventory software to retail operations directors. Benefits-led, one case study, ends on pricing.",
        output:
          "A complete 12-slide deck with titled sections, benefit statements, a case-study slide and a closing pricing slide, exported to PPTX.",
      },
    ],
    capabilities: [
      {
        title: "Structured generation",
        body: "Content is organised into a logical slide sequence with titles and sections, not a wall of bullet points.",
      },
      {
        title: "Designed layouts",
        body: "Professional layout and visual themes are applied automatically, with visuals matched to slide content.",
      },
      {
        title: "PPTX export",
        body: "Decks export to PowerPoint format for final edits in the tools your team already uses.",
      },
    ],
    audiences: [
      {
        who: "Sales teams",
        why: "Produce tailored intro decks per prospect without rebuilding from a template each time.",
      },
      {
        who: "Managers",
        why: "Turn a status report into a presentable deck in minutes.",
      },
      {
        who: "Educators and trainers",
        why: "Convert lesson outlines into slides with consistent design.",
      },
    ],
    useCases: [
      {
        title: "Board and investor updates",
        body: "Paste the quarterly numbers and talking points, get a structured deck, then spend your time on the narrative instead of alignment boxes.",
      },
      {
        title: "Webinar and course slides",
        body: "Turn a lesson script into a slide sequence, then refine the two or three slides that carry the argument.",
      },
    ],
    tips: [
      "State the audience and the decision you want; it shapes the whole structure.",
      "Generate, then cut. A tighter deck is a better deck.",
      "Replace generated visuals with your real product screenshots where they exist.",
    ],
    mistakes: [
      "Accepting the first structure when the argument is in the wrong order.",
      "Cramming a document onto slides instead of letting one slide carry one point.",
      "Presenting without checking every number on the data slides.",
    ],
    faqs: [
      {
        q: "What format does it export?",
        a: "Decks export to PPTX, which opens in PowerPoint, Keynote and Google Slides for final editing.",
      },
      {
        q: "Can I edit individual slides?",
        a: "Yes. You can regenerate or rewrite single slides without rebuilding the rest of the deck.",
      },
      {
        q: "Does it include visuals?",
        a: "Yes. Layouts include visuals matched to each slide's content, and you can swap in your own images before export.",
      },
    ],
    related: ["ai-writer", "ai-image-generator", "ai-summary-generator", "ai-document-analyzer"],
    hideDemoVideo: true,
  },
  {
    slug: "ai-url-to-video",
    name: "AI URL to Video & Influencer",
    category: "AI Video",
    summary:
      "Paste any product URL and get a complete video ad with voiceover, captions and an avatar — or turn long videos into viral short clips.",
    title: "AI URL to Video: Product Link to Video Ad | AmmarAI",
    description:
      "Paste any product URL and automatically generate a complete video ad with voiceover, captions and avatar. Turn long-form videos into viral short clips and create influencer-style avatar videos.",
    h1: "Paste a product link. Get a finished video ad.",
    lede: "Drop in any product URL and AmmarAI builds the ad for you — script, voiceover, captions and an on-screen avatar. The same toolkit turns long-form videos into short clips built for feeds, and creates influencer-style avatar videos without a shoot.",
    ctaLabel: "Generate a video ad",
    what: [
      "AI URL to Video removes the blank-timeline problem from video advertising. Paste a product page URL and the platform reads the page — the product, the benefits, the imagery — and generates a complete video ad: a script, a voiceover, captions and an avatar presenter, assembled and ready to post.",
      "The same toolset covers the two other formats that dominate social video. Long-to-short clipping takes a podcast, webinar or YouTube video and cuts the moments most likely to hold attention into vertical clips with captions. Influencer-style avatar videos put a realistic presenter in the frame delivering your script, so product marketing gets a human face without booking one.",
    ],
    canDo: [
      "Paste a product URL and generate a complete video ad automatically",
      "Include voiceover, captions and an avatar presenter in the generated ad",
      "Turn long-form videos into short, captioned clips for social feeds",
      "Create influencer-style avatar videos from a script",
      "Produce multiple ad variants for testing different hooks",
      "Export in vertical, square and widescreen formats",
    ],
    how: [
      {
        title: "Paste the product URL",
        body: "The platform reads the page to extract the product, benefits and imagery the ad is built around.",
      },
      {
        title: "Review the generated script",
        body: "Edit the hook and the claims before anything renders — the script drives the voiceover, captions and avatar delivery.",
      },
      {
        title: "Pick presenter and format",
        body: "Choose an avatar and the aspect ratio for the channel you are posting to.",
      },
      {
        title: "Generate variants and post",
        body: "Produce a few versions with different hooks, then let performance data pick the winner.",
      },
    ],
    examples: [
      {
        label: "Product ad from a URL",
        input:
          "URL of a skincare product page. Format: 30-second vertical ad with avatar presenter, voiceover and captions.",
        output:
          "A finished vertical ad: avatar presenter delivering the product pitch, synced voiceover, burned-in captions and product imagery from the page.",
      },
      {
        label: "Podcast to clips",
        input: "45-minute interview video, request the five strongest moments as captioned vertical clips.",
        output:
          "Five short clips, each a self-contained moment with captions and a hook in the first two seconds, ready for Reels and TikTok.",
      },
    ],
    capabilities: [
      {
        title: "URL-driven generation",
        body: "The ad's script and visuals are built from the actual product page, so the message matches what is on the site.",
      },
      {
        title: "Complete ad assembly",
        body: "Voiceover, captions and an avatar presenter come together in one finished render, not separate assets you assemble elsewhere.",
      },
      {
        title: "Long-to-short clipping",
        body: "Existing long-form video is mined for the moments that work as standalone short clips.",
      },
    ],
    audiences: [
      {
        who: "E-commerce brands",
        why: "Turn every product page into ad creative without a production team.",
      },
      {
        who: "Podcasters and creators",
        why: "Repurpose long episodes into the short clips that drive discovery.",
      },
      {
        who: "Performance marketers",
        why: "Generate enough ad variants to test hooks properly.",
      },
    ],
    useCases: [
      {
        title: "Catalogue-wide ad coverage",
        body: "Generate a baseline video ad for every product URL, then invest manual effort only in the products that sell.",
      },
      {
        title: "Content repurposing engine",
        body: "Feed every webinar and podcast episode through clipping so each recording produces a week of social posts.",
      },
    ],
    tips: [
      "Clean up the product page first — the ad is only as sharp as the page it reads.",
      "Test hooks, not just visuals; the first two seconds decide the ad.",
      "Keep captions on. Most social video is watched muted.",
    ],
    mistakes: [
      "Generating ads from a thin product page with no benefits listed.",
      "Posting one variant and calling the channel dead when it underperforms.",
      "Clipping long videos without checking that each moment stands alone.",
    ],
    faqs: [
      {
        q: "What does it take from the URL?",
        a: "The product, key benefits and imagery from the page, which drive the script, the visuals and the captions of the generated ad.",
      },
      {
        q: "Can I turn existing videos into short clips?",
        a: "Yes. Upload a long-form video and the tool identifies strong standalone moments and cuts them into captioned vertical clips.",
      },
      {
        q: "Do I need a presenter?",
        a: "No. Influencer-style avatar presenters are generated, and you can choose the avatar that fits your brand.",
      },
    ],
    related: [
      "ai-avatar-generator",
      "ai-video-generator",
      "ai-voice-generator",
      "video-script-generator",
      "ai-ad-generator",
    ],
  },
  {
    slug: "sound-studio",
    name: "Sound Studio",
    category: "AI Audio",
    summary:
      "Merge audio, add background music, adjust voice speed and loudness, and fine-tune voiceovers in one place.",
    title: "Sound Studio: Mix and Fine-Tune Audio | AmmarAI",
    description:
      "Merge audio tracks, add background music, adjust voice speed and loudness, and fine-tune AI voiceovers without a separate audio editor.",
    h1: "Finish your audio without leaving the platform",
    lede: "Sound Studio is where generated voiceovers become finished audio: merge tracks, lay background music underneath, and adjust speed and loudness until the mix sits right.",
    ctaLabel: "Open Sound Studio",
    what: [
      "Sound Studio is the audio finishing bench inside AmmarAI. Generated voiceovers rarely go straight into a project untouched — they need a music bed, a pace adjustment, a volume balance against other audio. Sound Studio handles that finishing work so you do not need a separate audio editor for routine production.",
      "It pairs naturally with the voice tools: generate the narration in AI Voiceover, pull it into Sound Studio, add background music, tune the speed and loudness, and export one finished file ready for your video, course or podcast.",
    ],
    canDo: [
      "Merge multiple audio files into one track",
      "Add background music under a voiceover and balance the levels",
      "Adjust voice playback speed without distorting the tone",
      "Normalise loudness across clips so nothing jumps or disappears",
      "Trim and fine-tune generated voiceovers",
      "Export a single finished audio file",
    ],
    how: [
      {
        title: "Add your tracks",
        body: "Bring in generated voiceovers, uploaded recordings and music files.",
      },
      {
        title: "Arrange and merge",
        body: "Order the segments, merge them into one timeline and layer music underneath.",
      },
      {
        title: "Tune the mix",
        body: "Adjust voice speed, set loudness and balance the music so the narration stays clear.",
      },
      {
        title: "Export",
        body: "Render one finished file ready for the video editor, course platform or podcast host.",
      },
    ],
    examples: [
      {
        label: "Course lesson audio",
        input:
          "Merge three generated voiceover segments, add a soft ambient music bed at low level, normalise loudness.",
        output:
          "One finished lesson track: consistent volume across segments, music sitting under the voice, exported as a single file.",
      },
    ],
    capabilities: [
      {
        title: "Track merging",
        body: "Combine voiceovers, recordings and music into one continuous audio file.",
      },
      {
        title: "Background music mixing",
        body: "Layer a music bed under narration with level control so the voice stays intelligible.",
      },
      {
        title: "Speed and loudness control",
        body: "Fine-tune pace and normalise volume across clips for a consistent result.",
      },
    ],
    audiences: [
      {
        who: "Course creators",
        why: "Assemble and polish lesson audio without learning a DAW.",
      },
      {
        who: "Video creators",
        why: "Deliver a finished narration-and-music mix to the edit.",
      },
      {
        who: "Podcasters",
        why: "Merge segments and balance levels quickly between recordings.",
      },
    ],
    useCases: [
      {
        title: "Voiceover finishing",
        body: "Take a raw generated voiceover, add the music bed and loudness polish, and hand the edit a finished file.",
      },
      {
        title: "Multi-segment lessons",
        body: "Record or generate each section separately, then merge and normalise so the course sounds like one take.",
      },
    ],
    tips: [
      "Keep background music well under the voice; if you notice the music, it is too loud.",
      "Normalise loudness last, after all edits are final.",
      "Generate voiceover segments at a consistent pace so speed adjustments stay small.",
    ],
    mistakes: [
      "Mixing music too loud and burying the narration.",
      "Merging before the individual segments are final.",
      "Large speed changes that make the voice sound strained.",
    ],
    faqs: [
      {
        q: "Can I use my own music?",
        a: "Yes. Upload your own licensed tracks, or generate background music with AI Music and pull it straight into the mix.",
      },
      {
        q: "Does changing speed affect voice quality?",
        a: "Reasonable adjustments keep the tone natural. Extreme speed changes on any voice will start to sound strained.",
      },
      {
        q: "What formats can I export?",
        a: "Finished mixes export in common audio formats ready for video editors, course platforms and podcast hosts.",
      },
    ],
    related: ["ai-voice-generator", "ai-text-to-speech", "ai-music-generator", "ai-video-generator"],
    hideDemoVideo: true,
  },
  {
    slug: "ai-music-generator",
    name: "AI Music Generator",
    category: "AI Audio",
    summary:
      "Generate original music and background tracks for videos, ads, podcasts and presentations.",
    title: "AI Music Generator: Original Tracks on Demand | AmmarAI",
    description:
      "Generate original music and background tracks for videos, ads, podcasts and presentations, matched to mood, genre and length.",
    h1: "Background music that fits, without the licensing maze",
    lede: "Describe the mood, genre and length, and AI Music generates an original track for your video, ad, podcast or presentation — ready to drop into Sound Studio or your edit.",
    ctaLabel: "Generate music",
    what: [
      "The AI Music Generator creates original music and background tracks from a written description. Name the mood, the genre and the duration, and you get a track that fits the content it sits under — without searching stock libraries or negotiating licences.",
      "It is built for functional music: the bed under a voiceover, the opener for a podcast, the energy under a product ad. Generate a few variants, pick the one that supports the content, and pull it into Sound Studio to balance it against your narration.",
    ],
    canDo: [
      "Generate original tracks from a mood, genre and length description",
      "Create background music for videos, ads, podcasts and presentations",
      "Produce several variants of the same brief to choose between",
      "Match track length to the content it accompanies",
      "Send tracks directly to Sound Studio for mixing with voiceover",
    ],
    how: [
      {
        title: "Describe the track",
        body: "Mood, genre, tempo and length. \"Warm, minimal ambient bed, 60 seconds, no drums\" gives the model something to work with.",
      },
      {
        title: "Generate variants",
        body: "Produce a few takes of the same brief; background music is easier to pick than to specify perfectly.",
      },
      {
        title: "Mix it in",
        body: "Send the chosen track to Sound Studio and balance it under the voice or video audio.",
      },
    ],
    examples: [
      {
        label: "Product ad bed",
        input: "Upbeat, modern electronic track, 30 seconds, builds to a lift at the end for the call to action.",
        output:
          "A 30-second track with rising energy and a final lift timed for the CTA, ready to mix under the voiceover in Sound Studio.",
      },
    ],
    capabilities: [
      {
        title: "Mood and genre control",
        body: "Direct the feel of the track in plain language rather than browsing a library by tag.",
      },
      {
        title: "Length matching",
        body: "Generate to the duration your content actually needs instead of cutting library music to fit.",
      },
      {
        title: "Studio integration",
        body: "Tracks flow straight into Sound Studio for mixing with voiceovers and other audio.",
      },
    ],
    audiences: [
      {
        who: "Video creators",
        why: "Score content at the right length without stock-library searching.",
      },
      {
        who: "Podcasters",
        why: "Produce a consistent intro and outro identity.",
      },
      {
        who: "Marketers",
        why: "Give every ad variant its own track without per-use licensing costs.",
      },
    ],
    useCases: [
      {
        title: "Ad scoring",
        body: "Generate a track per ad variant so each cut feels finished rather than sharing one tired library loop.",
      },
      {
        title: "Course and webinar beds",
        body: "Create calm, consistent background music for lessons that supports narration without competing with it.",
      },
    ],
    tips: [
      "Describe what the track should do for the content, not just the genre.",
      "Generate short; background music earns its keep in the first ten seconds.",
      "Keep beds simple. Busy music under a voice loses both.",
    ],
    mistakes: [
      "Picking a track you enjoy listening to over one that supports the content.",
      "Leaving the music at full level under narration.",
      "Using a dramatic track for content that should feel calm.",
    ],
    faqs: [
      {
        q: "Can I use the tracks commercially?",
        a: "Generated tracks are original and made for use in your own content, including commercial projects like ads and courses.",
      },
      {
        q: "Can I control the length?",
        a: "Yes. Specify the duration you need and the track is generated to fit it.",
      },
      {
        q: "Does it work with voiceovers?",
        a: "Yes. Send the track to Sound Studio and mix it under any voiceover generated on the platform or uploaded yourself.",
      },
    ],
    related: ["sound-studio", "ai-voice-generator", "ai-video-generator", "ai-ad-generator"],
    hideDemoVideo: true,
  },
];
