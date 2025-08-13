import { Link } from '@tiptap/extension-link'
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state'
import { getMarkRange } from '@tiptap/vue-2'

/**
 * 扩展 Link,支持焦点在链接区域时，全选中链接文本，触发 bubble-menu 扩展
 */
export const ExtendLink = Link.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('link-click-select-all'),
        props: {
          handleClick(view, pos) {
            const { schema, doc, tr } = view.state
            const range = getMarkRange(doc.resolve(pos), schema.marks.link)
            if (!range) return false
            const $start = doc.resolve(range.from)
            const $end = doc.resolve(range.to)
            const transaction = tr.setSelection(new TextSelection($start, $end))
            view.dispatch(transaction)
            return true
          },
        },
      }),
    ]
  },
})
