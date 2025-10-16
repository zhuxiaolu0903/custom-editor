<template>
  <IconButton :tips="tips" :is-active="isActive" :is-disabled="isDisabled" @click="$emit('click')">
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="mp-icon-container">
      <g fill="#39404D" fill-rule="evenodd">
        <path d="M5 6h14v1.5H5zM5 11h8v1.5H5zM5 16h14v1.5H5z"></path>
      </g>
    </svg>
  </IconButton>
</template>

<script>
import { IconButton } from '@/components'

export default {
  name: 'AlignLeftButton',
  components: { IconButton },
  props: {
    // 是否是编辑模式，区分 icon
    isEdit: {
      type: Boolean,
      default: false,
    },
    tips: {
      type: Array,
      default: () => [],
    },
    editor: {
      type: Object,
      required: true,
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
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
</script>

<style scoped lang="scss">
.link-button-content {
  padding: 8px;
  .form-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
