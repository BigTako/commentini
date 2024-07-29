/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true, // This line is important
    es2021: true,
  },
  root: true,
  extends: [
    "@repo/eslint-config/next.js",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_", // Ignore variables that start with an underscore
      },
    ],
    "no-unused-vars": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": ["off"],
      },
    },
  ],
};
