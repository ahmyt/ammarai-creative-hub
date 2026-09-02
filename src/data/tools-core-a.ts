import type { Tool } from "./types";

export const coreToolsA: Tool[] = [
  {
    slug: "ai-writer",
    name: "AI Writer",
    category: "AI Writing",
    summary:
      "A general-purpose writing surface for drafts, edits and rewrites, with your brand tone kept in place.",
    title: "AI Writer: Draft, Edit and Rewrite Faster | AmmarAI",
    description:
      "Draft, restructure and polish any kind of writing in one editor. Keep your tone, control the structure, and edit the output in place.",
    h1: "The writing surface where drafts actually get finished",
    lede: "AmmarAI's AI Writer is a full editor, not a one-shot text box. Draft, select, rewrite, expand and trim until the piece reads the way you would have written it on a good day.",
    ctaLabel: "Try AI Writer",
    featured: true,
    popular: true,
    what: [
      "AI Writer is the general-purpose text workspace inside AmmarAI. You open a blank document or paste something you already have, describe what you need, and work with the model directly in the page. Instead of generating one block of text and hoping it fits, you keep editing: highlight a weak paragraph and rewrite it, ask for a tighter version of a sentence, or push a section from three hundred words to five hundred without touching anything else.",
      "It differs from the more specific generators in the library. The AI Article Generator is built around a full blog structure with headings and search intent. The AI Rewriter is built for reworking text you already have. AI Writer sits underneath both: it is the open surface you use when the format is not fixed, when you are writing a proposal, a landing page, an internal brief, a script outline or a piece of documentation.",
      "The output is a starting draft with your judgement applied on top. AmmarAI does not know your customer's objections, your legal constraints or last quarter's messaging unless you tell it, so the workflow that produces good writing is always the same: give it real context, generate, then edit hard.",
    ],
    canDo: [
      "Start a draft from a one-line brief, a bullet outline or a rough voice note",
      "Rewrite any selected passage without regenerating the whole document",
      "Shift register between plain, technical, warm, formal or persuasive",
      "Expand a thin section or compress a bloated one to a target length",
      "Turn a long document into a summary, an abstract or a set of key points",
      "Generate several openings or closings and pick the strongest",
      "Translate a finished piece while keeping the structure intact",
      "Convert a draft into other formats such as an email, a post or a script",
    ],
    how: [
      {
        title: "Give it a real brief",
        body: "Name the audience, the format, the goal and anything the piece must include. A brief like \"600-word product update for existing customers, explains the new export limits, apologetic but not grovelling\" produces something usable. A brief like \"write about exports\" does not.",
      },
      {
        title: "Generate a structural draft first",
        body: "Ask for an outline or a skeleton before full prose. Fixing the argument at outline stage takes a minute; fixing it after a thousand words of polished text takes far longer.",
      },
      {
        title: "Work section by section",
        body: "Select a paragraph and rewrite only that. Working in small selections keeps the parts you already like and prevents the model from quietly changing facts elsewhere in the document.",
      },
      {
        title: "Set tone once and reuse it",
        body: "Save a tone profile with a short description and two or three examples of writing you consider on-brand. Every later generation starts from that reference instead of a neutral default.",
      },
      {
        title: "Edit for truth, then publish",
        body: "Check every claim, number, name and link yourself. This is the step people skip and the one that separates writing that holds up from writing that embarrasses you.",
      },
    ],
    examples: [
      {
        label: "Product update",
        input:
          "600-word update for existing customers explaining that CSV exports now cap at 50,000 rows. Tone: direct, apologetic, no corporate hedging. Include the workaround.",
        output:
          "Starting 3 March, CSV exports will cap at 50,000 rows per file. If you export more than that today, your download will now arrive as a numbered set of files rather than failing halfway through, which is what most of you have been running into…",
      },
      {
        label: "Rewrite a stiff paragraph",
        input:
          "Rewrite this to sound like a person: 'Our solution leverages best-in-class methodologies to optimise stakeholder outcomes.'",
        output:
          "We help the people who own the work get it done faster, with fewer handoffs and less guessing about what changed.",
      },
    ],
    capabilities: [
      {
        title: "Inline selection editing",
        body: "Every instruction can be scoped to a selection, so you refine a document in passes instead of regenerating it whole.",
      },
      {
        title: "Tone and brand memory",
        body: "Save the voice you write in, including words you avoid, and apply it across every document in the workspace.",
      },
      {
        title: "Length control",
        body: "Ask for a specific word count or a proportional change, such as trimming a section by a third while keeping every argument.",
      },
      {
        title: "Format conversion",
        body: "Take one finished piece and produce the derivative versions you actually need: a summary, an email, a social cutdown, an FAQ block.",
      },
      {
        title: "Multilingual drafting",
        body: "Draft or translate across languages while keeping headings, lists and structure aligned with the source.",
      },
    ],
    audiences: [
      {
        who: "Marketers",
        why: "Turn a positioning doc into landing copy, emails and posts without starting from a blank page each time.",
      },
      {
        who: "Founders and operators",
        why: "Write investor updates, policy notes and customer announcements quickly when writing is not the main job.",
      },
      {
        who: "Support and success teams",
        why: "Draft macros, help articles and difficult customer replies with a consistent, calm register.",
      },
      {
        who: "Freelancers",
        why: "Move faster through first drafts so billable hours go into thinking and editing rather than typing.",
      },
    ],
    useCases: [
      {
        title: "Turn a messy call into a brief",
        body: "Paste raw meeting notes, ask for a structured brief with decisions, owners and open questions, then rewrite the summary paragraph until it reads cleanly enough to send to the client.",
      },
      {
        title: "Repurpose one long piece",
        body: "Draft the long article once, then use format conversion to produce the newsletter version, the LinkedIn post and the executive summary from the same source so the message stays consistent.",
      },
      {
        title: "Rescue a stalled draft",
        body: "Paste the half-finished document, ask what the argument is missing, then work through the gaps section by section rather than restarting.",
      },
    ],
    tips: [
      "Write the brief as if you were handing the job to a competent new hire who knows nothing about your company.",
      "Give the model one or two paragraphs of your own writing as a tone sample; it beats any adjective you can supply.",
      "Ask for three versions of hard passages such as openings, then combine the best sentence from each.",
      "Tell it what to leave out. Constraints improve output more reliably than extra instructions about what to include.",
      "Keep a document of prompts that worked. Reuse beats reinvention.",
    ],
    mistakes: [
      "Accepting the first draft because it reads smoothly. Fluent writing can still be wrong or generic.",
      "Regenerating the whole document to fix one sentence, which quietly changes parts you had already approved.",
      "Asking for a word count without saying what should fill it, which produces padding.",
      "Publishing unverified facts, quotes or statistics that the model presented confidently.",
    ],
    faqs: [
      {
        q: "Is AI Writer different from the AI Article Generator?",
        a: "Yes. The AI Article Generator is shaped around blog structure, headings and search intent, and it produces a complete article. AI Writer is an open editor for any format, and it is designed for iterative editing rather than a single generation.",
      },
      {
        q: "Will the writing sound like me?",
        a: "It will get close if you feed it samples. Save two or three paragraphs you consider representative as a tone reference, and expect to edit rhythm and word choice on anything you publish under your own name.",
      },
      {
        q: "Can I use it for long documents?",
        a: "Yes, though the reliable approach for anything past a few thousand words is section-by-section drafting. Long single generations drift in structure and start repeating themselves.",
      },
      {
        q: "Does it check facts?",
        a: "No. Treat every specific claim as unverified until you check it. The model produces plausible text, and plausible is not the same as accurate.",
      },
      {
        q: "Which plan includes AI Writer?",
        a: "Every plan includes it, including Free. Higher plans raise the monthly word allowance and unlock advanced models, saved tone profiles and longer documents.",
      },
    ],
    related: [
      "ai-article-generator",
      "ai-rewriter",
      "ai-tone-changer",
      "ai-summary-generator",
      "ai-grammar-checker",
    ],
  },
  {
    slug: "ai-chat",
    name: "AI Chat",
    category: "AI Chat",
    summary:
      "A conversational workspace that keeps context, reads your files and hands work off to the other tools.",
    title: "AI Chat: Think, Plan and Solve With Context | AmmarAI",
    description:
      "Chat with an AI assistant that remembers the thread, reads uploaded files and passes work to writing, image and code tools.",
    h1: "A conversation that keeps everything you have already said",
    lede: "AI Chat is where you think out loud: plan a launch, debug an idea, interrogate a document, then push the result into the tool that finishes it.",
    ctaLabel: "Open AI Chat",
    featured: true,
    popular: true,
    what: [
      "AI Chat is the conversational front door to AmmarAI. It behaves the way you expect a capable assistant to behave: it holds the thread, remembers the constraints you set twenty messages ago, and lets you attach files so the answers are grounded in your material rather than general knowledge.",
      "What makes it different from a standalone chatbot is where the conversation goes next. When you land on a headline you like, you can move straight into the AI Writer with the context attached. When you describe a scene, you can generate it in the AI Image Generator without re-explaining. Chat is the reasoning layer; the specialist tools do the production.",
      "It is genuinely useful for thinking, comparing options, drafting quickly and explaining unfamiliar material. It is not a search engine and it is not a source of record. When accuracy matters, attach the document that contains the answer and ask it to work from that.",
    ],
    canDo: [
      "Hold a long working conversation without repeating your context",
      "Upload PDFs, spreadsheets, images and transcripts and ask questions about them",
      "Compare options and pressure-test a plan or an argument",
      "Explain unfamiliar code, contracts, medical letters or technical papers in plain language",
      "Draft quick text and hand the good version to AI Writer",
      "Generate structured output such as tables, checklists or JSON",
      "Switch languages mid-conversation and keep the thread intact",
    ],
    how: [
      {
        title: "Open a thread with a purpose",
        body: "State the goal and the constraints in the first message. \"Help me plan a two-week launch for a $19 productivity app aimed at freelancers, budget under $500\" gives the assistant something to work with.",
      },
      {
        title: "Attach your material",
        body: "Upload the brief, the spreadsheet, the screenshot or the transcript. Grounded answers are dramatically better than answers drawn from general knowledge.",
      },
      {
        title: "Argue with it",
        body: "Ask what is weakest about the plan, what it would cut, and what assumptions it made. Push-back is where chat earns its value.",
      },
      {
        title: "Hand off to a production tool",
        body: "When the thinking is done, send the result to AI Writer, the AI Image Generator or the AI Code Generator rather than trying to finish everything in the chat window.",
      },
    ],
    examples: [
      {
        label: "Interrogating a document",
        input:
          "Attached: 34-page supplier contract. What are the termination terms, and is there anything unusual about the liability cap?",
        output:
          "Termination for convenience requires 90 days' written notice (clause 11.2). The liability cap is unusual in two ways: it is set at three months of fees rather than twelve, and clause 14.4 carves out data-loss claims entirely…",
      },
      {
        label: "Planning out loud",
        input: "I have 6 hours this week for marketing. What is the highest-leverage use of it?",
        output:
          "Based on what you described, two hours on the pricing page, three on a single comparison article targeting the term your customers already use, and one on setting up a repeatable weekly post. Here is why the pricing page comes first…",
      },
    ],
    capabilities: [
      {
        title: "Persistent thread context",
        body: "Constraints, tone and decisions set earlier in the conversation carry forward, so you stop re-explaining yourself.",
      },
      {
        title: "File-grounded answers",
        body: "Attach documents, sheets and images and ask questions that are answered from that material.",
      },
      {
        title: "Handoff to specialist tools",
        body: "Move a chat result into writing, image, video or code tools with the context preserved.",
      },
      {
        title: "Structured output",
        body: "Request tables, comparison grids, checklists or machine-readable formats when you need something you can paste elsewhere.",
      },
    ],
    audiences: [
      {
        who: "Anyone facing a blank page",
        why: "Talking through the problem produces a starting structure faster than staring at an empty document.",
      },
      {
        who: "Analysts and researchers",
        why: "Question long documents directly instead of skimming for the paragraph that matters.",
      },
      {
        who: "Developers",
        why: "Explain unfamiliar code, sketch an approach, then generate the implementation in the code tool.",
      },
      {
        who: "Managers",
        why: "Draft difficult messages, prepare for reviews and pressure-test decisions before they reach the team.",
      },
    ],
    useCases: [
      {
        title: "Weekly planning session",
        body: "Start a thread on Monday with your goals and constraints, return to it during the week, and let the accumulated context make each answer sharper than a cold prompt would be.",
      },
      {
        title: "Document triage",
        body: "Upload a stack of PDFs, ask for a one-paragraph summary of each, then go deep only on the ones that matter.",
      },
      {
        title: "Concept to asset",
        body: "Describe a campaign idea in chat, refine the angle, then push the final concept to the image and video tools to produce the assets.",
      },
    ],
    tips: [
      "Put the constraints in the first message; retrofitting them later muddies the whole thread.",
      "Ask for the reasoning, not just the answer, when the decision matters.",
      "Start a fresh thread when the topic changes. Long unrelated context degrades the quality of answers.",
      "Attach the source rather than describing it from memory.",
      "Ask it to list what it does not know about your situation. The gaps are usually the useful part.",
    ],
    mistakes: [
      "Treating it as a search engine for current events or exact figures.",
      "Accepting a confident answer about your own data when you never attached the data.",
      "Letting one thread sprawl across five unrelated projects.",
      "Doing production work in the chat window when a specialist tool would do it better.",
    ],
    faqs: [
      {
        q: "Does AI Chat remember previous conversations?",
        a: "Within a thread, yes, everything you have said stays in context. Across separate threads, it starts fresh unless you attach the relevant material again or save it to your workspace context.",
      },
      {
        q: "Can I upload files?",
        a: "Yes. Documents, spreadsheets, images and transcripts can be attached and questioned. File size and page limits depend on your plan.",
      },
      {
        q: "How is this different from asking the AI Writer?",
        a: "Chat is for thinking and iterating in conversation. AI Writer is a document editor for producing a finished piece. Most work moves from one to the other.",
      },
      {
        q: "Is it accurate?",
        a: "It is fluent, which is not the same thing. Answers grounded in files you upload are far more reliable than answers about the outside world. Verify anything consequential.",
      },
      {
        q: "Can it write code?",
        a: "It can explain and sketch code, and it is a good place to reason about an approach. For generating full implementations, tests and migrations, the AI Code Generator is the better surface.",
      },
    ],
    related: [
      "ai-writer",
      "ai-document-analyzer",
      "ai-code-generator",
      "ai-vision",
      "ai-summary-generator",
    ],
  },
  {
    slug: "ai-image-generator",
    name: "AI Image Generator",
    category: "AI Image",
    summary:
      "Turn a written description into usable visuals: product shots, editorial imagery, backgrounds and campaign assets.",
    title: "AI Image Generator: Text to Image, On Brand | AmmarAI",
    description:
      "Describe an image and get usable visuals in the aspect ratios you actually publish. Iterate on style, lighting and composition.",
    h1: "Describe the picture. Get something you can publish.",
    lede: "Generate campaign visuals, product scenes, blog imagery and social assets from a written description, then iterate until the composition is right.",
    ctaLabel: "Create an image",
    featured: true,
    popular: true,
    what: [
      "The AI Image Generator turns a text description into an image. You write what you want to see, choose an aspect ratio and a visual register, and the model produces options. The part that matters in practice is iteration: the first result is rarely the one you ship, and the tool is built around refining lighting, framing, palette and subject placement across several passes.",
      "Prompting is a craft with a learnable shape. Descriptions that work name the subject, the setting, the lighting, the camera perspective and the mood, and they say what to leave out. \"A matte black desk lamp on a pale concrete surface, single soft window light from the left, deep shadow, no props, shot at eye level\" gives the model something to aim at. \"A nice lamp photo\" does not.",
      "There are honest limits. Text inside images is unreliable, hands and complex mechanical detail can distort, and exact replication of a real product is not something a generative model does. For brand-critical product photography you still shoot the product; for backgrounds, concepts, editorial imagery and social variations, generation is often faster than any alternative.",
    ],
    canDo: [
      "Generate hero imagery, blog headers and section illustrations",
      "Create product scenes and lifestyle mockups for concepts and pitches",
      "Produce variations of one composition in multiple aspect ratios",
      "Build a consistent visual style across a campaign using a saved style reference",
      "Explore art direction quickly before commissioning a shoot",
      "Create backgrounds, textures and abstract assets for layouts",
      "Feed a generated still into the image-to-video tool for motion",
    ],
    how: [
      {
        title: "Describe subject, setting and light",
        body: "Those three carry most of the result. Add the camera angle and lens feel if you want photographic realism, or name a medium such as risograph, ink wash or 3D render if you do not.",
      },
      {
        title: "Set the aspect ratio before you fall in love",
        body: "Generate directly in the ratio you will publish. Cropping a square into a 16:9 banner usually destroys the composition you liked.",
      },
      {
        title: "Iterate on one variable at a time",
        body: "Change the lighting, then the framing, then the palette. Changing everything at once makes it impossible to tell what improved the image.",
      },
      {
        title: "Lock the style, then produce the set",
        body: "Once one image is right, reuse it as a style reference so the rest of the campaign holds together.",
      },
    ],
    examples: [
      {
        label: "Editorial header",
        input:
          "Wide 16:9. Overhead shot of a wooden workbench with scattered ceramic glaze samples, morning light from a high window, muted terracotta and bone palette, film grain, no text, no hands.",
        output:
          "Four wide compositions in a warm, matte photographic style, usable as a blog header without cropping.",
      },
      {
        label: "Concept scene",
        input:
          "Portrait 4:5. A single cyclist crossing an empty coastal road at dusk, seen from behind at a distance, long shadows, cool blue light with one warm streetlamp, cinematic, no lens flare.",
        output:
          "A quiet, wide-negative-space image suitable for an Instagram post with the caption placed in the lower third.",
      },
    ],
    capabilities: [
      {
        title: "Aspect ratio control",
        body: "Generate natively in square, portrait, landscape and story ratios rather than cropping afterwards.",
      },
      {
        title: "Style references",
        body: "Reuse an approved image as the visual anchor for an entire campaign so the set feels intentional.",
      },
      {
        title: "Negative direction",
        body: "State what must not appear, which is often the fastest way to fix an image that is nearly right.",
      },
      {
        title: "Variation passes",
        body: "Produce controlled alternatives of a composition you already like, instead of rolling the dice again.",
      },
      {
        title: "Handoff to motion",
        body: "Send any generated still into image-to-video to add camera movement or subtle animation.",
      },
    ],
    audiences: [
      {
        who: "Social media managers",
        why: "Ship a week of on-brand visuals in the correct ratios without a photoshoot or a stock subscription.",
      },
      {
        who: "Content teams",
        why: "Give every article an original header instead of the same stock photo everyone else licensed.",
      },
      {
        who: "Designers",
        why: "Explore art direction fast, then take the strongest direction into real production.",
      },
      {
        who: "Small businesses",
        why: "Produce presentable imagery for a site or a menu when a commissioned shoot is out of reach.",
      },
    ],
    useCases: [
      {
        title: "Campaign visual set",
        body: "Generate one hero image, approve the style, then produce the story, square and banner variants from the same reference so the campaign reads as one thing.",
      },
      {
        title: "Article illustration system",
        body: "Define one visual language for the blog, save it as a reference, and generate a header per article that is recognisably yours.",
      },
      {
        title: "Pitch mockups",
        body: "Visualise a concept convincingly enough to get the idea approved before spending money on production.",
      },
    ],
    tips: [
      "Name the light. Direction, softness and time of day change an image more than any adjective about mood.",
      "Ask for negative space if text will sit on top of the image later.",
      "Avoid asking for words inside the image; add real typography in your layout instead.",
      "Describe the camera position explicitly when the framing matters, for example eye level, overhead or low angle.",
      "Keep a note of prompts that produced your approved style; they become the house look.",
      "Check imagery involving people carefully for distortion before publishing.",
    ],
    mistakes: [
      "Writing prompts as keyword soup instead of a clear description of a scene.",
      "Generating square images and cropping them into every other format.",
      "Expecting an exact reproduction of a real product or a specific person.",
      "Publishing the first result without checking hands, edges and small detail.",
    ],
    faqs: [
      {
        q: "Can I use the images commercially?",
        a: "Images you generate on a paid plan are intended for commercial use in your own marketing and products. Avoid prompts that ask for trademarked characters, brand logos or the likeness of a real person, since those raise separate rights issues regardless of the tool.",
      },
      {
        q: "Why does text in my images look wrong?",
        a: "Generative image models render text unreliably. Generate the image without words and add typography in a design tool, which also keeps the type crisp and on brand.",
      },
      {
        q: "How do I keep a consistent style across many images?",
        a: "Approve one image, save it as a style reference, and generate the rest against it. Consistency comes from reuse, not from repeating the same adjectives.",
      },
      {
        q: "Can I generate an image of my actual product?",
        a: "Not faithfully. The model creates a plausible object, not your exact SKU. Use generation for scenes, backgrounds and concepts, and real photography where product accuracy matters.",
      },
      {
        q: "What resolution do I get?",
        a: "Output resolution depends on your plan, with higher plans producing larger files suitable for print-adjacent use. All plans generate at sizes that work for web and social.",
      },
    ],
    related: [
      "ai-image-to-video",
      "ai-avatar-generator",
      "ai-video-generator",
      "instagram-caption-generator",
      "ai-vision",
    ],
  },
  {
    slug: "ai-video-generator",
    name: "AI Video Generator",
    category: "AI Video",
    summary:
      "Produce short video from a script, a prompt or a set of stills, with voiceover and captions attached.",
    title: "AI Video Generator: Short Video From a Script | AmmarAI",
    description:
      "Turn a script, prompt or set of images into short video with voiceover and captions. Built for social, ads and explainers.",
    h1: "Short video, from script to finished cut",
    lede: "The AI Video Generator is the assembly layer: it takes your script, visuals and voice and produces a short video you can post, rather than an isolated clip you still have to edit.",
    ctaLabel: "Generate a video",
    featured: true,
    what: [
      "AI Video Generator produces short-form video end to end. You supply a script or a prompt, choose a visual approach, and the tool assembles scenes, pacing, a generated voiceover and burned-in captions into a finished cut in the ratio you need.",
      "It sits above the two narrower tools. Text-to-video creates a clip from a written description of a shot. Image-to-video animates a still you already have. The video generator orchestrates them: it breaks a script into scenes, decides what visual each scene needs, and stitches the result together with audio and timing.",
      "Expect short-form quality, which is the honest framing. This is built for fifteen to ninety second pieces: social posts, product explainers, ad variants, course intros. It is not a replacement for a filmed brand piece with a director and a crew, and long unbroken generated footage still shows its seams.",
    ],
    canDo: [
      "Turn a written script into a scene-by-scene video with matching visuals",
      "Add a generated voiceover in a chosen voice and pace",
      "Burn in captions styled for silent autoplay feeds",
      "Produce the same cut in 9:16, 1:1 and 16:9 without re-editing",
      "Animate your own uploaded images or generated stills",
      "Swap a single scene without rebuilding the whole video",
      "Generate several hook variants of the same video for testing",
    ],
    how: [
      {
        title: "Start from a script, not a vibe",
        body: "Videos live or die on the first three seconds and the structure underneath. Write or generate the script first, with the hook, the point and the call to action explicit.",
      },
      {
        title: "Choose the visual approach",
        body: "Generated footage, animated stills, text-forward motion or a mix. Text-forward often outperforms generated footage for explainers because it is legible and never uncanny.",
      },
      {
        title: "Set voice and pacing",
        body: "Pick the voice, then check the timing against the visuals. Most first cuts are twenty percent too slow for social.",
      },
      {
        title: "Review scene by scene",
        body: "Regenerate individual scenes that miss, rather than rerolling the whole video and losing the parts that worked.",
      },
      {
        title: "Export per platform",
        body: "Render each aspect ratio separately so captions and framing stay inside the safe area on every feed.",
      },
    ],
    examples: [
      {
        label: "Product explainer",
        input:
          "45-second explainer for a scheduling app. Hook: the double-booking problem. Three benefits. CTA: free trial. Vertical, upbeat voice, captions on.",
        output:
          "A 9:16 cut with a four-second hook, three visual beats, a warm mid-paced voiceover and high-contrast captions timed to the read.",
      },
      {
        label: "Ad variants",
        input:
          "Same script, three punchy opening hooks. Kinetic captions, fast jump cuts, warm brand palette, 16:9 and 9:16.",
        output:
          "Six polished ad cuts — three hooks in two ratios — with animated captions and matching pacing, ready to run against each other.",
      },
    ],
    capabilities: [
      {
        title: "Script-to-scene breakdown",
        body: "The script is segmented into timed scenes with a visual assigned to each, so pacing is deliberate rather than accidental.",
      },
      {
        title: "Integrated voice and captions",
        body: "Voiceover and burned-in captions are produced with the video, not bolted on in a separate editor.",
      },
      {
        title: "Per-scene regeneration",
        body: "Fix one weak shot without disturbing the rest of the cut.",
      },
      {
        title: "Multi-ratio export",
        body: "One project renders to vertical, square and widescreen with framing adjusted per format.",
      },
    ],
    audiences: [
      {
        who: "Social teams",
        why: "Keep a posting cadence on video without a studio, an editor or a filming day.",
      },
      {
        who: "Performance marketers",
        why: "Produce many hook and format variants cheaply enough to actually test them.",
      },
      {
        who: "Course creators",
        why: "Produce module intros and summaries that look consistent across a long curriculum.",
      },
      {
        who: "Small businesses",
        why: "Announce something with video when the alternative is another static image post.",
      },
    ],
    useCases: [
      {
        title: "Article to video",
        body: "Take a published article, condense it into a sixty-second script, generate the video, and post it as the social version of the piece.",
      },
      {
        title: "Hook testing",
        body: "Hold the body constant, generate five different openings, and let the feed tell you which framing earns attention.",
      },
      {
        title: "Product update reel",
        body: "Animate your own product screenshots, add a short voiceover, and ship a release note people will actually watch.",
      },
    ],
    tips: [
      "Write the first line of the script to work with the sound off; captions carry most viewers.",
      "Keep scenes under four seconds in vertical formats. Attention drops on static shots faster than you expect.",
      "Use your own screenshots and photos where possible; real assets beat generated footage for credibility.",
      "Say the call to action out loud and show it on screen at the same time.",
      "Check caption placement against each platform's UI overlay before exporting.",
    ],
    mistakes: [
      "Starting with a prompt instead of a script, which produces pretty footage with nothing to say.",
      "Cramming a ninety-second script into a thirty-second cut so the voiceover races.",
      "Using generated footage of people in close-up, where artefacts are most visible.",
      "Exporting one ratio and letting the platform crop the rest.",
    ],
    faqs: [
      {
        q: "How long can the videos be?",
        a: "The tool is designed for short form, typically up to a couple of minutes. Longer pieces are better assembled as several shorter segments so you can control quality scene by scene.",
      },
      {
        q: "Can I use my own footage and images?",
        a: "Yes. Uploading your own assets usually produces a more credible video than fully generated footage, particularly for product content.",
      },
      {
        q: "Is the voiceover included?",
        a: "Yes, voice generation is part of the flow, and you can also upload your own recorded narration if you prefer your real voice.",
      },
      {
        q: "How is this different from text-to-video?",
        a: "Text-to-video generates a single clip from a shot description. The video generator plans a multi-scene piece from a script and handles voice, captions and timing across the whole cut.",
      },
      {
        q: "Do I get captions?",
        a: "Yes, captions are generated from the script and burned in with styling options, which matters because most social video is watched muted.",
      },
    ],
    related: [
      "ai-text-to-video",
      "ai-image-to-video",
      "video-script-generator",
      "ai-voice-generator",
      "tiktok-script-generator",
    ],
  },
  {
    slug: "ai-voice-generator",
    name: "AI Voice Generator",
    category: "AI Voice",
    summary:
      "Create natural-sounding narration with control over voice, pace, emphasis and language.",
    title: "AI Voice Generator: Natural Narration on Demand | AmmarAI",
    description:
      "Generate natural voiceovers with control over pace, emphasis and pronunciation. Built for video, ads, courses and product audio.",
    h1: "Voiceover that sounds directed, not synthesised",
    lede: "Choose a voice, shape the delivery, and produce narration for video, courses and product audio without booking a studio.",
    ctaLabel: "Generate a voiceover",
    popular: true,
    what: [
      "AI Voice Generator produces spoken audio from text with performance controls attached. You pick a voice from the library, then direct it: slow a sentence down, stress a word, add a pause before the punchline, correct a pronunciation that the model gets wrong. The output is an audio file you can drop into a video, a course module or a podcast intro.",
      "It overlaps with text-to-speech but is not the same product. Text to Speech is the utility layer, built for converting written material into listenable audio quickly and at scale, including whole articles and documents. The Voice Generator is the production layer, built for short, directed performances where delivery matters and you will iterate on individual lines.",
      "The realistic bar today is good narration rather than convincing acting. Explainers, ads, e-learning, IVR prompts and audio summaries sound genuinely professional. Emotional dramatic performance still gives itself away, and voices should never be cloned from someone who has not consented.",
    ],
    canDo: [
      "Generate narration in a range of voices, accents and registers",
      "Control pace, pitch, emphasis and pause length line by line",
      "Fix pronunciation of names, acronyms and product terms",
      "Produce the same script in multiple languages for localisation",
      "Regenerate a single line without redoing the whole read",
      "Export clean audio ready to drop into a video timeline",
    ],
    how: [
      {
        title: "Write for the ear",
        body: "Short sentences. One idea per line. Read the script aloud yourself first, because anything you stumble over will also trip the model.",
      },
      {
        title: "Cast the voice",
        body: "Audition several voices on the same two lines rather than the whole script. Differences in warmth and pace are obvious within a sentence.",
      },
      {
        title: "Direct the delivery",
        body: "Mark the pauses and the stressed words, and set the pace against your video timing rather than in the abstract.",
      },
      {
        title: "Fix and re-render lines",
        body: "Correct the specific line that reads awkwardly, adjust pronunciation, and re-render just that segment.",
      },
    ],
    examples: [
      {
        label: "Ad read",
        input:
          "\"Late invoices are not a paperwork problem. [pause] They are a cash-flow problem.\" Voice: warm female, mid pace, slight emphasis on 'cash-flow'.",
        output: "A 6-second read with a natural beat before the second sentence and clean emphasis.",
      },
      {
        label: "Course module",
        input:
          "600-word lesson intro. Voice: calm neutral, slower pace, pronounce 'Kubernetes' as koo-ber-NET-eez.",
        output:
          "A steady 4-minute narration with consistent tone across paragraphs and the pronunciation correction applied throughout.",
      },
    ],
    capabilities: [
      {
        title: "Line-level direction",
        body: "Pace, emphasis and pauses are set per line, so you can shape a read the way a director would.",
      },
      {
        title: "Pronunciation control",
        body: "Teach it your product names, acronyms and industry terms once and reuse them across projects.",
      },
      {
        title: "Multilingual output",
        body: "Produce localised versions of a script without recasting a voice actor per market.",
      },
      {
        title: "Selective re-rendering",
        body: "Regenerate one problematic sentence rather than the entire file.",
      },
    ],
    audiences: [
      {
        who: "Video creators",
        why: "Narrate a cut at midnight without booking a booth or hearing your own voice on every video.",
      },
      {
        who: "E-learning teams",
        why: "Keep one consistent narrator across dozens of modules recorded over months.",
      },
      {
        who: "Product teams",
        why: "Generate in-app audio, onboarding narration and demo voiceovers that stay current as the product changes.",
      },
      {
        who: "Marketers",
        why: "Produce multiple ad reads and test which delivery lands before committing to a professional recording.",
      },
    ],
    useCases: [
      {
        title: "Narrate a video cut",
        body: "Time the script to the edit, generate the read, then adjust pace on the two lines that fight the visuals.",
      },
      {
        title: "Localise a campaign",
        body: "Translate the script, generate the voice per language, and keep the same pacing and structure across markets.",
      },
      {
        title: "Audio version of an article",
        body: "Give readers a listenable version of long-form content, which is where text-to-speech and voice generation meet.",
      },
    ],
    tips: [
      "Break the script into short lines. The model's pacing decisions improve when sentences are simple.",
      "Spell tricky names phonetically the first time rather than fighting the default pronunciation.",
      "Audition on the hardest sentence in the script, not the easiest one.",
      "Leave real silence between sections; generated audio without breathing room feels relentless.",
      "Listen on phone speakers, since that is where most of your audience will hear it.",
    ],
    mistakes: [
      "Feeding in written-for-the-page prose full of subclauses and expecting a natural read.",
      "Regenerating the whole script to fix one word.",
      "Using an over-energetic voice for long-form content, which becomes exhausting after two minutes.",
      "Cloning a voice without the explicit consent of the person it belongs to.",
    ],
    faqs: [
      {
        q: "How is this different from AI Text to Speech?",
        a: "Text to Speech is optimised for converting long written material into audio quickly. The Voice Generator is optimised for short, directed reads where you control emphasis, pacing and pronunciation line by line.",
      },
      {
        q: "Can I use the audio commercially?",
        a: "Yes, generated voiceovers on paid plans are intended for commercial use in your videos, ads and products.",
      },
      {
        q: "Can I clone my own voice?",
        a: "Voice cloning features require verified consent from the voice owner. Never upload recordings of someone else's voice without their permission.",
      },
      {
        q: "Which languages are supported?",
        a: "A broad set of major languages is available, with quality strongest in widely spoken ones. Audition a sample in your target language before committing to a large project.",
      },
      {
        q: "What file formats can I export?",
        a: "Standard audio formats suitable for video editors and podcast tools, with higher plans offering longer single renders.",
      },
    ],
    related: [
      "ai-text-to-speech",
      "ai-video-generator",
      "video-script-generator",
      "ai-transcription",
      "ai-avatar-generator",
    ],
  },
  {
    slug: "ai-text-to-speech",
    name: "AI Text to Speech",
    category: "AI Audio",
    summary:
      "Convert articles, documents and scripts into clear spoken audio, at length and at speed.",
    title: "AI Text to Speech: Turn Writing Into Audio | AmmarAI",
    description:
      "Convert articles, documents and scripts into natural spoken audio. Built for long-form listening, accessibility and audio versions.",
    h1: "Turn anything you have written into something you can listen to",
    lede: "Paste text, pick a voice, get audio. Text to Speech is the practical way to make long written material listenable, accessible and portable.",
    ctaLabel: "Convert text to speech",
    what: [
      "AI Text to Speech converts written text into spoken audio. It is the volume tool of the audio family: paste an article, a report, a chapter or a study sheet and get a clean, consistent read back. Where the Voice Generator is about directing a short performance, text to speech is about processing length reliably.",
      "That difference shows up in the features. Long inputs are handled in one pass with steady tone from start to finish, headings and paragraph breaks become natural pauses, and playback speed is adjustable for listeners who prefer 1.5x. It is the layer behind audio versions of blog posts, accessible course materials and personal listening queues.",
      "It is a reading voice, not an actor. For an article, a document or a briefing, that is exactly right. For a fifteen second ad where every syllable is being weighed, use the Voice Generator instead.",
    ],
    canDo: [
      "Convert full articles and documents into a single audio file",
      "Produce accessible audio versions of written material",
      "Create study audio from notes, summaries and reading lists",
      "Generate consistent narration across a long series of pages",
      "Read text in several languages with appropriate pronunciation",
      "Adjust reading speed and voice without regenerating from scratch",
    ],
    how: [
      {
        title: "Paste or upload the text",
        body: "Long documents are fine. Clean up navigation text, footnotes and stray characters first, since the reader will pronounce everything you give it.",
      },
      {
        title: "Pick a reading voice",
        body: "For anything over two minutes, choose a calmer voice than instinct suggests. Energetic voices tire the listener quickly.",
      },
      {
        title: "Set pace and pauses",
        body: "Match the pace to the material. Technical content benefits from a slower read and longer paragraph pauses.",
      },
      {
        title: "Export and publish",
        body: "Download the audio and attach it to your article, course or feed.",
      },
    ],
    examples: [
      {
        label: "Audio version of an article",
        input: "2,100-word blog post pasted in full. Voice: neutral, 1.0x, longer pauses at H2s.",
        output:
          "A 14-minute audio file with clean section breaks, ready to embed at the top of the post.",
      },
      {
        label: "Study audio",
        input: "Lecture notes with abbreviations expanded. Voice: calm, slightly slower.",
        output: "A steady read suitable for revision on a commute, with acronyms spoken correctly.",
      },
    ],
    capabilities: [
      {
        title: "Long-input handling",
        body: "Full documents are converted in one pass with consistent tone rather than stitched from fragments.",
      },
      {
        title: "Structure-aware pauses",
        body: "Headings, paragraphs and lists translate into pacing that makes the audio easy to follow.",
      },
      {
        title: "Accessibility support",
        body: "Provide an audio alternative to written content for readers who need or prefer it.",
      },
      {
        title: "Speed and voice switching",
        body: "Change the read speed or the voice and regenerate without editing the source text.",
      },
    ],
    audiences: [
      {
        who: "Publishers and bloggers",
        why: "Offer an audio version of every post and reach people who listen rather than read.",
      },
      {
        who: "Educators",
        why: "Make course materials accessible to students who process spoken material more easily.",
      },
      {
        who: "Students",
        why: "Convert reading lists and notes into audio for revision away from a screen.",
      },
      {
        who: "Accessibility-minded teams",
        why: "Provide an alternative format for written documentation without recording it manually.",
      },
    ],
    useCases: [
      {
        title: "Listen-to-this-post embeds",
        body: "Generate audio for each new article and embed the player under the title, giving readers a genuine choice of format.",
      },
      {
        title: "Internal document briefings",
        body: "Convert long internal reports into audio so people can absorb them while commuting.",
      },
      {
        title: "Podcast draft reads",
        body: "Hear your script in full before recording it yourself; the clumsy sentences become obvious.",
      },
    ],
    tips: [
      "Strip navigation text, captions and footnote markers before converting; the reader will voice them.",
      "Expand abbreviations in the source text rather than hoping the model guesses correctly.",
      "Use a neutral voice for long material and save the characterful ones for short pieces.",
      "Listen to the first minute before exporting the whole file.",
    ],
    mistakes: [
      "Converting raw web-scraped text complete with cookie notices and menu labels.",
      "Choosing a dramatic voice for a forty-minute document.",
      "Assuming the reader will pronounce your product name correctly without being told.",
    ],
    faqs: [
      {
        q: "How long can the text be?",
        a: "Long documents are supported, with maximum length per render depending on your plan. Very long books are best split by chapter for easier editing and reuse.",
      },
      {
        q: "Is this the same as the AI Voice Generator?",
        a: "They share the underlying voices, but the tools are aimed at different jobs. Text to Speech handles length and consistency; the Voice Generator handles directed performance for short scripts.",
      },
      {
        q: "Can I use it for accessibility compliance?",
        a: "It provides a useful audio alternative to written content. Formal accessibility conformance depends on your whole site and process, not on a single audio file.",
      },
      {
        q: "Does it handle other languages?",
        a: "Yes, across a wide set of languages. Check a sample paragraph first when the material contains many proper nouns.",
      },
    ],
    related: [
      "ai-voice-generator",
      "ai-transcription",
      "ai-summary-generator",
      "ai-document-analyzer",
      "ai-article-generator",
    ],
  },
  {
    slug: "ai-speech-to-text",
    name: "AI Speech to Text",
    category: "AI Audio",
    summary:
      "Fast, accurate conversion of speech into text, including live dictation and recorded audio.",
    title: "AI Speech to Text: Accurate Voice to Text | AmmarAI",
    description:
      "Convert speech into accurate text from recordings or live dictation. Punctuation, formatting and multiple languages included.",
    h1: "Speak it once, get the text you can work with",
    lede: "Dictate notes, capture voice memos and convert recorded audio into clean, punctuated text you can edit immediately.",
    ctaLabel: "Convert speech to text",
    what: [
      "AI Speech to Text is the conversion engine: audio in, text out. It handles dictation, voice memos, recorded calls and uploaded audio, returning punctuated, paragraphed text rather than an unbroken stream of words. Accuracy holds up well on clear speech and degrades predictably with background noise, heavy crosstalk and poor microphones.",
      "People often conflate it with transcription, and the distinction is worth keeping. Speech to text is about getting words out of audio quickly and using them somewhere else, usually your own words. AI Transcription is the fuller workflow product: multiple speakers, timestamps, speaker labels, searchable transcripts and export formats for subtitles. If you are dictating a draft, this is the tool. If you are processing a recorded interview, use transcription.",
      "The most underrated use is drafting. Speaking a first draft is roughly three times faster than typing one, and the text that comes out tends to be more direct because you were talking to a person rather than performing on a page.",
    ],
    canDo: [
      "Dictate notes, drafts and messages straight into text",
      "Convert uploaded audio files into punctuated text",
      "Capture voice memos and turn them into structured notes",
      "Work across many languages, including mixed-language speech",
      "Send the resulting text straight into AI Writer for shaping",
      "Produce quick text from short recordings without a full transcription workflow",
    ],
    how: [
      {
        title: "Record or upload",
        body: "Dictate directly or drop in an existing audio file. A cheap headset microphone improves accuracy more than any setting.",
      },
      {
        title: "Choose the language",
        body: "Set the expected language, or let it detect. Explicit is more reliable when the audio mixes languages.",
      },
      {
        title: "Review the punctuated output",
        body: "Read the text and fix names, technical terms and anything spoken over. These are the predictable error spots.",
      },
      {
        title: "Send it onward",
        body: "Push the text into AI Writer to turn a spoken ramble into a structured piece.",
      },
    ],
    examples: [
      {
        label: "Dictated draft",
        input: "Recording attached. Clean up filler words and keep my paragraph breaks.",
        output:
          "Okay, so for next quarter I think the priority is onboarding. Actually, no — retention first, then onboarding, because the churn we saw in March is still not explained.",
      },
      {
        label: "Voice memo to task list",
        input: "Memo attached. Turn it into text I can paste into my task list.",
        output:
          "Quick memo: call the supplier back about the September order, move the design review to Thursday, and send Priya the pricing sheet.",
      },
    ],
    capabilities: [
      {
        title: "Automatic punctuation",
        body: "Output arrives with sentences, capitalisation and paragraph breaks rather than as a raw word stream.",
      },
      {
        title: "Live dictation",
        body: "Speak and see the text appear, which suits drafting, note-taking and hands-busy situations.",
      },
      {
        title: "Multilingual recognition",
        body: "Handles a wide range of languages and copes reasonably with accented speech.",
      },
      {
        title: "Direct handoff",
        body: "Text moves straight into the writing tools instead of through a clipboard round trip.",
      },
    ],
    audiences: [
      {
        who: "Writers who think out loud",
        why: "Speaking a draft removes the blank-page problem entirely.",
      },
      {
        who: "Field and mobile workers",
        why: "Capture observations by voice when typing is impractical.",
      },
      {
        who: "People with typing constraints",
        why: "Produce written work without sustained keyboard use.",
      },
      {
        who: "Anyone in back-to-back meetings",
        why: "Record a two-minute debrief after each call instead of trying to remember it later.",
      },
    ],
    useCases: [
      {
        title: "Speak the first draft",
        body: "Talk through the piece for five minutes, convert it to text, then use AI Writer to impose structure on what you actually said.",
      },
      {
        title: "Post-call debrief",
        body: "Record a short spoken summary after a customer call, convert it, and paste the result into the CRM while it is still fresh.",
      },
      {
        title: "Idea capture",
        body: "Keep a running voice log and convert it weekly into a text backlog you can actually search.",
      },
    ],
    tips: [
      "Speak in complete sentences and pause at natural breaks; the punctuation model follows your rhythm.",
      "Say unusual proper nouns clearly, then fix them once in the text rather than fighting them mid-dictation.",
      "Record in a quiet space. Noise reduction cannot recover words that were masked.",
      "Do not self-edit while speaking. Get it all out, then edit in text where editing is cheap.",
    ],
    mistakes: [
      "Using it for multi-speaker recordings where you actually need speaker labels and timestamps.",
      "Publishing the raw output; spoken language needs restructuring before it reads well.",
      "Recording on a laptop microphone across a room and blaming the accuracy.",
    ],
    faqs: [
      {
        q: "How is this different from AI Transcription?",
        a: "Speech to text converts audio into usable text, typically your own speech, as an input method. Transcription is the full workflow for recordings with several speakers: labels, timestamps, searchable transcripts and subtitle exports.",
      },
      {
        q: "How accurate is it?",
        a: "Very good on clear single-speaker audio, noticeably weaker with background noise, crosstalk or very heavy accents in specialist vocabulary. Always read the output before relying on it.",
      },
      {
        q: "Can it handle accents?",
        a: "Yes, across a wide range, though accuracy varies. Domain-specific terms are the more common source of errors than accent alone.",
      },
      {
        q: "Does it work in real time?",
        a: "Live dictation is supported, and uploaded files are processed as a batch, which is usually faster than real time.",
      },
    ],
    related: [
      "ai-transcription",
      "ai-writer",
      "ai-summary-generator",
      "ai-text-to-speech",
      "ai-chat",
    ],
  },
  {
    slug: "ai-transcription",
    name: "AI Transcription",
    category: "AI Transcription",
    summary:
      "Turn interviews, meetings and videos into searchable transcripts with speaker labels and timestamps.",
    title: "AI Transcription: Meetings and Interviews to Text | AmmarAI",
    description:
      "Transcribe meetings, interviews and video with speaker labels and timestamps. Search, summarise and export subtitles.",
    h1: "Every recording becomes a searchable document",
    lede: "Upload audio or video and get a timestamped, speaker-labelled transcript you can search, summarise, quote and turn into subtitles.",
    ctaLabel: "Transcribe a recording",
    featured: true,
    what: [
      "AI Transcription processes recordings into structured transcripts. It separates speakers, attaches timestamps, and gives you a document you can search rather than an audio file you have to scrub through. Once a recording is text, everything downstream becomes cheap: pulling a quote, finding the moment a decision was made, generating a summary, producing subtitles.",
      "This is the workflow product of the audio family. Speech to Text is the quick converter for your own dictation. Transcription assumes a real recording with more than one person in it, and it optimises for what you do afterwards: reading, searching, citing and exporting.",
      "Accuracy depends heavily on the recording. A clean remote call recorded per-speaker transcribes close to perfectly. Four people around a laptop in a room with an air conditioner will produce errors, particularly on names and overlapping speech. Budget a few minutes for review on anything you intend to quote publicly.",
    ],
    canDo: [
      "Transcribe meetings, interviews, podcasts, lectures and videos",
      "Separate and label individual speakers",
      "Jump from any line of text to that moment in the audio",
      "Search across the full text of every recording you have processed",
      "Generate summaries, action items and key quotes from the transcript",
      "Export subtitle files for video captioning",
      "Handle recordings in a wide range of languages",
    ],
    how: [
      {
        title: "Upload the recording",
        body: "Audio or video, from a call recording, a phone, a camera or a podcast file. Higher-quality source audio produces meaningfully better results.",
      },
      {
        title: "Set speakers and language",
        body: "Tell it how many speakers to expect and name them if you know them. This improves labelling considerably.",
      },
      {
        title: "Review the transcript",
        body: "Scan for names, jargon and passages where people talked over each other, and correct them in place.",
      },
      {
        title: "Work with the text",
        body: "Summarise, extract decisions and actions, pull quotes with timestamps, or export subtitles.",
      },
    ],
    examples: [
      {
        label: "Customer interview",
        input: "Recording attached. Label speakers, add timestamps, then summarise the problems raised.",
        output:
          "[00:04:12] Participant: Honestly, the hardest part is the handoff. We finish a draft and then it just sits in someone's inbox for three days before anyone looks at it.",
      },
      {
        label: "Video subtitles",
        input: "Walkthrough audio attached. Transcribe it and export subtitles aligned to the narration.",
        output:
          "[00:01:38] Now open the campaign tab. You'll see every variant listed here, and clicking one shows the exact version that ran, along with its results.",
      },
    ],
    capabilities: [
      {
        title: "Speaker separation",
        body: "Distinct speakers are identified and labelled so the transcript reads as a conversation.",
      },
      {
        title: "Timestamped navigation",
        body: "Click any sentence to hear it, which makes verifying a quote a two-second job.",
      },
      {
        title: "Searchable archive",
        body: "Find the phrase across every transcript in your workspace instead of remembering which call it was in.",
      },
      {
        title: "Summaries and extraction",
        body: "Produce meeting summaries, decisions and action lists from the transcript in one step.",
      },
      {
        title: "Subtitle export",
        body: "Generate caption files timed to the source video for publishing.",
      },
    ],
    audiences: [
      {
        who: "Researchers",
        why: "Analyse interviews properly instead of relying on notes taken while trying to listen.",
      },
      {
        who: "Journalists",
        why: "Find and verify quotes with the timestamp attached, quickly and defensibly.",
      },
      {
        who: "Podcasters",
        why: "Produce show notes, chapter markers and quotable clips from the episode transcript.",
      },
      {
        who: "Teams that meet a lot",
        why: "Turn recurring meetings into a searchable record of what was actually decided.",
      },
      {
        who: "Video publishers",
        why: "Caption everything, which improves accessibility and how the content is discovered.",
      },
    ],
    useCases: [
      {
        title: "Research synthesis",
        body: "Transcribe every interview in a study, search across all of them for the recurring phrases, and build the findings on evidence you can cite to the second.",
      },
      {
        title: "Meeting record",
        body: "Record the weekly call, transcribe it, generate decisions and owners, and circulate that instead of half-remembered notes.",
      },
      {
        title: "Content from recordings",
        body: "Turn a webinar transcript into an article, a set of social quotes and a captioned highlight clip.",
      },
    ],
    tips: [
      "Record each remote participant on their own track when the platform allows it; speaker separation becomes near perfect.",
      "Supply a list of names and product terms before processing so the model spells them correctly.",
      "Fix errors in the first few minutes early; the same terms usually recur throughout.",
      "Do not quote publicly from an unreviewed transcript.",
      "Keep the original audio; the transcript is a working document, not the source of record.",
    ],
    mistakes: [
      "Recording a group meeting on one laptop microphone and expecting clean speaker labels.",
      "Treating the summary as a substitute for reading the parts that matter.",
      "Ignoring consent. Tell participants they are being recorded and check the rules that apply where you operate.",
      "Exporting subtitles without reviewing them, which puts every transcription error on screen.",
    ],
    faqs: [
      {
        q: "How accurate is the transcription?",
        a: "Clear single-track audio transcribes very accurately. Group recordings in noisy rooms, heavy crosstalk and specialist vocabulary all reduce accuracy, mostly on names and technical terms. Review before publishing.",
      },
      {
        q: "Does it identify who is speaking?",
        a: "Yes, it separates speakers and labels them, and you can rename the labels. Accuracy improves when you state how many speakers to expect.",
      },
      {
        q: "Can I transcribe video?",
        a: "Yes. Upload the video directly and export a subtitle file alongside the text transcript.",
      },
      {
        q: "How long can a recording be?",
        a: "Long recordings are supported, with per-file limits set by your plan. Very long sessions are easier to work with when split into logical parts.",
      },
      {
        q: "Is it different from speech to text?",
        a: "Yes. Speech to text is a quick converter, typically for your own dictation. Transcription is built for multi-speaker recordings and everything you do with them afterwards.",
      },
    ],
    related: [
      "ai-speech-to-text",
      "ai-summary-generator",
      "ai-document-analyzer",
      "ai-video-generator",
      "ai-text-to-speech",
    ],
  },
];
