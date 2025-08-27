export const blockquoteConfig = {
  tips: ['引用', 'Markdown: > + 空格'],
  onClick: ({ editor }) => {
    editor.chain().focus().toggleBlockquote().run()
  },
  isActive: ({ editor }) => editor.isActive('blockquote'),
  isDisabled: ({ editor }) => !editor.can().toggleBlockquote(),
}
