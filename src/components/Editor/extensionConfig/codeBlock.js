export const codeBlockConfig = {
  tips: ['插入代码块', 'Markdown: ``` + 空格'],
  onClick: ({ editor }) => editor.chain().focus().toggleCodeBlock().run(),
  isActive: ({ editor }) => editor.isActive('codeBlock'),
  isDisabled: ({ editor }) => !editor.can().toggleCodeBlock(),
}
