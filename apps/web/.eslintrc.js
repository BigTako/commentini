/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_", // Ignore variables that start with an underscore
      },
    ],
  },
};
