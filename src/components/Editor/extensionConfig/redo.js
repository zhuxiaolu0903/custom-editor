export const redoConfig = {
  tips: ['重做（Ctrl+Y）'],
  onClick: ({ editor }) => editor.chain().focus().redo().run(),
  isActive: ({ editor }) => editor.isActive('redo'),
  isDisabled: ({ editor }) => !editor.can().redo(),
}
