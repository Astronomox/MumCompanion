/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette - warm, maternal, Nigerian
        terracotta: {
          50: "#fdf3ef",
          100: "#fae4d8",
          200: "#f5c8b1",
          300: "#eda37f",
          400: "#e57c4d",
          500: "#d95e2a",
          600: "#c04820",
          700: "#9e381b",
          800: "#83301c",
          900: "#6d2b1a",
        },
        cream: {
          50: "#fefdf8",
          100: "#fdf9ed",
          200: "#faf3d7",
          300: "#f5e9b7",
          400: "#edda8c",
          500: "#e4c85f",
        },
        forest: {
          50: "#f0f7f0",
          100: "#ddeedd",
          200: "#bbddbb",
          300: "#8ec38e",
          400: "#5fa35f",
          500: "#3d8240",
          600: "#2d6630",
          700: "#265429",
          800: "#214525",
          900: "#1c3920",
        },
        // Triage colors
        urgent: {
          bg: "#fef2f2",
          border: "#fca5a5",
          text: "#991b1b",
        },
        clinic: {
          bg: "#fffbeb",
          border: "#fcd34d",
          text: "#92400e",
        },
        normal: {
          bg: "#f0fdf4",
          border: "#86efac",
          text: "#166534",
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
        warm: "0 4px 24px -4px rgba(217, 94, 42, 0.12)",
        card: "0 2px 16px -2px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "pulse-soft": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
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
      },
    },
  },
  plugins: [],
}
