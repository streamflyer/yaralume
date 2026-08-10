// Curated directory of climate voices worth following (plan §4E).
// Editorial, not algorithmic — this is a hand-picked starter list. Verify each
// handle and add German-speaking Swiss/DACH voices before launch.
// Grouped by "vibe" so worried users can pick what helps them, not just "more".

export type CreatorVibe = "science" | "solutions" | "policy" | "local";

export type Creator = {
  id: string;
  name: string;
  vibe: CreatorVibe;
  platform: string; // e.g. "Instagram", "YouTube", "Newsletter", "Podcast"
  handle?: string;
  url: string;
  blurb: string;
};

export const vibeLabels: Record<CreatorVibe, string> = {
  science: "Wissenschaft erklärt",
  solutions: "Lösungen & Mut",
  policy: "Politik & Einordnung",
  local: "Schweiz & lokal",
};

// NOTE: placeholder entries — confirm handles/links before shipping.
export const creators: Creator[] = [
  {
    id: "c-science-1",
    name: "Climate scientist explainer",
    vibe: "science",
    platform: "YouTube",
    url: "https://www.youtube.com/",
    blurb: "Verständliche Erklärungen zu Klimadaten – ohne Panikmache.",
  },
  {
    id: "c-solutions-1",
    name: "Solutions-focused creator",
    vibe: "solutions",
    platform: "Instagram",
    url: "https://www.instagram.com/",
    blurb: "Fokus auf Fortschritte, Technologien und Menschen, die handeln.",
  },
  {
    id: "c-policy-1",
    name: "Climate policy journalist",
    vibe: "policy",
    platform: "Newsletter",
    url: "https://www.example.com/",
    blurb: "Ordnet politische Entscheide ein – ruhig und faktenbasiert.",
  },
  {
    id: "c-local-1",
    name: "Schweizer Klima-Stimme",
    vibe: "local",
    platform: "Podcast",
    url: "https://www.example.ch/",
    blurb: "Klimathemen aus Schweizer Perspektive, auf Deutsch.",
  },
];
