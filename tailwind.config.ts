import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {        
    extend: {
      colors: {
        'primary': '#5f5f5f',
        'secondary': '#404041',
        'main': '#ed1c24'
      },
      backgroundColor:{
        'primary': {
          600: '#d11b22',
          500: '#ed1c24'
        },
        'secondary': '#eee',
        'main': '#1e1e1e'
      },
      borderColor:{
        'primary': {
          600: '#d11b22',
          500: '#ed1c24'
        },
        'secondary': '#eee',
      },
      hoverColor:{
        'primary': 'orange'
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
