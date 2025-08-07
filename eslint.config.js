import js from '@eslint/js';
import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginVitest from 'eslint-plugin-vitest';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['tests/**/*', 'playwright.config.ts'],
    ...jsxA11y.flatConfigs.recommended,
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactRefresh.configs.vite,
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
      // Disable ESLint rules that conflict with Prettier
      prettier,
    ],
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['tests/**/*', 'playwright.config.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.test.{js,ts,jsx,tsx}'],
    plugins: {
      vitest: eslintPluginVitest,
    },
    rules: {
      // Optional: enable Vitest rules
      // 'vitest/no-focused-tests': 'error',
      // 'vitest/no-disabled-tests': 'warn',
    },
  },
]);
