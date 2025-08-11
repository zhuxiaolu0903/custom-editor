<template>
  <div class="base-trigger-wrapper">
    <div class="base-trigger__btn" ref="triggerRef">
      <slot name="default"></slot>
    </div>
    <div class="base-trigger__content" ref="tooltipContentRef">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { createTippy } from '@/components/Editor/common/createTippy'

export default {
  name: 'BaseTrigger',
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
    this.tippyInstance = createTippy(this.$refs.triggerRef, {
      content: this.$refs.tooltipContentRef,
      trigger: 'click',
      hideOnClick: true,
      placement: 'bottom',
      // appendTo: 'parent',
      ...this.tippyOptions,
    })
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
.base-trigger__content {
  background: #ffffff;
  border: 1px solid #e9e9e9;
  overflow: auto;
  box-shadow: 0 2px 5px 2px #0000001a;
  padding: 5px 0;
  border-radius: 3px;
  color: #333333;
}
</style>
