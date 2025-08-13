<template>
  <BaseTooltip :disabled="!tips">
    <div slot="content" class="tip-content">
      <p class="base-tooltip-text" v-for="name in tips" :key="name">{{ name }}</p>
    </div>
    <div
      class="icon-btn"
      :class="{ 'is-active': isActive, 'is-disabled': isDisabled }"
      @click="onClick"
      @dblclick="onDoubleClick"
    >
      <slot></slot>
    </div>
  </BaseTooltip>
</template>

<script>
import { BaseTooltip } from '@/components/Editor/baseComponents'

export default {
  name: 'IconButton',
  components: { BaseTooltip },
  props: {
    tips: {
      type: Array,
      default: () => [],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (this.isDisabled) return
      this.$emit('click')
    },
    onDoubleClick() {
      if (this.isDisabled) return
      this.$emit('dblclick')
    },
  },
}
</script>

<style lang="scss">
.tip-content {
  p {
    margin: 0;
  }
}
.icon-btn {
  display: flex;
  gap: 4px;
  &.is-disabled svg {
    cursor: not-allowed;
    path,
    rect {
      fill: #c8c9cc;
    }
  }
  &.is-active:not(.is-disabled) svg {
    background-color: #f2f3f5;
    path,
    rect {
      fill: #0000ee;
    }
  }
}
svg {
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f2f3f5;
  }
}
</style>
