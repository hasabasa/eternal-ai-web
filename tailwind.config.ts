
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#262630", // Тёмно-серо-синий
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#262630",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#262630",
        },
        // Фирменные цвета
        brand: {
          orange: "#FE9C2D", // Янтарно-оранжевый
          darkBlue: "#262630", // Тёмно-серо-синий  
          purple: "#A678FF", // Светло-фиолетовый
        },
        // Заменяем старые aurora цвета на фирменные
        aurora1: "#A678FF", // Светло-фиолетовый
        aurora2: "#FE9C2D", // Янтарно-оранжевый
        aurora3: "#A678FF", // Светло-фиолетовый (вариант)
        aurora4: "#FE9C2D", // Янтарно-оранжевый (вариант)
        aurora5: "#262630", // Тёмно-серо-синий
      },
      borderRadius: {
        lg: "1.5rem",
        xl: "2rem",
      },
      keyframes: {
        "aurora-move": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-30px) scale(1.08)" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        "aurora-move": "aurora-move 8s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.9s cubic-bezier(0.4,0,0.2,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
