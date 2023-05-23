/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import withMT from '@material-tailwind/react/utils/withMT';
import flowbitePlugin from 'flowbite/plugin';

export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
  "./node_modules/flowbite/**/*.js",
  "./pages/**/*.{ts,tsx}",
  "./public/**/*.html",
];
export const theme = {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "978px",
    xl: "1240px",
    "2xl": "1536px",
  },
  extend: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#96B60B",
      secondary: "#FF6600",
      black: "#000000",
      white: "#FFFFFF",
    },
    fontSize: {
      "2xs-reg": ["13px", { lineHeight: "15px", fontWeight: "400" }],
      "2xs-med": ["13px", { lineHeight: "15px", fontWeight: "500" }],
      "2xs-semi": ["13px", { lineHeight: "15px", fontWeight: "600" }],

      "xs-reg": ["14px", { lineHeight: "16px", fontWeight: "400" }],
      "xs-med": ["14px", { lineHeight: "16px", fontWeight: "500" }],
      "xs-semi": ["14px", { lineHeight: "16px", fontWeight: "600" }],

      "sm-reg": ["18px", { lineHeight: "26px", fontWeight: "400" }],
      "sm-med": ["18px", { lineHeight: "26px", fontWeight: "500" }],
      "sm-bold": ["18px", { lineHeight: "26px", fontWeight: "700" }],

      "md-reg": ["21px", { lineHeight: "28px", fontWeight: "400" }],
      "md-med": ["21px", { lineHeight: "28px", fontWeight: "500" }],
      "md-semibold": ["21px", { lineHeight: "28px", fontWeight: "600" }],
      "md-bold": ["21px", { lineHeight: "28px", fontWeight: "700" }],

      "lg-semibold": ["24px", { lineHeight: "30px", fontWeight: "600" }],
      "lg-bold": ["24px", { lineHeight: "30px", fontWeight: "700" }],
      "xl-semibold": ["27px", { lineHeight: "32px", fontWeight: "600" }],
      "xl-bold": ["27px", { lineHeight: "32px", fontWeight: "700" }],
      "2xl-semibold": ["33px", { lineHeight: "40px", fontWeight: "600" }],
      "2xl-bold": ["33px", { lineHeight: "40px", fontWeight: "700" }],
      "3xl-bold": ["42px", { lineHeight: "48px", fontWeight: "700" }],
      "4xl-bold": ["52px", { lineHeight: "56px", fontWeight: "700" }],
    },
  },
};
export const plugins = [flowbitePlugin];
export default withMT({
  content,
  theme,
  plugins,
});