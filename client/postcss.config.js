const productionPlugins = ["cssnano"];
module.exports = {
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    ...(process.env.NODE_ENV === "production" ? productionPlugins : []),
    "postcss-preset-env",
  ],
};
