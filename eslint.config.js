import js from "@eslint/js";
import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

// Main ESLint configuration array (flat config format)
export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "coverage", "*.config.*"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      prettier: eslintPluginPrettier,
    },

    rules: {
      // Run Prettier as an ESLint rule and report formatting issues as errors
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto", // Prevents false positives for line endings
        },
      ],
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Enforce a custom order for import statements
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^react-dom"], // React packages first
            ["^@?\\w"], // External packages
            ["^(@|components|utils|hooks|types)(/.*|$)"], // Internal aliases
            ["^\\u0000"], // Side effect imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"], // Parent imports
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], // Other relative imports
          ],
        },
      ],
      "simple-import-sort/exports": "error", // Enforce sorting for exports as well
    },
  },

  // Disables all formatting rules that conflict with Prettier. Must be last.
  eslintConfigPrettier,
);
