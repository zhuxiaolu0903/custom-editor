export const orderedListConfig = {
  tips: ['有序列表', 'Markdown: 1. + 空格'],
  onClick: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      : editor.commands.toggleOrderedList()
  },
  isActive: ({ editor }) => editor.isActive('orderedList'),
  isDisabled: ({ editor }) => !editor.can().toggleOrderedList(),
}
