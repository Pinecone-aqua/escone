/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        while: "#FFFFFF",
        black: "#000000",
        orange: "#FF6600",
        green: "#96B60B",
        "semi-green": "#708A01",
        "dark-green": "#485801",
        "light-orange": "#FFF3DF",
      },
      fontSize: {
        "2xs-reg": ["13px", { lineHeight: "15px", fontWeight: "400" }],
        "2xs-bold": ["13px", { lineHeight: "15px", fontWeight: "600" }],
        "xs-thin": ["14px", { lineHeight: "16px", fontWeight: "300" }],
        "xs-reg": ["14px", { lineHeight: "16px", fontWeight: "400" }],
        "xs-bold": ["14px", { lineHeight: "16px", fontWeight: "550" }],
        "sm-thin": ["18px", { lineHeight: "26px", fontWeight: "300" }],
        "sm-reg": ["18px", { lineHeight: "26px", fontWeight: "400" }],
        "sm-bold": ["18px", { lineHeight: "26px", fontWeight: "700" }],
        "md-bold": ["22px", { lineHeight: "28px", fontWeight: "700" }],
        "lg-bold": ["24px", { lineHeight: "30px", fontWeight: "700" }],
        "xl-bold": ["27px", { lineHeight: "32px", fontWeight: "700" }],
        "2xl-bold": ["33px", { lineHeight: "40px", fontWeight: "700" }],
        "3xl-bold": ["42px", { lineHeight: "48px", fontWeight: "700" }],
        "4xl-bold": ["52px", { lineHeight: "56px", fontWeight: "700" }],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
