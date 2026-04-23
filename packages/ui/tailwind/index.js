const path = require("path");
const theme = require("./theme");

const sharedContent = [
  path.join(__dirname, "../components/**/*.{js,jsx,ts,tsx}"),
  path.join(__dirname, "../../app/features/**/*.{js,jsx,ts,tsx}"),
  path.join(__dirname, "../../app/provider/**/*.{js,jsx,ts,tsx}"),
  path.join(__dirname, "../../app/index.ts"),
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  presets: [require("nativewind/preset")],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: theme,
  sharedContent,
};
