/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  plugins: ["deprecation", "@typescript-eslint"],
  rules: {
    "deprecation/deprecation": "warn",
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-explicit-any": "off",
    'prettier/prettier': 0
  },
  overrides: [
    {
      files: "src/*.tsx",
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "tsconfig.json",
  },
};
