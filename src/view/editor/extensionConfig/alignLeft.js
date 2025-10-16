export const alignLeftConfig = {
  tips: ['左对齐'],
  isActive: ({ editor }) => {
    const attrs = editor.getAttributes('imageNode')
    return attrs.align === 'left'
  },
  onClick: ({ editor }) => {
    const attrs = editor.getAttributes('imageNode')
    attrs.align = 'left'
    editor.chain().focus().uploadImage(attrs).run()
  },
}
