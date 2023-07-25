/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7ae88e",
          secondary: "#3bc6b6",
          accent: "#37e86c",
          neutral: "#1d2226",
          "base-100": "#fcfcfd",
          info: "#6bb6d6",
          success: "#61dba8",
          warning: "#f4d54e",
          error: "#e87398",
        },
      },
    ],
  },
};
