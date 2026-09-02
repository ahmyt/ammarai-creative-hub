import avatarDemo from "@/assets/demo-avatar-video.mp4.asset.json";
import avatarDemo2 from "@/assets/demo-avatar-video-2.mp4.asset.json";
import imageToVideoDemo from "@/assets/demo-image-to-video.mp4.asset.json";
import imageToVideoDemo2 from "@/assets/demo-image-to-video-2.mp4.asset.json";
import textToVideoDemo from "@/assets/demo-text-to-video.mp4.asset.json";
import textToVideoDemo2 from "@/assets/demo-text-to-video-2.mp4.asset.json";
import videoGeneratorDemo from "@/assets/demo-video-generator.mp4.asset.json";
import videoGeneratorDemo2 from "@/assets/demo-video-generator-2.mp4.asset.json";
import voiceAdRead from "@/assets/demo-voice-ad-read.mp3.asset.json";
import voiceCourse from "@/assets/demo-voice-course.mp3.asset.json";
import ttsArticle from "@/assets/demo-tts-article.mp3.asset.json";
import ttsStudy from "@/assets/demo-tts-study.mp3.asset.json";
import sttDictation from "@/assets/demo-stt-dictation.mp3.asset.json";
import sttMemo from "@/assets/demo-stt-memo.mp3.asset.json";
import transcriptionInterview from "@/assets/demo-transcription-interview.mp3.asset.json";
import transcriptionWalkthrough from "@/assets/demo-transcription-walkthrough.mp3.asset.json";
import sourceSneaker from "@/assets/i2v-source-sneaker.jpg";
import sourceMountains from "@/assets/i2v-source-mountains.jpg";
import imageOutWorkbench from "@/assets/imggen-out-workbench.jpg";
import imageOutCyclist from "@/assets/imggen-out-cyclist.jpg";
import visionBikeWheel from "@/assets/vision-in-bike-wheel.jpg";
import visionRevenueChart from "@/assets/vision-in-revenue-chart.jpg";

export type ToolDemoMedia = {
  /** Output media kind. Omit for tools whose real output is text. */
  kind?: "video" | "audio" | "image";
  /** Output media URL (video, audio or image). Omit for text output. */
  url?: string;
  caption?: string;
  /** Optional source still shown alongside the prompt (image-led tools). */
  inputImage?: string;
  inputImageAlt?: string;
  /** Optional source recording shown alongside the prompt (audio-led tools). */
  inputAudio?: string;
  inputAudioLabel?: string;
  /** Optional attached-file chip shown alongside the prompt (document tools). */
  inputFileLabel?: string;
};

/**
 * Sample media per tool, one entry per example in the same order as the tool's
 * `examples` array, so each tab shows input and output matching its own prompt.
 */
export const toolDemoMedia: Record<string, ToolDemoMedia[]> = {
  "ai-avatar-generator": [
    {
      kind: "video",
      url: avatarDemo.url,
      caption: "Sample output — a founder headshot delivering the launch announcement with AI lip-sync.",
    },
    {
      kind: "video",
      url: avatarDemo2.url,
      caption: "Sample output — a template presenter re-voiced for a localised course lesson.",
    },
  ],
  "ai-image-to-video": [
    {
      kind: "video",
      url: imageToVideoDemo.url,
      caption: "Sample output — the uploaded product still lifted into a rotating hero shot with light sweeps and drifting smoke.",
      inputImage: sourceSneaker,
      inputImageAlt: "Source still: a matte black sneaker lit with amber and teal studio light",
    },
    {
      kind: "video",
      url: imageToVideoDemo2.url,
      caption: "Sample output — the same sunrise photo turned into a drifting aerial with real parallax between ridges.",
      inputImage: sourceMountains,
      inputImageAlt: "Source still: snow-capped mountain ridges at golden sunrise",
    },
  ],
  "ai-text-to-video": [
    {
      kind: "video",
      url: textToVideoDemo.url,
      caption: "Sample output — a macro gold-splash beauty shot generated from the prompt alone.",
    },
    {
      kind: "video",
      url: textToVideoDemo2.url,
      caption: "Sample output — a neon hyperlapse through rain-slick Tokyo streets, no footage required.",
    },
  ],
  "ai-video-generator": [
    {
      kind: "video",
      url: videoGeneratorDemo.url,
      caption: "Sample output — a vertical product explainer cut from the written brief.",
    },
    {
      kind: "video",
      url: videoGeneratorDemo2.url,
      caption: "Sample output — a punchy ad cut with kinetic captions, ready to run as a paid variant.",
    },
  ],
  "ai-voice-generator": [
    {
      kind: "audio",
      url: voiceAdRead.url,
      caption: "Sample output — the ad read with a natural beat before the second line and emphasis on \"cash-flow\".",
    },
    {
      kind: "audio",
      url: voiceCourse.url,
      caption: "Sample output — a calm lesson narration at a slower pace with the pronunciation correction applied.",
    },
  ],
  "ai-text-to-speech": [
    {
      kind: "audio",
      url: ttsArticle.url,
      caption: "Sample output — the opening of the article's audio version, with a clean break at the section heading.",
    },
    {
      kind: "audio",
      url: ttsStudy.url,
      caption: "Sample output — revision audio at a slightly slower pace with acronyms spoken out.",
    },
  ],
  "ai-speech-to-text": [
    {
      inputAudio: sttDictation.url,
      inputAudioLabel: "dictation-q4-priorities.mp3",
    },
    {
      inputAudio: sttMemo.url,
      inputAudioLabel: "voice-memo-walk.mp3",
    },
  ],
  "ai-transcription": [
    {
      inputAudio: transcriptionInterview.url,
      inputAudioLabel: "customer-interview.mp3",
    },
    {
      inputAudio: transcriptionWalkthrough.url,
      inputAudioLabel: "product-walkthrough.mp3",
    },
  ],
  "ai-image-generator": [
    {
      kind: "image",
      url: imageOutWorkbench,
      caption: "Sample output — a wide 16:9 editorial header in a warm, matte photographic style, usable without cropping.",
    },
    {
      kind: "image",
      url: imageOutCyclist,
      caption: "Sample output — a 4:5 concept scene with negative space in the lower third for a caption.",
    },
  ],
  "ai-vision": [
    {
      inputImage: visionBikeWheel,
      inputImageAlt: "Uploaded photo: a mechanic in a green apron truing a bicycle wheel on a workstand",
    },
    {
      inputImage: visionRevenueChart,
      inputImageAlt: "Uploaded screenshot: a quarterly revenue bar chart rising through Q3 then dipping in Q4",
    },
  ],
  "ai-document-analyzer": [
    { inputFileLabel: "service-agreement.pdf — 41 pages" },
    { inputFileLabel: "6 research PDFs — 148 pages total" },
  ],
};

/** @deprecated use `toolDemoMedia` */
export const toolDemoVideos = toolDemoMedia;
