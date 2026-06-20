import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        ink2: "#1E293B",
        card: "#334155",
        indigo: { brand: "#6366F1", light: "#818CF8" },
        mint: { brand: "#10B981", light: "#34D399" },
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
