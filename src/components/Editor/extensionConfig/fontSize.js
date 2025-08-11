const fontSizeOptions = [
  { label: '9px', value: 9 },
  { label: '10px', value: 10 },
  { label: '11px', value: 11 },
  { label: '12px', value: 12 },
  { label: '14px', value: 14 },
  { label: '18px', value: 18 },
  { label: '20px', value: 20 },
  { label: '22px', value: 22 },
  { label: '24px', value: 24 },
  { label: '26px', value: 26 },
  { label: '28px', value: 28 },
  { label: '30px', value: 30 },
  { label: '36px', value: 36 },
  { label: '42px', value: 42 },
  { label: '48px', value: 48 },
  { label: '56px', value: 56 },
  { label: '72px', value: 72 },
]
const defaultValue = 14
export const fontSizeConfig = {
  options: fontSizeOptions,
  onChange: ({ editor, value }) => {
    const chain = editor.chain().focus()
    // 设置成默认值时,需要重置样式
    if (value === defaultValue) {
      chain.unsetFontSize().run()
    } else {
      chain.setFontSize(`${value}px`).run()
    }
  },
  getActive: ({ editor }) => {
    const item = fontSizeOptions.find((item) =>
      fontSizeConfig.isActive({ editor, value: item.value })
    )
    return item ? item.value : defaultValue
  },
  isActive: ({ editor, value }) => editor.isActive('textStyle', { fontSize: value }),
  isDisabled: ({ editor }) => !editor.can().setFontSize(),
}
