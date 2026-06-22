import type { CaseModule } from "@/lib/types";

export const caseModules: CaseModule[] = [
  {
    type: "full",
    media: "/media/MTP-website.mp4",
    caption: "MTPX docs and AI-OS visuals anchor the current project archive.",
  },
  {
    type: "textMedia",
    align: "left",
    title: "Agent systems, shown with their moving parts.",
    body:
      "The strongest public projects center on AI systems that connect models to tools, memory, code execution, browsers, providers, sessions, and realtime interfaces.",
    media: "/media/aetheria-ai-chatUI.png",
  },
  {
    type: "pair",
    left: "/media/image copy 2.png",
    right: "/media/image copy 7.png",
    caption: "Public builds range from product websites to protocol and runtime experiments.",
  },
  {
    type: "quote",
    quote:
      "The portfolio keeps polished launches and learning repos in the same archive, but explains them at the scale their public evidence supports.",
  },
  {
    type: "stats",
    items: [
      { value: "27", label: "public GitHub repos" },
      { value: "2022", label: "GitHub account created" },
      { value: "AI-OS", label: "current center of gravity" },
    ],
  },
];
