/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - deep warm forest green
        forest: {
          50: "#eef6ef",
          100: "#d6ebd8",
          200: "#aed6b3",
          300: "#7cba85",
          400: "#4e9a5b",
          500: "#2f7d3e",
          600: "#216330",
          700: "#1c4f29",
          800: "#193f23",
          900: "#15341e",
        },
        // Sage - soft secondary green
        sage: {
          50: "#f4f7f2",
          100: "#e6ede1",
          200: "#cedbc4",
          300: "#abc09c",
          400: "#83a06f",
          500: "#64834f",
          600: "#4d683d",
          700: "#3e5333",
          800: "#34442c",
          900: "#2c3a26",
        },
        // Warm cream backgrounds
        cream: {
          50: "#fdfcf7",
          100: "#faf7ed",
          200: "#f4eed8",
          300: "#ebe0bb",
          400: "#ddc98c",
          500: "#cdb05f",
        },
        // Soft clay accent (warmth without orange)
        clay: {
          50: "#faf4f1",
          100: "#f2e3da",
          200: "#e6c8b6",
          300: "#d4a489",
          400: "#c08163",
          500: "#a9684b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        warm: "0 4px 24px -4px rgba(33, 99, 48, 0.14)",
        card: "0 2px 16px -2px rgba(20, 50, 30, 0.08)",
        glow: "0 0 0 4px rgba(47, 125, 62, 0.12)",
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
