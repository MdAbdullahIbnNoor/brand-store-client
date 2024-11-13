/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: "#FFF7D1",  // Light Yellow
        secondary: "#8B5DFF", // Violet
        accent: "#6A42C2",   // Purple
        darkPurple: "#563A9C" // Dark Purple
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myCustomTheme: {
          "primary": "#FFF7D1",
          "secondary": "#8B5DFF",
          "accent": "#6A42C2",
          "neutral": "#563A9C",
          "base-100": "#ffffff",
          "base-content": "#000000",
          "info": "#8B5DFF",
          "success": "#6A42C2",
          "warning": "#FFF7D1",
          "error": "#FF6A6A",
        },
      },
      "light",  // Keeping the default light theme
      "dark"    // Keeping the default dark theme
    ],
  }
}
