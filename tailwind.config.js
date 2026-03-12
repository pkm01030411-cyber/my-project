/** @type {import('tailwindcss').Config} */
// NOTE: This project uses Tailwind CSS v4.
// Colors are defined via CSS @theme in src/styles/globals.css.
// This file is kept for reference and tooling compatibility.
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // GlobalWatch Light Mode
        'gw-primary': '#2563eb',
        'gw-secondary': '#10b981',
        'gw-accent': '#f59e0b',
        'gw-danger': '#dc2626',
        'gw-text-primary': '#1f2937',
        'gw-text-secondary': '#6b7280',
        'gw-bg': '#ffffff',
        'gw-surface': '#f9fafb',
        'gw-border': '#e5e7eb',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '350': '350ms',
      },
    },
  },
  plugins: [],
};
