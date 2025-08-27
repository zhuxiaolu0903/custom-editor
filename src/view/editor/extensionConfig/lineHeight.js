const lineHeightOptions = [
  { label: '1.0', value: '1.0' },
  { label: '1.25', value: '1.25' },
  { label: '1.5', value: '1.5' },
  { label: '2.0', value: '2.0' },
  { label: '2.5', value: '2.5' },
  { label: '3.0', value: '3.0' },
]
/*
// 原行高扩展
export const lineHeightConfig = {
  options: lineHeightOptions,
  onClick: ({ editor, value }) => {
    editor.chain().focus().setLineHeight(value).run()
  },
  isActive: ({ editor, value }) => editor.isActive('textStyle', { lineHeight: value }),
  isDisabled: ({ editor }) => !editor.can().setLineHeight(),
}
*/

// 自定义行高扩展
export const lineHeightConfig = {
  options: lineHeightOptions,
  onClick: ({ editor, value }) => {
    const lineHeight = `${(Number(value) * 100).toFixed(0)}%`
    editor.chain().setLineHeight(lineHeight).run()
  },
  isActive: ({ editor, value }) => {
    let lineHeight = null
    if (editor.isActive('paragraph')) {
      const attrs = editor.getAttributes('paragraph')
      lineHeight = attrs.lineHeight
    } else if (editor.isActive('heading')) {
      const attrs = editor.getAttributes('heading')
      lineHeight = attrs.lineHeight
    }
    return !!(lineHeight && lineHeight === `${(Number(value) * 100).toFixed(0)}%`)
  },
  isDisabled: ({ editor }) => !editor.can().setLineHeight(),
}
