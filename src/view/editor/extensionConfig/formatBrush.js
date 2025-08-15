export const formatBrushConfig = {
  tips: ['重格式刷 (双击保持使用)'],
  onClick: ({ editor }) => editor.chain().focus().toggleBrushing('ONCE').run(),
  onDoubleClick: ({ editor }) => editor.chain().focus().toggleBrushing('ALWAYS').run(),
  isActive: ({ editor }) => editor.storage.formatBrush.isBrushing,
  isDisabled: () => false,
}
