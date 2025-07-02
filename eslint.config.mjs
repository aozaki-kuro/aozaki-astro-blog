import js from '@eslint/js'
import * as tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import astroPlugin from 'eslint-plugin-astro'
import prettierPlugin from 'eslint-plugin-prettier'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'

export default [
  {
    ignores: ['node_modules', 'dist', '.astro'],
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      tailwindcss,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroPlugin.parser,
      parserOptions: {
        parser: tsParser,
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    processor: astroPlugin.processors.astro,
    plugins: {
      astro: astroPlugin,
      tailwindcss,
      prettier: prettierPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
]
