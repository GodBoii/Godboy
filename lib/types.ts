export type Project = {
  slug: string;
  number: string;
  title: string;
  client: string;
  type: string;
  year: string;
  category: string;
  awards: string[];
  excerpt: string;
  timeframe: string;
  role: string;
  tags: string[];
  accent: string;
  media: string;
  video?: string;
};

export type CaseModule =
  | { type: "full"; media: string; caption: string }
  | { type: "pair"; left: string; right: string; caption: string }
  | { type: "textMedia"; align: "left" | "right"; title: string; body: string; media: string }
  | { type: "quote"; quote: string }
  | { type: "stats"; items: Array<{ value: string; label: string }> };
