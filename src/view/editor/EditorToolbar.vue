<template>
  <div class="editor-toolbar-wrapper">
    <div class="editor-toolbar-container">
      <div class="editor-toolbar-item" v-for="(menu, index) in toolbarMenus" :key="index">
        <div v-if="menu.name === '|'">
          <Divider />
        </div>
        <div v-else class="editor-toolbar-item-content">
          <HeadingButton
            v-if="menu.name === 'heading'"
            :options="menu.options"
            :is-active="(value) => menu.isActive({ editor, value })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @click="(value) => menu.onClick({ editor, ...value })"
          />
          <FontFamilyButton
            v-else-if="menu.name === 'fontFamily'"
            :options="menu.options"
            :is-active="(value) => menu.isActive({ editor, value })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @click="(value) => menu.onClick({ editor, ...value })"
          />
          <FontSizeButton
            v-else-if="menu.name === 'fontSize'"
            :options="menu.options"
            :is-active="(value) => menu.isActive({ editor, value })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @click="(value) => menu.onClick({ editor, ...value })"
          />
          <LinkButton
            v-else-if="menu.name === 'link'"
            :tips="menu.tips"
            :editor="editor"
            :is-active="menu.isActive({ editor })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @click="(value) => menu.onClick({ editor, ...value })"
          />
          <FontStyleButton
            v-else-if="menu.name === 'fontStyle'"
            :editor="editor"
            :is-active="(value) => menu.isActive({ editor, ...value })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @click="(value) => menu.onClick({ editor, ...value })"
          />
          <TextAlignButton
            v-else-if="menu.name === 'textAlign'"
            :options="menu.options"
            :is-active="(value) => menu.isActive({ editor, value })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @click="(value) => menu.onClick({ editor, ...value })"
          />
          <LineHeightButton
            v-else-if="menu.name === 'lineHeight'"
            :options="menu.options"
            :is-active="(value) => menu.isActive({ editor, value })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
            @click="(value) => menu.onClick({ editor, ...value })"
          />
          <ImageButton
            v-else-if="menu.name === 'image'"
            :editor="editor"
            :tips="menu.tips"
            @change="(value) => menu.onChange({ editor, ...value })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
          />
          <IconButton
            v-else
            :tips="menu.tips"
            @click="menu.onClick({ editor })"
            @dblclick="menu.onDoubleClick && menu.onDoubleClick({ editor })"
            :is-active="menu.isActive({ editor })"
            :is-disabled="disabled || menu.isDisabled({ editor })"
          >
            <span style="display: flex" v-html="pathName(menu.name)"></span>
          </IconButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TOOLBAR_MENU_LIST, toolbarPathNameMap } from './common'
import {
  FontFamilyButton,
  HeadingButton,
  FontSizeButton,
  LinkButton,
  FontStyleButton,
  TextAlignButton,
  LineHeightButton,
} from './components'
import { boldConfig } from './extensionConfig/bold'
import {
  blockquoteConfig,
  bulletListConfig,
  codeBlockConfig,
  codeConfig,
  fontFamilyConfig,
  fontSizeConfig,
  formatBrushConfig,
  italicConfig,
  linkConfig,
  orderedListConfig,
  redoConfig,
  strikeConfig,
  subscriptConfig,
  superscriptConfig,
  taskListConfig,
  headingConfig,
  fontStyleConfig,
  underlineConfig,
  undoConfig,
  textAlignConfig,
  lineHeightConfig,
  indentConfig,
  outdentConfig,
  imageConfig,
} from './extensionConfig'
import { Divider, IconButton } from '@/components'
import ImageButton from '@/view/editor/components/ImageButton.vue'

export default {
  name: 'EditorToolbar',
  components: {
    ImageButton,
    Divider,
    LinkButton,
    FontStyleButton,
    FontSizeButton,
    FontFamilyButton,
    HeadingButton,
    IconButton,
    TextAlignButton,
    LineHeightButton,
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
        heading: headingConfig,
        fontFamily: fontFamilyConfig,
        fontSize: fontSizeConfig,
        bold: boldConfig,
        italic: italicConfig,
        underline: underlineConfig,
        strike: strikeConfig,
        fontStyle: fontStyleConfig,
        code: codeConfig,
        subscript: subscriptConfig,
        superscript: superscriptConfig,
        link: linkConfig,
        codeBlock: codeBlockConfig,
        bulletList: bulletListConfig,
        orderedList: orderedListConfig,
        taskList: taskListConfig,
        blockquote: blockquoteConfig,
        textAlign: textAlignConfig,
        lineHeight: lineHeightConfig,
        indent: indentConfig,
        outdent: outdentConfig,
        image: imageConfig,
      },
    }
  },
  methods: {
    pathName(name) {
      return toolbarPathNameMap[name]
    },
  },
  computed: {
    toolbarMenus() {
      return this.menuList
        .map((name) => {
          if (name === '|') return { name: '|' }
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
    .editor-toolbar-item-content {
      height: 24px;
    }
  }
}
</style>
