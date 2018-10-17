module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    'percySnapshot': true
  },
  overrides: [
    // node files
    {
      files: [
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        'indent': [
          'error',
          2,
          {
            'SwitchCase': 1
          }
        ],
        'linebreak-style': [
          'error',
          'unix'
        ],
        'semi': [
          'error',
          'always'
        ],
        'quotes': [
          'error',
          'single'
        ],
        'keyword-spacing': [
          'error',
          {
            'before': true,
            'after': true
          }
        ],
        'newline-before-return': [
          'error'
        ],
        'no-trailing-spaces': [
          'error'
        ],
        'object-curly-spacing': [
          'error',
          'always'
        ],
        'block-spacing': [
          'error'
        ],
        'no-lonely-if': [
          'error'
        ],
        'no-use-before-define': [
          2, 'nofunc'
        ],
        'no-unused-expressions': [2, {
          allowShortCircuit: true,
          allowTernary: true
        }],
        'prefer-const': [
          'error'
        ]
      })
    }
  ]
};
