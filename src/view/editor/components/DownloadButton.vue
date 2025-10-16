<template>
  <IconButton :tips="tips" :is-active="isActive" :is-disabled="isDisabled">
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="mp-icon-container">
      <path
        d="M18.75 12.331a.75.75 0 01.743.648l.007.102v4.25a1.75 1.75 0 01-1.606 1.744l-.144.006h-11a1.75 1.75 0 01-1.744-1.606L5 17.33v-4.25a.75.75 0 011.493-.102l.007.102v4.25a.25.25 0 00.193.243l.057.007h11a.25.25 0 00.243-.193l.007-.057v-4.25a.75.75 0 01.75-.75zM12.124 6a.75.75 0 01.75.75l.001 6.817 1.345-1.344a.75.75 0 011.06 1.06l-2.475 2.476a.75.75 0 01-.677.205.748.748 0 01-.676-.205l-2.475-2.475a.75.75 0 111.06-1.061l1.338 1.336V6.75a.75.75 0 01.75-.75z"
        fill="#5C6473"
        fill-rule="nonzero"
      ></path>
    </svg>
  </IconButton>
</template>

<script>
import { IconButton } from '@/components'

export default {
  name: 'DownloadButton',
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
