// Prettier is only used for `.astro` files, which oxfmt cannot parse yet.
// Everything else is formatted by oxfmt (see .oxfmtrc.json) — keep the two
// option sets in sync.
module.exports = {
  plugins: [require.resolve('prettier-plugin-astro')],
  parser: 'astro',
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'none'
};
