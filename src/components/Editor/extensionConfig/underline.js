export const underlineConfig = {
  tips: ['下划线（Ctrl+U）', 'Markdown: ~文字~ + 空格'],
  onClick: ({ editor }) => editor.chain().focus().toggleUnderline().run(),
  isActive: ({ editor }) => editor.isActive('underline'),
  isDisabled: ({ editor }) => !editor.can().toggleUnderline(),
}
