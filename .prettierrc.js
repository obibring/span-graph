module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  singleAttributePerLine: true,
  bracketLine: false,
  bracketSameLine: false,
  packageManager: "pnpm",
  printWidth: 90, // Not a strict setting. Tells Prettier about how long lines should be.
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  tabs: false,
  trailingComma: "all",
  useTabs: false,
  overrides: [
    {
      files: ["**/pulse-inner.ts", "**/pulse.ts", "**/pulse/**/*.ts"],
      options: {
        parser: "typescript",
        trailingComma: "es5",
        semi: true,
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      options: {
        // the parser option "should never be included at the top level of
        // the configuration file" according to Prettier documentation because
        // it forces prettier to try to parse all files using that parser
        // instead of relying on its dynamic ability to check the filetype.
        parser: "typescript",
        semi: false,
        jsxBracketSameLine: false,
      },
    },
    {
      files: "*.prisma",
      options: {
        parser: "graphql",
      },
    },
    {
      files: ".eslintrc",
      options: {
        parser: "json",
      },
    },
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.yaml",
      options: {
        parser: "yaml",
      },
    },
    {
      files: "*.json",
      options: {
        parser: "json",
        trailingComma: "none",
      },
    },
    {
      files: ["*.md"],
      options: {
        printWidth: 60,
        parser: "markdown",
        proseWrap: "always",
      },
    },
  ],
}
