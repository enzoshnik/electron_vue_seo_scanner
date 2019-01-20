module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    // "eslint:recommended",
    "plugin:vue/essential"
  ],
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ]
}
