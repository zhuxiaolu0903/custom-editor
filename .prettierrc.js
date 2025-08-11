module.exports = {
  root: true,
  //每行最多多少个字符换行默认80
  printWidth: 100,
  // 使用制表符或是空格缩进行, 默认 false。
  useTabs: false,
  //tab缩进大小,默认为2
  tabWidth: 2,
  //语句求尾是否使用分号, 默认true
  semi: false,
  //使用单引号, 默认false(在jsx中配置无效, jsx使用 jsxSingleQuote, 默认都是双引号)
  singleQuote: true,
  // 更改对象属性引号的的时机
  // "as-needed" -仅在需要时在对象属性周围添加引号， 默认值。
  // "consistent" -如果对象中至少有一个属性需要用引号引起来，请用所有属性引起来。
  // "preserve" -尊重对象属性中引号的输入使用。
  quoteProps: 'as-needed',
  // 行尾逗号,默认none,可选 none|es5|all
  // "es5" -在ES5中有效的结尾逗号（对象，数组等）,默认值
  // "none" -没有尾随逗号。
  // "all"-尽可能在结尾加上逗号（包括函数参数）。这需要节点8或转换
  trailingComma: 'es5',
  // 对象中文字与大括号的空格 默认true
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,
  // 箭头函数参数括号 默认always 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号 （x) => x
  arrowParens: 'always',
  //行结尾的风格<auto | lf | crlf | cr>
  endOfLine: 'auto',
  // jsx语法中的引号
  jsxSingleQuote: true,
  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  jsxBracketSameLine: true,
  // HTML空格敏感性
  // "css"-遵守CSS display属性的默认值。
  // "strict" -空白被认为是敏感的。
  // "ignore" -空白被认为是不敏感的。 此配置项可修复 .vue 文件模板中包裹文字时候结束标签的结尾尖括号掉到了下一行
  htmlWhitespaceSensitivity: 'ignore',
  // Vue文件脚本和样式标签缩进
  // "false" -不要缩进Vue文件中的脚本和样式标签。
  // "true" -在Vue文件中缩进脚本和样式标签。
  vueIndentScriptAndStyle: false,
  // 是否在文件头部插入一个特殊的@format标记，默认 false
  insertPragma: false,
  // 是否需要编译指示，默认 false
  /**
   * @prettier
   */
  // 或
  /**
   * @format
   */
  requirePragma: false,
}
