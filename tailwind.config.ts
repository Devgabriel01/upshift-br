import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          neon:   "#FF6B00",
          bright: "#FF8C00",
          glow:   "#FF4500",
          dim:    "#7A2E00",
        },
        gun: {
          950: "#0C0D0F",
          900: "#111316",
          800: "#1A1D22",
          700: "#22262D",
          600: "#2C313A",
          500: "#3D4451",
          400: "#5A6375",
          300: "#8B95A6",
          200: "#B8C0CC",
          100: "#D8DCE3",
          50:  "#ECEEF2",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease both",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "flicker":    "flicker 4s step-end infinite",
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        flicker: {
          "0%,100%": { opacity: "1" },
          "93%": { opacity: "0.4" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.6" },
          "97%": { opacity: "1" },
        },
      },
      boxShadow: {
        "orange-sm":   "0 0 16px rgba(255,107,0,0.25)",
        "orange-md":   "0 0 32px rgba(255,107,0,0.35)",
        "orange-glow": "0 8px 40px rgba(255,107,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
