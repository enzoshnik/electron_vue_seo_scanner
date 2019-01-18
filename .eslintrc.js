module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
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
  plugins: ["vue"],
  rules: {
    indent: 0,
    "no-tabs": 0,
    "eol-last": "off",
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
