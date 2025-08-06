<template>
  <div class="custom-editor-wrapper">
    <div class="custom-editor-header">
      <editor-toolbar v-if="editor" :editor="editor" :disabled="toolBarDisabled" />
    </div>
    <div class="custom-editor-container">
      <TitleInput
        class="document-title"
        v-if=isNeedTitle
        :title="documentDetail.title"
        @focusToEditor="handleFocusToEditor"
        @disableToolbar="handleDisableToolbar" />
      <div class="custom-editor-content">
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import { Placeholder } from '@tiptap/extensions'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from '@/components/Editor/EditorToolbar.vue'
import TitleInput from "@/components/Editor/TitleInput.vue";
import { ResetOnEnter } from "@/customExtensions";
import { FormatBrush } from "@/customExtensions/extensions/FormatBrush";

export default {
  components: {
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
    }
  },
  data() {
    return {
      editor: null,
      documentDetail: {
        title: '',
        content: '',
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
          placeholder: "输入 / 设置格式，输入空格使用 AI",
        }),
        ResetOnEnter,
        FormatBrush.configure({
          editorContainerEle: document.querySelector('.custom-editor-content')
        }),
      ],
      autofocus: this.type === 'add',
      onFocus: () => {
        this.toolBarDisabled = false
      }
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
    padding: 24px 60px 0 60px;
    overflow-y: auto;
    .custom-editor-content {
      margin-top: 24px;
    }
  }
}
</style>
