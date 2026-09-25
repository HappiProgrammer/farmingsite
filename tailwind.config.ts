import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core neutrals
        "white": "#ffffff",
        "off-white": "#f5f5f5",     // section alternation
        "border": "#e5e5e5",        // card borders, dividers
        "muted": "#f0f0f0",         // subtle backgrounds, empty states
        // Text
        "ink": "#111111",           // headings, strong text
        "ink-mid": "#444444",       // body text
        "ink-light": "#888888",     // muted / secondary text
        "ink-xlight": "#bbbbbb",    // disabled / placeholder labels
        // Accent (used sparingly)
        "accent": "#2d6a2d",        // primary CTAs, badges, active states
        "accent-light": "#e8f4e8",  // very light tint — badge backgrounds, hover states
        "accent-dark": "#1e4a1e",   // hover/active on accent
        // Dark surfaces (hero, callouts)
        "surface-dark": "#111111",  // replaces forest-deep on dark sections
        "surface-dark-mid": "#1e1e1e", // slightly lighter dark — card on dark bg
      },
      fontFamily: {
        // Set in layout.tsx via next/font, referenced here for consistency
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Storytelling scale
        "display-2xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-md":  ["clamp(1.375rem, 2.5vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "section": "6rem",         // standard vertical section padding
        "section-lg": "9rem",
      },
      maxWidth: {
        "prose-wide": "75ch",
        "content": "1320px",
      },
      borderRadius: {
        "card": "0.75rem",
        "card-lg": "1.25rem",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "fade-in": "fade-in 0.5s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
