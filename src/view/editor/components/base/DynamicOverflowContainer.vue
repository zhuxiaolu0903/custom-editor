<template>
  <div class="dynamic-overflow-container" ref="containerRef">
    <!-- 可见区域 -->
    <div class="visible-area" ref="visibleRef">
      <div
        v-for="item in visibleItems"
        :key="getItemKey(item)"
        class="item-wrapper"
        :ref="setItemRef"
      >
        <DynamicRenderer
          :component="item.component"
          :props="item.props"
          :events="item.events"
          :slots="item.slots"
        />
      </div>
    </div>
    <!-- 溢出触发器 -->
    <div class="overflow-trigger-container" v-if="overflowItems.length > 0" ref="triggerRef">
      <IconButton>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="mp-icon-container">
          <path
            d="M5.5 10a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm6 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm6 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
            fill="#74767A"
            fill-rule="evenodd"
          ></path>
        </svg>
      </IconButton>
    </div>
    <!-- 隐藏的弹层内容 -->
    <div class="popover-content-wrapper" ref="popoverContentRef">
      <div class="popover-content-container">
        <div v-for="item in overflowItems" :key="getItemKey(item)">
          <DynamicRenderer
            :component="item.component"
            :props="item.props"
            :events="item.events"
            :slots="item.slots"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tippy from 'tippy.js'
import IconButton from '@/components/IconButton.vue'

// DynamicRenderer 组件
const DynamicRenderer = {
  name: 'DynamicRenderer',
  functional: true,
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

    const on = {}
    Object.keys(events).forEach((eventName) => {
      on[eventName] = events[eventName]
    })

    const scopedSlots = {}
    Object.keys(slots).forEach((slotName) => {
      scopedSlots[slotName] = (slotProps) => {
        const slotContent = slots[slotName]
        if (typeof slotContent === 'function') {
          return slotContent(slotProps)
        }
        return slotContent
      }
    })

    return createElement(component, { props, on, scopedSlots })
  },
}

