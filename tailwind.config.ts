import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/landing/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'roboto': ['var(--font-roboto)', 'sans-serif'],
        'roboto-condensed': ['var(--font-roboto-condensed)', 'sans-serif'],
        'roboto-slab': ['var(--font-roboto-slab)', 'serif'],
        'sans': [
          'Segoe UI', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        'segoe': [
          'Segoe UI', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ]
      },
    },
  },
  plugins: [],
} satisfies Config;
