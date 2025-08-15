export const blockquoteConfig = {
  tips: ['引用', 'Markdown: > + 空格'],
  onClick: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleBlockquote().run()
      : editor.commands.toggleBlockquote()
  },
  isActive: ({ editor }) => editor.isActive('blockquote'),
  isDisabled: ({ editor }) => !editor.can().toggleBlockquote(),
}
