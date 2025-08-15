<template>
  <BaseTrigger
    ref="triggerRef"
    trigger="mouseenter"
    @show="onShow"
    @hide="onHide"
    :disabled="isDisabled"
  >
    <IconButton
      :tips="tips"
      :is-active="false"
      :is-disabled="isDisabled"
      class="select-btn-container"
    >
      <span class="selected-content">{{ curSelected.label }}</span>
      <svg
        width="8"
        height="8"
        xmlns="http://www.w3.org/2000/svg"
        :class="['fold-icon-container', isShowPanel && 'folding']"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            d="M3.993 6.034a.498.498 0 01-.311-.145L.854 3.061a.5.5 0 11.707-.707l2.5 2.5 2.5-2.5a.5.5 0 11.707.707L4.439 5.889a.498.498 0 01-.31.145z"
            fill="#74767A"
          ></path>
        </g>
      </svg>
    </IconButton>
    <div slot="content">
      <div
        v-for="item in options"
        :key="item.value"
        :class="[
          'drop-menu-item',
          curSelected.value === item.value && 'is-active',
          'heading-option-' + item.value,
        ]"
        @click="onClick(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </BaseTrigger>
</template>

<script>
import { BaseTrigger, IconButton } from '@/components'

export default {
  name: 'FontFamilyButton',
  components: { BaseTrigger, IconButton },
  props: {
    value: Number,
    isDisabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    tips: {
      type: Array,
      default: () => [],
    },
    isActive: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {
      isShowPanel: false,
    }
  },
  methods: {
    onShow() {
      this.isShowPanel = true
    },
    onHide() {
      this.isShowPanel = false
    },
    onClick(value) {
      this.$emit('click', { value })
      // 手动隐藏弹层
      this.$refs.triggerRef.hide()
    },
  },
  computed: {
    curSelected() {
      const target = this.options.find((item) => this.isActive(item.value))
      return target || this.options[0]
    },
  },
}
</script>

<style scoped lang="scss"></style>
