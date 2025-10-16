import { Image } from '@tiptap/extension-image'

export const ImageExt = Image.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      uploadUrl: '',
      uploadHeaders: {},
      defaultSize: 350,
    }
  },
  // 用于控制光标行为的属性，主要用于设置是否允许在节点间插入空白字符。
  allowGapCursor() {
    return !this.options.inline
  },
})
