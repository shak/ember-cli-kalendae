module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true
  },
  globals: {
    "percySnapshot": true
  },
  rules: {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "semi": [
      "error",
      "always"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "newline-before-return": [
      "error"
    ],
    "no-trailing-spaces": [
      "error"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "block-spacing": [
      "error"
    ],
    "no-lonely-if": [
      "error"
    ],
    'no-use-before-define': [
      2, 'nofunc'
    ],
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true
    }],
    'prefer-const': [
      "error"
    ]
  }
};
