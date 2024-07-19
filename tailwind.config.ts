import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      "mine-shaft": {
        "50": "#f6f6f6",
        "100": "#e7e7e7",
        "200": "#d1d1d1",
        "300": "#b0b0b0",
        "400": "#888888",
        "500": "#6d6d6d",
        "600": "#5d5d5d",
        "700": "#4f4f4f",
        "800": "#454545",
        "900": "#3d3d3d",
        "950": "#2a2a2a",
      },

      animation: {
        blob: "blob 55s alternate infinite",
        typing: "typing 5s steps(20) infinite alternate, blink .7s infinite",
        "infinite-scroll": "infinite-scroll 55s linear infinite",
      },

      screens: {
        mobile: "340px",
        // => @media (min-width: 375px) { ... }

        tablet: "768px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },

      keyframes: {
        blob: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },

        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "41%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },

        "infinite-scroll": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": { transform: "translateX(calc(540px*18))" },
        },
      },
    },
    variants: {
      extend: {},
    },
  },
};
export default config;
