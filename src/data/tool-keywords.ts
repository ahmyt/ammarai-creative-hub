/**
 * Pre-researched Semrush keyword data for each AmmarAI tool.
 * Used by the daily blog writer to ground OpenAI prompts in real search data.
 *
 * Research date: September 2026. Database: US.
 * To refresh: re-run Semrush keyword research for each tool and update this file.
 */

export interface RelatedKeyword {
  keyword: string;
  volume: number;
}

export interface ToolKeywords {
  /** The highest-volume relevant search term for this tool. */
  primaryKeyword: string;
  /** Monthly search volume for the primary keyword (US). */
  searchVolume: number;
  /** Semrush keyword difficulty score (0-100). */
  difficulty: number;
  /** Related keywords people search for alongside the primary term. */
  relatedKeywords: RelatedKeyword[];
  /** Question-form search queries related to this tool. */
  questions: string[];
}

export const toolKeywords: Record<string, ToolKeywords> = {
  "ai-writer": {
    primaryKeyword: "ai writer",
    searchVolume: 33100,
    difficulty: 85,
    relatedKeywords: [
      { keyword: "ai text generator", volume: 33100 },
      { keyword: "ai writing assistant", volume: 12100 },
      { keyword: "ai for writing", volume: 12100 },
      { keyword: "ai-powered writing assistant", volume: 9900 },
      { keyword: "help me write", volume: 9900 },
      { keyword: "ai write", volume: 8100 },
    ],
    questions: [
      "how to prompt ai to write like a human",
      "what ai model writes stories",
      "what makes an essay written by ai detectable",
      "how to write a thesis with ai",
      "did ai write this",
    ],
  },

  "ai-chat": {
    primaryKeyword: "ai chatbot",
    searchVolume: 90500,
    difficulty: 95,
    relatedKeywords: [
      { keyword: "chatbot", volume: 40500 },
      { keyword: "ai powered chatbot platform", volume: 60500 },
      { keyword: "ai chat bot", volume: 22200 },
      { keyword: "chatbot ai", volume: 22200 },
    ],
    questions: [
      "what is an ai chatbot",
      "what is the best ai chatbot",
      "how to create an ai chatbot",
      "how to make an ai chatbot",
      "how to build an ai chatbot agent",
    ],
  },

  "ai-image-generator": {
    primaryKeyword: "ai image generator",
    searchVolume: 823000,
    difficulty: 93,
    relatedKeywords: [
      { keyword: "ai generator", volume: 201000 },
      { keyword: "ai photo generator", volume: 165000 },
      { keyword: "ai picture generator", volume: 110000 },
      { keyword: "free ai image generator", volume: 110000 },
      { keyword: "ai photo", volume: 165000 },
    ],
    questions: [
      "what is the best ai image generator",
      "how to generate ai images",
      "how to tell if an image is ai generated",
      "what ai can generate images",
      "is this image ai generated",
    ],
  },

  "ai-video-generator": {
    primaryKeyword: "ai video generator",
    searchVolume: 165000,
    difficulty: 91,
    relatedKeywords: [
      { keyword: "free ai video generator", volume: 74000 },
      { keyword: "ai video maker", volume: 27100 },
      { keyword: "image to video ai", volume: 27100 },
      { keyword: "ai video", volume: 22200 },
      { keyword: "best ai video generator", volume: 14800 },
      { keyword: "ai video generation models", volume: 14800 },
    ],
    questions: [
      "what is the best ai video generator",
      "how to generate ai videos",
      "how to make ai generated videos",
      "are there any free ai video generators",
      "how to create video from images using ai",
    ],
  },

  "ai-voice-generator": {
    primaryKeyword: "ai voice generator",
    searchVolume: 74000,
    difficulty: 79,
    relatedKeywords: [
      { keyword: "ai voice", volume: 27100 },
      { keyword: "voice clone", volume: 33100 },
      { keyword: "ai voiceover", volume: 18100 },
      { keyword: "text to speech free", volume: 27100 },
    ],
    questions: [
      "what is the best ai voice generator",
      "how to generate ai voice",
      "how to tell if a voice is ai generated",
      "how to add ai generated voice to video",
      "how to detect ai generated voice",
    ],
  },

  "ai-text-to-speech": {
    primaryKeyword: "text to speech ai",
    searchVolume: 12100,
    difficulty: 86,
    relatedKeywords: [
      { keyword: "text to speech", volume: 246000 },
      { keyword: "tts", volume: 33100 },
      { keyword: "ai voice generator", volume: 74000 },
      { keyword: "text to speech free", volume: 27100 },
    ],
    questions: [
      "is text to speech ai",
      "is text to speech generative ai",
      "does text to speech use ai",
      "does speech to text use ai",
      "are text to speech voices ai",
    ],
  },

  "ai-speech-to-text": {
    primaryKeyword: "speech to text",
    searchVolume: 27100,
    difficulty: 86,
    relatedKeywords: [
      { keyword: "transcription", volume: 33100 },
      { keyword: "transcribe", volume: 22200 },
      { keyword: "voice to text", volume: 18100 },
      { keyword: "dictate", volume: 18100 },
      { keyword: "dictation", volume: 14800 },
      { keyword: "transcribe audio to text", volume: 18100 },
    ],
    questions: [
      "how to use text to speech",
      "what is text to speech",
      "how to do speech to text on google docs",
      "how to turn on text to speech",
      "is there a google extension for text to speech",
    ],
  },

  "ai-transcription": {
    primaryKeyword: "audio transcription",
    searchVolume: 12100,
    difficulty: 70,
    relatedKeywords: [
      { keyword: "transcription", volume: 33100 },
      { keyword: "transcribe", volume: 22200 },
      { keyword: "transcribe audio to text", volume: 18100 },
      { keyword: "voice to text", volume: 18100 },
      { keyword: "audio to text transcription", volume: 14800 },
    ],
    questions: [
      "how to get audio transcript from voice memo",
      "what is audio transcription",
      "how to transcript an audio file",
      "how to create a transcript from an audio file",
      "what does an audio transcript look like",
    ],
  },

  "ai-avatar-generator": {
    primaryKeyword: "ai avatar generator",
    searchVolume: 3600,
    difficulty: 69,
    relatedKeywords: [
      { keyword: "avatar maker", volume: 8100 },
      { keyword: "avatar creator", volume: 5400 },
      { keyword: "ai avatar", volume: 4400 },
      { keyword: "free avatar maker", volume: 2400 },
      { keyword: "generator avatar", volume: 6600 },
    ],
    questions: [
      "what is the best ai avatar generator",
      "how to generate ai avatar",
      "is there any free ai avatar generator",
      "which ai avatar generator offers the best value for money",
      "what features does an ai avatar generator have",
    ],
  },

  "ai-image-to-video": {
    primaryKeyword: "image to video ai",
    searchVolume: 27100,
    difficulty: 71,
    relatedKeywords: [
      { keyword: "image to video", volume: 18100 },
      { keyword: "ai video generator", volume: 165000 },
      { keyword: "ai video maker", volume: 27100 },
      { keyword: "ai image to video", volume: 12100 },
    ],
    questions: [
      "how to create video from images using ai",
      "what is the best image to video ai generator",
      "what is ai image to video technology",
      "are there any free ai image to video generators",
      "how do image to video ai generators work",
    ],
  },

  "ai-text-to-video": {
    primaryKeyword: "text to video ai",
    searchVolume: 8100,
    difficulty: 76,
    relatedKeywords: [
      { keyword: "ai video generator", volume: 165000 },
      { keyword: "free ai video generator", volume: 74000 },
      { keyword: "ai video maker", volume: 27100 },
      { keyword: "ai video", volume: 22200 },
    ],
    questions: [
      "how to convert text into video using ai",
      "what is the best text to video ai generator",
      "what is the best free text to video ai generator",
      "how to create ai videos from text",
      "what are the differences between text-to-video and image-to-video ai models",
    ],
  },

  "ai-code-generator": {
    primaryKeyword: "ai code generator",
    searchVolume: 4400,
    difficulty: 64,
    relatedKeywords: [
      { keyword: "ai coding assistant", volume: 9900 },
      { keyword: "best ai for coding", volume: 9900 },
      { keyword: "coding ai", volume: 9900 },
      { keyword: "ai code assistant", volume: 8100 },
      { keyword: "ai coding", volume: 8100 },
    ],
    questions: [
      "how to check if code is ai generated",
      "what is ai code generation",
      "what can developers do with ai code generators",
      "what makes an effective ai code generator",
      "how to detect ai generated code",
    ],
  },

  "ai-vision": {
    primaryKeyword: "ai image analysis",
    searchVolume: 480,
    difficulty: 45,
    relatedKeywords: [
      { keyword: "ai scanner", volume: 40500 },
      { keyword: "ai image detector", volume: 33100 },
      { keyword: "document ai", volume: 1600 },
      { keyword: "ai document", volume: 1900 },
    ],
    questions: [
      "what is the best ai for image analysis",
      "which ai is best for image analysis",
      "which ai model is best for image analysis",
      "which ai domain focuses on visual recognition and image analysis",
      "what ai is best for image analysis",
    ],
  },

  "ai-document-analyzer": {
    primaryKeyword: "ai document analysis",
    searchVolume: 880,
    difficulty: 24,
    relatedKeywords: [
      { keyword: "document ai", volume: 1600 },
      { keyword: "ai document", volume: 1900 },
      { keyword: "google document ai", volume: 1900 },
      { keyword: "ai business documents analysis", volume: 1600 },
    ],
    questions: [
      "how does ai work for legal document analysis",
      "how ai works for legal document analysis",
      "how can businesses test ai document analysis before enterprise deployment",
      "how ai enhances document editing and analysis tools",
      "how does ai-powered document analysis work for businesses",
    ],
  },

  "ai-article-generator": {
    primaryKeyword: "ai article generator",
    searchVolume: 480,
    difficulty: 60,
    relatedKeywords: [
      { keyword: "ai text generator", volume: 33100 },
      { keyword: "ai writer", volume: 33100 },
      { keyword: "ai writing", volume: 18100 },
      { keyword: "ai writing assistant", volume: 12100 },
      { keyword: "ai for writing", volume: 12100 },
    ],
    questions: [
      "how can you tell if an article is ai generated",
      "how to check if an article is ai generated",
      "how to know if an article is ai generated",
      "how to tell if an article is ai generated",
      "is my article ai generated",
    ],
  },

  "ai-rewriter": {
    primaryKeyword: "ai rewriter",
    searchVolume: 49500,
    difficulty: 78,
    relatedKeywords: [
      { keyword: "paraphrase tool", volume: 135000 },
      { keyword: "paraphrasing tool", volume: 90500 },
      { keyword: "paraphraser", volume: 49500 },
      { keyword: "rewrite", volume: 60500 },
      { keyword: "sentence rewriter", volume: 40500 },
    ],
    questions: [
      "how to rewrite ai generated text",
      "can ai rewrite my resume",
      "do ai rewriters work",
      "how to rewrite text to avoid ai detection",
      "can ai rewrite this for me",
    ],
  },

  "ai-seo-analyzer": {
    primaryKeyword: "seo analyzer",
    searchVolume: 5400,
    difficulty: 89,
    relatedKeywords: [
      { keyword: "seo tools", volume: 550000 },
      { keyword: "seo audit", volume: 22200 },
      { keyword: "website checker", volume: 22200 },
      { keyword: "seo checker", volume: 14800 },
      { keyword: "free seo tools", volume: 14800 },
    ],
    questions: [
      "how to analyze keywords for seo",
      "how to analyze website for seo",
      "how to analyze seo data",
      "how to analyze a website for seo",
      "how to analyze a website for seo purposes",
    ],
  },

  "ai-plagiarism-detector": {
    primaryKeyword: "plagiarism checker",
    searchVolume: 823000,
    difficulty: 100,
    relatedKeywords: [
      { keyword: "turnitin", volume: 301000 },
      { keyword: "grammarly ai checker", volume: 110000 },
      { keyword: "copyleaks", volume: 49500 },
      { keyword: "grammarly ai detector", volume: 49500 },
      { keyword: "turnitin ai checker", volume: 74000 },
    ],
    questions: [
      "how to check for plagiarism",
      "how to check a paper for plagiarism",
      "how to check a document for plagiarism",
      "how to check plagiarism for free",
      "how to check your paper for plagiarism",
    ],
  },

  "external-chatbot": {
    primaryKeyword: "chatbot builder",
    searchVolume: 1900,
    difficulty: 54,
    relatedKeywords: [
      { keyword: "ai chatbot", volume: 90500 },
      { keyword: "ai powered chatbot platform", volume: 60500 },
      { keyword: "chatbot", volume: 40500 },
      { keyword: "ai chat bot", volume: 22200 },
    ],
    questions: [
      "how to build a chatbot",
      "how to build an ai chatbot",
      "how much does it cost to build a chatbot",
      "how to build ai chatbot",
      "how to build an ai chatbot from scratch",
    ],
  },

  "ai-presentation-maker": {
    primaryKeyword: "ai presentation generator",
    searchVolume: 1000,
    difficulty: 70,
    relatedKeywords: [
      { keyword: "ai presentation maker", volume: 12100 },
      { keyword: "gamma", volume: 165000 },
      { keyword: "gamma ai", volume: 90500 },
      { keyword: "canva slideshow", volume: 9900 },
    ],
    questions: [
      "what ai tool can generate powerpoint presentation for free",
      "what ai can generate a powerpoint presentation",
      "how to generate powerpoint presentation using ai",
      "can ai generate a powerpoint presentation",
      "which ai can generate a powerpoint presentation",
    ],
  },

  "ai-url-to-video": {
    primaryKeyword: "url to video ai",
    searchVolume: 720,
    difficulty: 24,
    relatedKeywords: [
      { keyword: "ai video generator", volume: 165000 },
      { keyword: "ai video maker", volume: 27100 },
      { keyword: "ai video", volume: 22200 },
      { keyword: "ai image to video", volume: 12100 },
      { keyword: "videographer ai", volume: 14800 },
    ],
    questions: [
      "how to create video from images using ai",
      "what is the best ai video generator",
      "how to generate ai videos",
      "are there any free ai video generators",
      "how to make ai generated videos",
    ],
  },

  "sound-studio": {
    primaryKeyword: "audio editor online",
    searchVolume: 3600,
    difficulty: 78,
    relatedKeywords: [
      { keyword: "audio editing", volume: 450000 },
      { keyword: "audacity", volume: 201000 },
      { keyword: "audio editor", volume: 22200 },
      { keyword: "audio trimmer", volume: 14800 },
      { keyword: "mp3 cutter", volume: 14800 },
    ],
    questions: [
      "how to use an online audio editor for quick edits",
      "how to edit audio online",
      "how to trim audio files",
      "how to merge audio files",
      "how to add background music to voiceover",
    ],
  },

  "ai-music-generator": {
    primaryKeyword: "ai music generator",
    searchVolume: 60500,
    difficulty: 84,
    relatedKeywords: [
      { keyword: "music maker", volume: 74000 },
      { keyword: "song maker", volume: 74000 },
      { keyword: "ai song generator", volume: 40500 },
      { keyword: "make music", volume: 49500 },
      { keyword: "suno ai music generator", volume: 27100 },
    ],
    questions: [
      "how to tell if music is ai generated",
      "what is the best ai music generator",
      "how to make ai generated music",
      "what is ai generated music",
      "how does ai music generation work",
    ],
  },

  "ai-chat-bots": {
    primaryKeyword: "ai chatbot",
    searchVolume: 90500,
    difficulty: 95,
    relatedKeywords: [
      { keyword: "ai powered chatbot platform", volume: 60500 },
      { keyword: "chatbot", volume: 40500 },
      { keyword: "ai chat bot", volume: 22200 },
      { keyword: "chatbot ai", volume: 22200 },
    ],
    questions: [
      "what is an ai chatbot",
      "what is the best ai chatbot",
      "how to create an ai chatbot",
      "how to make an ai chatbot",
      "how to build an ai chatbot agent",
    ],
  },

  "ai-blog-generator": {
    primaryKeyword: "ai blog generator",
    searchVolume: 390,
    difficulty: 46,
    relatedKeywords: [
      { keyword: "blog generator", volume: 1900 },
      { keyword: "blog title generator", volume: 1600 },
      { keyword: "ai blog writer", volume: 1300 },
      { keyword: "topic generator", volume: 2400 },
      { keyword: "idea generator", volume: 4400 },
    ],
    questions: [
      "how to generate high-quality blog posts using ai tools",
      "how to schedule and publish ai-generated blog content",
      "how ai helps generate quality blog content",
      "does hubspot ai generate full blog posts",
      "how to humanize ai generated content for blogs",
    ],
  },

  "ai-blog-title-generator": {
    primaryKeyword: "blog title generator",
    searchVolume: 1600,
    difficulty: 56,
    relatedKeywords: [
      { keyword: "title generator", volume: 14800 },
      { keyword: "ai title generator", volume: 2900 },
      { keyword: "title maker", volume: 3600 },
      { keyword: "topic generator", volume: 2400 },
      { keyword: "title ideas", volume: 2400 },
    ],
    questions: [
      "how to generate catchy blog titles",
      "how to generate titles for blogs",
      "how to create a blog title generator gpt",
      "what is the best blog title generator",
      "how to write engaging blog titles",
    ],
  },

  "ai-blog-intro-generator": {
    primaryKeyword: "blog intro generator",
    searchVolume: 20,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "blog generator", volume: 1900 },
      { keyword: "ai blog writer", volume: 1300 },
      { keyword: "ai blog generator", volume: 390 },
    ],
    questions: [
      "how to write a blog intro",
      "how to write an engaging opening paragraph",
      "how to hook readers in a blog post",
      "what makes a good blog introduction",
      "how to start a blog post",
    ],
  },

  "ai-blog-conclusion-generator": {
    primaryKeyword: "blog conclusion generator",
    searchVolume: 20,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "blog generator", volume: 1900 },
      { keyword: "ai blog writer", volume: 1300 },
      { keyword: "ai blog generator", volume: 390 },
    ],
    questions: [
      "how to write a blog conclusion",
      "how to end a blog post",
      "how to write a call to action in a blog",
      "what makes a good blog conclusion",
      "how to wrap up a blog post",
    ],
  },

  "ai-content-rewriter": {
    primaryKeyword: "ai content rewriter",
    searchVolume: 90,
    difficulty: 64,
    relatedKeywords: [
      { keyword: "ai rewriter", volume: 49500 },
      { keyword: "sentence rewriter", volume: 40500 },
      { keyword: "paragraph rewriter", volume: 27100 },
      { keyword: "rewrite ai", volume: 22200 },
      { keyword: "rewriter", volume: 18100 },
      { keyword: "rewrite paragraph", volume: 14800 },
    ],
    questions: [
      "how to rewrite ai content",
      "how to rewrite ai generated content",
      "how to use ai rewriters for blog content refresh",
      "can ai rewrite content for better seo",
      "how to refresh blog content using ai rewriters",
    ],
  },

  "ai-paragraph-generator": {
    primaryKeyword: "ai paragraph generator",
    searchVolume: 22200,
    difficulty: 69,
    relatedKeywords: [
      { keyword: "ai text generator", volume: 33100 },
      { keyword: "paragraph generator", volume: 22200 },
      { keyword: "ai sentence generator", volume: 9900 },
      { keyword: "ai text", volume: 8100 },
      { keyword: "ai generator text", volume: 14800 },
    ],
    questions: [
      "is this paragraph ai generated",
      "how to tell if a paragraph is ai generated",
      "how to generate a paragraph with ai",
      "what is the best ai paragraph generator",
      "can ai write a paragraph for me",
    ],
  },

  "ai-summary-generator": {
    primaryKeyword: "ai summary generator",
    searchVolume: 1600,
    difficulty: 74,
    relatedKeywords: [
      { keyword: "summarize", volume: 49500 },
      { keyword: "summarizer", volume: 33100 },
      { keyword: "ai summarizer", volume: 22200 },
      { keyword: "summarize ai", volume: 9900 },
      { keyword: "summarization", volume: 12100 },
    ],
    questions: [
      "how accurate are ai-generated summaries compared to human summaries",
      "how to generate ai summary of teams meeting",
      "how to generate ai meeting summary from transcript",
      "how to improve content visibility in ai-generated summaries",
      "why is my brand missing from ai-generated summaries",
    ],
  },

  "ai-email-generator": {
    primaryKeyword: "ai email generator",
    searchVolume: 14800,
    difficulty: 68,
    relatedKeywords: [
      { keyword: "ai email writer", volume: 5400 },
      { keyword: "ai email", volume: 6600 },
      { keyword: "email ai", volume: 4400 },
      { keyword: "ai email generator free", volume: 3600 },
      { keyword: "email writer", volume: 3600 },
    ],
    questions: [
      "how to tell if an email is ai generated",
      "how to identify ai-generated phishing emails",
      "can you tell if an email is ai generated",
      "how to write an email with ai",
      "what is the best ai email generator",
    ],
  },

  "ai-cold-email-generator": {
    primaryKeyword: "cold email generator",
    searchVolume: 260,
    difficulty: 19,
    relatedKeywords: [
      { keyword: "email writer", volume: 3600 },
      { keyword: "ai cold email generator", volume: 210 },
      { keyword: "ai email personalization", volume: 210 },
      { keyword: "mailmeteor ai email writer", volume: 720 },
    ],
    questions: [
      "how to generate leads using cold email",
      "can ai write effective cold emails for b2b lead generation",
      "how to use cold email for lead generation",
      "how to write a cold email",
      "what is the best cold email generator",
    ],
  },

  "ai-follow-up-email-generator": {
    primaryKeyword: "follow up email",
    searchVolume: 3600,
    difficulty: 52,
    relatedKeywords: [
      { keyword: "follow up email after interview", volume: 8100 },
      { keyword: "follow up email to sales call", volume: 5400 },
      { keyword: "interview follow up email", volume: 5400 },
      { keyword: "sales follow up email", volume: 1900 },
      { keyword: "how to follow up after an interview", volume: 1900 },
    ],
    questions: [
      "how to write a follow up email",
      "how to send a follow up email",
      "how to write a follow up email after an interview",
      "how to send a follow up email after no response",
      "how to follow up on an email",
    ],
  },

  "ai-email-subject-line-generator": {
    primaryKeyword: "email subject line generator",
    searchVolume: 720,
    difficulty: 33,
    relatedKeywords: [
      { keyword: "email subject line", volume: 1300 },
      { keyword: "subject line email", volume: 880 },
      { keyword: "best eblast subject lines", volume: 720 },
      { keyword: "email subject", volume: 720 },
      { keyword: "playful subject line generator", volume: 2400 },
    ],
    questions: [
      "how to generate email subject lines",
      "what makes a good email subject line",
      "how to write subject lines that get opened",
      "how to create an email subject line generator gpt",
      "what is the best email subject line generator",
    ],
  },

  "ai-press-release-generator": {
    primaryKeyword: "press release generator",
    searchVolume: 110,
    difficulty: 19,
    relatedKeywords: [
      { keyword: "ai press release generator", volume: 320 },
      { keyword: "press release writer", volume: 260 },
      { keyword: "ai press release", volume: 210 },
      { keyword: "how to create a press release", volume: 110 },
      { keyword: "ai press release distribution", volume: 90 },
    ],
    questions: [
      "how to improve press release visibility in generative search",
      "how to create a press release",
      "how to write a press release with ai",
      "what is the best ai press release generator",
      "how to optimize press release for generative engine optimization",
    ],
  },

  "ai-company-bio-generator": {
    primaryKeyword: "company bio generator",
    searchVolume: 20,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai writer", volume: 33100 },
      { keyword: "company bio", volume: 1300 },
      { keyword: "professional bio generator", volume: 720 },
    ],
    questions: [
      "how to write a company bio",
      "how to write a professional company bio",
      "what is a company bio",
      "how to write a bio for a business website",
      "how to create a company bio for a pitch deck",
    ],
  },

  "ai-business-name-generator": {
    primaryKeyword: "business name generator",
    searchVolume: 40500,
    difficulty: 89,
    relatedKeywords: [
      { keyword: "name generator", volume: 165000 },
      { keyword: "company name generator", volume: 9900 },
      { keyword: "name ideas", volume: 9900 },
      { keyword: "namelix", volume: 12100 },
      { keyword: "company name", volume: 8100 },
    ],
    questions: [
      "how to generate a name for a business",
      "how to generate a business name",
      "how to come up with a business name",
      "how to create a business name generator",
      "how to generate a unique business name",
    ],
  },

  "ai-story-generator": {
    primaryKeyword: "ai story generator",
    searchVolume: 74000,
    difficulty: 79,
    relatedKeywords: [
      { keyword: "story generator", volume: 18100 },
      { keyword: "ai writer", volume: 33100 },
      { keyword: "perchance ai story generator", volume: 14800 },
      { keyword: "ai write", volume: 8100 },
      { keyword: "writing ai", volume: 6600 },
    ],
    questions: [
      "what ai websites can generate stories from scenarios",
      "what is the best ai story generator",
      "how to generate ai stories",
      "how to generate stories with ai",
      "are ai generated stories copyrighted",
    ],
  },

  "ai-essay-writer": {
    primaryKeyword: "ai essay writer",
    searchVolume: 9900,
    difficulty: 79,
    relatedKeywords: [
      { keyword: "ai writer", volume: 33100 },
      { keyword: "essay writer", volume: 27100 },
      { keyword: "ai writing", volume: 18100 },
      { keyword: "write my essay", volume: 9900 },
      { keyword: "how to write an essay", volume: 12100 },
    ],
    questions: [
      "can any ai write a 10 page essay",
      "what is the best ai to write essays",
      "how many students use ai to write essays",
      "how to write an essay with ai",
      "what ai writes the best essays",
    ],
  },

  "ai-grammar-checker": {
    primaryKeyword: "grammar checker",
    searchVolume: 450000,
    difficulty: 98,
    relatedKeywords: [
      { keyword: "grammar check", volume: 823000 },
      { keyword: "spell check", volume: 673000 },
      { keyword: "grammar", volume: 90500 },
      { keyword: "spell checker", volume: 40500 },
      { keyword: "grammer check", volume: 40500 },
    ],
    questions: [
      "how to check grammar",
      "how to check grammar on google docs",
      "how to check grammar in word",
      "how to do grammar check in word",
      "how to turn off grammar check in word",
    ],
  },

  "ai-text-extender": {
    primaryKeyword: "ai text expander",
    searchVolume: 260,
    difficulty: 36,
    relatedKeywords: [
      { keyword: "text expander", volume: 5400 },
      { keyword: "ai paragraph", volume: 6600 },
      { keyword: "paragraph ai", volume: 4400 },
      { keyword: "write me a paragraph", volume: 4400 },
      { keyword: "make it longer", volume: 2900 },
      { keyword: "paragraph maker", volume: 2400 },
    ],
    questions: [
      "how to expand text with ai",
      "how to make text longer with ai",
      "what is the best ai text expander",
      "how to extend a paragraph with ai",
      "can ai make my text longer",
    ],
  },

  "ai-tone-changer": {
    primaryKeyword: "ai tone changer",
    searchVolume: 20,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai rewriter", volume: 49500 },
      { keyword: "rewrite ai", volume: 22200 },
      { keyword: "ai tone changer tool", volume: 20 },
    ],
    questions: [
      "how to change the tone of text with ai",
      "how to rewrite text in a different tone",
      "what is the best ai tone changer",
      "how to make text sound more professional with ai",
      "how to change text from formal to casual",
    ],
  },

  "ai-ad-generator": {
    primaryKeyword: "ad copy generator",
    searchVolume: 390,
    difficulty: 41,
    relatedKeywords: [
      { keyword: "ad copy", volume: 1000 },
      { keyword: "ad copywriting", volume: 390 },
      { keyword: "google ads ad generator", volume: 590 },
      { keyword: "google ad preview tool", volume: 1300 },
    ],
    questions: [
      "how can ai-generated ad copy improve campaign efficiency",
      "is ai generated ad copy better",
      "how to generate copy for ads",
      "what is the best ai ad copy generator",
      "how to write ad copy with ai",
    ],
  },

  "facebook-ad-generator": {
    primaryKeyword: "facebook ad generator",
    searchVolume: 260,
    difficulty: 42,
    relatedKeywords: [
      { keyword: "facebook ad", volume: 6600 },
      { keyword: "how to advertise on facebook", volume: 2900 },
      { keyword: "best ai tools for facebook instagram ad creatives", volume: 2400 },
      { keyword: "fb ad", volume: 1900 },
    ],
    questions: [
      "how ai facebook ad generators work",
      "how to create a lead generation ad on facebook",
      "how to generate leads from facebook ads",
      "how to write facebook ad copy with ai",
      "how to use ai for facebook ads",
    ],
  },

  "google-ads-generator": {
    primaryKeyword: "google ads generator",
    searchVolume: 210,
    difficulty: 35,
    relatedKeywords: [
      { keyword: "google ads", volume: 33100 },
      { keyword: "google adwords", volume: 27100 },
      { keyword: "google ad", volume: 22200 },
      { keyword: "google ads login", volume: 22200 },
    ],
    questions: [
      "how does google ads generate responsive search ads",
      "what is demand generation google ads",
      "how to generate google ads",
      "how to generate leads through google ads",
      "how to use google ads for lead generation",
    ],
  },

  "linkedin-ad-generator": {
    primaryKeyword: "linkedin ad generator",
    searchVolume: 70,
    difficulty: 20,
    relatedKeywords: [
      { keyword: "linkedin ads", volume: 9900 },
      { keyword: "advertisement in linkedin", volume: 3600 },
      { keyword: "linkedin ads agency", volume: 1900 },
      { keyword: "linkedin ads manager", volume: 1900 },
      { keyword: "ad maker", volume: 1000 },
    ],
    questions: [
      "how do linkedin ads support lead generation",
      "how to use video ads on linkedin for lead generation",
      "how to scale linkedin ads for lead generation",
      "how to write linkedin ad copy with ai",
      "how to generate linkedin ad copy",
    ],
  },

  "instagram-caption-generator": {
    primaryKeyword: "instagram caption generator",
    searchVolume: 6600,
    difficulty: 46,
    relatedKeywords: [
      { keyword: "caption", volume: 18100 },
      { keyword: "instagram captions", volume: 14800 },
      { keyword: "caption generator", volume: 6600 },
      { keyword: "ai caption generator", volume: 5400 },
      { keyword: "captions ai", volume: 4400 },
    ],
    questions: [
      "can instagram generate captions",
      "does instagram auto generate captions",
      "how to auto generate captions on instagram",
      "how to auto generate captions on instagram reels",
      "how to write instagram captions with ai",
    ],
  },

  "instagram-hashtag-generator": {
    primaryKeyword: "instagram hashtag generator",
    searchVolume: 1900,
    difficulty: 74,
    relatedKeywords: [
      { keyword: "hashtag", volume: 40500 },
      { keyword: "hashtag generator", volume: 6600 },
      { keyword: "hashtags", volume: 6600 },
      { keyword: "best hashtags for instagram", volume: 5400 },
      { keyword: "hashtagai", volume: 22200 },
    ],
    questions: [
      "how to generate hashtags for instagram",
      "can ai generate hashtags for instagram",
      "how to find the best hashtags for instagram",
      "how to generate the best hashtags for instagram",
      "what is the best instagram hashtag generator",
    ],
  },

  "social-media-post-generator": {
    primaryKeyword: "social media post generator",
    searchVolume: 1000,
    difficulty: 59,
    relatedKeywords: [
      { keyword: "ai social media", volume: 3600 },
      { keyword: "social media post", volume: 2900 },
      { keyword: "instagram post", volume: 18100 },
      { keyword: "how to make a post on instagram", volume: 2400 },
    ],
    questions: [
      "what percentage of social media posts are ai generated",
      "do ai-generated posts perform well on social media",
      "how to generate images for social media posts",
      "can ai generate social media posts automatically",
      "how to create social media posts with ai",
    ],
  },

  "youtube-description-generator": {
    primaryKeyword: "youtube description generator",
    searchVolume: 2900,
    difficulty: 42,
    relatedKeywords: [
      { keyword: "ai description generator", volume: 2400 },
      { keyword: "description generator", volume: 2400 },
      { keyword: "product description generator", volume: 1600 },
      { keyword: "youtube description", volume: 1000 },
    ],
    questions: [
      "how to ai-generate youtube descriptions and titles",
      "how to write youtube descriptions with ai",
      "what is the best youtube description generator",
      "how to optimize youtube descriptions for search",
      "how to generate youtube video descriptions",
    ],
  },

  "youtube-title-generator": {
    primaryKeyword: "youtube title generator",
    searchVolume: 2400,
    difficulty: 31,
    relatedKeywords: [
      { keyword: "title generator", volume: 14800 },
      { keyword: "youtube seo title generator", volume: 5400 },
      { keyword: "ai title generator", volume: 2900 },
      { keyword: "gaming title generator", volume: 1900 },
      { keyword: "blog title generator", volume: 1600 },
    ],
    questions: [
      "how to generate youtube titles",
      "how to ai-generate youtube titles",
      "what is the best youtube title generator",
      "how to write click-worthy youtube titles",
      "how to generate youtube titles with ai",
    ],
  },

  "youtube-tag-generator": {
    primaryKeyword: "youtube tags generator",
    searchVolume: 1900,
    difficulty: 32,
    relatedKeywords: [
      { keyword: "youtube keyword tool", volume: 12100 },
      { keyword: "youtube keywords", volume: 5400 },
      { keyword: "youtube tag generator", volume: 4400 },
      { keyword: "youtube keyword research", volume: 4400 },
      { keyword: "rapid tags", volume: 3600 },
    ],
    questions: [
      "how to generate tags for youtube videos",
      "how to generate youtube tags",
      "what is the best youtube tag generator",
      "how to find the best tags for youtube",
      "how to use youtube tags for seo",
    ],
  },

  "tiktok-script-generator": {
    primaryKeyword: "tiktok script generator",
    searchVolume: 720,
    difficulty: 24,
    relatedKeywords: [
      { keyword: "tiktok transcript", volume: 6600 },
      { keyword: "tokscript", volume: 3600 },
      { keyword: "tiktok transcript generator", volume: 2400 },
      { keyword: "tiktok transcripts", volume: 1900 },
      { keyword: "tiktok video transcript", volume: 1600 },
    ],
    questions: [
      "how to generate tiktok video from script",
      "how to write a tiktok script",
      "what is the best tiktok script generator",
      "how to write tiktok scripts with ai",
      "how to generate tiktok video ideas",
    ],
  },

  "video-script-generator": {
    primaryKeyword: "video script generator",
    searchVolume: 720,
    difficulty: 64,
    relatedKeywords: [
      { keyword: "transcript generator", volume: 9900 },
      { keyword: "video transcription", volume: 9900 },
      { keyword: "transcribe video to text", volume: 9900 },
      { keyword: "capcut ai video generator", volume: 9900 },
    ],
    questions: [
      "how to generate script from youtube video",
      "how to generate script from video",
      "how to generate video from script",
      "how to write a video script with ai",
      "how to generate a script from a video",
    ],
  },

  "newsletter-generator": {
    primaryKeyword: "newsletter generator",
    searchVolume: 210,
    difficulty: 46,
    relatedKeywords: [
      { keyword: "ai newsletter", volume: 2400 },
      { keyword: "email newsletter", volume: 2900 },
      { keyword: "canva newsletter", volume: 2400 },
      { keyword: "free newsletter", volume: 3600 },
      { keyword: "easy newsletter", volume: 2900 },
    ],
    questions: [
      "how to automate newsletter generation with ai",
      "how to generate a newsletter",
      "how to write a newsletter with ai",
      "what is the best ai newsletter generator",
      "how to create an email newsletter with ai",
    ],
  },

  "ai-product-description-generator": {
    primaryKeyword: "product description generator",
    searchVolume: 1600,
    difficulty: 39,
    relatedKeywords: [
      { keyword: "ai description generator", volume: 2400 },
      { keyword: "description generator", volume: 2400 },
      { keyword: "product description", volume: 1600 },
      { keyword: "ai product description generator", volume: 1000 },
    ],
    questions: [
      "can ai generate product video from app description",
      "how to generate product descriptions at scale",
      "how to write product descriptions with ai",
      "can chatgpt generate product descriptions",
      "how to generate ecommerce product descriptions with ai",
    ],
  },

  "amazon-product-description-generator": {
    primaryKeyword: "amazon product description",
    searchVolume: 260,
    difficulty: 28,
    relatedKeywords: [
      { keyword: "amazon product listing", volume: 1000 },
      { keyword: "amazon product page", volume: 390 },
      { keyword: "amazon listing optimization", volume: 1600 },
      { keyword: "amazon naming", volume: 720 },
      { keyword: "amazon product detail page", volume: 320 },
    ],
    questions: [
      "how to write engaging amazon product description",
      "can you use html in amazon product description",
      "how to add bullet points to amazon product description",
      "how to write amazon product descriptions",
      "how to optimize amazon product listings",
    ],
  },

  "amazon-product-title-generator": {
    primaryKeyword: "amazon product title",
    searchVolume: 50,
    difficulty: 24,
    relatedKeywords: [
      { keyword: "amazon listing optimization", volume: 1600 },
      { keyword: "amazon product listing", volume: 1000 },
      { keyword: "seo friendly product title best practices", volume: 2400 },
      { keyword: "amazon naming", volume: 720 },
    ],
    questions: [
      "how to write amazon product title",
      "how to optimize your amazon product title",
      "how to write product title for amazon",
      "how to write engaging amazon product titles",
      "what are best practices for amazon product titles",
    ],
  },

  "product-benefits-generator": {
    primaryKeyword: "product benefits generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "product description generator", volume: 1600 },
      { keyword: "product description", volume: 1600 },
      { keyword: "ai product description generator", volume: 1000 },
    ],
    questions: [
      "how to write product benefits",
      "how to translate features into benefits",
      "what are product benefits vs features",
      "how to write product benefits with ai",
      "how to highlight product benefits in copy",
    ],
  },

  "product-features-generator": {
    primaryKeyword: "product features generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "product description generator", volume: 1600 },
      { keyword: "product description", volume: 1600 },
      { keyword: "ai product description generator", volume: 1000 },
    ],
    questions: [
      "how to write product features",
      "how to describe product features clearly",
      "what are product features vs benefits",
      "how to write product features with ai",
      "how to organize product features in copy",
    ],
  },

  "product-comparison-generator": {
    primaryKeyword: "product comparison generator",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "product description generator", volume: 1600 },
      { keyword: "product comparison", volume: 1900 },
    ],
    questions: [
      "how to write a product comparison",
      "how to create a product comparison table",
      "how to compare products for buyers",
      "how to write product comparisons with ai",
      "what is the best product comparison format",
    ],
  },

  "ai-seo-content-generator": {
    primaryKeyword: "seo content generator",
    searchVolume: 260,
    difficulty: 73,
    relatedKeywords: [
      { keyword: "ai seo", volume: 9900 },
      { keyword: "blog seo", volume: 6600 },
      { keyword: "seo content writing", volume: 6600 },
      { keyword: "seo writing", volume: 4400 },
      { keyword: "ai for seo", volume: 3600 },
    ],
    questions: [
      "is ai generated content good for seo",
      "does ai generated content hurt seo",
      "does ai generated content affect seo",
      "how to generate seo content with ai",
      "does ai generated content impact seo",
    ],
  },

  "meta-description-generator": {
    primaryKeyword: "meta description generator",
    searchVolume: 1300,
    difficulty: 39,
    relatedKeywords: [
      { keyword: "meta description", volume: 8100 },
      { keyword: "seo title", volume: 5400 },
      { keyword: "seo description", volume: 2400 },
      { keyword: "ai description generator", volume: 2400 },
      { keyword: "meta description seo", volume: 1300 },
      { keyword: "generate seo", volume: 1300 },
    ],
    questions: [
      "how to generate meta description",
      "does google auto generate meta description if missing",
      "how to write meta descriptions with ai",
      "what is the best meta description generator",
      "how to write seo meta descriptions",
    ],
  },

  "faq-generator": {
    primaryKeyword: "faq generator",
    searchVolume: 140,
    difficulty: 25,
    relatedKeywords: [
      { keyword: "expertsfaq", volume: 1600 },
      { keyword: "expert faq ai", volume: 320 },
      { keyword: "expertsfaq com ai", volume: 480 },
      { keyword: "expertfaq", volume: 210 },
    ],
    questions: [
      "how to generate faq schema automatically",
      "how to generate faqs for a website",
      "how to write faqs with ai",
      "what is the best faq generator",
      "how to create faq content",
    ],
  },

  "seo-blog-generator": {
    primaryKeyword: "seo blog generator",
    searchVolume: 20,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai blog generator", volume: 390 },
      { keyword: "blog generator", volume: 1900 },
      { keyword: "ai blog writer", volume: 1300 },
    ],
    questions: [
      "how to edit ai-generated blog content for seo",
      "does hubspot ai blog generator create seo optimized content",
      "how to write seo blog posts with ai",
      "what is the best seo blog generator",
      "how to generate seo-optimized blog posts",
    ],
  },

  "seo-content-rewriter": {
    primaryKeyword: "seo content rewriter",
    searchVolume: 20,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai rewriter", volume: 49500 },
      { keyword: "ai content rewriter", volume: 90 },
      { keyword: "rewrite ai", volume: 22200 },
    ],
    questions: [
      "can ai rewrite content for better seo",
      "how to rewrite content for seo",
      "how to refresh blog content for seo",
      "do seo companies rewrite your content",
      "how to use ai to rewrite content for seo",
    ],
  },

  "keyword-based-rewriter": {
    primaryKeyword: "keyword based rewriter",
    searchVolume: 0,
    difficulty: 0,
    relatedKeywords: [
      { keyword: "ai rewriter", volume: 49500 },
      { keyword: "paraphrase tool", volume: 135000 },
      { keyword: "paraphrasing tool", volume: 90500 },
    ],
    questions: [
      "how to rewrite content with target keywords",
      "how to add keywords to existing content",
      "how to rewrite content for seo keywords",
      "how to naturally incorporate keywords in content",
      "what is keyword-based rewriting",
    ],
  },
};

/** Look up keyword data for a tool slug. Returns undefined if not found. */
export function getToolKeywords(slug: string): ToolKeywords | undefined {
  return toolKeywords[slug];
}
