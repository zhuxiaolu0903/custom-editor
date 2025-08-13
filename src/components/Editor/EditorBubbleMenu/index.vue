<template>
  <BubbleMenu :editor="editor">
    <div class="bubble-menu-container">
      <LinkBubbleMenu v-if="isLink" :editor="editor" />
      <BaseBubbleMenu v-else />
    </div>
  </BubbleMenu>
</template>

<script>
import { BubbleMenu } from './components/BubbleMenu'
import { LinkBubbleMenu, BaseBubbleMenu } from '@/components/Editor/EditorBubbleMenu/components'

export default {
  name: 'index',
  components: { BubbleMenu, LinkBubbleMenu, BaseBubbleMenu },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLink() {
      return this.editor.isActive('link')
    },
  },
}
</script>

<style scoped lang="scss">
.bubble-menu-container {
  height: 30px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 3px;
  box-shadow: 0 2px 5px 2px #0000001a;
  display: flex;
  align-items: center;
  padding: 5px 8px;
  color: #333333;
}
</style>
