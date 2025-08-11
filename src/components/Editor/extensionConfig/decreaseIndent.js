export const decreaseIndentConfig = {
  tips: ['减少缩进(Shift+Tab)'],
  onClick: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleDecreaseIndent().run()
      : editor.commands.toggleDecreaseIndent()
  },
  isActive: ({ editor }) => editor.isActive('decreaseIndent'),
  isDisabled: ({ editor }) => !editor.can().toggleDecreaseIndent(),
}
