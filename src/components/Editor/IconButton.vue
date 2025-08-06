<template>
  <span
    class="icon-btn"
    :class="{ 'is-active': isActive, 'is-disabled': isDisabled }"
    @click="onClick"
    @dblclick="onDoubleClick"
  >
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <g fill="#39404D" fill-rule="evenodd" v-html="pathName"></g>
    </svg>
  </span>
</template>

<script>
const pathNameMap = {
  undo:
    '<path d="M15 8a5 5 0 010 10H6v-1.5h9a3.5 3.5 0 003.495-3.308L18.5 13A3.5 3.5 0 0015 9.5H6V8h9z"></path><path d="M7.8 6v5.5L4.5 8.75z"></path>',
  redo:
    '<path d="M10 8a5 5 0 000 10h9v-1.5h-9a3.5 3.5 0 01-3.495-3.308L6.5 13A3.5 3.5 0 0110 9.5h9V8h-9z"></path><path d="M16.7 6v5.5L20 8.75z"></path>',
  formatBrush:
    '<path d="M18 11v7a1 1 0 01-1 1H5.5l.867-1.733A6 6 0 007 14.584V11h11zm-1.5 1.5h-8v2.309a6 6 0 01-.455 2.292l-.165.399h8.62v-5zM12.5 4a1 1 0 011 1v2H17a1 1 0 011 1v2H7V8a1 1 0 011-1h3.5V5a1 1 0 011-1z"></path>',
  bold:
    '<path d="M11.75 5a3.75 3.75 0 010 7.5H8V5h3.75zm0 1.5H9.5V11h2.25a2.25 2.25 0 100-4.5z"></path><path d="M13 11a4 4 0 110 8H8v-8h5zm0 1.5H9.5v5H13a2.5 2.5 0 100-5z"></path>',
  italic: '<path d="M13 5h1.5l-3 13H10z"></path><path d="M10.5 5h6v1.5h-6zM8 17.5h6V19H8z"></path>',
  underline:
    '<path d="M16.5 12.5a4.5 4.5 0 01-9 0v-7H10V7H9v5.5a3 3 0 005.995.176L15 12.5V7h-1V5.5h2.5v7zM8 18h8v1.5H8z"></path>',
  strike:
    '<path d="M5 11.5h14V13H5z"></path><path d="M8 9a4 4 0 118 0h-1.5a2.5 2.5 0 10-2.5 2.5V13a4 4 0 01-4-4z"></path><path d="M12 17.5a2.5 2.5 0 001.488-4.51l.503-1.46A4 4 0 118 15h1.5a2.5 2.5 0 002.5 2.5z"></path>',
  code:
    '<svg t="1754025195464" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12658" width="24" height="24"><path d="M597.333333 667.178667l180.053334-176.512L597.333333 314.154667 656.64 256 896 490.666667 656.64 725.333333zM203.946667 490.666667L384 667.178667 324.693333 725.333333 85.333333 490.666667 324.693333 256 384 314.154667z" fill="#39404D" p-id="12659"></path></svg>',
  codeBlock:
    '<svg t="1754025486879" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20070" width="20" height="20" transform="translate(2 2)"><path d="M606 83c23.4 6.7 37.7 29.6 34.3 53l-1.4 6.4-204.9 717c-7.3 25.5-33.9 40.2-59.3 33-23.4-6.7-37.7-29.6-34.3-53l1.4-6.4 204.9-717c7.3-25.6 33.8-40.3 59.3-33zM284 287.6c16.8 17.2 18.1 43.9 3.9 62.6l-4.7 5.3-147 143.4 147.6 148.6c17 17.1 18.4 43.8 4.4 62.5l-4.7 5.4c-17.1 17-43.8 18.4-62.5 4.4l-5.4-4.7-181.7-183c-17.1-17.2-18.4-44.1-4.2-62.8l4.7-5.4 181.7-177.3c19-18.4 49.4-18 67.9 1z m453.6 0c18.5-19 48.9-19.3 67.9-0.8L987.2 464l4.7 5.4c14.2 18.7 12.9 45.6-4.2 62.8L806 715.2l-5.4 4.7c-18.7 14-45.4 12.6-62.5-4.4l-4.7-5.4c-14-18.7-12.6-45.4 4.4-62.5L885.4 499l-147-143.4-4.7-5.3c-14.1-18.8-12.9-45.5 3.9-62.7z" p-id="20071"></path></svg>',
  subscript:
    '<path d="M5.596 4L10.5 9.928 15.404 4H18l-6.202 7.497L18 18.994V19h-2.59l-4.91-5.934L5.59 19H3v-.006l6.202-7.497L3 4h2.596zM21.55 16.58a.8.8 0 1 0-1.32-.36l-1.155.33A2.001 2.001 0 0 1 21 14a2 2 0 0 1 1.373 3.454L20.744 19H23v1h-4v-1l2.55-2.42z"/>',
  superscript:
    '<path d="M5.596 5l4.904 5.928L15.404 5H18l-6.202 7.497L18 19.994V20h-2.59l-4.91-5.934L5.59 20H3v-.006l6.202-7.497L3 5h2.596zM21.55 6.58a.8.8 0 1 0-1.32-.36l-1.155.33A2.001 2.001 0 0 1 21 4a2 2 0 0 1 1.373 3.454L20.744 9H23v1h-4V9l2.55-2.42z"/>',
  link:
    '<g transform="rotate(45 4 18.5)" fill="#39404D" fill-rule="nonzero"><path d="M4 0a4 4 0 014 4v3l-.007.102A.75.75 0 016.5 7V4a2.5 2.5 0 00-4.995-.164L1.5 4v3A.75.75 0 010 7V4a4 4 0 014-4zM8 13a4 4 0 11-8 0v-3a.75.75 0 111.5 0v3a2.5 2.5 0 004.995.164L6.5 13v-3l.007-.102A.75.75 0 018 10v3z"></path><rect x="3.25" y="5.5" width="1.5" height="6" rx="0.75"></rect></g>',
  bulletList:
    '<path d="M9 5h10v1.5H9zM9 11h10v1.5H9zM9 17h10v1.5H9zM5 5h1.5v1.5H5zM5 11h1.5v1.5H5zM5 17h1.5v1.5H5z"></path>',
  orderedList:
    '<path d="M9 5h11v1.5H9zM9 11h11v1.5H9zM9 17h11v1.5H9zM5 4h1v4H5zM4 13v-1a1 1 0 011-1h1v-1H4.5a.5.5 0 010-1H6a1 1 0 01.993.883L7 10v1a1 1 0 01-.883.993L6 12H5v1h1.5a.5.5 0 010 1H5a1 1 0 01-1-1zM4.5 20a.5.5 0 110-1H6v-1H5v-1h1v-1H4.5a.5.5 0 110-1H6a1 1 0 01.993.883L7 16v3a1 1 0 01-.883.993L6 20H4.5z"></path>',
  taskList:
    '<path d="M15 5v1.5H6.5v11h11V11H19v7a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h9z"></path><path d="M19.781 6.606l-6.364 6.364.002.003-1.06 1.06-3.536-3.535 1.06-1.06 2.473 2.471 6.364-6.363 1.061 1.06z"></path>',
  blockquote:
    '<g transform="translate(7 8)" fill="#39404D" fill-rule="nonzero"><rect y="5" width="4" height="4" rx="1"></rect><rect x="6" y="5" width="4" height="4" rx="1"></rect><path d="M4 1.5A2.5 2.5 0 001.5 4v3H0V4a4 4 0 014-4v1.5zM10 1.5A2.5 2.5 0 007.5 4v3H6V4a4 4 0 014-4v1.5z"></path></g>',
  decreaseIndent:
    '<path d="M6 6h14v1.5H6zM12 11h8v1.5h-8zM6 16h14v1.5H6zM6.5 11.75l3.5 2.5v-5z"></path>',
  increaseIndent:
    '<path d="M6 6h14v1.5H6zM6 11h8v1.5H6zM6 16h14v1.5H6zM20.25 11.75l-3.5 2.5v-5z"></path>',
  hardBreak:
    '<svg t="1754025137706" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10790" width="24" height="24"><path d="M621.696 704h54.848a91.392 91.392 0 1 0 0-182.848H219.52a36.544 36.544 0 0 1 0-73.152h457.152a164.608 164.608 0 0 1 0 329.152h-54.912v36.544a18.304 18.304 0 0 1-29.248 14.656l-78.016-58.496a36.672 36.672 0 0 1 0-58.56l78.08-58.496a18.304 18.304 0 0 1 29.184 14.656V704zM219.52 192h585.152a36.544 36.544 0 0 1 0 73.152H219.392a36.544 36.544 0 1 1 0-73.152z m182.848 548.544a36.608 36.608 0 0 1-36.608 36.608H219.52a36.608 36.608 0 0 1 0-73.152h146.24a36.544 36.544 0 0 1 36.608 36.544z" p-id="10791"></path></svg>',
}
export default {
  name: 'IconButton',
  props: {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (this.isDisabled) return
      this.$emit('click')
    },
    onDoubleClick() {
      if (this.isDisabled) return
      this.$emit('dblclick')
    },
  },
  computed: {
    pathName() {
      return pathNameMap[this.name]
    },
  },
}
</script>

<style lang="scss">
.icon-btn {
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  cursor: pointer;
  &.is-disabled {
    cursor: not-allowed;
    path,
    rect {
      fill: #c8c9cc;
    }
  }
  &.is-active {
    background-color: #f2f3f5;
    path,
    rect {
      fill: #3377ff;
    }
  }
  &:hover {
    background-color: #f2f3f5;
  }
}
</style>
