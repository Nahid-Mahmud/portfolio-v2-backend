// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(eslint.configs.recommended, tseslint.configs.strict, tseslint.configs.stylistic, {
  rules: {
    "no-console": "warn",
    "no-restricted-syntax": [
      "warn",
      {
        selector: "CallExpression[callee.object.name='logger']",
        message: "Don't forget to remove unwanted logger statements",
      },
    ],
  },
});
