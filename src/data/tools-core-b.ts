import type { Tool } from "./types";

export const coreToolsB: Tool[] = [
  {
    slug: "ai-avatar-generator",
    name: "AI Avatar Generator",
    category: "AI Image",
    summary:
      "Create consistent portrait avatars for profiles, teams and presenters in a single visual style.",
    title: "AI Avatar Generator: Consistent Profile Portraits | AmmarAI",
    description:
      "Generate polished avatars and presenter portraits in one consistent style, for profiles, team pages and video.",
    h1: "Portraits that look like they came from the same shoot",
    lede: "Generate avatars for profiles, team pages, course presenters and social accounts, all sharing one deliberate visual style.",
    ctaLabel: "Create an avatar",
    what: [
      "The AI Avatar Generator is a focused portrait tool. Instead of describing an entire scene, you describe a person, a framing and a treatment, and get portrait-format images built for the places avatars actually appear: circular profile crops, team grids, speaker cards and video thumbnails.",
      "The specific problem it solves is consistency. A team page where eight portraits were shot in eight different lighting conditions looks amateur. Here you set one style, generate everyone against it, and the grid holds together. The same applies to a presenter identity used across a course or a series of shorts.",
      "Two honest constraints. It creates plausible people, not a likeness of a specific real person, and generating a recognisable public figure is off limits. Fine facial detail can distort, so review at full size before publishing, especially eyes, teeth and glasses.",
    ],
    canDo: [
      "Generate portrait avatars in a single consistent lighting and colour treatment",
      "Produce a full team grid that reads as one visual system",
      "Create illustrated or stylised avatars rather than photographic ones",
      "Generate presenter portraits for course cards and video thumbnails",
      "Produce square and circular-safe crops that survive platform masking",
      "Feed a portrait into image-to-video for a subtly animated presenter shot",
    ],
    how: [
      {
        title: "Define the house style first",
        body: "Decide background, lighting and treatment before generating anyone: for example soft grey backdrop, single key light from the left, warm neutral grade, shoulders-up framing.",
      },
      {
        title: "Generate one reference portrait",
        body: "Get one image exactly right and keep it. Everything else is generated against that reference.",
      },
      {
        title: "Vary only the subject",
        body: "Change described features while holding style, framing and background constant so the set stays coherent.",
      },
      {
        title: "Check the circular crop",
        body: "Most avatars are masked to a circle. Preview the crop before you commit, since a good rectangle can be a bad circle.",
      },
    ],
    examples: [
      {
        label: "Team page set",
        input:
          "Shoulders-up portrait, soft grey seamless backdrop, single soft key from camera left, neutral warm grade, subject looking slightly off camera, no props.",
        output:
          "A set of portraits with matching light and background that sit correctly together in a three-column team grid.",
      },
      {
        label: "Illustrated identity",
        input:
          "Flat vector portrait, two-tone terracotta and bone palette, thick line weight, simplified features, square format.",
        output:
          "A stylised avatar system that works as a small profile picture without turning to mush.",
      },
    ],
    capabilities: [
      {
        title: "Style locking",
        body: "Reuse one approved portrait as the anchor so an entire set matches.",
      },
      {
        title: "Crop-safe framing",
        body: "Generate with the circular mask in mind so faces are not clipped by platform avatars.",
      },
      {
        title: "Photographic or illustrated",
        body: "Switch registers between realistic portraiture and flat illustration depending on the brand.",
      },
      {
        title: "Motion handoff",
        body: "Take a still portrait into image-to-video for a subtle animated presenter shot.",
      },
    ],
    audiences: [
      {
        who: "Small teams without a photographer",
        why: "Get a coherent team page before you can justify a group shoot.",
      },
      {
        who: "Course creators",
        why: "Maintain one presenter identity across dozens of lesson cards.",
      },
      {
        who: "Community and forum builders",
        why: "Offer members a set of default avatars that share one visual language.",
      },
      {
        who: "Brand designers",
        why: "Prototype an avatar system quickly before committing to illustration work.",
      },
    ],
    useCases: [
      {
        title: "Placeholder team grid",
        body: "Launch the about page with a consistent generated set, then replace portraits with real photography as people are shot.",
      },
      {
        title: "Course presenter identity",
        body: "Create one presenter portrait, apply it across every module card, and animate it for the intro sequence.",
      },
      {
        title: "Persona illustration",
        body: "Give research personas faces that share a style, so the deck reads as one system rather than a stock collage.",
      },
    ],
    tips: [
      "Describe the light before the face. Lighting is what makes a set look shot together.",
      "Keep backgrounds plain; busy backdrops fall apart at avatar size.",
      "Preview every portrait at 48 pixels. If it is unreadable small, it fails at its actual job.",
      "Avoid intricate glasses, jewellery and patterned fabric, which are where artefacts concentrate.",
      "Never generate a portrait intended to resemble a specific real individual.",
    ],
    mistakes: [
      "Generating each portrait from a fresh prompt, which produces eight unrelated styles.",
      "Choosing tight close-ups that get decapitated by the circular crop.",
      "Publishing without inspecting eyes, teeth and hands at full resolution.",
    ],
    faqs: [
      {
        q: "Can I generate an avatar that looks like me?",
        a: "The tool creates plausible people rather than a likeness of a specific individual. For a portrait of yourself, a photo remains the right source, and you can restyle it in the image tools.",
      },
      {
        q: "Can I use avatars commercially?",
        a: "Yes, generated avatars on paid plans can be used in your product and marketing. Do not prompt for the likeness of real people or trademarked characters.",
      },
      {
        q: "How do I keep the whole set consistent?",
        a: "Approve one portrait and use it as a style reference for the rest, varying only the described subject.",
      },
      {
        q: "Do avatars work as video presenters?",
        a: "A still portrait can be animated in image-to-video for subtle motion. Full talking-head lip sync is a different class of tool and is not what this produces.",
      },
    ],
    related: [
      "ai-image-generator",
      "ai-image-to-video",
      "ai-video-generator",
      "ai-vision",
      "instagram-caption-generator",
    ],
  },
  {
    slug: "ai-image-to-video",
    name: "AI Image to Video",
    category: "AI Video",
    summary:
      "Animate a still image into a short clip with camera movement and controlled motion.",
    title: "AI Image to Video: Animate Any Still Image | AmmarAI",
    description:
      "Turn a photo or generated image into a short animated clip with camera moves and subtle motion. Ideal for social and ads.",
    h1: "Give a still image somewhere to go",
    lede: "Upload a photo or a generated still, describe the movement you want, and get a short clip with real camera motion instead of a static frame.",
    ctaLabel: "Animate an image",
    recent: true,
    what: [
      "Image to Video takes an existing still and produces a short animated clip from it. You control the movement: a slow push in, a lateral drift, a parallax separation between subject and background, or subtle motion within the scene such as drifting steam or moving water. The source image stays recognisably itself, which is the whole point.",
      "This is the counterpart to text-to-video, and the difference matters. Text-to-video invents the entire shot from a description, so you cannot predict exactly what appears. Image to video starts from an image you have already approved, which makes it far more reliable for brand work: your product photo, your generated hero image, your team portrait.",
      "The realistic ceiling is a few seconds of convincing motion. Short pushes and drifts look excellent. Large movements, complex human motion and long durations are where artefacts appear, so the craft is choosing small, deliberate movement.",
    ],
    canDo: [
      "Add camera moves such as push in, pull out, pan and tilt to a still",
      "Create parallax depth between a subject and its background",
      "Animate ambient elements like smoke, water, cloth or light",
      "Turn a static product photo into a scroll-stopping social clip",
      "Produce a moving background plate for a text-led video",
      "Generate several motion variants of the same approved image",
    ],
    how: [
      {
        title: "Start with a strong still",
        body: "The clip inherits everything from the source. A well-composed image with clear depth animates far better than a flat, cluttered one.",
      },
      {
        title: "Describe one movement",
        body: "Pick a single motion: \"slow push in on the subject, background drifts slightly\". Combining several movements is where clips fall apart.",
      },
      {
        title: "Set duration honestly",
        body: "Three to five seconds is the sweet spot. Ask for twelve and you will usually see the model run out of ideas.",
      },
      {
        title: "Review at full size",
        body: "Watch for warping at edges and around faces or hands, then regenerate with a smaller movement if needed.",
      },
    ],
    examples: [
      {
        label: "Product hero",
        input:
          "Source: studio photo of a ceramic mug. Motion: very slow push in, steam rising gently, everything else static. 4 seconds.",
        output:
          "A calm loopable clip usable as a hero background or the opening beat of a product ad.",
      },
      {
        label: "Landscape parallax",
        input:
          "Source: wide coastal photo. Motion: lateral drift left to right with subtle depth separation between foreground rocks and horizon. 5 seconds.",
        output: "A cinematic establishing shot for the opening of a short video.",
      },
    ],
    capabilities: [
      {
        title: "Directed camera movement",
        body: "Specify the move rather than accepting whatever motion the model invents.",
      },
      {
        title: "Depth-aware parallax",
        body: "Foreground and background separate convincingly, which is what makes a still feel three-dimensional.",
      },
      {
        title: "Ambient animation",
        body: "Bring life to specific elements while the rest of the frame holds still.",
      },
      {
        title: "Ratio-preserving output",
        body: "Animate in the ratio the still was composed for, so nothing important is cropped away.",
      },
    ],
    audiences: [
      {
        who: "Social media managers",
        why: "Convert an existing image library into motion content without shooting anything new.",
      },
      {
        who: "E-commerce teams",
        why: "Give catalogue photography movement for ads and product pages.",
      },
      {
        who: "Video editors",
        why: "Produce B-roll and establishing plates from stills when there is no footage available.",
      },
      {
        who: "Marketers running ads",
        why: "Motion creative typically earns more attention in feeds than a static frame.",
      },
    ],
    useCases: [
      {
        title: "Static library to motion library",
        body: "Take the ten strongest images you already own, animate each with a small deliberate move, and you have a month of motion posts.",
      },
      {
        title: "Ad opener",
        body: "Animate the hero product shot for the first three seconds, then cut to the text-led body of the ad.",
      },
      {
        title: "Generated still to clip",
        body: "Create an image in the AI Image Generator, approve the composition, then animate it here so the campaign visual moves.",
      },
    ],
    tips: [
      "Choose images with obvious depth: a clear subject, a distinct background, and space between them.",
      "Smaller movements look more expensive. Slow beats dramatic almost every time.",
      "Avoid animating tight shots of faces and hands, where artefacts are most visible.",
      "Generate a few short variants and pick, rather than requesting one long clip.",
      "Keep the first and last frames usable as stills so the clip can also serve as a poster image.",
    ],
    mistakes: [
      "Asking for several simultaneous movements in one clip.",
      "Animating a low-resolution or heavily compressed source image.",
      "Requesting long durations and accepting the drift that comes with them.",
      "Using it where text-to-video would be better, namely when you have no source image at all.",
    ],
    faqs: [
      {
        q: "How is this different from text to video?",
        a: "Text to video invents the shot from a written description. Image to video animates a still you already have, so the content of the frame is predictable and on brand.",
      },
      {
        q: "How long can the clips be?",
        a: "Short by design, typically a handful of seconds per generation. Longer sequences are best built by assembling several clips in the video generator.",
      },
      {
        q: "Can I animate my own photos?",
        a: "Yes, and that is often the best use. Your real product and location photography animates into far more credible content than generated footage.",
      },
      {
        q: "Will the image stay exactly the same?",
        a: "The composition and subject stay recognisable, but fine detail can shift as the frame moves. Small movements preserve the original best.",
      },
    ],
    related: [
      "ai-text-to-video",
      "ai-image-generator",
      "ai-video-generator",
      "ai-avatar-generator",
      "video-script-generator",
    ],
  },
  {
    slug: "ai-text-to-video",
    name: "AI Text to Video",
    category: "AI Video",
    summary: "Generate a video clip directly from a written description of the shot you want.",
    title: "AI Text to Video: Generate Clips From a Prompt | AmmarAI",
    description:
      "Describe a shot and generate a short video clip. Useful for B-roll, concept films and social content with no footage.",
    h1: "Write the shot. The footage comes back.",
    lede: "Describe a scene in words and generate a short clip: useful when you need footage that does not exist and cannot be filmed.",
    ctaLabel: "Generate a clip",
    recent: true,
    what: [
      "Text to Video generates moving footage from a written shot description. You are effectively writing a shot list: subject, action, camera, lens feel, light and duration. The model returns a clip that approximates it. There is no source image involved, which is both the freedom and the risk.",
      "It is the right tool when the footage does not exist. Abstract concepts, impossible camera moves, imaginary environments, quick B-roll you cannot licence. It is the wrong tool when you need something specific and controlled, such as your actual product on your actual shelf, in which case animate a real photo with image-to-video instead.",
      "Set expectations properly. Clips are short, physics is approximate, and text rendered in the frame is unreliable. Human faces in close-up remain the weakest area. Wide shots, textures, landscapes, abstract motion and object-focused scenes hold up much better.",
    ],
    canDo: [
      "Generate B-roll for scenes you cannot film",
      "Visualise a concept before committing budget to a shoot",
      "Create abstract or atmospheric backgrounds for text-led videos",
      "Produce multiple visual interpretations of the same script beat",
      "Explore camera language and pacing during pre-production",
      "Fill gaps in an edit where licensed footage would be expensive",
    ],
    how: [
      {
        title: "Write it like a shot list",
        body: "Name the subject, the action, the camera position and movement, the light and the mood. \"Slow low tracking shot through tall dry grass at golden hour, shallow depth of field, warm backlight\" beats \"nature video\".",
      },
      {
        title: "Keep the action simple",
        body: "One subject doing one thing. Multiple actors and complex interactions are where generated video breaks down visibly.",
      },
      {
        title: "Generate several takes",
        body: "Treat it like shooting coverage. Generate four variants of the same description and select, rather than refining one clip endlessly.",
      },
      {
        title: "Cut it into a real edit",
        body: "Generated clips work best as short beats inside an edit with voiceover, captions and your own assets carrying the message.",
      },
    ],
    examples: [
      {
        label: "Atmospheric B-roll",
        input:
          "Static wide shot of rain hitting a city window at night, out-of-focus traffic lights beyond, cool colour grade, no people, 5 seconds.",
        output: "A moody establishing clip usable under an opening voiceover.",
      },
      {
        label: "Concept visualisation",
        input:
          "Overhead shot of coloured sand pouring into three separate glass containers on a white surface, slow motion, soft even light.",
        output: "An abstract metaphor clip for a video about splitting one idea into several outputs.",
      },
    ],
    capabilities: [
      {
        title: "Shot-level direction",
        body: "Camera position, movement, lens character and lighting can all be specified in the prompt.",
      },
      {
        title: "Style range",
        body: "Photographic, animated, illustrated or abstract, depending on how you describe the medium.",
      },
      {
        title: "Variant generation",
        body: "Produce several takes of the same described shot and choose the strongest.",
      },
      {
        title: "Pipeline handoff",
        body: "Send selected clips into the video generator to sit alongside your script, voiceover and captions.",
      },
    ],
    audiences: [
      {
        who: "Video editors",
        why: "Fill gaps with a specific clip instead of compromising on whatever stock library happens to have.",
      },
      {
        who: "Agencies pitching",
        why: "Show the idea moving before the shoot is approved.",
      },
      {
        who: "Content creators",
        why: "Produce visual variety without owning a camera.",
      },
      {
        who: "Educators",
        why: "Illustrate abstract concepts that no footage can capture literally.",
      },
    ],
    useCases: [
      {
        title: "Animatic for a pitch",
        body: "Generate one clip per script beat, assemble them with a scratch voiceover, and present the idea as a moving sketch.",
      },
      {
        title: "Background plates",
        body: "Generate slow abstract motion to sit behind typography in a title sequence or quote card.",
      },
      {
        title: "Concept B-roll",
        body: "Cover a metaphor in a talking-head video with three generated beats rather than searching stock for an hour.",
      },
    ],
    tips: [
      "Describe camera behaviour explicitly; it changes the result more than adjectives about mood.",
      "Prefer wide and medium shots. Close-ups of faces expose artefacts fastest.",
      "Do not ask for on-screen text. Add real typography afterwards.",
      "Generate more takes than you need; selection is cheaper than iteration here.",
      "Cut generated clips short. Two seconds of a strong beat beats six seconds of drift.",
    ],
    mistakes: [
      "Trying to depict your specific product or premises, which generation cannot do faithfully.",
      "Writing a story instead of a shot. One clip is one shot.",
      "Building an entire video from generated footage with nothing of your own in it.",
      "Expecting consistent characters across separate clips.",
    ],
    faqs: [
      {
        q: "How long are the generated clips?",
        a: "Short, typically a few seconds each. Longer videos are assembled from several clips in the AI Video Generator rather than generated in one pass.",
      },
      {
        q: "Can I get the same character in multiple clips?",
        a: "Not reliably. Character consistency across separate generations is a known weak point. For a recurring presenter, use an approved still and animate it with image-to-video.",
      },
      {
        q: "Is the footage usable commercially?",
        a: "Yes on paid plans, for your own marketing and products. Avoid prompts referencing trademarked characters, brands or real individuals.",
      },
      {
        q: "Why does my clip look strange in close-up?",
        a: "Close human detail, hands and fine mechanical structure are the hardest things for generative video. Move the camera back and the results improve immediately.",
      },
    ],
    related: [
      "ai-image-to-video",
      "ai-video-generator",
      "video-script-generator",
      "ai-image-generator",
      "tiktok-script-generator",
    ],
  },
  {
    slug: "ai-code-generator",
    name: "AI Code Generator",
    category: "AI Code",
    summary:
      "Generate functions, components, queries and tests, with explanations you can actually review.",
    title: "AI Code Generator: Functions, Tests and Queries | AmmarAI",
    description:
      "Generate working code with explanations: functions, components, SQL, tests and scripts across common languages and frameworks.",
    h1: "Code you can read, review and defend in a pull request",
    lede: "Describe the behaviour you need and get an implementation with the reasoning attached, from a single function to a component, a query or a test suite.",
    ctaLabel: "Generate code",
    popular: true,
    what: [
      "AI Code Generator produces code from a described requirement. It works best at the unit a developer thinks in: a function, a component, a migration, a query, a script, a test file. You state the language, the framework, the inputs and outputs and the edge cases, and it returns an implementation together with an explanation of the choices it made.",
      "The explanation matters more than the code. Generated code that you cannot review is a liability, so the tool is built around producing something legible: named variables, obvious control flow, comments where behaviour is non-obvious, and an honest note when an approach has trade-offs.",
      "It does not know your codebase unless you show it. Paste the surrounding types, the existing helper, the schema or the failing test and the output stops being generic. Without that context you get textbook code that ignores your conventions.",
    ],
    canDo: [
      "Write functions, classes, components and utilities in common languages",
      "Generate SQL queries and schema migrations from a described data need",
      "Produce unit tests, including edge cases you may not have listed",
      "Explain unfamiliar code line by line",
      "Convert code between languages or frameworks",
      "Refactor a working but ugly implementation and say what changed",
      "Draft regular expressions, shell scripts and configuration files",
    ],
    how: [
      {
        title: "Specify like a ticket",
        body: "Language, framework version, inputs, outputs, error behaviour and constraints. \"TypeScript, no dependencies, must handle empty arrays and reject negative input\" produces usable code.",
      },
      {
        title: "Paste real context",
        body: "Include the types, the interface it must satisfy, or the neighbouring function whose style it should match.",
      },
      {
        title: "Ask for tests alongside",
        body: "Generating tests with the implementation surfaces misunderstandings immediately and gives you something to run.",
      },
      {
        title: "Review, then run",
        body: "Read the code before executing it. Check dependencies it introduced, error handling and anything touching data or credentials.",
      },
    ],
    examples: [
      {
        label: "Utility with edge cases",
        input:
          "TypeScript function that groups an array of objects by a key selector, preserves insertion order, returns a Map, no dependencies. Include tests.",
        output:
          "A typed generic implementation using a Map plus a small test file covering empty input, duplicate keys and key collisions on numeric strings.",
      },
      {
        label: "SQL from a question",
        input:
          "Postgres: monthly active users for the last 12 months, counting a user active if they created at least one event. Tables: users(id, created_at), events(id, user_id, created_at).",
        output:
          "A query using date_trunc and a distinct count, with a note about indexing events(user_id, created_at) for performance…",
      },
    ],
    capabilities: [
      {
        title: "Explained output",
        body: "Every generation comes with reasoning, so you can evaluate the approach rather than trusting it.",
      },
      {
        title: "Test generation",
        body: "Ask for tests with the implementation and get coverage of the edge cases you named plus ones you did not.",
      },
      {
        title: "Code explanation",
        body: "Paste unfamiliar code and get a plain-language walkthrough, which is how most people onboard onto a legacy file.",
      },
      {
        title: "Language conversion",
        body: "Translate an implementation into another language while preserving behaviour and flagging what does not map cleanly.",
      },
      {
        title: "Refactoring with a diff summary",
        body: "Improve structure and get a clear statement of what changed and why.",
      },
    ],
    audiences: [
      {
        who: "Developers",
        why: "Skip the boilerplate and spend attention on architecture and correctness.",
      },
      {
        who: "Data analysts",
        why: "Write SQL for questions you can describe precisely but do not want to hand-code.",
      },
      {
        who: "Learners",
        why: "See a working implementation with the reasoning, which teaches more than an answer alone.",
      },
      {
        who: "Technical founders",
        why: "Move faster on internal tooling and scripts that would otherwise never get built.",
      },
    ],
    useCases: [
      {
        title: "Test-first bug fix",
        body: "Paste the failing case, ask for a test that reproduces it, then ask for the fix and check the test passes.",
      },
      {
        title: "Legacy file onboarding",
        body: "Paste an unfamiliar module, get a walkthrough, then ask targeted questions about the parts that look risky.",
      },
      {
        title: "Internal script",
        body: "Describe a one-off data migration or reporting script and get something runnable in minutes rather than an afternoon.",
      },
    ],
    tips: [
      "State the version. Framework APIs change and unversioned prompts produce outdated patterns.",
      "Give it the interface the code must satisfy rather than describing it in prose.",
      "Ask what could go wrong with the generated approach; the answer is often more useful than the code.",
      "Never paste credentials, tokens or customer data into a prompt.",
      "Run generated tests before trusting generated code.",
    ],
    mistakes: [
      "Shipping code you did not read because it looked confident and compiled.",
      "Accepting new dependencies the model introduced without checking whether you need them.",
      "Asking for a whole application in one prompt instead of building it piece by piece.",
      "Assuming the model knows your internal conventions when you never showed it any.",
    ],
    faqs: [
      {
        q: "Which languages does it handle well?",
        a: "Mainstream languages and frameworks are strongest, since they are best represented in training data. Niche or very new frameworks produce weaker, sometimes outdated results, so verify carefully.",
      },
      {
        q: "Is the generated code secure?",
        a: "Treat it as unreviewed code from an unfamiliar contributor. It can produce insecure patterns, especially around input validation, authentication and SQL construction. Review anything touching data or credentials.",
      },
      {
        q: "Can it work with my repository?",
        a: "It works with what you paste. Provide types, schemas and neighbouring code to get output that fits your conventions instead of generic examples.",
      },
      {
        q: "Should I use AI Chat or the code generator?",
        a: "Chat is better for reasoning about an approach or debugging a problem conversationally. The code generator is better for producing an implementation, tests or a query you intend to keep.",
      },
      {
        q: "Does it write tests?",
        a: "Yes, and asking for them alongside the implementation is one of the highest-value habits with this tool.",
      },
    ],
    related: [
      "ai-chat",
      "ai-document-analyzer",
      "ai-writer",
      "ai-vision",
      "ai-summary-generator",
    ],
  },
  {
    slug: "ai-vision",
    name: "AI Vision",
    category: "AI Vision",
    summary:
      "Ask questions about images: describe, extract text, compare, categorise and check what is in the frame.",
    title: "AI Vision: Understand and Question Any Image | AmmarAI",
    description:
      "Upload an image and ask about it. Describe scenes, read text from photos, categorise products and generate alt text.",
    h1: "Point it at an image and ask what is going on",
    lede: "AI Vision reads images the way chat reads text: describe a scene, extract the writing on a label, compare two screenshots, or generate accurate alt text at scale.",
    ctaLabel: "Analyse an image",
    what: [
      "AI Vision is image understanding rather than image creation. You upload a photo, a screenshot, a diagram or a scan and ask questions about it. It can describe what is present, read visible text, identify categories and attributes, compare two images and explain what differs between them.",
      "It differs from the AI Document Analyzer in what it is optimised for. The document analyzer is built for structured documents: contracts, reports, statements, multi-page PDFs where layout, sections and cross-references matter. Vision is built for pictures: product photos, screenshots, whiteboards, receipts, charts, UI captures, anything where the meaning is visual.",
      "It is strong at description, text extraction from reasonably clear images, categorisation and explaining charts. It is weaker at precise counting, exact measurement, fine print on poor scans, and any judgement that depends on knowledge outside the frame.",
    ],
    canDo: [
      "Describe an image in detail, including composition and context",
      "Extract visible text from photos, screenshots and signs",
      "Generate accurate alt text for accessibility at scale",
      "Categorise and tag product images with consistent attributes",
      "Explain a chart, diagram or whiteboard photo in words",
      "Compare two images and articulate what changed",
      "Check images against simple rules, such as whether a logo is present",
    ],
    how: [
      {
        title: "Upload the image",
        body: "Photos, screenshots, scans and diagrams all work. Higher resolution matters most when text extraction is involved.",
      },
      {
        title: "Ask a specific question",
        body: "\"What is the return period stated on this receipt?\" gets a better answer than \"tell me about this image\".",
      },
      {
        title: "Follow up",
        body: "Vision runs inside a conversation, so you can drill into detail without re-uploading.",
      },
      {
        title: "Use the output downstream",
        body: "Send extracted attributes into product copy, or push descriptions into alt text and metadata.",
      },
    ],
    examples: [
      {
        label: "Alt text generation",
        input: "Upload: photo of a woman assembling a bike wheel in a workshop. Task: alt text.",
        output:
          "\"A mechanic in a green apron truing a bicycle wheel on a workstand in a daylit workshop, spoke wrench in hand.\"",
      },
      {
        label: "Chart explanation",
        input:
          "Upload: screenshot of a quarterly revenue bar chart. Question: what is the story here?",
        output:
          "Revenue rose in each of the first three quarters and dipped in Q4. The Q4 decline is roughly the size of the Q2 gain, so the year ends close to where Q3 finished…",
      },
    ],
    capabilities: [
      {
        title: "Scene description",
        body: "Detailed natural-language description of what an image contains, at whatever depth you ask for.",
      },
      {
        title: "Text extraction",
        body: "Pull written content out of photos, screenshots and signage.",
      },
      {
        title: "Attribute tagging",
        body: "Return consistent structured attributes across a batch of product images.",
      },
      {
        title: "Comparison",
        body: "Explain the differences between two versions of a design, a screenshot or a photo.",
      },
      {
        title: "Accessibility support",
        body: "Generate alt text that describes function and content rather than restating the file name.",
      },
    ],
    audiences: [
      {
        who: "E-commerce teams",
        why: "Tag and describe large product image libraries consistently instead of by hand.",
      },
      {
        who: "Accessibility and content teams",
        why: "Produce alt text for an entire image library in a fraction of the time.",
      },
      {
        who: "Support teams",
        why: "Read a customer's screenshot and understand the error before replying.",
      },
      {
        who: "Analysts",
        why: "Get a written reading of a chart or dashboard capture to paste into a report.",
      },
    ],
    useCases: [
      {
        title: "Bulk alt text pass",
        body: "Run the site's image library through vision, generate descriptive alt text, review the edge cases, and publish.",
      },
      {
        title: "Catalogue enrichment",
        body: "Extract colour, material, style and shape from product photos, then feed those attributes into the product description generator.",
      },
      {
        title: "Screenshot triage",
        body: "Have support paste a customer screenshot, extract the visible error text, and route the ticket correctly.",
      },
    ],
    tips: [
      "Ask one question at a time when precision matters; compound questions get compound vagueness.",
      "Upload the highest resolution you have when text extraction is the goal.",
      "For batch work, define the exact output shape you want, such as a fixed list of attributes.",
      "Verify counts and measurements yourself. Approximate quantity judgement is a known weakness.",
      "Write alt text prompts around purpose: what does a reader need to know about this image?",
    ],
    mistakes: [
      "Using it for multi-page structured documents, where the document analyzer is the right tool.",
      "Trusting exact counts of objects in a busy image.",
      "Uploading a blurry photo of small print and treating the extraction as reliable.",
      "Asking about things outside the frame, such as who took the photo or when.",
    ],
    faqs: [
      {
        q: "How is AI Vision different from the AI Document Analyzer?",
        a: "Vision answers questions about pictures: photos, screenshots, diagrams. The document analyzer handles structured multi-page documents where sections, tables and cross-references matter.",
      },
      {
        q: "Can it read text in images?",
        a: "Yes, reliably on clear images. Low-resolution scans, unusual fonts and dense small print reduce accuracy, so verify anything important.",
      },
      {
        q: "Is it good for alt text?",
        a: "It is one of the best uses. Ask for description focused on content and purpose, then review for context only you know.",
      },
      {
        q: "Can it identify people?",
        a: "It will not identify specific individuals. It describes what is visible, such as a person's activity or clothing, without naming them.",
      },
      {
        q: "Can I process many images at once?",
        a: "Batch workflows are supported on higher plans, which is where catalogue tagging and library-wide alt text become practical.",
      },
    ],
    related: [
      "ai-document-analyzer",
      "ai-chat",
      "ai-image-generator",
      "ai-product-description-generator",
      "ai-transcription",
    ],
  },
  {
    slug: "ai-document-analyzer",
    name: "AI Document Analyzer",
    category: "AI Documents",
    summary:
      "Upload long documents and get summaries, answers with citations, and extracted structured data.",
    title: "AI Document Analyzer: Question Long Documents | AmmarAI",
    description:
      "Upload contracts, reports and PDFs. Get summaries, answers with citations and structured data extracted from the text.",
    h1: "Stop reading 60 pages to find the one clause that matters",
    lede: "Upload contracts, research, reports and statements, then ask questions and get answers pointing back to the exact section they came from.",
    ctaLabel: "Analyse a document",
    featured: true,
    what: [
      "AI Document Analyzer is built for structured, lengthy documents. You upload a PDF, a report, a contract, a policy or a spreadsheet, and it reads the whole thing so you can ask questions of it. Crucially, answers cite where they came from, so verification is a click rather than a search.",
      "The distinction from AI Vision is about shape rather than file type. Vision looks at pictures and answers what is in the frame. The document analyzer follows layout and structure across many pages: sections, defined terms, tables, appendices and cross-references. It is the tool for the thirty-page agreement, not the photo of a receipt.",
      "Practical strengths are summarisation, targeted question answering, comparison between two versions, and pulling structured data out of prose. The honest weakness is that it is an aid to reading, not a substitute for professional judgement. It does not give legal, medical or financial advice, and consequential decisions still need a qualified human reading the source.",
    ],
    canDo: [
      "Summarise a long document at a chosen level of detail",
      "Answer specific questions with citations to the source section",
      "Extract structured data such as dates, parties, amounts and obligations",
      "Compare two versions of a document and list what changed",
      "Flag unusual or missing clauses relative to what you asked it to look for",
      "Translate or explain dense technical language in plain terms",
      "Work across a set of documents at once and answer across all of them",
    ],
    how: [
      {
        title: "Upload the document set",
        body: "One file or several. Text-based PDFs work best; scanned images are read but with lower fidelity on small print.",
      },
      {
        title: "Start with a structural summary",
        body: "Ask what the document covers and how it is organised. That orientation makes your later questions much sharper.",
      },
      {
        title: "Ask targeted questions",
        body: "Name the thing you care about: notice periods, payment terms, exclusions, assumptions, sample size. Follow the citations.",
      },
      {
        title: "Extract what you need",
        body: "Request a table of the key fields, then paste it into your own system of record.",
      },
    ],
    examples: [
      {
        label: "Contract review prep",
        input:
          "Upload: 41-page service agreement. Question: list every obligation with a deadline attached, and cite the clause.",
        output:
          "A table of eleven obligations with clause references, including two the reader had missed in the schedules…",
      },
      {
        label: "Research triage",
        input:
          "Upload: six academic PDFs. Question: which of these use a sample smaller than 100, and what do they measure?",
        output:
          "Three of the six, with sample sizes and outcome measures listed alongside the page each was found on.",
      },
    ],
    capabilities: [
      {
        title: "Cited answers",
        body: "Every answer points at the section it came from, so you can verify rather than trust.",
      },
      {
        title: "Multi-document questioning",
        body: "Ask one question across a folder of documents and get a consolidated answer.",
      },
      {
        title: "Structured extraction",
        body: "Turn prose into a table of fields you can use elsewhere.",
      },
      {
        title: "Version comparison",
        body: "Identify substantive differences between two drafts, not just textual diffs.",
      },
      {
        title: "Plain-language explanation",
        body: "Rewrite dense passages so a non-specialist can understand what they commit to.",
      },
    ],
    audiences: [
      {
        who: "Operations and procurement",
        why: "Get through supplier agreements and policies fast enough to keep the process moving.",
      },
      {
        who: "Researchers and students",
        why: "Triage a reading pile and find the papers that actually address the question.",
      },
      {
        who: "Finance teams",
        why: "Pull recurring figures and terms out of statements and contracts without manual re-keying.",
      },
      {
        who: "Founders",
        why: "Understand an agreement well enough to ask your lawyer the right questions.",
      },
    ],
    useCases: [
      {
        title: "Pre-legal contract read",
        body: "Summarise the agreement, extract obligations and unusual terms, and send your lawyer a focused list instead of the whole file.",
      },
      {
        title: "Literature review",
        body: "Upload the paper set, extract method, sample and finding for each into a comparison table, then read the three that matter in full.",
      },
      {
        title: "Policy rollout",
        body: "Turn a long internal policy into a plain-language summary and an FAQ that people will actually read.",
      },
    ],
    tips: [
      "Ask for the citation every time. An answer without a source is a hypothesis.",
      "Upload text-based PDFs rather than photographs of pages where you can.",
      "Ask what the document does not say. Missing terms are often the risk.",
      "For extraction, specify the exact fields and format you want returned.",
      "Read the clauses that matter yourself once you have found them.",
    ],
    mistakes: [
      "Treating a summary as a substitute for reading a legally binding clause.",
      "Uploading a poor scan and trusting numbers pulled from small print.",
      "Asking vague questions of a long document and getting a vague answer back.",
      "Uploading confidential material without checking your organisation's policy on doing so.",
    ],
    faqs: [
      {
        q: "What file types can I upload?",
        a: "Common document formats including PDF, Word documents, plain text and spreadsheets. Text-based files produce the most reliable results; scans depend on image quality.",
      },
      {
        q: "How long can a document be?",
        a: "Long documents are supported, with page and size limits set by your plan. Very large sets are best analysed in logical groups.",
      },
      {
        q: "Does it cite its answers?",
        a: "Yes, answers reference the section they came from so you can verify quickly. Always follow the citation on anything consequential.",
      },
      {
        q: "Can it give legal or financial advice?",
        a: "No. It helps you read and understand documents faster and prepare better questions. Decisions with legal or financial consequences need a qualified professional.",
      },
      {
        q: "Can it compare two contracts?",
        a: "Yes. Upload both and ask what differs substantively, which surfaces meaning changes rather than only textual edits.",
      },
    ],
    related: [
      "ai-vision",
      "ai-summary-generator",
      "ai-chat",
      "ai-transcription",
      "ai-writer",
    ],
  },
  {
    slug: "ai-article-generator",
    name: "AI Article Generator",
    category: "AI Writing",
    summary:
      "Produce full, structured articles built around a topic and a search intent, headings included.",
    title: "AI Article Generator: Full Structured Articles | AmmarAI",
    description:
      "Generate complete articles with a real structure: outline, headings, examples and a meta description you can edit.",
    h1: "A complete article, structured before it is written",
    lede: "Give it a topic and an audience and get a full article with a defensible structure, headings, examples and a meta description ready to edit.",
    ctaLabel: "Generate an article",
    featured: true,
    popular: true,
    what: [
      "The AI Article Generator produces long-form articles end to end. Unlike an open writing surface, it works structurally: it establishes what question the article answers, builds an outline with headings that match how people actually search, then writes each section against that plan. The result is a piece with a spine rather than a thousand words of pleasant drift.",
      "It sits between two neighbours. AI Writer is the open editor you use when the format is undefined. The AI Blog Generator is tuned for the conventions of blog publishing, including a personal register and a content calendar workflow. The article generator is for the substantial reference piece: the guide, the explainer, the comparison, the how-to that has to answer the question completely.",
      "It gives you a strong draft, not a finished publication. The examples need to become your examples, the claims need checking, and the parts only you know from doing the work are what will make the piece worth reading.",
    ],
    canDo: [
      "Generate a full article from a topic, audience and intent",
      "Produce an editable outline before committing to prose",
      "Write with a logical H2 and H3 hierarchy",
      "Include worked examples, comparisons and step sequences",
      "Draft a meta description and title options alongside the body",
      "Suggest internal links to related pieces you already have",
      "Adjust depth and length section by section",
    ],
    how: [
      {
        title: "Define the question the article answers",
        body: "A single clear question produces a coherent article. \"How should a small e-commerce team choose between flat-rate and calculated shipping?\" beats \"shipping\".",
      },
      {
        title: "Approve the outline",
        body: "Read the proposed headings and fix the structure first. Every structural problem you leave in the outline gets multiplied in the draft.",
      },
      {
        title: "Generate section by section",
        body: "Write the piece in parts so you can keep the good sections and rework the weak ones without regenerating everything.",
      },
      {
        title: "Add what only you have",
        body: "Insert your own examples, numbers, screenshots and hard-won caveats. This is the difference between a page worth publishing and one that is not.",
      },
      {
        title: "Finish the metadata",
        body: "Edit the generated title and meta description so they promise exactly what the page delivers.",
      },
    ],
    examples: [
      {
        label: "Comparison guide",
        input:
          "Topic: flat-rate vs calculated shipping for small stores. Audience: owner-operators shipping under 200 orders a month. Intent: decide.",
        output:
          "An outline covering how each model works, cost behaviour at low volume, the effect on cart abandonment, when to switch, and a decision checklist, followed by the drafted sections.",
      },
      {
        label: "How-to",
        input: "Topic: setting up a weekly content review. Audience: two-person marketing teams.",
        output:
          "A step-structured article with a worked weekly schedule, the three meetings that are worth keeping, and the failure modes of each…",
      },
    ],
    capabilities: [
      {
        title: "Outline-first workflow",
        body: "Structure is agreed before prose is written, which is where article quality is actually decided.",
      },
      {
        title: "Intent alignment",
        body: "The format follows the intent: comparisons get tables, how-tos get steps, definitions get clear explanation.",
      },
      {
        title: "Metadata generation",
        body: "Title options and a meta description are produced with the article rather than as an afterthought.",
      },
      {
        title: "Internal link suggestions",
        body: "Recommends where to link to related pieces using descriptive anchor text.",
      },
      {
        title: "Section-level regeneration",
        body: "Rework a single section without disturbing the rest of the article.",
      },
    ],
    audiences: [
      {
        who: "Content marketers",
        why: "Produce the substantial pieces that carry a content programme, faster.",
      },
      {
        who: "Solo founders",
        why: "Publish a real guide about your domain without losing a full day to it.",
      },
      {
        who: "Agencies",
        why: "Get a consistent structural baseline across writers and clients.",
      },
      {
        who: "Subject experts",
        why: "Get the scaffolding written so your attention goes into the parts only you can write.",
      },
    ],
    useCases: [
      {
        title: "Pillar page production",
        body: "Generate the comprehensive guide, add your own data and screenshots, then link out to the narrower pieces around it.",
      },
      {
        title: "Refreshing an old article",
        body: "Feed in the existing piece, generate a better structure, and rebuild it around what has changed since publication.",
      },
      {
        title: "Turning a talk into an article",
        body: "Paste the transcript, ask for an article structure that keeps the argument, and edit it into a written register.",
      },
    ],
    tips: [
      "Fix the outline properly. Ten minutes there saves an hour of rewriting.",
      "Name the audience precisely; \"marketers\" and \"two-person B2B marketing teams\" produce very different articles.",
      "Replace generic examples with your own before publishing. Generic examples are the clearest tell of unedited output.",
      "Cut ruthlessly. Most generated drafts are twenty percent longer than the argument requires.",
      "Verify every statistic, quotation and product claim.",
    ],
    mistakes: [
      "Publishing the draft unedited, which produces a page nobody would miss if it vanished.",
      "Chasing a word count rather than answering the question completely.",
      "Generating dozens of near-identical articles on the same topic with different keywords.",
      "Skipping the meta description and letting search engines invent one.",
    ],
    faqs: [
      {
        q: "How long are the generated articles?",
        a: "Typically 1,000 to 2,500 words depending on the topic, and you can set the target. Length should follow the question, not the other way around.",
      },
      {
        q: "Will the content be original?",
        a: "The text is generated rather than copied, but generated writing is only as distinctive as the input. Adding your own examples and experience is what makes a page genuinely original.",
      },
      {
        q: "Is this different from the AI Blog Generator?",
        a: "Yes. The blog generator is tuned for blog conventions and a publishing cadence. The article generator is aimed at substantial reference pieces with a fuller structure.",
      },
      {
        q: "Can it write about my niche?",
        a: "It can structure and draft almost any topic, but depth in a specialist niche comes from the context you provide. Feed it your notes, docs and data.",
      },
      {
        q: "Does it help with SEO?",
        a: "It helps with structure, coverage and metadata, which are within your control. No tool can promise rankings, and any that does is not being straight with you.",
      },
    ],
    related: [
      "ai-blog-generator",
      "ai-rewriter",
      "meta-description-generator",
      "faq-generator",
      "ai-writer",
    ],
  },
  {
    slug: "ai-rewriter",
    name: "AI Rewriter",
    category: "AI Writing",
    summary:
      "Rework existing text: change tone, tighten, simplify or restructure while keeping the meaning.",
    title: "AI Rewriter: Rework Text Without Losing Meaning | AmmarAI",
    description:
      "Rewrite existing text to change tone, length, clarity or structure while keeping the original meaning intact.",
    h1: "You already wrote it. This makes it better.",
    lede: "Paste text that is nearly right and rework it: shorter, clearer, warmer, more formal, better structured, without losing what it actually said.",
    ctaLabel: "Rewrite text",
    popular: true,
    what: [
      "AI Rewriter starts from text that already exists. You paste it, say what should change, and get a version that keeps the meaning while altering tone, length, complexity or structure. Because the source carries the facts, rewriting is usually more reliable than generating from scratch: there is less room for the model to invent things.",
      "The library has several rewriting tools and they are genuinely different. AI Rewriter is the general-purpose one for any text and any goal. The AI Content Rewriter is aimed at marketing content and repurposing across channels. The SEO Content Rewriter is aimed at published pages where search intent and internal structure need to be preserved. Start here when the job is simply making a piece of writing better.",
      "One thing it will not do is launder someone else's work. Rewriting a competitor's article to avoid plagiarism detection is still copying the substance, and it produces a page with nothing of your own in it. Rewrite your own material, or material you have the right to use.",
    ],
    canDo: [
      "Shorten text to a target length without dropping key points",
      "Shift register between formal, plain, warm, technical or persuasive",
      "Simplify dense writing for a non-specialist reader",
      "Restructure a rambling passage into a clear sequence",
      "Remove hedging, jargon and filler",
      "Adapt one piece for a different audience or channel",
      "Improve rhythm and sentence variety in text that reads flat",
    ],
    how: [
      {
        title: "Paste the source",
        body: "Bring in the paragraph, section or full document you want reworked. More context produces better decisions about what to keep.",
      },
      {
        title: "Say what should change and what must not",
        body: "\"Half the length, keep every number and the warning about data loss, plainer language\" is a rewriting brief. \"Make it better\" is not.",
      },
      {
        title: "Compare against the original",
        body: "Read the two side by side and check that nothing important quietly disappeared. Compression is where meaning gets lost.",
      },
      {
        title: "Iterate on the parts that missed",
        body: "Rewrite individual passages again rather than accepting a whole-document version that is eighty percent right.",
      },
    ],
    examples: [
      {
        label: "Simplify for a general reader",
        input:
          "Rewrite for a non-technical customer: 'Authentication tokens are invalidated upon credential rotation, necessitating re-authentication across active sessions.'",
        output:
          "When you change your password, everyone signed in on your account gets signed out and will need to log in again.",
      },
      {
        label: "Compress a section",
        input: "Cut this 380-word update to 150 words. Keep both dates and the migration warning.",
        output:
          "A 148-word version retaining both dates and the warning, with the background paragraph and the repeated apology removed.",
      },
    ],
    capabilities: [
      {
        title: "Meaning preservation",
        body: "Rewrites work from your source, so facts and specifics stay anchored to what you wrote.",
      },
      {
        title: "Targeted length control",
        body: "Compress or expand to a specific target while protecting the content you flag as essential.",
      },
      {
        title: "Register shifting",
        body: "Change formality and warmth without rewriting the substance underneath.",
      },
      {
        title: "Structural rework",
        body: "Reorder an argument into a sequence a reader can follow.",
      },
      {
        title: "Side-by-side review",
        body: "Compare the original and the rewrite so nothing important is lost silently.",
      },
    ],
    audiences: [
      {
        who: "Editors",
        why: "Handle a first pass on tone and length so human editing goes to substance.",
      },
      {
        who: "Support and product teams",
        why: "Turn internally written explanations into something a customer will understand.",
      },
      {
        who: "Non-native English writers",
        why: "Keep your own argument and ideas while smoothing phrasing and rhythm.",
      },
      {
        who: "Marketers",
        why: "Adapt one strong piece for different audiences without rewriting from zero.",
      },
    ],
    useCases: [
      {
        title: "Internal doc to customer doc",
        body: "Take the engineering-written explanation, rewrite it for customers, and check that no internal detail leaked through.",
      },
      {
        title: "Cutting to fit",
        body: "Compress an approved 800-word piece into the 300 words the newsletter slot allows, protecting the specifics.",
      },
      {
        title: "Tone repair",
        body: "Rework a reply that reads defensive into one that reads accountable, without changing the facts of what happened.",
      },
    ],
    tips: [
      "State explicitly what must survive the rewrite. Numbers, names and warnings are the usual casualties.",
      "Rewrite in sections for long documents; whole-document rewrites drift.",
      "Ask for two versions with different degrees of change and pick between them.",
      "Read the rewrite aloud. Awkward rhythm is easier to hear than to see.",
      "Keep the original. You will sometimes want to go back.",
    ],
    mistakes: [
      "Rewriting someone else's article and treating the result as your own content.",
      "Compressing aggressively without checking which details vanished.",
      "Running the same text through repeated rewrites until all the specificity is gone.",
      "Using a rewrite to hide that the underlying argument is weak.",
    ],
    faqs: [
      {
        q: "Does rewriting change the meaning?",
        a: "It should not, and it usually does not, but compression is the risky operation. Always compare against the source and flag the details that must survive.",
      },
      {
        q: "How is this different from the AI Content Rewriter?",
        a: "AI Rewriter is general purpose for any text and any goal. The AI Content Rewriter focuses on marketing content and repurposing a piece across channels and formats.",
      },
      {
        q: "Can I use it to avoid plagiarism?",
        a: "No, and you should not try. Rewording someone else's work is still using their work. Rewrite material you wrote or have the right to use.",
      },
      {
        q: "Will it fix grammar too?",
        a: "Yes as a side effect, though the AI Grammar Checker is the better tool when correctness is the only thing you want changed.",
      },
      {
        q: "Can it rewrite in another language?",
        a: "Yes, it can rework and translate at the same time, keeping the structure of the original intact.",
      },
    ],
    related: [
      "ai-content-rewriter",
      "seo-content-rewriter",
      "ai-tone-changer",
      "ai-grammar-checker",
      "ai-summary-generator",
    ],
  },
];
