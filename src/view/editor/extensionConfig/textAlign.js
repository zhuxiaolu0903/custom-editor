const textAlignOptions = [
  { label: '左对齐', value: 'left' },
  { label: '水平居中', value: 'center' },
  { label: '右对齐', value: 'right' },
]
export const textAlignConfig = {
  options: textAlignOptions,
  onClick: ({ editor, value }) => {
    editor.chain().focus().setTextAlign(value).run()
  },
  isActive: ({ editor, value }) => editor.isActive({ textAlign: value }),
  isDisabled: () => false,
}
