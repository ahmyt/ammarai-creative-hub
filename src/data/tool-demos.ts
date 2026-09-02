import avatarDemo from "@/assets/demo-avatar-video.mp4.asset.json";
import avatarDemo2 from "@/assets/demo-avatar-video-2.mp4.asset.json";
import imageToVideoDemo from "@/assets/demo-image-to-video.mp4.asset.json";
import imageToVideoDemo2 from "@/assets/demo-image-to-video-2.mp4.asset.json";
import textToVideoDemo from "@/assets/demo-text-to-video.mp4.asset.json";
import textToVideoDemo2 from "@/assets/demo-text-to-video-2.mp4.asset.json";
import videoGeneratorDemo from "@/assets/demo-video-generator.mp4.asset.json";
import videoGeneratorDemo2 from "@/assets/demo-video-generator-2.mp4.asset.json";
import sourceSneaker from "@/assets/i2v-source-sneaker.jpg";
import sourceMountains from "@/assets/i2v-source-mountains.jpg";

export type ToolDemoVideo = {
  url: string;
  caption: string;
  /** Optional source still shown alongside the prompt (image-led tools). */
  inputImage?: string;
  inputImageAlt?: string;
};

/**
 * Tools whose real output is a video. One clip per example, in the same order as
 * the tool's `examples` array, so each tab shows output matching its own prompt.
 */
export const toolDemoVideos: Record<string, ToolDemoVideo[]> = {
  "ai-avatar-generator": [
    {
      url: avatarDemo.url,
      caption: "Sample output — a founder headshot delivering the launch announcement with AI lip-sync.",
    },
    {
      url: avatarDemo2.url,
      caption: "Sample output — a template presenter re-voiced for a localised course lesson.",
    },
  ],
  "ai-image-to-video": [
    {
      url: imageToVideoDemo.url,
      caption: "Sample output — the uploaded product still lifted into a rotating hero shot with light sweeps and drifting smoke.",
      inputImage: sourceSneaker,
      inputImageAlt: "Source still: a matte black sneaker lit with amber and teal studio light",
    },
    {
      url: imageToVideoDemo2.url,
      caption: "Sample output — the same sunrise photo turned into a drifting aerial with real parallax between ridges.",
      inputImage: sourceMountains,
      inputImageAlt: "Source still: snow-capped mountain ridges at golden sunrise",
    },
  ],
  "ai-text-to-video": [
    {
      url: textToVideoDemo.url,
      caption: "Sample output — a macro gold-splash beauty shot generated from the prompt alone.",
    },
    {
      url: textToVideoDemo2.url,
      caption: "Sample output — a neon hyperlapse through rain-slick Tokyo streets, no footage required.",
    },
  ],
  "ai-video-generator": [
    {
      url: videoGeneratorDemo.url,
      caption: "Sample output — a vertical product explainer cut from the written brief.",
    },
    {
      url: videoGeneratorDemo2.url,
      caption: "Sample output — a punchy ad cut with kinetic captions, ready to run as a paid variant.",
    },
  ],
};
