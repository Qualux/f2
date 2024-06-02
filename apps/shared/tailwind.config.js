module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'admin-dark': '#1D2327',
        'admin-blue': '#2271B1',
      },
    },
  },
  plugins: [],
};