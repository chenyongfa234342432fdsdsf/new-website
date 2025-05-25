module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    },
  ],
  extends: require.resolve('eslint-plugin-airbnb-react'),
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist', '*.cjs', 'node_modules/'],
  rules: {
    'no-unused-vars':'off',
    'no-useless-return':'off',
    "prettier/prettier": ["error", { "endOfLine": "auto" }]
  },
}
