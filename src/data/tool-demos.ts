import avatarDemo from "@/assets/demo-avatar-video.mp4.asset.json";
import avatarDemo2 from "@/assets/demo-avatar-video-2.mp4.asset.json";
import imageToVideoDemo from "@/assets/demo-image-to-video.mp4.asset.json";
import imageToVideoDemo2 from "@/assets/demo-image-to-video-2.mp4.asset.json";
import textToVideoDemo from "@/assets/demo-text-to-video.mp4.asset.json";
import textToVideoDemo2 from "@/assets/demo-text-to-video-2.mp4.asset.json";
import videoGeneratorDemo from "@/assets/demo-video-generator.mp4.asset.json";
import videoGeneratorDemo2 from "@/assets/demo-video-generator-2.mp4.asset.json";

export type ToolDemoVideo = { url: string; caption: string };

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
      caption: "Sample output — a still mug photo animated with a slow push in and rising steam.",
    },
    {
      url: imageToVideoDemo2.url,
      caption: "Sample output — a coastal still drifting sideways with parallax depth.",
    },
  ],
  "ai-text-to-video": [
    {
      url: textToVideoDemo.url,
      caption: "Sample output — rain on a city window at night, generated from the prompt.",
    },
    {
      url: textToVideoDemo2.url,
      caption: "Sample output — coloured sand pouring into three containers, slow motion.",
    },
  ],
  "ai-video-generator": [
    {
      url: videoGeneratorDemo.url,
      caption: "Sample output — a vertical product explainer cut from the written brief.",
    },
    {
      url: videoGeneratorDemo2.url,
      caption: "Sample output — three alternate opening hooks exported as ad variants.",
    },
  ],
};
