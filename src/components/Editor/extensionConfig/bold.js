export const boldConfig = {
  tips: ['加粗（Ctrl+B）', 'Markdown: **文字** + 空格'],
  onClick: ({ editor }) => editor.chain().focus().toggleBold().run(),
  isActive: ({ editor }) => editor.isActive('bold'),
  isDisabled: ({ editor }) => !editor.can().toggleBold(),
}
