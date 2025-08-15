const headingOptions = [
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
export const headingConfig = {
  options: headingOptions,
  onClick: ({ editor, value }) => {
    console.log(value)
    const chain = editor.chain().focus()
    if (value === 0) chain.setParagraph().run()
    else chain.setHeading({ level: value }).run()
  },
  isActive: ({ editor, value }) => {
    if (value === 0) {
      return editor.isActive('paragraph')
    }
    return editor.isActive('heading', { level: value })
  },
  isDisabled: () => false,
}
