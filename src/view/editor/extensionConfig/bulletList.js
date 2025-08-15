export const bulletListConfig = {
  tips: ['无序列表', 'Markdown: - + 空格'],
  onClick: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleBulletList().run()
      : editor.commands.toggleBulletList()
  },
  isActive: ({ editor }) => editor.isActive('bulletList'),
  isDisabled: ({ editor }) => !editor.can().toggleBulletList(),
}
