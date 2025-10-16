export const deleteConfig = {
  tips: ['删除'],
  onClick: ({ editor }) => {
    editor.chain().focus().deleteSelection().run()
  },
}
