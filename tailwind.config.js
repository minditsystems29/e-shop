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
        primary: {
          DEFAULT: '#1DA1F2', // Replace with your primary color
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFAD1F', // Replace with your secondary color
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#3B82F6', // Replace with your accent color
          foreground: '#FFFFFF',
        },
        background: '#F3F4F6', // Background color if needed
        'muted-foreground': '#6B7280', // Text color for muted content
        border: '#E5E7EB', // Border color if needed
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
