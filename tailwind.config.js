module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"], // Add your custom font family
      },
      fontFamily: {
        quicksand: ["'Quicksand'", "sans-serif"], // Add your custom font family
      },
      backgroundImage: {
        "request-form": "url('/src/assets/request-form-bg.png')",
      },
    },
  },
  plugins: [],
};
