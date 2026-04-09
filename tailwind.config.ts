import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0EB",
        ink: "#0A0A0A",
        rust: "#C83C2C",
        "rust-dark": "#A82E20",
        "rust-light": "#E8453A",
        muted: "#6B6B6B",
        border: "#D4D0CB",
        "off-white": "#FAF8F5",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-dm)", "sans-serif"],
      },
      letterSpacing: {
        display: "0.08em",
        tight: "-0.02em",
      },
      maxWidth: {
        content: "1400px",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "slow-zoom": "slow-zoom 15s ease-out forwards",
        "slide-up": "slide-up 800ms ease forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