export default {
  name: 'DynamicOverflowContainer',
  components: {
    IconButton,
    DynamicRenderer,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    widthStrategy: {
      type: String,
      default: 'auto',
      validator: (val) => ['auto', 'fixed', 'callback'].includes(val),
    },
    getItemWidth: {
      type: Function,
      default: null,
    },
    triggerWidth: {
      type: Number,
      default: 40,
    },
    itemGap: {
      type: Number,
      default: 8,
    },
    // 防抖延迟
    debounceDelay: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      visibleItems: [],
      overflowItems: [],
      containerWidth: 0,
      itemWidths: new Map(),
      itemRefs: [],
      tippyInstance: null,
      resizeObserver: null,
      calculationTimeout: null,
      isCalculating: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeLayout()
    })
  },
  beforeDestroy() {
    this.cleanup()
  },
  methods: {
    // 初始化布局
    async initializeLayout() {
      await this.$nextTick()
      this.setupResizeObserver()
    },

    // 设置元素引用
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },

    // 获取项的唯一标识
    getItemKey(item) {
      return (
        item.id || item.key || `${item.component.name}-${Math.random().toString(36).substr(2, 9)}`
      )
    },

    // 设置 ResizeObserver（优化版）
    setupResizeObserver() {
      this.resizeObserver = new ResizeObserver(() => {
        // 使用防抖避免频繁计算
        this.debounceCalculation()
      })

      if (this.$refs.containerRef) {
        this.resizeObserver.observe(this.$refs.containerRef)
      }
    },

    // 防抖计算
    debounceCalculation() {
      if (this.calculationTimeout) {
        clearTimeout(this.calculationTimeout)
      }
      this.calculationTimeout = setTimeout(() => {
        this.scheduleCalculation()
      }, this.debounceDelay)
    },

    // 安排计算任务
    scheduleCalculation() {
      if (this.isCalculating) {
        return
      }

      this.isCalculating = true

      // 使用 requestAnimationFrame 避免阻塞
      requestAnimationFrame(() => {
        this.calculateContainerWidth()
        this.$nextTick(() => {
          this.calculateItemWidths()
          this.updateLayout()
          this.isCalculating = false
        })
      })
    },

    // 计算容器宽度
    calculateContainerWidth() {
      if (this.$refs.containerRef) {
        this.containerWidth = this.$refs.containerRef.getBoundingClientRect().width
      }
    },

    // 计算每个项的宽度// 带缓存的版本
    calculateItemWidths() {
      // 如果 items 没有变化且已经有宽度数据，可以跳过计算
      if (this.itemWidths.size > 0 && this.items.length === this.itemWidths.size) {
        let shouldRecalculate = false
        // 检查是否有新的项或项的顺序发生变化
        for (let i = 0; i < this.items.length; i++) {
          const itemKey = this.getItemKey(this.items[i])
          if (!this.itemWidths.has(itemKey)) {
            shouldRecalculate = true
            break
          }
        }
        if (!shouldRecalculate) {
          this.itemRefs = []
          return
        }
      }

      this.itemWidths.clear()

      this.itemRefs.forEach((wrapperEl, index) => {
        if (index < this.items.length) {
          const item = this.items[index]

          if (!wrapperEl || !wrapperEl.firstChild) {
            this.itemWidths.set(this.getItemKey(item), 0)
            return
          }

          let width = 0

          switch (this.widthStrategy) {
            case 'fixed':
              width = this.getItemWidth ? this.getItemWidth(item) : 0
              break
            case 'callback':
              width = this.getItemWidth ? this.getItemWidth(item, wrapperEl) : 0
              break
            case 'auto':
            default:
              // eslint-disable-next-line no-case-declarations
              const rect = wrapperEl.firstChild.getBoundingClientRect()
              // 分割线的宽度为1，需要加上 16px 的 margin
              width = rect.width === 1 ? rect.width + 16 : rect.width
              break
          }

          this.itemWidths.set(this.getItemKey(item), Math.ceil(width))
        }
      })

      this.itemRefs = []
    },

    // 更新布局
    updateLayout() {
      if (this.items.length === 0) {
        this.visibleItems = []
        this.overflowItems = []
        return
      }
      const availableWidth = Math.max(0, this.containerWidth - this.triggerWidth - this.itemGap)
      let currentWidth = 0
      const visible = []
      const overflow = []
      let isStop = false

      for (const item of this.items) {
        const itemKey = this.getItemKey(item)
        const itemWidth = this.itemWidths.get(itemKey) || 0
        const totalWidth = itemWidth + this.itemGap
        // 如果当前项是第一个，或者还有空间，就放入可见区域
        if (!isStop && (visible.length === 0 || currentWidth + totalWidth <= availableWidth)) {
          visible.push(item)
          currentWidth += totalWidth
        } else {
          // 如果第一个被隐藏的组件是分割线，则不添加到 overflow 中
          if (isStop || itemKey.indexOf('|') === -1) {
            overflow.push(item)
          }
          // 停止后，后面的都算溢出
          isStop = true
        }
      }

      this.visibleItems = visible
      this.overflowItems = overflow

      this.handleTippyInstance()
    },

    // 处理 Tippy 实例
    handleTippyInstance() {
      if (this.overflowItems.length > 0) {
        this.$nextTick(() => {
          if (!this.tippyInstance && this.$refs.triggerRef) {
            this.initTippy()
          } else if (this.tippyInstance) {
            // 更新现有实例
            this.tippyInstance.setProps({
              content: this.$refs.popoverContentRef,
            })
          }
        })
      } else if (this.tippyInstance) {
        this.tippyInstance.destroy()
        this.tippyInstance = null
      }
    },

    // 初始化 Tippy
    initTippy() {
      if (!this.$refs.triggerRef || !this.$refs.popoverContentRef) return

      try {
        this.tippyInstance = tippy(this.$refs.triggerRef, {
          content: this.$refs.popoverContentRef,
          allowHTML: true,
          interactive: true,
          placement: 'bottom-end',
          theme: 'light-border',
          appendTo: () => document.body,
          maxWidth: '500px',
          offset: [0, 10],
          duration: [200, 150],
        })
      } catch (error) {
        console.warn('Tippy initialization failed:', error)
      }
    },

    // 清理资源
    cleanup() {
      if (this.calculationTimeout) {
        clearTimeout(this.calculationTimeout)
      }
      if (this.tippyInstance) {
        this.tippyInstance.destroy()
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
      }
    },

    // 重新计算布局（外部可调用）
    recalculate() {
      this.scheduleCalculation()
    },
  },
}
</script>

<style scoped>
.dynamic-overflow-container {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.visible-area {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: v-bind(itemGap + 'px');
  min-width: 0;
}

.item-wrapper {
  flex-shrink: 0;
}

.overflow-trigger-container {
  margin-left: 8px;
}

.popover-content-wrapper {
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 1px 5px 0 #5c647333;
  padding: 5px 8px;
  color: #333333;
  .popover-content-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
}
</style>
