import type { Config } from "tailwindcss";
 
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:   "#F5F0E8",
        paper:   "#EDE7D9",
        ink:     "#1C1A16",
        "ink-mid": "#4A4640",
        "ink-low": "#8C877E",
        dorado:  "#B08D57",
        "dorado-lt": "#C9A96E",
        rule:    "rgba(28,26,22,0.12)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-jost)", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(48px, 5.5vw, 80px)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
    },
  },
  plugins: [],
};
 
export default config;
 