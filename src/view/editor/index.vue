<template>
  <div class="custom-editor-wrapper">
    <div class="custom-editor-header">
      <EditorToolbar v-if="editor" :editor="editor" :disabled="toolBarDisabled" />
    </div>
    <div class="custom-editor-container">
      <TitleInput
        class="document-title"
        v-if="isNeedTitle"
        :title="documentDetail.title"
        @focusToEditor="handleFocusToEditor"
        @disableToolbar="handleDisableToolbar"
      />
      <div class="custom-editor-content">
        <EditorBubbleMenu :editor="editor" v-if="editor" />
        <EditorContent :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import { Placeholder } from '@tiptap/extensions'
import StarterKit from '@tiptap/starter-kit'
import { TextStyleKit } from '@tiptap/extension-text-style'
import EditorToolbar from './EditorToolbar.vue'
import TitleInput from './TitleInput.vue'
import {
  ResetOnEnterExt,
  FormatBrushExt,
  FontFamilyExt,
  FontSizeExt,
  CodeBlockExt,
  CustomLineHeightExt,
  IndentExt,
} from './custom/extensions'
import { ImageUploadNode } from './custom/nodes'
import EditorBubbleMenu from './editorBubbleMenu/index.vue'
import { all, createLowlight } from 'lowlight'
import { languages } from '@/view/editor/custom/extensions/CodeBlockExt'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import Mention from '@tiptap/extension-mention'
import { suggestion } from './extensionConfig'
import { handleImageUpload, MAX_FILE_SIZE } from '@/view/editor/common'

export default {
  components: {
    EditorBubbleMenu,
    TitleInput,
    EditorToolbar,
    EditorContent,
  },
  props: {
    type: {
      type: String,
      default: 'add',
    },
    isNeedTitle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      editor: null,
      documentDetail: {
        title: '',
        content:
          'AiEditor 是一个面向 AI 的下一代富文本编辑器，它基于 Web Component 开发，因此支持 Layui、Vue、React、Angular、Svelte 等几乎任何前端框架。她适配了 PC Web 端和手机端，并提供了 亮色 和 暗色 两个主题。除此之外，她还提供了灵活的配置，开发者可以方便的使用其开发任何文字编辑的应用',
      },
      toolBarDisabled: false,
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.documentDetail.content,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: '输入 / 设置格式，输入空格使用 AI',
        }),
        ResetOnEnterExt,
        FormatBrushExt.configure({
          editorContainerEle: document.querySelector('.custom-editor-content'),
        }),
        TextStyleKit,
        FontFamilyExt,
        FontSizeExt,
        CodeBlockExt.configure({
          lowlight: createLowlight(all),
          defaultLanguage: 'auto',
          languages,
        }),
        Highlight.configure({
          multicolor: true,
        }),
        Subscript,
        Superscript,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        CustomLineHeightExt,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        IndentExt,
        Mention.configure({
          HTMLAttributes: {
            class: 'mention',
          },
          suggestion,
        }),
        ImageUploadNode.configure({
          accept: 'image/*',
          maxSize: MAX_FILE_SIZE,
          limit: 3,
          upload: handleImageUpload,
          onError: (error) => console.error('Upload failed:', error),
        }),
      ],
      autofocus: this.type === 'add',
      onFocus: () => {
        this.toolBarDisabled = false
      },
    })
  },
  methods: {
    handleFocusToEditor() {
      this.toolBarDisabled = false
    },
    // 设置编辑器是否禁用
    handleDisableToolbar(disabled) {
      this.toolBarDisabled = disabled
    },
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style scoped lang="scss">
.custom-editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  .custom-editor-header {
    border-bottom: 1px solid #f3f4fa;
  }
  .custom-editor-container {
    flex: 1;
    padding: 24px 60px 60px 60px;
    overflow-y: auto;
    .custom-editor-content {
      margin-top: 24px;
    }
  }
}
</style>
