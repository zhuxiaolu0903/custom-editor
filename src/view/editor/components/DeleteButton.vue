<template>
  <IconButton :tips="tips" :is-active="isActive" :is-disabled="isDisabled" @click="$emit('click')">
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="mp-icon-container">
      <path
        d="M17 9.25a.75.75 0 01.743.648l.007.102v7a2.75 2.75 0 01-2.582 2.745L15 19.75H9a2.75 2.75 0 01-2.745-2.582L6.25 17v-7a.75.75 0 011.493-.102L7.75 10v7c0 .647.492 1.18 1.122 1.244L9 18.25h6a1.25 1.25 0 001.244-1.122L16.25 17v-7a.75.75 0 01.75-.75zm-6.5 1a.75.75 0 01.743.648l.007.102v4.643a.75.75 0 01-1.493.102l-.007-.102V11a.75.75 0 01.75-.75zm3 0a.75.75 0 01.743.648l.007.102v4.643a.75.75 0 01-1.493.102l-.007-.102V11a.75.75 0 01.75-.75zm4.5-3.5a.75.75 0 01.102 1.493L18 8.25H6a.75.75 0 01-.102-1.493L6 6.75h12zm-4-2.5a.75.75 0 01.102 1.493L14 5.75h-4a.75.75 0 01-.102-1.493L10 4.25h4z"
        fill="#5C6473"
        fill-rule="nonzero"
      ></path>
    </svg>
  </IconButton>
</template>

<script>
import { IconButton } from '@/components'

export default {
  name: 'DeleteButton',
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
