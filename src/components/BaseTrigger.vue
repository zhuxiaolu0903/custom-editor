<template>
  <div class="base-trigger-wrapper">
    <div class="base-trigger__btn" ref="triggerRef">
      <slot name="default"></slot>
    </div>
    <div class="drop-menu-container" ref="tooltipContentRef">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { createTippy } from './createTippy'

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
    trigger: {
      type: String,
      default: 'click',
    },
  },
  mounted() {
    this.tippyInstance = createTippy(this.$refs.triggerRef, {
      content: this.$refs.tooltipContentRef,
      trigger: this.trigger,
      hideOnClick: true,
      placement: 'bottom',
      // appendTo: 'parent',
      ...this.tippyOptions,
      onShow: (instance) => {
        this.$emit('show', instance)
      },
      onHide: (instance) => {
        this.$emit('hide', instance)
      },
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
}
</style>
