export const linkConfig = {
  tips: ['超链接（Ctrl+K）', 'Markdown: [文本](链接) + 空格'],
  onClick: ({ editor, text, href, target = '_blank', mode = 'add' }) => {
    const { selection } = editor.state
    const { from, empty } = selection
    if (empty && mode === 'add') {
      if (editor.isEmpty) {
        editor.commands.insertContent('<p></p>')
      }
      // 无选区，插入新文本并添加链接
      editor.commands.insertContentAt(from, {
        type: 'text',
        text: text,
        marks: [
          {
            type: 'link',
            attrs: {
              href,
              target,
            },
          },
        ],
      })
    } else {
      // 将选区文本转换为链接
      editor.chain().focus().extendMarkRange('link').setLink({ href, target, text: 'aaa' }).run()
    }
  },
  isActive: ({ editor }) => editor.isActive('link'),
  isDisabled: ({ editor }) => !editor.can().setLink({ href: '' }),
}
