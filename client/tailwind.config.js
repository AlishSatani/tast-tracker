const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("@material-tailwind/react/theme/base/colors");
const TWColors = require("tailwindcss/colors");
const breakpoints = require("@material-tailwind/react/theme/base/breakpoints");

module.exports = withMT({
  content: [
    "./pages/**/*.{html,js,ts,tsx}",
    "./components/**/*.{html,js,ts,tsx}",
    "./modules/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        ...colors,
        theme: "#163EE1",
        "blue-grey": {
          ...colors["blue-grey"],
          300: "#9EA6AF",
        },
        grey: {
          ...colors.grey,
          50: "#F7F7F7",
          100: "#F3F1F5",
          200: "#616161",
          300: "#7B7B7B",
          400: "#D9D9D9",
          600: "#EBEBEB",
          700: "#374151",
        },
        neutral: {
          ...TWColors.neutral,
          50: "#FFFFFF",
          100: "#FAFBFC",
          200: "#F7F7FB",
          900: "#000000",
        },
        blue: {
          ...colors.blue,
          50: "#F1F3FC",
          100: "#F1F3FD",
          200 : "#DBEAFE",
          300: "#0F2B9B",
          400: "#1AA2FF",
          500: "#0052CC",
          600: "#143EE0",
          700: "#163EE1",
          800: "#8CA8ED",
        },
        yellow: {
          ...colors.yellow,
          400: "#F7EC72",
        },
        teal: {
          ...colors.teal,
          600: "#318274",
        },
        slate: {
          ...TWColors.slate,
          100: "#F1F3F5",
          200: "#D9D9D9",
          300: "#F1F3F8",
          900: "#484C66",
        },
        green: {
          ...colors.green,
          500: "#0FE70B",
        },
        red: {
          ...colors.red,
          400: "#FE4F60",
          500: "#F40E0E",
        },
      },
      screens: {
        ...breakpoints,
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        sans: ["Rubik", "sans-serif"],
        heading: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});
