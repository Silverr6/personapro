import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-brutalist "career glow-up" palette
        paper: "#FBF7EC",
        "paper-2": "#F2EAD7",
        ink: "#15130E",
        cobalt: { DEFAULT: "#2D4CFF", soft: "#A9B7FF" },
        lime: { DEFAULT: "#C6F24E", soft: "#E6FAB0" },
        coral: { DEFAULT: "#FF5B3A", soft: "#FFC2B4" },
        lilac: { DEFAULT: "#B79CFF", soft: "#E2D8FF" },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        nb: "5px 5px 0 0 #15130E",
        "nb-sm": "3px 3px 0 0 #15130E",
        "nb-lg": "8px 8px 0 0 #15130E",
        "nb-press": "2px 2px 0 0 #15130E",
      },
      borderRadius: {
        nb: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
