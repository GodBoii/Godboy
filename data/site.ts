export const navLinks = [
  { label: "projects", href: "/work" },
  { label: "builds", href: "/studio" },
  { label: "contact", href: "/contact" },
];

export const socials = [
  { label: "twitter", href: "https://x.com/Godboiiiiii" },
  { label: "instagram", href: "https://www.instagram.com/7.15.4.2.15.25/" },
];

export const footerSocials = [
  { label: "Instagram", href: "https://www.instagram.com/7.15.4.2.15.25/" },
  { label: "Twitter", href: "https://x.com/Godboiiiiii" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prajwal-ghadge-44a1a1242/" },
  { label: "GitHub", href: "https://github.com/GodBoii" },
  { label: "Threads", href: "https://www.threads.com/@7.15.4.2.15.25" },
  { label: "Email", href: "mailto:prajwalghadge2005@gmail.com" },
];

export const services = [
  "AI Systems",
  "Agentic Infrastructure",
  "Protocol Design",
  "Frontend Engineering",
  "Motion Interfaces",
  "Developer Tooling",
  "Open Source",
  "Product Websites",
];

export const stats = [
  { label: "Started", value: "2024" },
  { label: "Repos", value: "18+" },
  { label: "Protocols", value: "04" },
  { label: "Systems", value: "09" },
  { label: "Mode", value: "Solo" },
];

export const contactOptions = {
  services: [
    "Design",
    "Development",
    "2D & 3D Art",
    "Animation",
    "Marketing Support",
    "SEO",
    "Sound Design",
  ],
  budgets: ["Under $10k", "$10k-$20k", "$20k-$50k", "$50k-$100k", "$100k+"],
  deadlines: ["Yes", "No, I'm in no rush", "No deadline, but ASAP please"],
  sources: ["Google", "Awwwards", "Dribbble", "FWA", "LinkedIn", "Other"],
};

export const studioGallery = [
  { src: "/media/Godboy.png", caption: "Godboy identity study - 2026" },
  { src: "/media/image copy 7.png", caption: "AI interface fragments - 2026" },
  { src: "/media/prajwal.png", caption: "Prajwal maker portrait - 2026" },
  { src: "/media/aetheria-ai-chatUI.png", caption: "Aetheria agent console - 2025" },
  { src: "/media/polcognitive-agent.png", caption: "Polycognitive reasoning surface - 2025" },
  { src: "/media/image copy 4.png", caption: "Protocol notes in motion - 2025" },
  { src: "/media/image copy 5.png", caption: "Runtime UI exploration - 2025" },
  { src: "/media/image copy 8.png", caption: "Open-source launch scraps - 2025" },
].map((item) => item.src.includes("polcognitive") ? { ...item, src: "/media/polycognitive-agent.png" } : item);

export const playgroundItems = [
  { title: "AI-OS", year: "2026", media: "/media/aehteriai-ppt-website.mp4" },
  { title: "mtpx", year: "2025", media: "/media/MTP-website.mp4" },
  { title: "PCA", year: "2025", media: "/media/polycognitive-agent.png" },
  { title: "Aetheria", year: "2025", media: "/media/aetheria-ai-chatUI.png" },
  { title: "Trading Agents", year: "2025", media: "/media/agentic-trading.mp4" },
  { title: "Cross Protocol", year: "Coming soon", media: "/media/image copy 8.png" },
];
