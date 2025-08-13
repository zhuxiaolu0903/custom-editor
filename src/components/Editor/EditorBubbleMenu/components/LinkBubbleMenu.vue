<template>
  <div class="link-bubble-menu-container">
    <div class="link-content" @click="handleVisitLink">
      <IconButton :tips="['访问链接']">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="24"
          height="24"
          viewBox="-4 -4 32 32"
          class="iconify iconify--isle-editor"
          style="color: currentcolor; vertical-align: middle; display: inline-block"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6m10 0l-9 9m3-9h6v6"
          ></path>
        </svg>
        <span class="link-text">{{ linkData.href }}</span>
      </IconButton>
    </div>
    <Divider />
    <LinkButton
      :tips="['编辑链接']"
      is-edit
      :editor="editor"
      :is-active="false"
      :is-disabled="false"
      @click="(config) => linkConfig.onClick({ editor, ...config })"
    />
    <IconButton :tips="['取消链接']" @click="handleCancelLink">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="24"
        height="24"
        viewBox="-4 -4 32 32"
        class="iconify iconify--isle-editor"
        style="color: currentcolor; vertical-align: middle; display: inline-block"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07a5.006 5.006 0 0 0-6.95 0l-1.72 1.71m-6.58 6.57l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07a5.006 5.006 0 0 0 6.95 0l1.71-1.71M8 2v3M2 8h3m11 11v3m3-6h3"
        ></path>
      </svg>
    </IconButton>
  </div>
</template>

<script>
import { Divider } from '@/components/Editor/baseComponents'
import IconButton from '@/components/Editor/components/IconButton.vue'
import { LinkButton } from '@/components/Editor/components'
import { linkConfig } from '@/components/Editor/extensionConfig'

export default {
  name: 'LinkBubbleMenu',
  components: { LinkButton, IconButton, Divider },
  props: {
    editor: {
      required: true,
    },
  },
  methods: {
    // 访问链接
    handleVisitLink() {
      const { href, target } = this.linkData
      window.open(href, target)
    },
    // 取消链接
    handleCancelLink() {
      this.editor.chain().focus().unsetLink().run()
    },
  },
  computed: {
    linkConfig() {
      return linkConfig
    },
    linkData() {
      return this.editor.getAttributes('link')
    },
  },
}
</script>

<style scoped lang="scss">
.link-bubble-menu-container {
  display: flex;
  gap: 8px;
  align-items: center;
  .link-content {
    display: flex;
    align-items: center;
    gap: 8px;
    .link-text {
      display: inline-block;
      max-width: 250px;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .icon-content {
    cursor: pointer;
  }
}
</style>
