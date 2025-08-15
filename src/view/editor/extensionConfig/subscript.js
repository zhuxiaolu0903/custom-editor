export const subscriptConfig = {
  tips: ['上标'],
  onClick: ({ editor }) => editor.chain().focus().toggleSubscript().run(),
  isActive: ({ editor }) => editor.isActive('subscript'),
  isDisabled: ({ editor }) => !editor.can().toggleSubscript(),
}
