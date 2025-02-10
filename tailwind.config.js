/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ona-primary': {
          DEFAULT: '#356ee7',
          foreground: '#ffffff'
        },
        'ona-secondary': {
          DEFAULT: '#173aaa',
          foreground: '#ffffff'
        },
        'ona-accent': {
          DEFAULT: '#95C11F',
          foreground: '#ffffff'
        },
        'ona-dark': {
          DEFAULT: '#2b2d42',
          foreground: '#ffffff'
        },
        'ona-light': {
          DEFAULT: '#f8f9fa',
          foreground: '#171717'
        }
      },
      textColor: {
        DEFAULT: '#171717',  // Dark text as default
        'muted': '#6b7280',  // Muted text color
        'inverse': '#ffffff' // White text for dark backgrounds
      },
      backgroundColor: {
        DEFAULT: '#ffffff',  // White background as default
        'muted': '#f3f4f6'   // Light gray background
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.7s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
};
