export const imageConfig = {
  tips: ['图片'],
  onClick: ({ editor }) => {
    editor.chain().focus().setImageUploadNode().run()
  },
  isActive: ({ editor }) => editor.isActive('setImageUploadNode'),
  isDisabled: ({ editor }) => !editor.can().setImageUploadNode(),
}
