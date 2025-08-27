export const outdentConfig = {
  tips: ['减少缩进(Shift+Tab)'],
  onClick: ({ editor }) => {
    editor.chain().focus().outdent().run()
  },
  isActive: ({ editor }) => editor.isActive('outdent'),
  isDisabled: ({ editor }) => !editor.can().outdent(),
}
