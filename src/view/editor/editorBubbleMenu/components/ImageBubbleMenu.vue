<template>
  <div class="image-bubble-menu-container">
    <AlignLeftButton
      :editor="editor"
      :is-active="alignLeftConfig.isActive({ editor })"
      @click="() => alignLeftConfig.onClick({ editor })"
    />
    <AlignCenterButton
      :editor="editor"
      :is-active="alignCenterConfig.isActive({ editor })"
      @click="() => alignCenterConfig.onClick({ editor })"
    />
    <AlignRightButton
      :editor="editor"
      :is-active="alignRightConfig.isActive({ editor })"
      @click="() => alignRightConfig.onClick({ editor })"
    />
    <Divider />
    <DownloadButton :editor="editor" />
    <Divider />
    <DeleteButton :editor="editor" @click="() => deleteConfig.onClick({ editor })" />
  </div>
</template>

<script>
import { Divider } from '@/components'
import {
  AlignLeftButton,
  AlignCenterButton,
  AlignRightButton,
  DownloadButton,
  DeleteButton,
} from '@/view/editor/components'
import {
  alignLeftConfig,
  alignCenterConfig,
  alignRightConfig,
  deleteConfig,
} from '@/view/editor/extensionConfig'

export default {
  name: 'ImageBubbleMenu',
  components: {
    AlignLeftButton,
    AlignCenterButton,
    AlignRightButton,
    DownloadButton,
    DeleteButton,
    Divider,
  },
  props: {
    editor: {
      required: true,
    },
  },
  data() {
    return {
      alignLeftConfig,
      alignCenterConfig,
      alignRightConfig,
      deleteConfig,
    }
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.image-bubble-menu-container {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
