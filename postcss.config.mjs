const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
        darkGray: "#2a2a2a",
      },
      transitionTimingFunction: {
        gold: "cubic-bezier(0.6, 0.05, 0.1, 0.9)",
      },
    },
  },
};

export default config;
