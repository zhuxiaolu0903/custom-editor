<template>
  <div class="base-tooltip-wrapper" ref="triggerRef">
    <slot name="default"></slot>
    <div class="base-tooltip" ref="tooltipContentRef" v-if="!disabled">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { createTippy } from './createTippy'

export default {
  name: 'BaseTooltip',
  props: {
    tippyOptions: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (!this.disabled) {
      this.tippyInstance = createTippy(this.$refs.triggerRef, {
        content: this.$refs.tooltipContentRef,
        allowHTML: false,
        duration: 0,
        getReferenceClientRect: null,
        interactive: true,
        trigger: 'mouseenter',
        placement: 'top',
        delay: [500, 250],
        hideOnClick: true,
        appendTo: () => document.body,
        ...this.tippyOptions,
      })
    }
  },
  methods: {
    enable() {
      if (this.tippyInstance) this.tippyInstance.enable()
    },
    hide() {
      if (this.tippyInstance) this.tippyInstance.hide()
    },
    show() {
      if (this.tippyInstance) this.tippyInstance.show()
    },
    setProps() {
      if (this.tippyInstance) this.tippyInstance.setProps()
    },
    disable() {
      if (this.tippyInstance) this.tippyInstance.disable()
    },
  },
  watch: {
    disabled(value) {
      value ? this.disable() : this.enable()
    },
  },
}
</script>

<style lang="scss">
.base-tooltip {
  width: auto;
  height: auto;
  padding: 3px;
  border-radius: 0.35rem;
  background-color: #030305;
  color: #fdfdfd;
  border: 1px solid #27272a;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 4px;
  .base-tooltip-text {
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    margin-left: 3px;
  }
}
</style>
