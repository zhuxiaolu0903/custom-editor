import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu'
import { posToDOMRect } from '@tiptap/vue-2'

export const ImageBubble = {
  name: 'ImageBubble',
  props: {
    pluginKey: {
      type: [String],
      default: 'ImageBubble',
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
      default: () => {
        return {
          placement: 'top-start',
          offset: 8,
        }
      },
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
                return this.editor.isActive('imageNode')
              },
              getReferencedVirtualElement: () => {
                const { ranges } = editor.state.selection
                const from = Math.min(...ranges.map((range) => range.$from.pos))
                const to = Math.max(...ranges.map((range) => range.$to.pos))
                const { view } = editor
                let node = view.nodeDOM(from)
                if (!node || typeof node.querySelector !== 'function') return null
                const imageEl = node.querySelector('img')
                const domRect = posToDOMRect(view, from, to)
                if (imageEl) {
                  const imgRect = imageEl.getBoundingClientRect()
                  return {
                    getBoundingClientRect: () => {
                      return {
                        ...domRect,
                        left: Math.min(
                          domRect.width - 80,
                          Math.max(30, imgRect.left + imgRect.width * 0.5 - 100)
                        ),
                      }
                    },
                  }
                }
                return null
              },
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
