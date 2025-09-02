import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'max-len': [
        'error',
        {
          code: 80,
          ignoreStrings: true,
          ignoreUrls: true,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'simple-import-sort/imports': 'error',
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
        },
      ],
    },
  },
  tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
])
