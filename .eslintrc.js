// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@repo/eslint-config/library.js"],
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
