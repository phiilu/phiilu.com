module.exports = {
  plugins: [
    '@tailwindcss/jit',
    'autoprefixer',
    process.env.NODE_ENV === 'production' && 'cssnano'
  ].filter(Boolean)
};
