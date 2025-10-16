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
    <IconButton :tips="['复制链接']" @click="handleCopyLink" ref="copyBtnRef">
      <svg
        v-if="copyOk"
        t="1755137449234"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7105"
        width="24"
        height="24"
      >
        <path
          d="M896 288a32 32 0 0 0-54.656-22.592L418.656 688.096 184.992 396l-0.112 0.08a31.872 31.872 0 1 0-49.76 39.824l-0.112 0.096 256 320 0.112-0.08a31.872 31.872 0 0 0 47.52 2.688l447.952-447.952c5.824-5.808 9.408-13.808 9.408-22.656z"
          fill="#00b42a"
          p-id="7106"
        ></path>
      </svg>
      <svg
        v-else
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
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </g>
      </svg>
    </IconButton>
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
import { Divider, IconButton } from '@/components'
import { LinkButton } from '../../components'
import { linkConfig } from '../../extensionConfig'

export default {
  name: 'LinkBubbleMenu',
  components: { LinkButton, IconButton, Divider },
  props: {
    editor: {
      required: true,
    },
  },
  data() {
    return {
      copyOk: false,
      linkConfig,
    }
  },
  methods: {
    // 访问链接
    handleVisitLink() {
      const { href, target } = this.linkData
      window.open(href, target)
    },
    // 复制链接
    handleCopyLink() {
      this.editor.chain().focus().run()
      const { href } = this.linkData
      navigator.clipboard.writeText(href)
      this.copyOk = true
      setTimeout(() => {
        this.copyOk = false
      }, 500)
    },
    // 取消链接
    handleCancelLink() {
      this.editor.chain().focus().unsetLink().run()
    },
  },
  computed: {
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
