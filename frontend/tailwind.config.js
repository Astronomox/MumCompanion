/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "rgb(var(--forest-50) / <alpha-value>)",
          100: "rgb(var(--forest-100) / <alpha-value>)",
          200: "rgb(var(--forest-200) / <alpha-value>)",
          300: "rgb(var(--forest-300) / <alpha-value>)",
          400: "rgb(var(--forest-400) / <alpha-value>)",
          500: "rgb(var(--forest-500) / <alpha-value>)",
          600: "rgb(var(--forest-600) / <alpha-value>)",
          700: "rgb(var(--forest-700) / <alpha-value>)",
          800: "rgb(var(--forest-800) / <alpha-value>)",
          900: "rgb(var(--forest-900) / <alpha-value>)",
        },
        sage: {
          50: "rgb(var(--sage-50) / <alpha-value>)",
          100: "rgb(var(--sage-100) / <alpha-value>)",
          200: "rgb(var(--sage-200) / <alpha-value>)",
          300: "rgb(var(--sage-300) / <alpha-value>)",
          400: "rgb(var(--sage-400) / <alpha-value>)",
          500: "rgb(var(--sage-500) / <alpha-value>)",
          600: "rgb(var(--sage-600) / <alpha-value>)",
          700: "rgb(var(--sage-700) / <alpha-value>)",
          800: "rgb(var(--sage-800) / <alpha-value>)",
          900: "rgb(var(--sage-900) / <alpha-value>)",
        },
        cream: {
          50: "rgb(var(--cream-50) / <alpha-value>)",
          100: "rgb(var(--cream-100) / <alpha-value>)",
          200: "rgb(var(--cream-200) / <alpha-value>)",
          300: "rgb(var(--cream-300) / <alpha-value>)",
          400: "rgb(var(--cream-400) / <alpha-value>)",
          500: "rgb(var(--cream-500) / <alpha-value>)",
        },
        clay: {
          50: "#faf4f1",
          100: "#f2e3da",
          200: "#e6c8b6",
          300: "#d4a489",
          400: "#c08163",
          500: "#a9684b",
        },
        white: "rgb(var(--surface-card) / <alpha-value>)",
        stone: {
          50: "rgb(var(--stone-50) / <alpha-value>)",
          100: "rgb(var(--stone-100) / <alpha-value>)",
          200: "rgb(var(--stone-200) / <alpha-value>)",
          300: "rgb(var(--stone-300) / <alpha-value>)",
          400: "rgb(var(--stone-400) / <alpha-value>)",
          500: "rgb(var(--stone-500) / <alpha-value>)",
          600: "rgb(var(--stone-600) / <alpha-value>)",
          700: "rgb(var(--stone-700) / <alpha-value>)",
          800: "rgb(var(--stone-800) / <alpha-value>)",
          900: "rgb(var(--stone-900) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
      },
      animation: {
        "pulse-soft": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.25s ease-out",
        "breathe": "breathe 4s ease-in-out infinite",
        "sos-pulse": "sosPulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        sosPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.5)" },
          "50%": { boxShadow: "0 0 0 12px rgba(220, 38, 38, 0)" },
        },
      },
    },
  },
  plugins: [],
}
