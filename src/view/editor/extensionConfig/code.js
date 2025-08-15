export const codeConfig = {
  tips: ['插入代码'],
  onClick: ({ editor }) => editor.chain().focus().toggleCode().run(),
  isActive: ({ editor }) => editor.isActive('code'),
  isDisabled: ({ editor }) => !editor.can().toggleCode(),
}
