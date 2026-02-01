import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist', 'node_modules', '.astro', '.vercel', '.env', '.env.*', 'public']
  },

  // TypeScript
  ...tseslint.configs.recommended,

  // React
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ...pluginReact.configs.flat.recommended
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ...pluginReact.configs.flat['jsx-runtime']
  },

  // React Hooks & JSX A11y
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Astro
  ...eslintPluginAstro.configs.recommended,

  // Astro TS Setup
  {
    files: ['*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro']
      }
    }
  },

  // Prettier
  eslintConfigPrettier
]
