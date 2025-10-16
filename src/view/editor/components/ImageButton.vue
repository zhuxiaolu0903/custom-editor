<script>
import { IconButton } from '@/components'

export default {
  name: 'ImageButton',
  props: {
    tips: {
      type: Array,
      default: () => [],
    },
    editor: {
      type: Object,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  components: { IconButton },
  methods: {
    handleFileUpload(event) {
      // 取消冒泡
      event.stopPropagation()
      this.$refs.fileInputRef.click()
    },
    handleFileChange() {
      const files = this.$refs.fileInputRef?.files
      this.$emit('change', { value: files })
      this.$refs.fileInputRef.value = ''
    },
  },
}
</script>

<template>
  <IconButton :tips="tips" :is-active="false" :is-disabled="isDisabled">
    <span @click="handleFileUpload">
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        multiple
        style="display: none"
        @change="handleFileChange"
      />
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="mp-icon-container">
        <g fill="#39404D" transform="translate(5 6)" fill-rule="evenodd">
          <path
            d="M14 0a1 1 0 011 1v11a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h13zm-.5 1.6h-12v10h12v-10z"
          ></path>
          <circle cx="5.25" cy="4.25" r="1.25"></circle>
          <path
            d="M11 5l2.999 3L14 12l.249-.001L14 13H6v-.001L1 13l-.334-1.001L1 12 .999 9.25 4 7l2.501 2.5L11 5z"
          ></path>
        </g>
      </svg>
    </span>
  </IconButton>
</template>

<style scoped lang="scss"></style>
