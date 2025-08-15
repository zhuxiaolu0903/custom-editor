<template>
  <BaseTrigger ref="triggerRef" @show="onShow">
    <IconButton
      :tips="tips"
      :is-active="isActive"
      :is-disabled="isDisabled"
      class="select-btn-container"
    >
      <svg width="24" height="24" viewBox="-3 -3 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <path
            d="M15 4.5h-2v-1H9.75l-.001 11H11V16H7v-1.5h1.249l.001-11H5v1H3V2h12v2.5z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
      <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" class="fold-icon-container">
        <g fill="none" fill-rule="evenodd">
          <path
            d="M3.993 6.034a.498.498 0 01-.311-.145L.854 3.061a.5.5 0 11.707-.707l2.5 2.5 2.5-2.5a.5.5 0 11.707.707L4.439 5.889a.498.498 0 01-.31.145z"
            fill="#74767A"
          ></path>
        </g>
      </svg>
    </IconButton>
    <div class="drop-menu-container" slot="content">
      <div></div>
    </div>
  </BaseTrigger>
</template>

<script>
import { BaseTrigger, IconButton } from '@/components'

export default {
  name: 'TextButton',
  components: { BaseTrigger, IconButton },
  props: {
    tips: {
      type: Array,
      default: () => [],
    },
    editor: {
      type: Object,
      // required: true,
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
    return {
      params: {
        text: '',
        href: '',
      },
    }
  },
  methods: {
    onShow() {},
    onSubmit() {},
  },
  computed: {
    checkRequired() {
      const { text, href } = this.params
      let check = false
      check = !text.trim() || !href.trim()
      return check
    },
  },
}
</script>

<style scoped lang="scss"></style>
