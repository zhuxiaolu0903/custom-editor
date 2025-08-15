const fontFamilyOptions = [
  { label: '默认字体', value: '' },
  { label: '宋体', value: 'SimSun' },
  { label: '仿宋', value: 'FangSong' },
  { label: '黑体', value: 'SimHei' },
  { label: '楷体', value: 'KaiTi' },
  { label: '微软雅黑', value: 'Microsoft YaHei' },
  // { label: '方正仿宋简体_GBK', value: 'FangSong_GB2312' },
  { label: 'Arial', value: 'Arial' },
]
export const fontFamilyConfig = {
  options: fontFamilyOptions,
  onClick: ({ editor, value }) => {
    editor.chain().focus().setFontFamily(value).run()
  },
  isActive: ({ editor, value }) => editor.isActive('textStyle', { fontFamily: value }),
  isDisabled: ({ editor }) => !editor.can().setFontFamily(),
}
