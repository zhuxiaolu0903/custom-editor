<template>
  <BubbleMenu :editor="editor" :shouldShow="shouldShow">
    <div class="bubble-menu-container">
      <LinkBubbleMenu v-if="isLink" :editor="editor" />
      <BaseBubbleMenu v-else />
    </div>
  </BubbleMenu>
</template>

<script>
import { BubbleMenu } from './BubbleMenu'
import { LinkBubbleMenu, BaseBubbleMenu } from '@/components/Editor/EditorBubbleMenu/components'
import { getTextBetween } from '@tiptap/vue-2'

export default {
  name: 'index',
  components: { BubbleMenu, LinkBubbleMenu, BaseBubbleMenu },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 这里的回调用于：鼠标未选中内容时，如果当前激活的是图标或者链接，也能显示气泡菜单
    shouldShow({ editor }) {
      // 链接气泡扩展
      if (this.isLink) return editor.isActive('link')
      const {
        state: { selection },
      } = editor
      // 基础气泡扩展
      return (
        !selection.empty &&
        getTextBetween(editor.state.doc, {
          from: selection.from,
          to: selection.to,
        }).trim().length > 0 &&
        !editor.isActive('link')
      )
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
