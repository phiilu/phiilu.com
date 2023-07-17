module.exports = {
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ],
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'none',
  jsxBracketSameLine: true
};
