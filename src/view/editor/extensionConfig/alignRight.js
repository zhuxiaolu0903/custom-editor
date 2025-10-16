export const alignRightConfig = {
  tips: ['右对齐'],
  isActive: ({ editor }) => {
    const attrs = editor.getAttributes('imageNode') || {}
    return attrs.align === 'right'
  },
  onClick: ({ editor }) => {
    const attrs = editor.getAttributes('imageNode')
    attrs.align = 'right'
    editor.chain().focus().uploadImage(attrs).run()
  },
}
