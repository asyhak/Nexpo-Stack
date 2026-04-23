const path = require("path");
const { sharedContent, ...baseConfig } = require("../../packages/ui/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : "class",
  content: [
    path.join(__dirname, "./src/**/*.{html,js,jsx,ts,tsx,mdx}"),
    ...sharedContent,
  ],
  important: "html",
};
