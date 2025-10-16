/**
 * 将驼峰命名转换为短横线命名
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 * @example
 * convertToKebabCase('addColumnAfter') // -> 'add-column-after'
 * convertToKebabCase('AddColumnBefore') // -> 'add-column-before'
 * convertToKebabCase('Bold') // -> 'bold'
 */
export const convertToKebabCase = (str) => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase()
}

export const uuid = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}
