module.exports = {
  extends: ['eslint:recommended', 'plugin:astro/recommended', 'plugin:jsx-a11y/recommended'],
  ignorePatterns: ['rss.xml.js', 'env.d.ts', 'src/content/config.ts'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    },
    {
      env: {
        browser: true,
        node: true
      },
      globals: {
        React: true,
        'astro:content': true
      },
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime'
      ],
      settings: {
        'import/resolver': {
          typescript: true
        },
        react: {
          version: 'detect'
        }
      },

      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
};
