export const taskListConfig = {
  tips: ['待办列表', 'Markdown: [] + 空格'],
  onClick: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleTaskList().run()
      : editor.commands.toggleTaskList()
  },
  isActive: ({ editor }) => editor.isActive('taskList'),
  isDisabled: ({ editor }) => !editor.can().toggleTaskList(),
}
