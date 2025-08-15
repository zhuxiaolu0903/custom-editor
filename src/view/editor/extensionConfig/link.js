import { getMarkRange } from '@tiptap/vue-2'

export const linkConfig = {
  tips: ['超链接（Ctrl+K）', 'Markdown: [文本](链接) + 空格'],
  onClick: ({ editor, text, href, target = '_blank', isEdit = false }) => {
    const { selection, doc, schema } = editor.state
    const { from, empty } = selection
    const chain = editor.chain().focus()
    // 编辑时可能没有选区，有选区也不一定是编辑。不能按是否有选区来判断是否是编辑
    // 新增
    if (!isEdit) {
      // 判断是否有选区
      if (empty) {
        // 无选区，直接在光标处插入内容
        // 边界-空编辑器下
        if (editor.isEmpty) {
          editor.commands.insertContent('<p></p>')
        }
        // 插入新文本并添加链接
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
        // 有选区，直接替换选区文本
        chain.extendMarkRange('link').setLink({ href, target }).run()
      }
    } else {
      // 编辑
      // 判断是否有选区
      if (empty) {
        // 无选区，需要手动删除链接，再插入内容
        const $pos = doc.resolve(from) // 获取链接标记
        const linkMark = schema.marks.link
        // 使用 getMarkRange 获取链接的完整范围
        const range = getMarkRange($pos, linkMark)
        if (range) {
          const { from: start, to: end } = range
          // 替换整个链接
          chain
            .setTextSelection({ from: start, to: end }) // 选中整个链接
            .deleteSelection() // 删除原链接
            .insertContent({
              type: 'text',
              text,
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
            .run()
        }
      } else {
        // 有选区，删除当前选区内容，再插入内容
        chain
          .deleteSelection()
          .insertContent({
            type: 'text',
            text, // 要替换的新文本
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
          .run()
      }
    }
  },
  // isActive: ({ editor }) => editor.isActive('link'),
  isActive: () => false, // 工具栏只新增
  isDisabled: ({ editor }) => !editor.can().setLink({ href: '' }),
}
