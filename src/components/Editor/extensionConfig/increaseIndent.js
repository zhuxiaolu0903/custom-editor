export const increaseIndentConfig = {
  tips: ['增加缩进(Tab)'],
  onClick: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleIncreaseIndent().run()
      : editor.commands.toggleIncreaseIndent()
  },
  isActive: ({ editor }) => editor.isActive('increaseIndent'),
  isDisabled: ({ editor }) => !editor.can().toggleIncreaseIndent(),
}
