module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  // parser: '@typescript-eslint/parser',
  // parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    // sourceType: 'module',
    // parser: '@typescript-eslint/parser',
    // parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'error',
      // 这里定义的一些规则和.prettierrc中定义的规则是一样的。
      {
        singleQuote: true,
        // parser: 'flow',
        semi: false,
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
