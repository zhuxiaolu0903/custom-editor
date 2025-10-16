export const alignCenterConfig = {
  tips: ['居中对齐'],
  isActive: ({ editor }) => {
    const attrs = editor.getAttributes('imageNode') || {}
    return attrs.align === 'center'
  },
  onClick: ({ editor }) => {
    const attrs = editor.getAttributes('imageNode')
    attrs.align = 'center'
    editor.chain().focus().uploadImage(attrs).run()
  },
}
