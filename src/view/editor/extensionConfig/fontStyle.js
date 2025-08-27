export const fontStyleConfig = {
  onClick: ({ editor, value, type }) => {
    const chain = editor.chain().focus()
    const fn =
      type === 'fontColor'
        ? value === ''
          ? chain.unsetColor()
          : chain.setColor(value)
        : value === ''
        ? chain.unsetHighlight()
        : chain.setHighlight({ color: value })
    fn.run()
  },
  isActive: ({ editor, value, type }) => {
    if (type === 'fontColor') {
      return editor.isActive('textStyle', { color: value })
    } else {
      return editor.isActive('highlight', { color: value })
    }
  },
  isDisabled: () => false,
}
