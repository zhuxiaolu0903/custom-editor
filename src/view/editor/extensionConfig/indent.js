export const indentConfig = {
  tips: ['增加缩进(Tab)'],
  onClick: ({ editor }) => {
    editor.chain().focus().indent().run()
  },
  isActive: ({ editor }) => editor.isActive('indent'),
  isDisabled: ({ editor }) => !editor.can().indent(),
}
