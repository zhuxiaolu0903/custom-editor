export const superscriptConfig = {
  tips: ['下标'],
  onClick: ({ editor }) => editor.chain().focus().toggleSuperscript().run(),
  isActive: ({ editor }) => editor.isActive('superscript'),
  isDisabled: ({ editor }) => !editor.can().toggleSuperscript(),
}
