export const strikeConfig = {
  tips: ['删除线（Ctrl+Shift+X）', 'Markdown: ~~文字~~ + 空格'],
  onClick: ({ editor }) => editor.chain().focus().toggleStrike().run(),
  isActive: ({ editor }) => editor.isActive('strike'),
  isDisabled: ({ editor }) => !editor.can().toggleStrike(),
}
