import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "login-bg": "url('/images/login-bg.webp')",
      },
      height: {
        screen: "100dvh",
      },
      minHeight: {
        screen: "100dvh",
      },
      borderRadius: {
        "2.5": "10px",
      },
      backgroundColor: {
        "white/2": "rgba(255, 255, 255, 0.02)",
      },
      colors: {
        sapphire: {
          "50": "#f3f6fb",
          "100": "#e4e8f5",
          "200": "#cfd7ee",
          "300": "#aebee2",
          "400": "#879bd3",
          "500": "#6b7dc6",
          "600": "#5864b8",
          "700": "#4a51a2",
          "800": "#43478a",
          "900": "#3a3e6e",
          "950": "#272844",
        },
        woodsmoke: "#151618",
        mineshaft: "#2A2A2A",
        shark: "#1D1E20",
        dustygray: "#979797",
        greenhaze: "#04A65B",
        junglegreen: "#27AE60",
        tradewind: "#5AB8A4",
        pictonblue: "#418FED",
        bourbon: "#BC6C25",
        brandypunch: "#D08A34",
        vividtangerine: "#FF9674",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
