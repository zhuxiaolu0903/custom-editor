export const italicConfig = {
  tips: ['斜体（Ctrl+I）', 'Markdown: *文字* + 空格'],
  onClick: ({ editor }) => editor.chain().focus().toggleItalic().run(),
  isActive: ({ editor }) => editor.isActive('italic'),
  isDisabled: ({ editor }) => !editor.can().toggleItalic(),
}
