// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 'error',
    'import/named': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
  },
}
