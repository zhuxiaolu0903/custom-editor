export const bulletListConfig = {
  tips: ['无序列表', 'Markdown: - + 空格'],
  onClick: ({ editor }) => {
    editor.chain().focus().toggleBulletList().run()
  },
  isActive: ({ editor }) => editor.isActive('bulletList'),
  isDisabled: () => false,
}
