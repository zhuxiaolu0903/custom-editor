<script>
export default {
  name: 'DynamicRenderer',
  functional: true, // 使用函数式组件提高性能
  props: {
    component: {
      type: [Object, Function],
      required: true,
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
    slots: {
      type: Object,
      default: () => ({}),
    },
  },
  render(createElement, context) {
    const { component, props, events, slots } = context.props

    // 处理事件
    const on = {}
    Object.keys(events).forEach((eventName) => {
      on[eventName] = events[eventName]
    })

    // 处理插槽
    const scopedSlots = {}
    Object.keys(slots).forEach((slotName) => {
      scopedSlots[slotName] = (props) => {
        const slotContent = slots[slotName]
        if (typeof slotContent === 'function') {
          return slotContent(props)
        }
        return slotContent
      }
    })
    return createElement(component, {
      props,
      on,
      scopedSlots,
    })
  },
}
</script>
