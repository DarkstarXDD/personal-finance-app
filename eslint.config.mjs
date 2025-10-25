import { fileURLToPath } from "url"

import { includeIgnoreFile } from "@eslint/compat"
import { defineConfig } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import eslintPluginImport from "eslint-plugin-import"
import storybook from "eslint-plugin-storybook"

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
      "react-hooks/incompatible-library": "off",
    },
  },
  {
    files: ["tests/fixtures/**/*.ts"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    files: ["tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  includeIgnoreFile(gitignorePath),
])

export default eslintConfig
