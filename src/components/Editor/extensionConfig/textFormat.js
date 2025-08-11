const textFormatOptions = [
  {
    label: '正文',
    content: '正文',
    value: 0,
  },
  {
    label: 'H1',
    content: 'H1 一级标题',
    value: 1,
  },
  {
    label: 'H2',
    content: 'H2 二级标题',
    value: 2,
  },
  {
    label: 'H3',
    content: 'H3 三级标题',
    value: 3,
  },
  {
    label: 'H4',
    content: 'H4 四级标题',
    value: 4,
  },
  {
    label: 'H5',
    content: 'H5 五级标题',
    value: 5,
  },
  {
    label: 'H6',
    content: 'H6 六级标题',
    value: 6,
  },
]
const levels = [1, 2, 3, 4, 5, 6]
export const textFormatConfig = {
  options: textFormatOptions,
  onChange: ({ editor, level }) => {
    const chain = editor.chain().focus()
    if (level === 0) chain.setParagraph().run()
    else chain.setHeading({ level }).run()
  },
  getActive: ({ editor }) => {
    const isHeadingActive = (level) => {
      if (level === 0) {
        return editor.isActive('paragraph')
      }
      return editor.isActive('heading', { level })
    }
    return levels.find((level) => isHeadingActive(level)) || 0
  },
  isDisabled: () => false,
}
