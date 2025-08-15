export const undoConfig = {
  tips: ['撤销（Ctrl+Z）'],
  onClick: ({ editor }) => editor.chain().focus().undo().run(),
  isActive: ({ editor }) => {
    return editor.isActive('undo')
  },
  isDisabled: ({ editor }) => !editor.can().undo(),
}
