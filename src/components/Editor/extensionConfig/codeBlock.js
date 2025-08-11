export const codeBlockConfig = {
  tips: ['插入代码块', 'Markdown: ``` + 空格'],
  onClick: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
      : editor.commands.toggleCodeBlock()
  },
  isActive: ({ editor }) => editor.isActive('codeBlock'),
  isDisabled: ({ editor }) => !editor.can().toggleCodeBlock(),
}
