import type { Tool } from "./types";

export const marketingTools: Tool[] = [
  {
    slug: "ai-ad-generator",
    name: "AI Ad Generator",
    category: "AI Marketing",
    summary: "Generate ad copy for any channel from a single product description.",
    title: "AI Ad Generator: Multi-Channel Ad Copy | AmmarAI",
    description: "Create headlines, descriptions, and CTAs for search, social, and display ads with AmmarAI's AI ad generator.",
    h1: "Write ads that fit any channel, fast",
    lede: "Turn one product idea into ready-to-test ad variations for search, social, and display — matched to each platform's format.",
    ctaLabel: "Generate Ads Free",
    popular: true,
    what: [
      "The AI Ad Generator is a starting point for paid campaigns across formats you don't have time to write from scratch — search headlines, social carousels, display banners, native placements. You describe the product, the audience and the goal, and get a spread of angles back: benefit-led, urgency-led, question-led, social-proof-led.",
      "It doesn't guess at your brand voice from nothing — you set the tone (playful, corporate, direct-response) and it keeps variations inside that register. Because ad copy lives or dies on constraints, the tool is built to respect format limits rather than produce generic paragraphs you then have to cut down by hand."
    ],
    canDo: [
      "Generate 5-10 headline and description variations per prompt",
      "Adapt tone from playful to enterprise-formal",
      "Produce copy sized for search, social, and display formats",
      "Suggest multiple CTA options (Shop Now, Learn More, Get Started)",
      "Create angle variety: benefit, urgency, curiosity, social proof",
      "Draft several variants at once for A/B testing"
    ],
    how: [
      { title: "Describe the offer", body: "Enter what you're advertising, the audience, and the single most important benefit." },
      { title: "Pick a channel and tone", body: "Choose search, social, or display, and set a tone so output matches your brand." },
      { title: "Generate variations", body: "Get several headline/description pairs and CTA options in one pass." },
      { title: "Edit and test", body: "Trim to fit exact character limits per platform, then load into your ad manager for A/B testing." }
    ],
    examples: [
      { label: "E-commerce product launch", input: "Wireless earbuds with 40-hour battery, targeting commuters, urgency angle", output: "Headline: All-Day Sound, Zero Recharge Anxiety\nDescription: 40-hour battery. Noise cancelling. Free shipping ends Friday — order now." },
      { label: "B2B SaaS trial signup", input: "Project management tool for remote teams, professional tone, free trial CTA", output: "Headline: Keep Remote Teams On Schedule\nDescription: Plan, assign, and track work in one workspace. Start your free 14-day trial today." }
    ],
    capabilities: [
      { title: "Format-aware output", body: "Copy is drafted with each channel's typical length and style in mind, so you spend less time cutting it down." },
      { title: "Angle variety", body: "Generates multiple persuasion angles from a single input so you have real options to test, not near-duplicates." },
      { title: "Tone control", body: "Set the voice once and every variation stays consistent with your brand." }
    ],
    audiences: [
      { who: "Performance marketers", why: "Need a fast supply of testable variations across campaigns." },
      { who: "Small business owners", why: "Don't have an in-house copywriter but need to run ads this week." },
      { who: "Agencies", why: "Draft first-pass copy for client review before final polish." }
    ],
    useCases: [
      { title: "Launching a new product", body: "Get several headline/description combos to test which angle resonates before scaling spend." },
      { title: "Refreshing fatigued creative", body: "Generate new copy variations when existing ads' performance starts to decline." }
    ],
    tips: [
      "Always verify character counts against the destination platform's current limits before publishing",
      "Feed in your strongest, most specific benefit — vague inputs produce vague ads",
      "Generate more variations than you need, then pick the 2-3 most distinct for testing",
      "Keep a swipe file of outputs that perform well to reuse the phrasing pattern later",
      "Review every ad against the platform's advertising policy before submitting"
    ],
    mistakes: [
      "Publishing AI output without checking exact character limits per placement",
      "Using the same angle in every variation instead of testing genuinely different hooks",
      "Ignoring platform ad policy restrictions on claims and superlatives",
      "Treating generated copy as final rather than a fast first draft"
    ],
    faqs: [
      { q: "Will this guarantee better ad performance?", a: "No tool can guarantee results — ad performance depends on targeting, budget, creative, and market conditions. This tool speeds up drafting testable copy." },
      { q: "Does it know exact platform character limits?", a: "It targets typical format lengths, but you should always confirm current limits on the specific platform before publishing, since they change." },
      { q: "Can I use this for regulated industries?", a: "You're responsible for ensuring any generated copy complies with your industry's advertising regulations and the platform's policies." },
      { q: "Can I match my existing brand voice?", a: "Yes, set a tone or paste a style reference and the generator will keep variations consistent with it." }
    ],
    related: ["facebook-ad-generator", "google-ads-generator", "linkedin-ad-generator", "social-media-post-generator"]
  },

  {
    slug: "facebook-ad-generator",
    name: "Facebook Ad Generator",
    category: "AI Marketing",
    summary: "Write Facebook and Instagram feed ad copy with primary text, headline, and description fields.",
    title: "Facebook Ad Generator: Primary Text & Headlines | AmmarAI",
    description: "Generate Facebook ad primary text, headline, and description combos built for feed placements and Meta's ad structure.",
    h1: "Facebook ads that stop the scroll",
    lede: "Draft primary text, headline, and description for Meta's ad format — sized for feed and sidebar placements, not generic copy.",
    ctaLabel: "Write Facebook Ads",
    popular: true,
    what: [
      "Facebook (Meta) ads have a distinct structure: primary text above the image, a short headline below it, and an optional description line. Each field has a different job — primary text hooks and explains, the headline reinforces the offer in a handful of words, the description adds a supporting detail. This generator writes all three as a matched set instead of one undifferentiated block of copy.",
      "Meta also enforces a policy layer most other channels don't: limited use of superlatives, restrictions around personal attributes, and scrutiny of before/after claims. The tool nudges output toward compliant phrasing, but final review against Meta's ad policies before you publish is on you."
    ],
    canDo: [
      "Generate matched primary text, headline, and description sets",
      "Write hooks for the first line that show before 'See more' truncation",
      "Produce variations for carousel and single-image formats",
      "Suggest CTA button copy (Shop Now, Sign Up, Download)",
      "Adapt tone for cold traffic vs. retargeting audiences",
      "Draft multiple angles for split testing within one ad set"
    ],
    how: [
      { title: "Describe your offer and audience", body: "Include the product, target audience, and whether this is cold or retargeting traffic." },
      { title: "Choose placement style", body: "Pick single image, carousel, or video framing so the copy matches the creative." },
      { title: "Generate the set", body: "Receive primary text, headline, and description together, not as separate disconnected pieces." },
      { title: "Check against Meta policy", body: "Review claims and superlatives before submitting to Ads Manager." }
    ],
    examples: [
      { label: "Cold traffic, skincare brand", input: "Vegan face serum, targeting women 25-40, cold audience, first-line hook needed", output: "Primary text: Your skin sees everything you put it through. Give it something better.\nHeadline: Vegan Serum, Visible Glow\nDescription: Free shipping on first orders." },
      { label: "Retargeting, cart abandoners", input: "Home goods store, retargeting people who viewed but didn't buy", output: "Primary text: Still thinking about it? Your cart's saved — plus 10% off if you check out today.\nHeadline: Your Cart Is Waiting\nDescription: Offer ends in 48 hours." }
    ],
    capabilities: [
      { title: "First-line hooks", body: "Primary text opens with a line built to earn attention before Facebook truncates it with 'See more.'" },
      { title: "Field-matched output", body: "Headline and description are written to complement, not repeat, the primary text." },
      { title: "Audience-stage awareness", body: "Copy shifts tone depending on whether you're targeting cold or warm audiences." }
    ],
    audiences: [
      { who: "DTC brands", why: "Run frequent Meta ad tests and need a steady supply of fresh angles." },
      { who: "Local businesses", why: "Need simple, clear feed ads without hiring a copywriter." },
      { who: "Media buyers", why: "Draft multiple creative angles quickly for ad set testing." }
    ],
    useCases: [
      { title: "Cold audience prospecting", body: "Generate hook-driven primary text designed to earn a stop-and-read from people who've never heard of you." },
      { title: "Retargeting cart abandoners", body: "Write urgency-and-value copy aimed at people already familiar with your product." }
    ],
    tips: [
      "Write your first line to work standalone since 'See more' hides the rest on mobile",
      "Avoid personal attribute claims ('are you struggling with...') that Meta's policy restricts",
      "Keep headlines under roughly 40 characters so they don't get cut off",
      "Test one variable at a time — same creative, different primary text, or vice versa",
      "Re-check policy language periodically since Meta updates restricted claims"
    ],
    mistakes: [
      "Burying your hook after several sentences the reader never sees",
      "Using unverifiable claims that risk ad disapproval",
      "Writing one long paragraph instead of using the primary/headline/description structure",
      "Ignoring the difference in tone needed for cold vs. warm audiences"
    ],
    faqs: [
      { q: "Does this follow Meta's ad policy automatically?", a: "It's guided to avoid common policy pitfalls like superlatives and personal attribute language, but you must review final copy against Meta's current policies yourself." },
      { q: "How long should primary text be?", a: "Shorter first lines perform better for scroll-stopping, but total length depends on your offer — the tool gives you both short and longer variants to test." },
      { q: "Can it write for Instagram feed placements too?", a: "Yes, Instagram feed ads share Meta's ad structure, so the same output works across both placements." },
      { q: "Will it write the image or video creative too?", a: "No, this focuses on ad copy text. Pair it with AmmarAI's image or video generators for the visual." }
    ],
    related: ["ai-ad-generator", "instagram-caption-generator", "google-ads-generator", "social-media-post-generator"]
  },

  {
    slug: "google-ads-generator",
    name: "Google Ads Generator",
    category: "AI Marketing",
    summary: "Generate Google Search ad headlines and descriptions within exact character limits.",
    title: "Google Ads Generator: RSA Headlines & Descriptions | AmmarAI",
    description: "Create Google Search ad headlines (30 characters) and descriptions (90 characters) ready to drop into Responsive Search Ads.",
    h1: "Google Search ads that fit the limits exactly",
    lede: "Generate headlines capped at 30 characters and descriptions capped at 90 — built for Responsive Search Ads, not trimmed afterward.",
    ctaLabel: "Generate Search Ads",
    popular: true,
    what: [
      "Google Responsive Search Ads (RSAs) need up to 15 headlines (30 characters each) and 4 descriptions (90 characters each), which Google mixes and matches automatically. Writing tight, keyword-relevant copy inside those hard limits is the entire skill of Search ad writing — a headline one character over the limit simply won't save. This generator writes to the limit from the start.",
      "Because RSAs reward variety Google can recombine, the tool produces headlines that work as standalone fragments (feature, benefit, CTA, brand) rather than one long sentence split across three fields. That gives Google's ad rotation more useful combinations to test against your ad group's keywords."
    ],
    canDo: [
      "Generate headlines that fit within 30 characters",
      "Generate descriptions that fit within 90 characters",
      "Produce headline sets covering feature, benefit, and CTA angles",
      "Suggest keyword-relevant phrasing for Quality Score relevance",
      "Draft copy for multiple ad groups from one product brief",
      "Create pinned-headline candidates for brand or offer emphasis"
    ],
    how: [
      { title: "Enter product and keywords", body: "Provide the offer, target keywords, and landing page focus." },
      { title: "Generate headline set", body: "Get a spread of 30-character headlines covering different angles." },
      { title: "Generate descriptions", body: "Get 90-character descriptions that expand on the headlines with detail or offer terms." },
      { title: "Load into RSA", body: "Paste the set into your Responsive Search Ad and let Google's auto-rotation test combinations." }
    ],
    examples: [
      { label: "Local plumbing service", input: "Emergency plumber, same-day service, targeting 'emergency plumber near me'", output: "Headline: 24/7 Emergency Plumber\nHeadline: Same-Day Repairs Guaranteed\nDescription: Licensed plumbers on call. Book now, we arrive within the hour." },
      { label: "Software free trial", input: "Accounting software for freelancers, keyword 'invoicing software'", output: "Headline: Invoicing Made Simple\nHeadline: Free 30-Day Trial\nDescription: Send invoices, track payments, and get paid faster. No card required." }
    ],
    capabilities: [
      { title: "Hard character limits", body: "Every headline and description is generated to fit within Google's 30/90 character caps." },
      { title: "Fragment-style headlines", body: "Headlines are written to stand alone so Google's ad rotation can recombine them effectively." },
      { title: "Keyword relevance", body: "Copy references the terms you're bidding on to support Quality Score and ad relevance." }
    ],
    audiences: [
      { who: "PPC managers", why: "Need to populate RSAs with 15 headlines and 4 descriptions quickly." },
      { who: "Small business owners", why: "Running self-managed Search campaigns without an agency." },
      { who: "Agencies", why: "Draft first-pass RSA copy across many client ad groups." }
    ],
    useCases: [
      { title: "Building a new RSA", body: "Generate a full spread of headline and description candidates for a fresh ad group." },
      { title: "Improving Ad Strength", body: "Add more distinct headline angles to move a 'Poor' or 'Average' Ad Strength rating higher." }
    ],
    tips: [
      "Count characters exactly — 30 and 90 are hard limits, not guidelines",
      "Include your target keyword in at least one or two headlines for relevance",
      "Vary headline angles (feature, benefit, urgency, brand) instead of rephrasing the same idea",
      "Pin only when necessary — over-pinning limits Google's ability to optimize combinations",
      "Match ad copy claims to what's actually on the landing page to protect Quality Score"
    ],
    mistakes: [
      "Writing headlines that exceed 30 characters and get rejected or truncated",
      "Submitting near-duplicate headlines instead of genuinely different angles",
      "Ignoring keyword relevance, which hurts Quality Score and CPC",
      "Pinning every headline, which defeats the purpose of responsive testing"
    ],
    faqs: [
      { q: "Does it count characters exactly?", a: "Yes, output is written to fit Google's 30-character headline and 90-character description limits, though you should still verify in Google Ads before publishing." },
      { q: "How many headlines should I use?", a: "Google allows up to 15; using a good mix of 8-15 distinct angles generally gives the auto-rotation more to work with." },
      { q: "Can this guarantee a higher Quality Score?", a: "No — Quality Score depends on landing page experience and expected CTR too, not just ad copy relevance." },
      { q: "Does it write display or video ads too?", a: "This tool focuses on Search (RSA) copy. Use AmmarAI's other ad and video tools for display and video creative." }
    ],
    related: ["ai-ad-generator", "facebook-ad-generator", "linkedin-ad-generator", "ai-seo-content-generator"]
  },

  {
    slug: "linkedin-ad-generator",
    name: "LinkedIn Ad Generator",
    category: "AI Marketing",
    summary: "Write LinkedIn Sponsored Content and message ad copy in a professional, B2B register.",
    title: "LinkedIn Ad Generator: B2B Sponsored Content | AmmarAI",
    description: "Generate LinkedIn ad copy for Sponsored Content and InMail in a professional tone built for B2B decision-makers.",
    h1: "B2B ad copy that reads like it belongs on LinkedIn",
    lede: "Write intro text, headline, and CTA for LinkedIn Sponsored Content in the professional register your buyers expect.",
    ctaLabel: "Write LinkedIn Ads",
    what: [
      "LinkedIn is a professional context, and ad copy that reads like a Facebook post — casual, exclamation-heavy, consumer-styled — tends to feel out of place and gets scrolled past by the job-title-focused audience you're paying to reach. This generator defaults to a professional but human register: clear value proposition, credible tone, no forced hype.",
      "LinkedIn Sponsored Content has an intro text field (roughly 150 characters shown before truncation on feed), a headline, and often a CTA button. Because B2B buying cycles are longer and involve more stakeholders, the copy here leans toward outcomes and specificity (roles, use cases, metrics you can honestly claim) rather than urgency-driven consumer hooks."
    ],
    canDo: [
      "Generate intro text sized for LinkedIn's feed truncation point",
      "Write headlines that lead with a business outcome or role-specific pain point",
      "Draft InMail/Message ad copy in a first-person, professional tone",
      "Adapt copy for specific job titles or industries",
      "Suggest CTA options appropriate for B2B (Request Demo, Download Guide, Learn More)",
      "Produce copy for lead-gen form ads focused on a single value proposition"
    ],
    how: [
      { title: "Define the buyer and role", body: "Specify the job title, industry, or company size you're targeting — LinkedIn ads work best when specific." },
      { title: "State the business outcome", body: "Describe the concrete result your product delivers, not just its features." },
      { title: "Generate intro text and headline", body: "Get copy sized for LinkedIn's format with the value proposition upfront." },
      { title: "Adjust tone", body: "Dial between more formal enterprise language and a more direct, founder-style voice." }
    ],
    examples: [
      { label: "HR software targeting CHROs", input: "HR platform reducing turnover, targeting Chief HR Officers at mid-size companies", output: "Intro: Turnover is expensive to ignore. See how HR leaders are cutting attrition by acting on early warning signs.\nHeadline: Reduce Turnover Before It Costs You\nCTA: Request a Demo" },
      { label: "B2B consulting lead gen", input: "Supply chain consulting firm, targeting operations directors, offering a free assessment", output: "Intro: Supply chain disruptions rarely announce themselves early. Get a free assessment of where your risk actually sits.\nHeadline: Find Your Supply Chain Blind Spots\nCTA: Get Your Free Assessment" }
    ],
    capabilities: [
      { title: "Professional register by default", body: "Output avoids consumer-style hype and defaults to a tone appropriate for a business audience." },
      { title: "Role-specific framing", body: "Copy can be tailored to speak directly to a job title's priorities and pain points." },
      { title: "Truncation-aware intro text", body: "Intro text is written so the key point lands within the characters LinkedIn shows before 'see more.'" }
    ],
    audiences: [
      { who: "B2B marketers", why: "Need copy that speaks credibly to specific buyer personas and job titles." },
      { who: "Founders and consultants", why: "Running lead-gen campaigns to a professional audience without a copywriter on staff." },
      { who: "Demand gen teams", why: "Testing multiple value propositions across account-based marketing segments." }
    ],
    useCases: [
      { title: "Account-based marketing campaigns", body: "Generate copy tailored to a specific role or industry segment for targeted ABM ad sets." },
      { title: "Lead-gen form ads", body: "Write a tight intro and headline pair optimized for a single, clear conversion action." }
    ],
    tips: [
      "Lead with the outcome, not the feature list — LinkedIn audiences skim for relevance to their role",
      "Keep the first sentence of intro text meaningful on its own since it's shown before truncation",
      "Avoid consumer-style urgency language; credibility works better than hype in B2B",
      "Speak to a specific title or industry rather than writing generically",
      "Match the CTA to your funnel stage — Learn More for awareness, Request Demo for intent"
    ],
    mistakes: [
      "Using casual, exclamation-heavy copy that feels out of place on a professional feed",
      "Writing generic value props that don't speak to a specific buyer's priorities",
      "Front-loading company jargon instead of the actual business outcome",
      "Overpromising results your product or service can't actually document"
    ],
    faqs: [
      { q: "How is this different from the general ad generator?", a: "It's tuned specifically to LinkedIn's professional register, format constraints, and B2B buyer psychology rather than generic ad copy." },
      { q: "Can it target specific job titles?", a: "Yes, tell it the job title or industry and it will frame the value proposition around that audience's priorities." },
      { q: "Does it write InMail/Message ads too?", a: "Yes, it can draft first-person message ad copy in addition to Sponsored Content." },
      { q: "Will this guarantee lead volume?", a: "No — ad copy is one factor among targeting, budget, and offer quality; no tool can guarantee lead results." }
    ],
    related: ["ai-ad-generator", "facebook-ad-generator", "google-ads-generator", "ai-cold-email-generator"]
  },

  {
    slug: "instagram-caption-generator",
    name: "Instagram Caption Generator",
    category: "AI Social Media",
    summary: "Write Instagram captions with a strong first line that survives the 'more' truncation.",
    title: "Instagram Caption Generator: Captions That Hook | AmmarAI",
    description: "Generate Instagram captions with a strong first line, matching hashtags, and a tone that fits your post — from playful to brand-professional.",
    h1: "Captions built for the first line, not just the whole thing",
    lede: "Instagram truncates captions after roughly the first two lines. This generator writes the opening to hook before 'more' even matters.",
    ctaLabel: "Generate Captions",
    popular: true,
    what: [
      "Instagram shows only the first line or two of a caption in feed before cutting it off with 'more' — meaning the opening sentence carries almost all the weight of whether someone stops to read further. This generator treats that first line as its own creative problem: a hook, a question, or a specific detail, not a generic opener like 'Check this out!'",
      "Beyond the hook, captions serve different jobs depending on post type — a product post needs a clear reason to buy, a behind-the-scenes post needs personality, a carousel needs a reason to swipe. You choose the post type and tone, and the generator writes the full caption plus a short version if you want brevity instead."
    ],
    canDo: [
      "Write a hook-first opening line built to survive truncation",
      "Generate captions in multiple tones: playful, minimal, storytelling, brand-professional",
      "Draft captions matched to post type: product, behind-the-scenes, announcement, carousel",
      "Suggest a call-to-action line (comment, save, share, link in bio)",
      "Produce both short and long caption versions from one input",
      "Adapt emoji usage up or down based on brand voice"
    ],
    how: [
      { title: "Describe the post", body: "Tell it what the photo or video shows and what you want the caption to achieve." },
      { title: "Choose tone and length", body: "Pick a voice (playful, minimal, professional) and whether you want short or long." },
      { title: "Generate the caption", body: "Get a hook-first opening followed by supporting lines and a closing CTA." },
      { title: "Pair with hashtags", body: "Add relevant hashtags separately or with AmmarAI's Instagram Hashtag Generator." }
    ],
    examples: [
      { label: "Product launch, playful tone", input: "New iced coffee flavor launch, café brand, playful tone", output: "Okay but this one's dangerous 🧊☕\nOur new Salted Caramel Cold Brew just dropped and it's not messing around. Come try it before it sells out (again).\nTag someone who needs this today." },
      { label: "Behind-the-scenes, minimal tone", input: "Small business owner packing orders, minimal brand-professional tone", output: "Every order, packed by hand.\nThat's still true even as we grow. Thank you for supporting something this small.\nSave this if you love supporting independent brands." }
    ],
    capabilities: [
      { title: "Truncation-aware hooks", body: "The opening line is written to make sense and create curiosity even if nothing after it is read." },
      { title: "Post-type matching", body: "Caption structure shifts based on whether the post is a product shot, story, or announcement." },
      { title: "Tone range", body: "From minimal and clean to playful and emoji-forward, matched to your brand's voice." }
    ],
    audiences: [
      { who: "Small business owners", why: "Post regularly and need captions without spending 20 minutes per post writing them." },
      { who: "Content creators", why: "Want variety in tone and hook style across a content calendar." },
      { who: "Social media managers", why: "Draft captions quickly for client accounts across multiple brand voices." }
    ],
    useCases: [
      { title: "Daily content posting", body: "Draft each day's caption from the photo and the point you want to make, then trim it yourself." },
      { title: "Product announcement posts", body: "Write a caption that leads with the hook and closes with a clear next step for followers." }
    ],
    tips: [
      "Front-load the most interesting line — assume most people never tap 'more'",
      "Keep line breaks; short lines are easier to read on mobile than dense paragraphs",
      "Match emoji density to your brand's existing voice, not a generic default",
      "End with one clear action: comment, save, or check the link in bio",
      "Rotate hook styles (question, bold statement, relatable moment) so posts don't feel repetitive"
    ],
    mistakes: [
      "Burying the interesting part of the caption after the truncation point",
      "Writing one dense paragraph instead of short, scannable lines",
      "Using the same generic opener ('Check out our new...') on every post",
      "Skipping a CTA and leaving followers with nothing to do after reading"
    ],
    faqs: [
      { q: "How long can Instagram captions be?", a: "Instagram allows up to 2,200 characters, but only the first line or two show before 'more' truncates it — so hook strength matters far more than total length." },
      { q: "Does this generate hashtags too?", a: "This tool focuses on caption text; pair it with AmmarAI's Instagram Hashtag Generator for hashtag sets." },
      { q: "Can it match my brand's existing tone?", a: "Yes, describe your usual voice or paste an example caption and it will match the style." },
      { q: "Will longer or shorter captions perform better?", a: "That depends on your audience and content type — this tool can generate both so you can test which your followers respond to." }
    ],
    related: ["instagram-hashtag-generator", "social-media-post-generator", "tiktok-script-generator", "youtube-title-generator"]
  },

  {
    slug: "instagram-hashtag-generator",
    name: "Instagram Hashtag Generator",
    category: "AI Social Media",
    summary: "Generate relevant Instagram hashtag sets sized and mixed for discoverability.",
    title: "Instagram Hashtag Generator: Discoverable Tag Sets | AmmarAI",
    description: "Generate Instagram hashtag sets mixing broad, niche, and branded tags to help your posts get found by the right audience.",
    h1: "Hashtag sets built for discoverability, not guesswork",
    lede: "Get a mix of broad, niche, and branded hashtags sized for your post — instead of copy-pasting the same 30 tags on everything.",
    ctaLabel: "Generate Hashtags",
    what: [
      "Instagram allows up to 30 hashtags per post, but a wall of generic tags like #love #instagood #photooftheday rarely helps anything get found by people who'd actually care. This generator builds a mixed set: a few broad tags for reach, several mid-size niche tags where your post can realistically compete, and space for a branded or campaign-specific tag.",
      "Hashtag relevance also matters more than volume — Instagram's discovery systems weigh how well a tag matches the actual content. The tool asks what the post is genuinely about, not just its category, so the tags returned describe the content rather than chase broad, oversaturated terms."
    ],
    canDo: [
      "Generate a mixed set of broad, niche, and long-tail hashtags",
      "Suggest a branded or campaign hashtag alongside discovery tags",
      "Size the set appropriately instead of maxing out at 30 by default",
      "Tailor tags to a specific niche (fitness, food, real estate, etc.)",
      "Avoid banned or shadowbanned hashtag terms where known",
      "Group tags by broad vs. niche so you can choose your own mix"
    ],
    how: [
      { title: "Describe your post and niche", body: "Tell it what the content is about and your general industry or niche." },
      { title: "Choose set size", body: "Pick anywhere from a tight 5-10 tag set to a fuller 20-30 tag set." },
      { title: "Generate the mix", body: "Get broad, niche, and branded hashtag suggestions grouped for easy selection." },
      { title: "Paste and post", body: "Add the set to your caption or first comment." }
    ],
    examples: [
      { label: "Fitness coach post", input: "Home workout video for busy professionals, fitness niche", output: "Broad: #fitness #workout #homeworkout\nNiche: #busyprofessionalfitness #15minuteworkout #deskjobfitness\nBranded: #YourNameFit" },
      { label: "Small bakery product post", input: "Sourdough bread photo, local bakery, food niche", output: "Broad: #foodie #bread #baking\nNiche: #sourdoughbread #artisanbread #smalbatchbaking\nBranded: #[BakeryName]Bread" }
    ],
    capabilities: [
      { title: "Balanced reach mix", body: "Combines broad, niche, and branded tags rather than defaulting to only high-competition terms." },
      { title: "Niche-specific relevance", body: "Tags are drawn from language actually used within your stated industry, not generic categories." },
      { title: "Flexible set sizing", body: "Choose smaller, curated sets or larger sets depending on your strategy." }
    ],
    audiences: [
      { who: "Small business owners", why: "Want to improve discoverability without researching hashtags manually every post." },
      { who: "Content creators", why: "Post frequently across niches and need fast, relevant tag sets each time." },
      { who: "Social media managers", why: "Manage multiple accounts across different industries needing distinct hashtag strategies." }
    ],
    useCases: [
      { title: "New account growth", body: "Use niche and long-tail tags where competition is lower to get discovered by a relevant early audience." },
      { title: "Campaign tracking", body: "Pair a consistent branded hashtag with rotating niche tags across a campaign's posts." }
    ],
    tips: [
      "Mix broad and niche tags rather than using only high-competition broad terms",
      "Refresh your hashtag sets periodically — reusing the exact same 30 tags repeatedly can limit reach",
      "Put your branded or campaign hashtag in every post for consistent tracking",
      "Check tags occasionally for being flagged or restricted by Instagram",
      "Place hashtags in the caption or first comment, whichever matches your account's style"
    ],
    mistakes: [
      "Using only broad, oversaturated hashtags that bury your post instantly",
      "Copy-pasting the identical hashtag set on every single post regardless of content",
      "Ignoring niche tags where your post could actually rank and get seen",
      "Adding hashtags unrelated to the actual post content"
    ],
    faqs: [
      { q: "How many hashtags should I actually use?", a: "Instagram allows up to 30, but many accounts see good results with a focused 8-15 relevant tags rather than maxing out every time." },
      { q: "Can hashtags get an account penalized?", a: "Using banned or irrelevant hashtags can limit reach; the tool aims to avoid known problematic tags, but you should periodically check tags remain in good standing." },
      { q: "Should hashtags go in the caption or comments?", a: "Both work; it's largely a stylistic choice. Some creators prefer comments to keep captions clean." },
      { q: "Does this replace hashtag research tools?", a: "It gives you a strong, relevant starting set quickly; dedicated analytics tools can add real-time volume data if you want to go deeper." }
    ],
    related: ["instagram-caption-generator", "social-media-post-generator", "tiktok-script-generator", "youtube-tag-generator"]
  },

  {
    slug: "social-media-post-generator",
    name: "Social Media Post Generator",
    category: "AI Social Media",
    summary: "Generate platform-specific posts for Instagram, Facebook, X, and LinkedIn from one idea.",
    title: "Social Media Post Generator: One Idea, Every Platform | AmmarAI",
    description: "Turn one idea into posts sized and toned for Instagram, Facebook, X, and LinkedIn instead of copy-pasting the same text everywhere.",
    h1: "One idea, written right for every platform",
    lede: "Generate a version of the same post for each platform — because what works on X rarely works as-is on LinkedIn or Instagram.",
    ctaLabel: "Generate Posts",
    popular: true,
    what: [
      "Every platform has its own unwritten rules: X rewards short, punchy statements and threads; LinkedIn rewards professional framing and slightly longer context; Facebook favors conversational, community-toned posts; Instagram needs a caption built around a visual. Posting the exact same text everywhere usually underperforms on at least a couple of them. This generator writes a distinct version for each from a single input.",
      "Rather than mechanically resizing one paragraph, it adjusts structure too — breaking an idea into a thread for X, adding a professional takeaway for LinkedIn, or writing it as a caption with a visual-first opening for Instagram. You describe the core idea once and choose which platforms you need it for."
    ],
    canDo: [
      "Generate platform-specific versions of one post idea",
      "Adjust length and structure per platform's norms",
      "Adapt tone (concise/X, professional/LinkedIn, conversational/Facebook, visual/Instagram)",
      "Break longer ideas into X thread format when appropriate",
      "Suggest a content calendar spread from one campaign theme",
      "Draft announcement, question, and engagement-style post variants"
    ],
    how: [
      { title: "Describe the idea or update", body: "Enter the core message, announcement, or theme you want to share." },
      { title: "Select target platforms", body: "Choose which of Instagram, Facebook, X, or LinkedIn you need copy for." },
      { title: "Generate platform versions", body: "Get a distinct, appropriately structured version of the post for each platform selected." },
      { title: "Schedule and post", body: "Copy each version into your scheduler or post directly per platform." }
    ],
    examples: [
      { label: "Product update announcement", input: "SaaS company announcing a new integration with Slack", output: "X: We just shipped Slack integration. Get notified the moment something needs your attention. Try it →\nLinkedIn: We're excited to announce our new Slack integration, built after months of customer requests. Teams can now receive real-time updates without leaving their existing workflow." },
      { label: "Small business milestone", input: "Local bakery celebrating 5 years in business", output: "Facebook: Five years ago we opened our doors not knowing if anyone would walk in. Thank you for making this the best decision we ever made. 🎂\nInstagram: 5 years. Thousands of loaves. One very grateful team.\nCome celebrate with us this weekend — first 50 customers get a free pastry." }
    ],
    capabilities: [
      { title: "Structural adaptation", body: "Content is restructured, not just resized, to match how each platform's audience actually reads." },
      { title: "Tone-per-platform", body: "The same idea shifts register between professional, conversational, and concise depending on destination." },
      { title: "Batch generation", body: "Produce a set of posts across a campaign theme in one pass instead of one at a time." }
    ],
    audiences: [
      { who: "Solopreneurs and founders", why: "Manage multiple social accounts without a dedicated social media team." },
      { who: "Social media managers", why: "Need to adapt one campaign message across several client platforms quickly." },
      { who: "Marketing teams", why: "Coordinate consistent messaging that still respects each platform's format." }
    ],
    useCases: [
      { title: "Product or feature launches", body: "Announce the same launch across every platform in a form native to each one." },
      { title: "Content repurposing", body: "Take one blog post or idea and generate a week's worth of platform-specific social posts from it." }
    ],
    tips: [
      "Don't post the identical text everywhere — adapt length and tone per platform",
      "Lead LinkedIn posts with context or a takeaway; lead X posts with the punchline",
      "Keep a consistent core message even as wording changes across platforms",
      "Use platform-specific CTAs (comment on X, connect on LinkedIn, save on Instagram)",
      "Batch-generate a week of posts around one theme to keep a content calendar full"
    ],
    mistakes: [
      "Copy-pasting one post verbatim across every platform",
      "Ignoring platform norms, like writing overly casual copy for LinkedIn",
      "Losing the core message when adapting tone too aggressively per platform",
      "Skipping a platform-appropriate CTA and leaving the post without a next step"
    ],
    faqs: [
      { q: "Which platforms does this cover?", a: "It generates posts tailored for Instagram, Facebook, X, and LinkedIn, matching each platform's typical tone and structure." },
      { q: "Can it write X threads?", a: "Yes, for longer ideas it can break the content into a thread-style sequence appropriate for X." },
      { q: "Does it write the visuals too?", a: "This tool focuses on post text; pair it with AmmarAI's image or video generators for accompanying visuals." },
      { q: "Can I keep the same core message across platforms?", a: "Yes, the underlying idea stays consistent — only structure, length, and tone adapt per platform." }
    ],
    related: ["instagram-caption-generator", "instagram-hashtag-generator", "linkedin-ad-generator", "tiktok-script-generator"]
  },

  {
    slug: "youtube-description-generator",
    name: "YouTube Description Generator",
    category: "AI Social Media",
    summary: "Write YouTube video descriptions with the first 150 characters optimized for search and preview.",
    title: "YouTube Description Generator: SEO-Ready Copy | AmmarAI",
    description: "Generate YouTube descriptions where the first 150 characters — shown in search and previews — carry the keyword and hook.",
    h1: "Descriptions that work in the first 150 characters",
    lede: "YouTube only shows about the first 150 characters before 'Show more.' This generator front-loads the part people actually see.",
    ctaLabel: "Generate Descriptions",
    what: [
      "YouTube descriptions do double duty: they're read by viewers deciding whether to keep watching or click away, and they're indexed by YouTube's search and recommendation systems. But only roughly the first 150 characters show in search results and above the fold before a viewer has to click 'Show more' — so that opening needs to contain your main keyword and a genuine reason to keep watching.",
      "Below the fold, a good description has room for more: a longer summary, timestamps, links, and calls to action like subscribing or checking related videos. This generator writes both parts intentionally — a tight, keyword-rich opening and a fuller body — rather than one long undifferentiated paragraph."
    ],
    canDo: [
      "Write an opening 150 characters optimized for search visibility and click-through",
      "Draft a longer body description with more context and detail",
      "Suggest relevant keywords naturally worked into the copy",
      "Generate timestamp placeholders for chaptered videos",
      "Add suggested links section (socials, related videos, website)",
      "Write a closing CTA for subscribing or watching another video"
    ],
    how: [
      { title: "Summarize the video", body: "Describe what the video covers and its main topic or keyword." },
      { title: "Generate the opening line", body: "Get a keyword-rich, curiosity-driven first 150 characters." },
      { title: "Generate the full description", body: "Get an expanded body with more detail, timestamps placeholder, and CTA." },
      { title: "Add links and publish", body: "Insert your actual timestamps and links, then paste into YouTube Studio." }
    ],
    examples: [
      { label: "Tutorial video", input: "Beginner tutorial on how to edit video in DaVinci Resolve", output: "First 150 chars: Learn how to edit video in DaVinci Resolve step by step — perfect for total beginners, no experience needed.\nBody: In this tutorial, we cover importing footage, basic cuts, color correction, and exporting your final video..." },
      { label: "Product review video", input: "Review of a budget mechanical keyboard for gamers", output: "First 150 chars: Is this $40 mechanical keyboard actually worth it for gaming? Full review with sound test and typing feel.\nBody: We tested this keyboard for two weeks across gaming and daily typing..." }
    ],
    capabilities: [
      { title: "150-character front-loading", body: "The opening line is written to work as a standalone hook and keyword match before truncation." },
      { title: "Search-aware phrasing", body: "Keywords are worked in naturally to support YouTube search discovery." },
      { title: "Structured full body", body: "The longer description includes space for summary, timestamps, and links in a clear order." }
    ],
    audiences: [
      { who: "YouTubers and creators", why: "Publish frequently and need consistent, SEO-aware descriptions without extra research time." },
      { who: "Course and tutorial creators", why: "Rely on search discovery for how-to and educational content." },
      { who: "Brands running YouTube channels", why: "Need on-brand descriptions that also support discoverability." }
    ],
    useCases: [
      { title: "New video publishing", body: "Generate a ready-to-use description the moment a video is uploaded, matched to its actual content." },
      { title: "Improving older video SEO", body: "Rewrite underperforming descriptions to front-load keywords in the first 150 characters." }
    ],
    tips: [
      "Put your main keyword and hook within the first 150 characters, not buried below",
      "Write for humans first — keyword stuffing can hurt readability and trust",
      "Include timestamps for longer videos to improve watch experience and search snippets",
      "Add links to related videos or playlists to support session watch time",
      "Keep a consistent description template across videos so your channel feels cohesive"
    ],
    mistakes: [
      "Burying the keyword and hook after the 150-character preview cutoff",
      "Writing a description that doesn't match what's actually in the video",
      "Keyword-stuffing to the point the copy reads unnaturally",
      "Leaving out timestamps or links that could keep viewers engaged longer"
    ],
    faqs: [
      { q: "How much of the description actually shows before 'Show more'?", a: "Roughly the first 150 characters show in search results and above the fold, though exact display varies by device." },
      { q: "Does the description actually affect ranking?", a: "YouTube uses many signals including watch time and engagement, but a clear, keyword-relevant description supports discoverability." },
      { q: "Should I add hashtags in the description?", a: "You can add a few relevant hashtags, but focus most of the space on a clear, useful description rather than tag-stuffing." },
      { q: "Can this write timestamps for me automatically?", a: "It can create a timestamp placeholder structure, but you'll need to add the actual times based on your final edited video." }
    ],
    related: ["youtube-title-generator", "youtube-tag-generator", "video-script-generator", "meta-description-generator"]
  },

  {
    slug: "youtube-title-generator",
    name: "YouTube Title Generator",
    category: "AI Social Media",
    summary: "Generate click-worthy YouTube titles that stay honest to the video's actual content.",
    title: "YouTube Title Generator: Titles That Get Clicks | AmmarAI",
    description: "Generate YouTube video titles that balance curiosity and clarity — sized for search and suggested feed display, without clickbait.",
    h1: "Titles that earn the click and match the video",
    lede: "Get multiple title options built around clarity, curiosity, and keyword relevance — sized to display well in search and suggested feeds.",
    ctaLabel: "Generate Titles",
    what: [
      "A YouTube title has to work in two very different contexts: search results, where keyword match matters, and the suggested/home feed, where thumbnail and title compete purely on curiosity next to dozens of other videos. Titles also get cut off around 60-70 characters in some display contexts, so the most important words need to come first.",
      "This generator produces a spread of title options across different strategies — direct/keyword-led, curiosity-led, number-led, question-led — so you can pick what fits the specific video, rather than defaulting to exaggerated clickbait that hurts audience retention and trust once people click through."
    ],
    canDo: [
      "Generate multiple title options per video from one description",
      "Balance curiosity with an accurate description of the content",
      "Front-load key terms so titles display well when truncated",
      "Suggest number-led, question-led, and direct-statement title styles",
      "Adapt titles for tutorial, vlog, review, or entertainment content types",
      "Flag when a title risks overpromising relative to the video content"
    ],
    how: [
      { title: "Describe the video honestly", body: "Summarize what actually happens in the video and its main topic or outcome." },
      { title: "Choose a title style", body: "Pick from direct, curiosity-driven, number-led, or question-based approaches." },
      { title: "Generate options", body: "Get several title variations to compare and choose from." },
      { title: "Pick the most accurate strong option", body: "Choose the title that's both compelling and true to the video's actual content." }
    ],
    examples: [
      { label: "Tech review video", input: "Honest review of a budget laptop, mentions both pros and real downsides", output: "Title 1: This $500 Laptop Surprised Me (Mostly)\nTitle 2: Budget Laptop Review: What $500 Actually Gets You\nTitle 3: I Used This $500 Laptop for a Month — Here's the Truth" },
      { label: "Personal finance tutorial", input: "Video explaining how to build a simple monthly budget from scratch", output: "Title 1: How to Build a Budget From Scratch (Beginner Guide)\nTitle 2: The Simplest Way to Budget Your Money in 2024\nTitle 3: I Built a Budget in 15 Minutes — Here's the Exact Method" }
    ],
    capabilities: [
      { title: "Multi-strategy generation", body: "Produces different title angles so you can compare curiosity-driven and direct options side by side." },
      { title: "Truncation-aware phrasing", body: "Key words are placed early so titles remain meaningful even if cut off in some display contexts." },
      { title: "Content-accuracy checks", body: "Titles are generated to reflect what the input describes, discouraging exaggerated overpromising." }
    ],
    audiences: [
      { who: "YouTubers and creators", why: "Need multiple strong title options for every upload without over-relying on guesswork." },
      { who: "Educational and tutorial channels", why: "Balance clear, searchable titles with enough curiosity to earn clicks." },
      { who: "Brand channels", why: "Need titles that stay on-brand while still competing in a crowded feed." }
    ],
    useCases: [
      { title: "New video publishing", body: "Generate title options at upload time and pick the strongest one that still matches the content." },
      { title: "A/B testing titles", body: "Use YouTube's title testing feature with multiple AI-generated options to see which performs better." }
    ],
    tips: [
      "Put your most important word or phrase within the first 40-50 characters",
      "Avoid promising something the video doesn't deliver — it hurts retention and trust",
      "Test a few different angles (curiosity vs. direct) rather than betting on just one",
      "Keep a consistent style if you run a series, so viewers recognize the format",
      "Match title tone to your channel's overall brand, not just what seems clickable"
    ],
    mistakes: [
      "Writing exaggerated or misleading titles that hurt audience retention and trust",
      "Burying the key topic word past where feed displays truncate the title",
      "Using the exact same title formula for every single video regardless of content",
      "Ignoring keyword relevance entirely in favor of pure curiosity hooks"
    ],
    faqs: [
      { q: "How long should a YouTube title be?", a: "Titles can be up to 100 characters, but roughly the first 60-70 display fully in most feeds and search results, so lead with the key idea." },
      { q: "Is clickbait effective?", a: "Titles that overpromise can boost initial clicks but often hurt watch time and channel trust once viewers feel misled." },
      { q: "Can I test multiple titles on the same video?", a: "Yes, YouTube offers a title testing feature for eligible channels — generate a few strong options here to test." },
      { q: "Does keyword placement in the title affect search ranking?", a: "It's one relevant signal among many, including watch time and engagement, but a clear, keyword-matched title does support discoverability." }
    ],
    related: ["youtube-description-generator", "youtube-tag-generator", "ai-blog-title-generator", "video-script-generator"]
  },

  {
    slug: "youtube-tag-generator",
    name: "YouTube Tag Generator",
    category: "AI Social Media",
    summary: "Generate relevant YouTube video tags to support search and suggested video discoverability.",
    title: "YouTube Tag Generator: Relevant Video Tags | AmmarAI",
    description: "Generate a set of relevant YouTube tags mixing broad and specific keywords to support your video's discoverability.",
    h1: "Tags that describe your video, not guess at trends",
    lede: "Generate a relevant mix of broad and specific tags based on what your video actually covers — not a list of unrelated trending terms.",
    ctaLabel: "Generate Tags",
    what: [
      "YouTube tags are a smaller ranking signal today than titles, descriptions, and watch time, but they still help YouTube understand context, especially for disambiguating similar terms or catching misspellings. Effective tags describe the video accurately at different levels of specificity — broad category, specific topic, and long-tail phrasing viewers might actually search.",
      "This generator focuses on relevance over volume: rather than stuffing in every tag YouTube allows, it builds a mix that accurately reflects the video's content, since irrelevant tags don't help discovery and can even work against you by confusing what your video is actually about."
    ],
    canDo: [
      "Generate a mix of broad, specific, and long-tail tags",
      "Match tags to the actual described content rather than generic trends",
      "Suggest tags that include your channel or series name for consistency",
      "Include common misspellings or alternate phrasings where relevant",
      "Group tags by specificity so you can prioritize the most relevant ones",
      "Adapt tag suggestions across tutorial, vlog, review, or entertainment formats"
    ],
    how: [
      { title: "Describe the video", body: "Summarize the topic, format, and any key terms viewers might search." },
      { title: "Generate the tag set", body: "Get a grouped list of broad, specific, and long-tail tag suggestions." },
      { title: "Select and prioritize", body: "Choose the most relevant tags, leading with the most specific and accurate ones." },
      { title: "Add to YouTube Studio", body: "Paste the selected tags into your video's tag field before publishing." }
    ],
    examples: [
      { label: "Cooking tutorial", input: "Video showing how to make homemade pasta from scratch for beginners", output: "Broad: cooking, pasta, homemade food\nSpecific: how to make pasta, homemade pasta recipe, pasta from scratch\nLong-tail: easy pasta recipe for beginners, how to make pasta dough at home" },
      { label: "Gaming walkthrough", input: "Walkthrough video for the first level of a new indie platformer game", output: "Broad: gaming, walkthrough, indie games\nSpecific: [Game Name] walkthrough, [Game Name] level 1, [Game Name] gameplay\nLong-tail: how to beat level 1 in [Game Name], [Game Name] beginner guide" }
    ],
    capabilities: [
      { title: "Specificity tiers", body: "Tags are grouped by broad, specific, and long-tail so you can prioritize the most relevant terms first." },
      { title: "Content-matched relevance", body: "Tags reflect what the video actually covers rather than chasing unrelated trending terms." },
      { title: "Series and channel consistency", body: "Suggestions can include your channel or series name to reinforce consistent tagging." }
    ],
    audiences: [
      { who: "YouTubers and creators", why: "Want a fast, relevant tag set for every upload without manual keyword research each time." },
      { who: "Educational channels", why: "Rely on accurate topic tagging to help YouTube surface content to the right search queries." },
      { who: "Multi-video series creators", why: "Need consistent tagging across episodes for better series-level discoverability." }
    ],
    useCases: [
      { title: "New video uploads", body: "Generate a relevant tag set at upload time matched to the specific video's content." },
      { title: "Series consistency", body: "Include a consistent series or channel tag across every episode to reinforce topical grouping." }
    ],
    tips: [
      "Prioritize specific and long-tail tags over broad, highly competitive ones",
      "Include your channel or series name for consistency across videos",
      "Keep tags relevant — irrelevant tags don't help and can confuse targeting",
      "Include common alternate spellings or phrasings viewers might search",
      "Don't rely on tags alone; title, description, and thumbnail matter more for clicks"
    ],
    mistakes: [
      "Adding irrelevant or unrelated tags in hopes of appearing in unrelated searches",
      "Using only broad tags and skipping more specific, discoverable long-tail terms",
      "Forgetting to keep tags consistent across a video series",
      "Over-relying on tags while neglecting title and thumbnail quality"
    ],
    faqs: [
      { q: "Do tags still matter for YouTube SEO?", a: "They're a smaller signal today compared to titles, descriptions, and watch time, but they still help with context and disambiguation." },
      { q: "How many tags should I use?", a: "There's no fixed ideal number; focus on a relevant, specific set rather than maximizing tag count." },
      { q: "Should I use trending tags unrelated to my video?", a: "No — irrelevant tags don't help discovery and can misrepresent your content to YouTube's systems and viewers." },
      { q: "Can this generate tags for a whole series consistently?", a: "Yes, describe the series and it can suggest a consistent tag structure to use across each episode." }
    ],
    related: ["youtube-title-generator", "youtube-description-generator", "instagram-hashtag-generator", "video-script-generator"]
  },

  {
    slug: "tiktok-script-generator",
    name: "TikTok Script Generator",
    category: "AI Video",
    summary: "Write short-form video scripts with a hook built to land in the first 3 seconds.",
    title: "TikTok Script Generator: Hook in 3 Seconds | AmmarAI",
    description: "Generate TikTok scripts structured around a 3-second hook, fast pacing, and a clear payoff — built for how people actually watch.",
    h1: "Scripts built to survive the first 3 seconds",
    lede: "TikTok viewers decide to keep watching almost instantly. This generator front-loads the hook and paces the rest for a scroll-fast audience.",
    ctaLabel: "Generate TikTok Script",
    recent: true,
    what: [
      "TikTok's algorithm and audience behavior both reward videos that hold attention from literally the first few seconds — viewers scroll away fast, and a slow intro ('Hey guys, so today I wanted to talk about...') is often enough to lose them before the actual content starts. This generator writes scripts that open with a hook line delivered in the first 1-3 seconds: a bold claim, a question, or a visual promise.",
      "After the hook, TikTok scripts benefit from fast pacing — short sentences, quick beats, and a clear payoff rather than a long wind-up. The generator structures scripts into hook, build, payoff, and CTA sections so you have a natural shape to film against, whether it's a talking-head video, a voiceover, or on-screen text."
    ],
    canDo: [
      "Write a hook line designed to land within the first 3 seconds",
      "Structure scripts into hook, build, payoff, and CTA sections",
      "Adapt scripts for talking-head, voiceover, or text-overlay formats",
      "Match pacing and tone to trends like storytime, tutorial, or listicle formats",
      "Suggest on-screen text cues alongside spoken lines",
      "Draft multiple hook variations for the same core content idea"
    ],
    how: [
      { title: "Describe your video idea", body: "Explain the topic, format (tutorial, storytime, review), and desired length." },
      { title: "Choose a hook style", body: "Pick from bold claim, question, visual tease, or relatable moment hooks." },
      { title: "Generate the script", body: "Get a hook-build-payoff-CTA structured script ready to read or adapt." },
      { title: "Film against the structure", body: "Use the script as a guide, adjusting delivery and pacing to your own voice." }
    ],
    examples: [
      { label: "Productivity tip video", input: "Quick tip on using time-blocking to reduce procrastination, talking-head format, 30 seconds", output: "Hook (0-3s): I stopped procrastinating the day I deleted my to-do list.\nBuild: Instead I started time-blocking — giving every task an actual slot on my calendar.\nPayoff: Suddenly things either got a time or got cut. No more vague 'someday' tasks.\nCTA: Try it for one day and tell me how it goes." },
      { label: "Product demo video", input: "Quick demo of a reusable water bottle with a built-in fruit infuser, 20 seconds", output: "Hook (0-3s): This water bottle ruined every other water bottle for me.\nBuild: It's got a built-in infuser so your water actually tastes like something.\nPayoff: I went from drinking two glasses a day to finishing three bottles.\nCTA: Link's in my bio if you want to try it." }
    ],
    capabilities: [
      { title: "3-second hook focus", body: "Scripts are engineered so the opening line delivers a reason to keep watching almost instantly." },
      { title: "Beat-based structure", body: "Scripts break into clear hook, build, payoff, and CTA beats you can film against." },
      { title: "Format flexibility", body: "Adapts to talking-head, voiceover, or on-screen text-driven video styles." }
    ],
    audiences: [
      { who: "Content creators", why: "Post frequently on TikTok and need a fast, repeatable scripting structure." },
      { who: "Small business owners", why: "Want to try short-form video marketing without scripting experience." },
      { who: "Social media managers", why: "Draft scripts across many client accounts and content pillars quickly." }
    ],
    useCases: [
      { title: "Daily or frequent posting", body: "Generate a new hook-first script quickly to keep up with a demanding TikTok posting cadence." },
      { title: "Product demo videos", body: "Structure a fast, benefit-led script for showing off a product in under 30 seconds." }
    ],
    tips: [
      "Never open with a slow intro like 'Hey guys' — start with the hook line itself",
      "Keep sentences short; TikTok pacing rewards quick, punchy delivery over long explanations",
      "Match on-screen text to key spoken phrases to reinforce the hook visually",
      "Test multiple hook variations for the same content since the hook decides most of your watch time",
      "End with a clear, simple CTA — comment, follow, or check link in bio"
    ],
    mistakes: [
      "Opening with a slow greeting or setup instead of the hook",
      "Writing long, explanation-heavy scripts that lose pacing for short-form video",
      "Skipping a clear payoff, leaving viewers unsatisfied after the hook",
      "Forgetting a CTA, missing the chance to convert attention into an action"
    ],
    faqs: [
      { q: "Why does the first 3 seconds matter so much?", a: "TikTok's format and audience behavior mean viewers decide almost instantly whether to keep watching or scroll past, so the opening line carries outsized weight." },
      { q: "Can this write scripts for Instagram Reels and YouTube Shorts too?", a: "Yes, the hook-first, fast-paced structure works well across all major short-form video platforms." },
      { q: "Does it write the visuals or just the script?", a: "This generates the script and suggested on-screen text cues; pair it with AmmarAI's video tools for visual production." },
      { q: "How long should a TikTok script be?", a: "It depends on your content, but many high-performing videos run 15-60 seconds — the generator can adapt to your target length." }
    ],
    related: ["video-script-generator", "instagram-caption-generator", "social-media-post-generator", "ai-video-generator"]
  },

  {
    slug: "video-script-generator",
    name: "Video Script Generator",
    category: "AI Video",
    summary: "Write structured video scripts for YouTube, explainers, ads, and presentations.",
    title: "Video Script Generator: Structured Scripts Fast | AmmarAI",
    description: "Generate video scripts with a clear intro, body, and outro structure — sized and paced for YouTube, explainers, or ads.",
    h1: "Scripts structured for how video actually gets watched",
    lede: "Generate a full video script with intro hook, structured body, and outro CTA — paced for the format and length you actually need.",
    ctaLabel: "Generate Video Script",
    what: [
      "Longer-form video — YouTube videos, explainer videos, webinar intros, ad scripts — needs a different structure than short-form: an intro that earns the first 15-30 seconds without necessarily hooking in 3, a body that can develop an idea across multiple points, and an outro that closes with a clear next step. This generator writes to that shape, scaled to your target length.",
      "Because scripts are meant to be spoken, the tool favors natural, sayable sentences over dense written prose — shorter clauses, spoken transitions ('here's the thing,' 'so what does that mean for you'), and pacing notes where useful, so what you read on the page sounds natural coming out of your mouth or a voiceover."
    ],
    canDo: [
      "Generate full scripts with intro, body, and outro sections",
      "Adapt scripts for YouTube videos, explainers, ads, or presentations",
      "Write in a spoken, natural register rather than dense written prose",
      "Scale script length to a target video duration",
      "Suggest pacing or visual cue notes alongside spoken lines",
      "Draft multiple intro hook options for the same script body"
    ],
    how: [
      { title: "Describe the video's purpose", body: "Explain the topic, format, and target length or audience." },
      { title: "Choose structure emphasis", body: "Indicate if you need more intro hook options, a detailed body, or a strong closing CTA." },
      { title: "Generate the script", body: "Get an intro-body-outro script written in natural, speakable language." },
      { title: "Read aloud and adjust", body: "Read the script out loud to catch anything that doesn't sound natural, then adjust." }
    ],
    examples: [
      { label: "YouTube explainer video", input: "Explainer on how compound interest works, aimed at young adults, 3-minute video", output: "Intro: If you've ever wondered how some people's savings seem to grow almost on their own, the answer is compound interest — and it's simpler than it sounds.\nBody: Let's break it down with a real example...\nOutro: If this helped, subscribe for more money basics explained simply." },
      { label: "Product ad video script", input: "30-second ad script for a meal-prep subscription service, energetic tone", output: "Intro: Tired of asking 'what's for dinner' every single night?\nBody: [Brand] delivers pre-portioned meals to your door, ready in under 15 minutes...\nOutro: Your first box is 50% off — link below to get started." }
    ],
    capabilities: [
      { title: "Full script structure", body: "Generates a complete intro, body, and outro rather than fragments you have to assemble yourself." },
      { title: "Speakable phrasing", body: "Sentences are written to sound natural when read aloud, not like dense written copy." },
      { title: "Length-scalable", body: "Script length and depth adapt to your target video duration." }
    ],
    audiences: [
      { who: "YouTubers and creators", why: "Need a reliable script structure for regularly published long-form videos." },
      { who: "Course and educational creators", why: "Explain concepts clearly with a natural, spoken structure." },
      { who: "Marketers producing video ads", why: "Draft ad scripts quickly before handing off to production or voiceover." }
    ],
    useCases: [
      { title: "Explainer video production", body: "Generate a clear script structure for breaking down a concept or product for a general audience." },
      { title: "Video ad scripting", body: "Write a tight, persuasive script for a short promotional video ad." }
    ],
    tips: [
      "Read the script aloud before filming — written and spoken language aren't the same",
      "Keep sentences short enough to deliver in one breath comfortably",
      "Put the strongest reason to keep watching in the first 15-30 seconds",
      "End with one specific CTA rather than several competing asks",
      "Adjust pacing notes for where to slow down on important points"
    ],
    mistakes: [
      "Writing in dense, written-style prose that sounds unnatural when spoken",
      "Taking too long in the intro before getting to the video's actual value",
      "Cramming too many points into the body without clear structure",
      "Ending without a clear single call to action"
    ],
    faqs: [
      { q: "How long should a script be for my video length?", a: "As a rough guide, spoken word count is often around 130-150 words per minute, but pacing varies by style — tell the generator your target length and it will scale accordingly." },
      { q: "Does this work for ad scripts too?", a: "Yes, it can write shorter, persuasion-focused scripts for ads as well as longer explainer or tutorial scripts." },
      { q: "Can it write in my own speaking style?", a: "Describe your usual tone or paste an example transcript, and it will aim to match that style." },
      { q: "Does this replace the need for a human read-through?", a: "No — always read scripts aloud yourself before filming to catch anything that doesn't sound natural in your voice." }
    ],
    related: ["tiktok-script-generator", "youtube-description-generator", "ai-video-generator", "ai-voice-generator"]
  },

  {
    slug: "newsletter-generator",
    name: "Newsletter Generator",
    category: "AI Email",
    summary: "Draft newsletter issues with a subject line, intro, and structured body sections.",
    title: "Newsletter Generator: Full Issues, Ready to Edit | AmmarAI",
    description: "Generate a complete newsletter issue — subject line, intro, structured sections, and sign-off — from your topic or update.",
    h1: "Full newsletter issues, not just isolated snippets",
    lede: "Generate a subject line, intro, structured body, and sign-off together — a full draft issue, not disconnected pieces to stitch together.",
    ctaLabel: "Draft Newsletter",
    what: [
      "A newsletter issue is more than one piece of copy — it's a subject line that has to earn an open in a crowded inbox, an intro that sets context quickly, a body organized into scannable sections (updates, links, a featured story), and a sign-off that feels personal rather than corporate. Writing all of this well and consistently, issue after issue, is where most newsletter writers burn out.",
      "This generator drafts a complete issue from a list of what you want to cover — new posts, product updates, curated links, a personal note — and organizes it into a readable structure. You keep editorial control over the actual content and facts; the tool handles structure, transitions, and phrasing so each issue starts half-built."
    ],
    canDo: [
      "Generate a subject line and preview text pair for the issue",
      "Write an intro that sets context and tone for the newsletter",
      "Organize multiple items (updates, links, features) into clear sections",
      "Draft a sign-off that matches your newsletter's usual voice",
      "Suggest section headers to improve scannability",
      "Adapt tone from casual/personal to professional/brand newsletter styles"
    ],
    how: [
      { title: "List what's in this issue", body: "Give it the topics, updates, or links you want to include, even in rough note form." },
      { title: "Set tone and format", body: "Choose a personal or brand-professional tone and whether you want short or longer sections." },
      { title: "Generate the draft", body: "Get a subject line, intro, structured body, and sign-off as a complete issue draft." },
      { title: "Fact-check and personalize", body: "Verify all facts, links, and details, then add any personal touches before sending." }
    ],
    examples: [
      { label: "Weekly creator newsletter", input: "Newsletter update: launched a new YouTube video, found 3 useful marketing tools, personal note about a busy week", output: "Subject: This week's video, 3 tools worth trying, and a confession\nIntro: It's been a chaotic week, but a good kind of chaotic — here's what I've been working on...\nSection: New Video — [details]\nSection: 3 Tools I've Been Using\nSign-off: Talk soon, [Name]" },
      { label: "SaaS product update newsletter", input: "Monthly product update newsletter: new feature launch, one bug fix, upcoming webinar", output: "Subject: New feature, a fix you asked for, and a webinar invite\nIntro: This month brought one of our most requested features to life...\nSection: What's New\nSection: Fixed This Month\nSection: Join Our Upcoming Webinar\nSign-off: Thanks for being part of this, The [Product] Team" }
    ],
    capabilities: [
      { title: "Full-issue drafting", body: "Generates subject line, intro, body sections, and sign-off together as one coherent issue." },
      { title: "Scannable structure", body: "Organizes multiple updates or links into clearly headed sections readers can skim." },
      { title: "Voice consistency", body: "Keeps intro and sign-off tone aligned so the issue feels written by one consistent voice." }
    ],
    audiences: [
      { who: "Newsletter writers and creators", why: "Need to publish consistently without starting from a blank draft each issue." },
      { who: "Marketing teams", why: "Send regular product or company update newsletters and want a faster drafting process." },
      { who: "Solopreneurs", why: "Maintain an email list without dedicating hours to writing every issue." }
    ],
    useCases: [
      { title: "Weekly or monthly recap issues", body: "Turn a rough list of updates and links into a structured, readable newsletter draft." },
      { title: "Product update announcements", body: "Organize feature launches, fixes, and upcoming events into a clear company newsletter." }
    ],
    tips: [
      "Always fact-check names, links, and details before sending — the tool drafts structure, you verify content",
      "Keep a consistent sign-off style so regular readers recognize your voice",
      "Test subject lines for length since many inboxes truncate around 40-60 characters",
      "Use section headers so readers can scan and jump to what interests them",
      "Add a personal line or detail the AI wouldn't know, to keep the issue authentic"
    ],
    mistakes: [
      "Sending a generated draft without fact-checking links, names, or details",
      "Losing your newsletter's usual personal voice by over-relying on generated phrasing",
      "Writing overly long subject lines that get cut off in inbox previews",
      "Skipping section structure and sending one long undifferentiated block of text"
    ],
    faqs: [
      { q: "Will it write about topics I haven't described?", a: "No — it drafts structure and phrasing around the content you provide; it doesn't invent facts, updates, or links on its own." },
      { q: "Can it match my newsletter's existing voice?", a: "Yes, describe your usual tone or paste a past issue as a style reference." },
      { q: "How long should the subject line be?", a: "Many inboxes truncate around 40-60 characters, so shorter, clear subject lines tend to display fully across more devices." },
      { q: "Does this handle email deliverability or design?", a: "No, this focuses on writing the content; deliverability and design depend on your email platform and sending practices." }
    ],
    related: ["ai-email-generator", "ai-email-subject-line-generator", "ai-follow-up-email-generator", "ai-cold-email-generator"]
  }
];
