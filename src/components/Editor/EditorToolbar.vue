<template>
  <div class="editor-toolbar-wrapper">
    <div class="editor-toolbar-container">
      <div class="editor-toolbar-item" v-for="(menu, index) in toolbarMenus" :key="index">
        <div v-if="menu.name === '|'">
          <Divider />
        </div>
        <div v-else class="editor-toolbar-item-content">
          <HeadingButton
            v-if="menu.name === 'textFormat'"
            :value="menu.getActive({ editor })"
            :options="menu.options"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @selected="(level) => menu.onChange({ editor, level })"
          />
          <FontFamilyButton
            v-else-if="menu.name === 'fontFamily'"
            :value="menu.getActive({ editor })"
            :options="menu.options"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @selected="(value) => menu.onChange({ editor, value })"
          />
          <FontSizeButton
            v-else-if="menu.name === 'fontSize'"
            :value="menu.getActive({ editor })"
            :options="menu.options"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @selected="(value) => menu.onChange({ editor, value })"
          />
          <LinkButton
            v-else-if="menu.name === 'link'"
            :tips="menu.tips"
            :editor="editor"
            :is-active="menu.isActive({ editor })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @click="(config) => menu.onClick({ editor, ...config })"
          />
          <IconButton
            v-else
            :tips="menu.tips"
            @click="menu.onClick({ editor })"
            @dblclick="menu.onDoubleClick({ editor })"
            :is-active="menu.isActive({ editor })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
          >
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g fill="#39404D" fill-rule="evenodd" v-html="pathName(menu.name)"></g>
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TOOLBAR_MENU_LIST, toolbarPathNameMap } from '@/components/Editor/common'
import {
  FontFamilyButton,
  HeadingButton,
  IconButton,
  FontSizeButton,
  LinkButton,
} from '@/components/Editor/components'
import { boldConfig } from '@/components/Editor/extensionConfig/bold'
import {
  blockquoteConfig,
  bulletListConfig,
  codeBlockConfig,
  codeConfig,
  decreaseIndentConfig,
  fontFamilyConfig,
  fontSizeConfig,
  formatBrushConfig,
  increaseIndentConfig,
  italicConfig,
  linkConfig,
  orderedListConfig,
  redoConfig,
  strikeConfig,
  subscriptConfig,
  superscriptConfig,
  taskListConfig,
  textFormatConfig,
  underlineConfig,
  undoConfig,
} from '@/components/Editor/extensionConfig'
import { Divider } from '@/components/Editor/baseComponents'

export default {
  name: 'EditorToolbar',
  components: {
    Divider,
    LinkButton,
    FontSizeButton,
    FontFamilyButton,
    HeadingButton,
    IconButton,
  },
  props: {
    // 工具栏是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    editor: {
      type: [Object, null],
      required: true,
    },
    menuList: {
      type: Array,
      default: () => TOOLBAR_MENU_LIST,
    },
  },
  data() {
    return {
      // 工具栏属性
      toolbarProp: {
        undo: undoConfig,
        redo: redoConfig,
        formatBrush: formatBrushConfig,
        textFormat: textFormatConfig,
        fontFamily: fontFamilyConfig,
        fontSize: fontSizeConfig,
        bold: boldConfig,
        italic: italicConfig,
        underline: underlineConfig,
        strike: strikeConfig,
        code: codeConfig,
        subscript: subscriptConfig,
        superscript: superscriptConfig,
        link: linkConfig,
        codeBlock: codeBlockConfig,
        bulletList: bulletListConfig,
        orderedList: orderedListConfig,
        taskList: taskListConfig,
        blockquote: blockquoteConfig,
        decreaseIndent: decreaseIndentConfig,
        increaseIndent: increaseIndentConfig,
      },
    }
  },
  computed: {
    // 编辑器中内置扩展
    extensions() {
      return this.editor?.extensionManager?.extensions || []
    },
    toolbarMenus() {
      return this.menuList
        .map((name) => {
          if (name === '|') return { name: '|' }
          if (['textFormat', 'fontFamily', 'fontSize'].includes(name)) {
            return {
              name,
              ...this.toolbarProp[name],
            }
          }
          // 查找编辑器中内置扩展的匹配项
          const extension = this.extensions.find((ext) => ext.name === name)
          if (!extension) return null
          if (name === 'undoRedo') {
            // 撤销/恢复 拆分为两个按钮
            return ['undo', 'redo'].map((item) => {
              return {
                name: item,
                ...this.toolbarProp[item],
              }
            })
          }
          return {
            name,
            ...this.toolbarProp[name],
          }
        })
        .flat()
        .filter((menu) => menu !== null)
    },
  },
  methods: {
    pathName(name) {
      return toolbarPathNameMap[name]
    },
  },
}
</script>

<style scoped lang="scss">
.editor-toolbar-wrapper {
  padding: 8px 24px;
  .editor-toolbar-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    height: 24px;
    .editor-toolbar-item-content {
      height: 24px;
    }
  }
}
</style>
