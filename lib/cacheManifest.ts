import { projects } from "@/data/projects";
import { playgroundItems, studioGallery } from "@/data/site";

const staticRoutes = ["/", "/work", "/studio", "/contact"] as const;

const projectRoutes = projects.map((project) => `/work/${project.slug}`);

const mediaAssets = Array.from(
  new Set(
    [
      "/media/Godboy.png",
      "/media/Godboy1.png",
      "/media/aehteriaai-website.mp4",
      "/media/aehteriai-ppt-website.mp4",
      "/media/aetheria-ai-chatUI.png",
      "/media/aetheria-ai-login.png",
      "/media/agentic-trading.mp4",
      "/media/image copy.png",
      "/media/image copy 2.png",
      "/media/image copy 3.png",
      "/media/image copy 4.png",
      "/media/image copy 5.png",
      "/media/image copy 6.png",
      "/media/image copy 7.png",
      "/media/image copy 8.png",
      "/media/image.png",
      "/media/MTP-website.mp4",
      "/media/mtp-CLI.mp4",
      "/media/pawsitivestrides.mp4",
      "/media/polycognitive agent.mp4",
      "/media/polycognitive-agent.png",
      "/media/portrait-1.png",
      "/media/portrait-2.png",
      "/media/prajwal.png",
      ...projects.flatMap((project) => [project.media, project.video]).filter(Boolean),
      ...studioGallery.map((item) => item.src),
      ...playgroundItems.map((item) => item.media),
    ].filter((asset): asset is string => Boolean(asset))
  )
);

export const cacheManifest = {
  routes: [...staticRoutes, ...projectRoutes],
  assets: mediaAssets,
};

