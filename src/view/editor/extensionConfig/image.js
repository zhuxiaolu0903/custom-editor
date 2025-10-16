/*export const imageConfig = {
  tips: ['图片'],
  onClick: ({ editor }) => {
    editor.chain().focus().setImageUploadNode().run()
  },
  isActive: ({ editor }) => editor.isActive('setImageUploadNode'),
  isDisabled: ({ editor }) => !editor.can().setImageUploadNode(),
}*/
export const imageConfig = {
  tips: ['图片'],
  onChange: ({ editor, value }) => {
    for (let file of value) {
      editor.chain().focus().uploadImage({ file }).run()
    }
  },
  isActive: () => true,
  isDisabled: () => false,
}
