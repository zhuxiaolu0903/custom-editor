export const orderedListConfig = {
  tips: ['有序列表', 'Markdown: 1. + 空格'],
  onClick: ({ editor }) => {
    editor.chain().focus().toggleOrderedList().run()
  },
  isActive: ({ editor }) => editor.isActive('orderedList'),
  isDisabled: () => false,
}
