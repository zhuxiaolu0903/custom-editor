import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu'
import { getTextBetween } from '@tiptap/vue-2'

export const BaseBubble = {
  name: 'BaseBubble',
  props: {
    pluginKey: {
      type: [String],
      default: 'BaseBubble',
    },
    editor: {
      type: Object,
      required: true,
    },
    updateDelay: {
      type: Number,
    },
    options: {
      type: Object,
      default: () => {},
    },
    resizeDelay: {
      type: Number,
    },
  },
  watch: {
    editor: {
      handler(editor) {
        if (!editor) {
          return
        }
        this.$nextTick(() => {
          this.$el.style.visibility = 'hidden'
          this.$el.style.position = 'absolute'
          this.$el.remove()
          editor.registerPlugin(
            BubbleMenuPlugin({
              updateDelay: this.updateDelay,
              resizeDelay: this.resizeDelay,
              options: this.options,
              editor,
              element: this.$el,
              pluginKey: this.pluginKey,
              shouldShow: () => {
                const {
                  state: { selection },
                } = editor
                // 基础气泡扩展的显示条件：选区不为空
                return (
                  !selection.empty &&
                  getTextBetween(editor.state.doc, {
                    from: selection.from,
                    to: selection.to,
                  }).trim().length > 0
                )
              },
              tippyOptions: {},
            })
          )
        })
      },
      immediate: true,
    },
  },
  render(createElement) {
    return createElement('div', { style: { visibility: 'hidden' } }, this.$slots.default)
  },
  beforeDestroy() {
    this.editor.unregisterPlugin(this.pluginKey)
  },
}
