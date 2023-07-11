/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        normal: "750px",
      },
      colors: {
        text: {
          default: "#333333",
          primary: "#1a1a1a",
          secondary: "#575757",
        },
        border: {
          light: "##d2d6da",
          dark: "#acacac",
        },
        mode: {
          minuslight: "#ebf2ed",
          light: "#f8f9fa",
          extralight: "#ffffff",
          dark: "#141728",
          extradark: "#111322",
        },
        primary: "#2b0eaf",
        secondary: "#0266d1",
        ternary: "#f71414",
        fournery: "#96c3f2",
        fivenery: "#82d616",
        darkbg: "#0f172a",
      },
    },
  },
  plugins: [],
};
