import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 45px rgba(56, 189, 248, 0.35)",
      },
      animation: {
        fade: "fadeIn 0.4s ease-in-out",
        pulseSlow: "pulseSlow 4s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%": { opacity: "0.85" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.85" },
        },
      },
      colors: {
        "surface": "#0B1120",
        "surface-muted": "#111C35",
        "accent": "#38bdf8",
        "accent-strong": "#0ea5e9",
        "success": "#10b981",
        "warning": "#facc15",
        "danger": "#ef4444",
      },
      backgroundImage: {
        "grid": "radial-gradient(circle at center, rgba(56,189,248,0.15) 0, rgba(56,189,248,0.15) 2px, transparent 3px)"
      },
    },
  },
  plugins: [],
};

export default config;
