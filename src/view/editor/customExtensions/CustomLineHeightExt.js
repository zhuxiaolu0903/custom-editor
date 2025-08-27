import { Extension } from '@tiptap/vue-2'

export const CustomLineHeightExt = Extension.create({
  name: 'CustomLineHeightExt',
  addOptions() {
    return {
      types: ['heading', 'paragraph'],
      defaultHeight: '100%',
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultHeight,
            parseHTML: (element) => element.style.lineHeight || this.options.defaultHeight,
            renderHTML: (attributes) => {
              if (attributes.lineHeight === this.options.defaultHeight) {
                return {}
              }
              return { style: `line-height: ${attributes.lineHeight}` }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setLineHeight:
        (height) =>
        ({ commands }) =>
          this.options.types.every((type) =>
            commands.updateAttributes(type, { lineHeight: height })
          ),
    }
  },
})
