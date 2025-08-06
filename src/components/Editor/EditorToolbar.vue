<template>
  <div class="editor-toolbar-wrapper">
    <div class="editor-toolbar-container">
      <div class="editor-toolbar-item" v-for="(menu, index) in toolbarMenus" :key="index">
        <div v-if="menu.name === '|'">
          <div class="editor-toolbar-divider"></div>
        </div>
        <div v-else class="editor-toolbar-item-content">
          <el-tooltip effect="dark" placement="top">
            <div slot="content" class="tip-content">
              <p v-for="name in menu.tips" :key="name">{{ name }}</p>
            </div>
            <IconButton
              :name="menu.name"
              @click="handleEvent('onClick', menu)"
              @dblclick="handleEvent('onDoubleClick', menu)"
              :is-active="menu.isActive()"
              :is-disabled="disabled || (menu.isDisabled && menu.isDisabled())"
            ></IconButton>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/Editor/IconButton.vue'
// 当前生效的工具栏
const TOOLBAR_MENU_LIST = [
  'undoRedo',
  'formatBrush',
  '|',
  'textClear',
  '|',
  'fontFamily',
  'fontSize',
  '|',
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
  'subscript',
  'superscript',
  '|',
  'color',
  'background',
  'textAlign',
  'table',
  'link',
  'codeBlock',
  '|',
  'bulletList',
  'orderedList',
  'taskList',
  '|',
  'blockquote',
  'indent',
  'outdent',
  '|',
  'divider',
]
export default {
  name: 'EditorToolbar',
  components: { IconButton },
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
        undo: {
          tips: ['撤销（Ctrl+Z）'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .undo()
              .run(),
          isActive: () => this.editor.isActive('undo'),
          isDisabled: () => !this.editor.can().undo(),
        },
        redo: {
          tips: ['重做（Ctrl+Y）'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .redo()
              .run(),
          isActive: () => this.editor.isActive('redo'),
          isDisabled: () => !this.editor.can().redo(),
        },
        formatBrush: {
          tips: ['重格式刷 (双击保持使用)'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleBrushing('ONCE')
              .run(),
          onDoubleClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleBrushing('ALWAYS')
              .run(),
          isActive: () => this.editor.storage.formatBrush.isBrushing,
          isDisabled: () => false,
        },
        bold: {
          tips: ['加粗（Ctrl+B）', 'Markdown: **文字** + 空格'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleBold()
              .run(),
          isActive: () => this.editor.isActive('bold'),
          isDisabled: () => !this.editor.can().toggleBold(),
        },
        italic: {
          tips: ['斜体（Ctrl+I）', 'Markdown: *文字* + 空格'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleItalic()
              .run(),
          isActive: () => this.editor.isActive('italic'),
          isDisabled: () => !this.editor.can().toggleItalic(),
        },
        underline: {
          tips: ['下划线（Ctrl+U）', 'Markdown: ~文字~ + 空格'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleUnderline()
              .run(),
          isActive: () => this.editor.isActive('underline'),
          isDisabled: () => !this.editor.can().toggleUnderline(),
        },
        strike: {
          tips: ['删除线（Ctrl+Shift+X）', 'Markdown: ~~文字~~ + 空格'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleStrike()
              .run(),
          isActive: () => this.editor.isActive('strike'),
          isDisabled: () => !this.editor.can().toggleStrike(),
        },
        code: {
          tips: ['插入代码'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleCode()
              .run(),
          isActive: () => this.editor.isActive('code'),
          isDisabled: () => !this.editor.can().toggleCode(),
        },
        subscript: {
          tips: ['上标'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleSubscript()
              .run(),
          isActive: () => this.editor.isActive('subscript'),
          isDisabled: () => !this.editor.can().toggleSubscript(),
        },
        superscript: {
          tips: ['下标'],
          onClick: () =>
            this.editor
              .chain()
              .focus()
              .toggleSuperscript()
              .run(),
          isActive: () => this.editor.isActive('superscript'),
          isDisabled: () => !this.editor.can().toggleSuperscript(),
        },
        link: {
          tips: ['超链接（Ctrl+K）', 'Markdown: [文本](链接) + 空格'],
          onClick: ({ href = 'baidu.com', target = '_blank', ...arg }) =>
            this.editor
              .chain()
              .focus()
              .setLink({ href, target, ...arg })
              .run(),
          isActive: () => this.editor.isActive('link'),
          isDisabled: () => !this.editor.can().setLink({ href: '' }),
        },
        codeBlock: {
          tips: ['插入代码块', 'Markdown: ``` + 空格'],
          onClick: ({ range }) => {
            range
              ? this.editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleCodeBlock()
                .run()
              : this.editor.commands.toggleCodeBlock()
          },
          isActive: () => this.editor.isActive('codeBlock'),
          isDisabled: () => !this.editor.can().toggleCodeBlock(),
        },
        bulletList: {
          tips: ['无序列表', 'Markdown: - + 空格'],
          onClick: ({ range }) => {
            range
              ? this.editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleBulletList()
                .run()
              : this.editor.commands.toggleBulletList()
          },
          isActive: () => this.editor.isActive('bulletList'),
          isDisabled: () => !this.editor.can().toggleBulletList(),
        },
        orderedList: {
          tips: ['有序列表', 'Markdown: 1. + 空格'],
          onClick: ({ range }) => {
            range
              ? this.editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleOrderedList()
                .run()
              : this.editor.commands.toggleOrderedList()
          },
          isActive: () => this.editor.isActive('orderedList'),
          isDisabled: () => !this.editor.can().toggleOrderedList(),
        },
        taskList: {
          tips: ['待办列表', 'Markdown: [] + 空格'],
          onClick: ({ range }) => {
            range
              ? this.editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleTaskList()
                .run()
              : this.editor.commands.toggleTaskList()
          },
          isActive: () => this.editor.isActive('taskList'),
          isDisabled: () => !this.editor.can().toggleTaskList(),
        },
        blockquote: {
          tips: ['引用', 'Markdown: > + 空格'],
          onClick: ({ range }) => {
            range
              ? this.editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleBlockquote()
                .run()
              : this.editor.commands.toggleBlockquote()
          },
          isActive: () => this.editor.isActive('blockquote'),
          isDisabled: () => !this.editor.can().toggleBlockquote(),
        },
        decreaseIndent: {
          tips: ['减少缩进(Shift+Tab)'],
          onClick: ({ range }) => {
            range
              ? this.editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleDecreaseIndent()
                .run()
              : this.editor.commands.toggleDecreaseIndent()
          },
          isActive: () => this.editor.isActive('decreaseIndent'),
          isDisabled: () => !this.editor.can().toggleDecreaseIndent(),
        },
        increaseIndent: {
          tips: ['增加缩进(Tab)'],
          onClick: ({ range }) => {
            range
              ? this.editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleIncreaseIndent()
                .run()
              : this.editor.commands.toggleIncreaseIndent()
          },
          isActive: () => this.editor.isActive('increaseIndent'),
          isDisabled: () => !this.editor.can().toggleIncreaseIndent(),
        },
      },
    }
  },
  methods: {
    handleEvent(commandName, menu) {
      // 执行编辑器内置的命令
      menu[commandName] && menu[commandName]()
    },
  },
  computed: {
    // 编辑器中内置扩展
    extensions() {
      console.log((this.editor?.extensionManager?.extensions || []).map(item => item.name));
      return this.editor?.extensionManager?.extensions || []
    },
    toolbarMenus() {
      return this.menuList
        .map((name) => {
          if (name === '|') return { name: '|' }
          // 查找编辑器中内置扩展的匹配项
          const extension = this.extensions.find((ext) => ext.name === name)
          if (!extension) return null
          if (name === 'undoRedo') {
            // 撤销/恢复 拆分为两个按钮
            return ['undo', 'redo'].map(item => {
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
