// Yaralume design tokens.
// Principle 3 — "Calm by design": soft, natural palette, generous spacing,
// NO alarm-red accents used for engagement. Red is reserved strictly for the
// crisis / help path so it keeps its meaning.

export const colors = {
  // Backgrounds
  bg: "#F3F6F4", // soft off-white green
  surface: "#FFFFFF",
  surfaceAlt: "#EAF0EC",

  // Text
  text: "#1E2B25",
  textMuted: "#5C6B63",
  textFaint: "#8A968F",

  // Brand — calm forest / sage
  primary: "#2F6B4F",
  primarySoft: "#DCE8E0",
  accent: "#7BA890",

  // Mood scale (1 low → 5 good), muted and non-judgmental
  mood1: "#B9A2C9",
  mood2: "#9FB0C9",
  mood3: "#A9C1B4",
  mood4: "#9CC29A",
  mood5: "#8FB98A",

  // Reserved for crisis/help only
  help: "#B5473C",

  border: "#DDE5E0",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
};

export const font = {
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  small: 14,
  tiny: 12,
};
