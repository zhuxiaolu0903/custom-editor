export const linkConfig = {
  tips: ['超链接（Ctrl+K）', 'Markdown: [文本](链接) + 空格'],
  onClick: ({ editor, href, target = '_blank', ...arg }) =>
    editor
      .chain()
      .focus()
      .setLink({ href, target, ...arg })
      .run(),
  isActive: ({ editor }) => editor.isActive('link'),
  isDisabled: ({ editor }) => !editor.can().setLink({ href: '' }),
}
