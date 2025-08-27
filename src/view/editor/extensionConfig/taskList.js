export const taskListConfig = {
  tips: ['待办列表', 'Markdown: [] + 空格'],
  onClick: ({ editor }) => {
    editor.chain().focus().toggleTaskList().run()
  },
  isActive: ({ editor }) => editor.isActive('taskList'),
  isDisabled: () => false,
}
