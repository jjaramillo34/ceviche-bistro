module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ceviche-blue": "#004AAE",
        "ceviche-gold": "#FFD700",
        "ceviche-dark": "#333333",
        "ceviche-light": "#F5F5F5",
        primary: "#D53F8C",
        secondary: "#ED64A6",
        accent: "#F6E05E",
        background: "#F7FAFC",
        text: "#2D3748",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
