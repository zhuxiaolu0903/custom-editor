import { Extension } from '@tiptap/vue-2'

/**
 * 用于换行后，清除当前选区的所有标记
 * @type {Extension<any, any>}
 */
export const ResetOnEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        // 获取当前活动标记
        const marks = this.editor.state.selection.$from.marks()
        // 如果有活动标记则取消
        if (marks.length > 0) {
          marks.forEach((mark) => {
            this.editor.commands.unsetMark(mark.type.name)
          })
        }
        // 仍然执行默认的换行行为
        return false
      },
    }
  },
})
