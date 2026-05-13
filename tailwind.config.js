/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#dcb8ff",
        "primary-container": "#8a2be2",
        "on-primary": "#480081",
        "secondary": "#dcb8ff",
        "secondary-container": "#5d3587",
        "on-secondary": "#43196d",
        "tertiary": "#ffb873",
        "tertiary-container": "#935400",
        "on-tertiary": "#4b2800",
        "background": "#121317",
        "surface": "#121317",
        "on-surface": "#e3e2e7",
        "on-surface-variant": "#cfc2d7",
        "surface-container": "#1f1f24",
        "surface-container-low": "#1a1b20",
        "surface-container-high": "#292a2e",
        "surface-container-highest": "#343439",
        "outline": "#988ca0",
        "outline-variant": "#4c4354",
        "error": "#ffb4ab",
        "error-container": "#93000a",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "headline": ["Inter"],
        "body": ["Inter"],
        "label": ["Inter"]
      },
      backdropBlur: {
        "xs": "2px",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
