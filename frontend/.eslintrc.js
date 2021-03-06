module.exports = {
  plugins: ['prettier', 'jest'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    // 'new-cap': [2, { capIsNewExceptions: ['List', 'Map', 'Set'] }],
    // 'import/default': 0,
    // 'import/no-duplicates': 0,
    // 'import/named': 0,
    // 'import/namespace': 0,
    'import/no-unresolved': 0,
    // 'import/no-named-as-default': 2,
    'import/no-extraneous-dependencies': 0,
    'arrow-body-style': 0,
    // indent: [2, 2, { SwitchCase: 1 }],
    // 'no-alert': 0,
    // 'linebreak-style': 0,
    // 'react/no-multi-comp': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-curly-newline': 0,
  },
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
};
