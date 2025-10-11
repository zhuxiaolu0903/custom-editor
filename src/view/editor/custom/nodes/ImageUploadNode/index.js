import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import ImageUploadNodeComponent from './ImageUploadNodeComponent.vue'

// 自定义上传图片组件扩展
export const ImageUploadNode = Node.create({
  name: 'imageUpload',
  group: 'block',
  draggable: true,
  atom: true,
  addOptions() {
    return {
      accept: 'image/*',
      limit: 1,
      maxSize: 0,
      upload: undefined,
      onError: undefined,
      onSuccess: undefined,
    }
  },
  addAttributes() {
    return {
      accept: {
        default: this.options.accept,
      },
      limit: {
        default: this.options.limit,
      },
      maxSize: {
        default: this.options.maxSize,
      },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="image-upload"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'image-upload' }, HTMLAttributes)]
  },
  addNodeView() {
    return VueNodeViewRenderer(ImageUploadNodeComponent)
  },
  addCommands() {
    return {
      setImageUploadNode:
        (options = {}) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})
