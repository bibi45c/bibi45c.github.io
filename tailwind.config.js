/** @type {import('tailwindcss').Config} */
// Design tokens: "Quiet Glass" (design option C / C2). The CSS custom properties live in app/global.css.
const cjkSans = ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans CJK SC"'];

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--text) / <alpha-value>)",
        strong: "hsl(var(--text-strong) / <alpha-value>)",
        faint: "var(--text-faint)",
        tint: "hsl(var(--tint) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        line: "var(--line)",
        hover: "var(--hover)",
        selected: "var(--selected)",
        card: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--text) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          foreground: "hsl(var(--text) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--text-strong) / <alpha-value>)",
          foreground: "hsl(var(--background) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "var(--hover)",
          foreground: "hsl(var(--text) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "var(--hover)",
          foreground: "hsl(var(--text-muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--background) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--text-strong) / <alpha-value>)",
        },
        border: "var(--line)",
        input: "var(--line)",
        ring: "hsl(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", ...cjkSans, "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", '"SFMono-Regular"', "Menlo", "Consolas", '"PingFang SC"', '"Microsoft YaHei"', "monospace"],
      },
      // type scale: 11 · 12 · 13 · 14 · 15 · 17 · 18 · 20 · 24 · 34 · 46
      fontSize: {
        11: ["11px", "16px"],
        12: ["12px", "16px"],
        13: ["13px", "20px"],
        14: ["14px", "20px"],
        15: ["15px", "1.6"],
        17: ["17px", "1.4"],
        18: ["18px", "1.4"],
        20: ["20px", "1.3"],
        24: ["24px", "1.4"],
        34: ["34px", "1.12"],
        46: ["46px", "1.12"],
      },
      // spacing scale: 4 · 8 · 12 · 14 · 16 · 20 · 24 · 48 · 56 · 72 · 80 · 96 (72 is the only one Tailwind lacks)
      spacing: {
        18: "4.5rem",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        row: "var(--r-row)",
        card: "var(--r-card)",
        pill: "var(--r-pill)",
      },
      transitionDuration: {
        DEFAULT: "var(--dur-2)",
        fast: "var(--dur-1)",
        slow: "var(--dur-3)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--ease-out)",
        quiet: "var(--ease-out)",
      },
      keyframes: {
        "page-in": {
          from: { opacity: "0" },
        },
      },
      animation: {
        "page-in": "page-in var(--dur-3) var(--ease-out) both",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
};
