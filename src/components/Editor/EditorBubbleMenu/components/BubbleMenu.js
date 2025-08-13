import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu'

export const BubbleMenu = {
  name: 'BubbleMenu',
  props: {
    pluginKey: {
      type: [String],
      default: 'bubbleMenu',
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
    shouldShow: {
      type: Function,
      default: null,
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
              shouldShow: this.shouldShow,
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
