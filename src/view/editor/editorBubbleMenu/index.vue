<template>
  <div class="bubble-menu-wrapper">
    <LinkBubble :editor="editor">
      <div class="bubble-menu-container">
        <LinkBubbleMenu :editor="editor" />
      </div>
    </LinkBubble>
    <ImageBubble :editor="editor">
      <div class="bubble-menu-container">
        <ImageBubbleMenu :editor="editor" />
      </div>
    </ImageBubble>
    <BaseBubble :editor="editor">
      <div class="bubble-menu-container">
        <BaseBubbleMenu :editor="editor" />
      </div>
    </BaseBubble>
  </div>
</template>

<script>
import { BaseBubble, LinkBubble, ImageBubble } from './Bubble'
import { BaseBubbleMenu, LinkBubbleMenu, ImageBubbleMenu } from './components'

export default {
  name: 'index',
  components: {
    BaseBubbleMenu,
    LinkBubbleMenu,
    ImageBubbleMenu,
    BaseBubble,
    LinkBubble,
    ImageBubble,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  computed: {
    isLink() {
      return this.editor.isActive('link')
    },
    isImage() {
      return this.editor.isActive('imageNode')
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
