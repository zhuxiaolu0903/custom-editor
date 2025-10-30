<template>
  <div class="editor-toolbar-wrapper">
    <div class="editor-toolbar-container">
      <DynamicOverflowContainer
        :items="componentItems"
        width-strategy="auto"
        :trigger-width="32"
        :item-gap="8"
      ></DynamicOverflowContainer>
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
import ImageButton from '@/view/editor/components/ImageButton.vue'
import DynamicOverflowContainer from '@/view/editor/components/base/DynamicOverflowContainer.vue'
import { Divider, IconButton } from '@/components'

export default {
  name: 'EditorToolbar',
  components: {
    DynamicOverflowContainer,
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
      componentItems: [],
    }
  },
  mounted() {
    this.setComponentItems()
  },
  methods: {
    setComponentItems() {
      let result = []
      this.toolbarMenus.forEach((menu, index) => {
        if (menu.name === '|') {
          result.push({
            id: menu.name + index,
            component: Divider,
          })
        } else if (menu.name === 'heading') {
          result.push({
            id: menu.name,
            component: HeadingButton,
            props: {
              options: menu.options,
              isActive: (value) => menu.isActive({ editor: this.editor, value }),
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              click: (value) => menu.onClick({ editor: this.editor, ...value }),
            },
          })
        } else if (menu.name === 'fontFamily') {
          result.push({
            id: menu.name,
            component: FontFamilyButton,
            props: {
              options: menu.options,
              isActive: (value) => menu.isActive({ editor: this.editor, value }),
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              click: (value) => menu.onClick({ editor: this.editor, ...value }),
            },
          })
        } else if (menu.name === 'fontSize') {
          result.push({
            id: menu.name,
            component: FontSizeButton,
            props: {
              options: menu.options,
              isActive: (value) => menu.isActive({ editor: this.editor, value }),
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              click: (value) => menu.onClick({ editor: this.editor, ...value }),
            },
          })
        } else if (menu.name === 'link') {
          result.push({
            id: menu.name,
            component: LinkButton,
            props: {
              tips: menu.tips,
              editor: this.editor,
              isActive: menu.isActive({ editor: this.editor }),
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              click: (value) => menu.onClick({ editor: this.editor, ...value }),
            },
          })
        } else if (menu.name === 'fontStyle') {
          result.push({
            id: menu.name,
            component: FontStyleButton,
            props: {
              editor: this.editor,
              isActive: (value) => menu.isActive({ editor: this.editor, value }),
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              click: (value) => menu.onClick({ editor: this.editor, ...value }),
            },
          })
        } else if (menu.name === 'textAlign') {
          result.push({
            id: menu.name,
            component: TextAlignButton,
            props: {
              options: menu.options,
              isActive: (value) => menu.isActive({ editor: this.editor, value }),
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              click: (value) => menu.onClick({ editor: this.editor, ...value }),
            },
          })
        } else if (menu.name === 'lineHeight') {
          result.push({
            id: menu.name,
            component: LineHeightButton,
            props: {
              options: menu.options,
              isActive: (value) => menu.isActive({ editor: this.editor, value }),
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              click: (value) => menu.onClick({ editor: this.editor, ...value }),
            },
          })
        } else if (menu.name === 'image') {
          result.push({
            id: menu.name,
            component: ImageButton,
            props: {
              tips: menu.tips,
              editor: this.editor,
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              change: (value) => menu.onChange({ editor: this.editor, ...value }),
            },
          })
        } else {
          result.push({
            id: menu.name,
            component: IconButton,
            props: {
              tips: menu.tips,
              isDisabled: this.disabled || menu.isDisabled({ editor: this.editor }),
            },
            events: {
              change: (value) => menu.onChange({ editor: this.editor, ...value }),
              click: () => menu.onClick({ editor: this.editor }),
              dblclick: () => menu.onDoubleClick && menu.onDoubleClick({ editor: this.editor }),
            },
            slots: {
              default: () => [
                this.$createElement('span', {
                  style: {
                    display: 'flex',
                  },
                  domProps: {
                    innerHTML: this.pathName(menu.name),
                  },
                }),
              ],
            },
          })
        }
      })
      this.componentItems = result
    },
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
