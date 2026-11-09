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
        burger: {
          bun: "#FBBF24",
          "bun-dark": "#D97706",
          cheese: "#F59E0B",
          patty: "#78350F",
          "patty-dark": "#451a03",
          lettuce: "#10B981",
          "lettuce-dark": "#059669",
          ketchup: "#EF4444",
          "ketchup-dark": "#DC2626",
          mayo: "#FEF3C7",
          sky: "#BAE6FD",
          ground: "#854D0E",
          "ground-dark": "#713F12",
        },
      },
      boxShadow: {
        "cartoon-sm": "0 3px 0 0 rgba(0, 0, 0, 0.25)",
        "cartoon": "0 6px 0 0 rgba(0, 0, 0, 0.25)",
        "cartoon-lg": "0 10px 0 0 rgba(0, 0, 0, 0.28)",
        "cartoon-xl": "0 14px 0 0 rgba(0, 0, 0, 0.32)",
        "cartoon-pop": "0 0 0 3px #1e293b, 0 6px 0 3px #0f172a",
        "btn-green": "0 6px 0 0 #047857",
        "btn-yellow": "0 6px 0 0 #b45309",
        "btn-red": "0 6px 0 0 #991b1b",
        "btn-blue": "0 6px 0 0 #1d4ed8",
        "btn-purple": "0 6px 0 0 #6b21a8",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite ease-in-out",
        "float": "float 3s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 2s ease-in-out infinite",
        "walk": "walk 0.8s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        walk: {
          "0%": { transform: "translateY(0) rotate(-2deg)" },
          "100%": { transform: "translateY(-6px) rotate(2deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
