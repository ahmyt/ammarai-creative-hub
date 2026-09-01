import avatarDemo from "@/assets/demo-avatar-video.mp4.asset.json";
import imageToVideoDemo from "@/assets/demo-image-to-video.mp4.asset.json";
import textToVideoDemo from "@/assets/demo-text-to-video.mp4.asset.json";
import videoGeneratorDemo from "@/assets/demo-video-generator.mp4.asset.json";

export type ToolDemoVideo = { url: string; caption: string };

/** Tools whose real output is a video: the animated example renders a clip, not streamed text. */
export const toolDemoVideos: Record<string, ToolDemoVideo> = {
  "ai-avatar-generator": {
    url: avatarDemo.url,
    caption: "Sample output — a talking avatar rendered from a script with AI lip-sync.",
  },
  "ai-image-to-video": {
    url: imageToVideoDemo.url,
    caption: "Sample output — a still product photo animated with motion and camera movement.",
  },
  "ai-text-to-video": {
    url: textToVideoDemo.url,
    caption: "Sample output — a cinematic clip generated straight from a text prompt.",
  },
  "ai-video-generator": {
    url: videoGeneratorDemo.url,
    caption: "Sample output — a short product spot generated from a written brief.",
  },
};
