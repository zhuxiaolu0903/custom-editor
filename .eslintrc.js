/*
 * @Author: your name
 * @Date: 2020-12-24 16:54:45
 * @LastEditTime: 2020-12-28 10:02:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /workspace/HEP-UV-PM/.eslintrc.js
 */
// const prettierCfg = require('./.prettierrc.js')
module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    // 继承 vue 的标准特性
    'plugin:vue/essential',
    'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  // plugins: ['vue', 'prettier'],
  // add your custom rules here
  rules: {
    // allow async-await
    'no-console': 'off',
    // 允许更改引用类型内部属性，所以不强制，只作警告
    'vue/no-mutating-props': 1,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'prettier/prettier': ['error', prettierCfg],
    'vue/multi-word-component-names': 'off',
    'vue/no-setup-props-destructure': 1,
  },
}
