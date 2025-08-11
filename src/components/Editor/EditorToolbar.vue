<template>
  <div class="editor-toolbar-wrapper">
    <div class="editor-toolbar-container">
      <div class="editor-toolbar-item" v-for="(menu, index) in toolbarMenus" :key="index">
        <div v-if="menu.name === '|'">
          <div class="editor-toolbar-divider"></div>
        </div>
        <div v-else class="editor-toolbar-item-content">
          <base-tooltip :disabled="!menu.tips">
            <div slot="content" class="tip-content">
              <p class="base-tooltip-text" v-for="name in menu.tips" :key="name">{{ name }}</p>
            </div>
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
              :name="menu.name"
              :is-active="menu.isActive({ editor })"
              :is-disabled="disabled || menu.isDisabled({ editor })"
              @click="menu.onClick({ editor })"
            />
            <IconButton
              v-else
              :name="menu.name"
              @click="menu.onClick({ editor })"
              @dblclick="menu.onDoubleClick({ editor })"
              :is-active="menu.isActive({ editor })"
              :is-disabled="disabled || menu.isDisabled({ editor })"
            />
          </base-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TOOLBAR_MENU_LIST } from '@/components/Editor/common'
import { FontFamilyButton, HeadingButton, IconButton } from '@/components/Editor/components'
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
import FontSizeButton from '@/components/Editor/components/FontSizeButton.vue'
import BaseTooltip from '@/components/Editor/common/BaseTooltip.vue'
import LinkButton from '@/components/Editor/components/LinkButton.vue'

export default {
  name: 'EditorToolbar',
  components: {
    LinkButton,
    BaseTooltip,
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
  methods: {},
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
    .editor-toolbar-divider {
      background-color: #e8e9eb;
      display: block;
      height: 16px;
      margin: 4px 8px;
      width: 1px;
    }
    .editor-toolbar-item-content {
      height: 24px;
    }
  }
}
</style>
<style lang="scss">
.tip-content {
  p {
    margin: 0;
  }
}
</style>
