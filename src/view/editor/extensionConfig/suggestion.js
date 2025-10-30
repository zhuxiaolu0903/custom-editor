import { posToDOMRect, VueRenderer } from '@tiptap/vue-2'
import { computePosition, flip, shift } from '@floating-ui/dom'
import { MentionList } from '@/view/editor/components'

// 设置弹层位置
const updatePosition = (editor, element) => {
  // 虚拟元素 https://floating.nodejs.cn/docs/virtual-elements
  const virtualElement = {
    getBoundingClientRect: () =>
      posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  }
  computePosition(virtualElement, element, {
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content'
    element.style.position = strategy
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  })
}

export const suggestion = {
  items: ({ query }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          [
            {
              id: '时间',
              label: '时间',
            },
            {
              id: '日期',
              label: '日期',
            },
          ].filter((item) => item.label.indexOf(query) > -1)
        )
      }, 500)
    })
  },
  char: '@', // 触发字符
  allowedPrefixes: null, // 允许的前缀字符，null 表示任意字符均可
  render: () => {
    let component = null
    return {
      onStart: (props) => {
        component = new VueRenderer(MentionList, {
          parent: this,
          propsData: props,
        })
        if (!props.clientRect) {
          return
        }
        component.element.style.position = 'absolute'
        document.body.appendChild(component.element)
        updatePosition(props.editor, component.element)
      },
      onUpdate: (props) => {
        component.updateProps(props)
        if (!props.clientRect) {
          return
        }
        updatePosition(props.editor, component.element)
      },
      onKeyDown: (props) => {
        // 支持使用 esc 键退出
        if (props.event.key === 'Escape') {
          component.destroy()
          return true
        }
        // 调用组件的方法
        return component.ref?.onKeyDown(props)
      },
      onExit: () => {
        component.element.remove()
        component.destroy()
      },
    }
  },
}
