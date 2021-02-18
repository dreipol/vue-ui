module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    parser: 'babel-eslint',
  },
  extends: [
    require.resolve('@dreipol/pandora/.eslintrc'),
    require.resolve('@dreipol/pandora/vue/.eslintrc'),
  ],
  env: {
    browser: true,
  },
  overrides: [
    {
      files: 'src/**/*.spec.js',
      env: {
        mocha: true,
      },
      rules: {
        'fp/no-let': 'off',
        'prefer-const': 'off',
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['src/vuex/**/*'],
      rules: {
        'no-param-reassign': [
          'error',
          {
            props: true,
            ignorePropertyModificationsFor: ['state'],
          },
        ],
      },
    },
  ],
}
