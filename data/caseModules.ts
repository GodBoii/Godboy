import type { CaseModule } from "@/lib/types";

export const caseModules: CaseModule[] = [
  {
    type: "full",
    media: "/media/MTP-website.mp4",
    caption: "Product motion as proof, not decoration.",
  },
  {
    type: "textMedia",
    align: "left",
    title: "A runtime without the maze.",
    body:
      "The interface turns a dense stack of agents, memory, tools, and models into a clear product surface with direct paths for developers and builders.",
    media: "/media/aetheria-ai-chatUI.png",
  },
  {
    type: "pair",
    left: "/media/image copy 2.png",
    right: "/media/image copy 7.png",
    caption: "Wide product views alternate with intimate interface fragments.",
  },
  {
    type: "quote",
    quote:
      "No vendor maze, no theatrical AI wrapper. Just a cleaner path from intent to tools, memory, and autonomous execution.",
  },
  {
    type: "stats",
    items: [
      { value: "18+", label: "connected repos" },
      { value: "04", label: "protocol layers" },
      { value: "0", label: "closed garden dependency" },
    ],
  },
];
