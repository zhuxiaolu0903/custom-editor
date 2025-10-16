import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
// import { PluginKey } from '@tiptap/pm/state'
import ImageNodeComponent from './ImageNodeComponent.vue'
// import { uuid } from '@/utils'
// import { getUploader } from '@/utils/fileUploader'
//
// const key = new PluginKey('image-plugin')
// const actionKey = 'image_action'
// 自定义图片组件扩展
export const ImageNode = Node.create({
  name: 'imageNode',
  group: 'block',
  draggable: true,
  atom: true,
  addOptions() {
    return {
      file: null, // 上传的表单名
      uploadUrl: '', // 上传url
      uploadHeaders: undefined, // 上传方法请求头，外部传入
      width: 350,
      height: 'auto',
      align: 'left',
      minWidth: 30,
      uploadFormName: '', // 上传的表单名
      upload: undefined,
      onError: undefined,
      onSuccess: undefined,
      uploaderEvent: undefined, // 上传方法的相关事件，包括 onUploadBefore
    }
  },
  addAttributes() {
    return {
      file: {
        default: this.options.file,
      },
      uploadUrl: {
        default: this.options.uploadUrl,
      },
      uploadHeaders: {
        default: this.options.uploadHeaders,
      },
      width: {
        default: this.options.width,
        parseHTML: (element) => `${element.getAttribute('data-width') ?? ''}`,
        renderHTML: ({ width }) => (width ? { width } : {}),
      },
      height: {
        default: 'auto',
      },
      align: {
        default: this.options.align,
        parseHTML: (element) => {
          return element.getAttribute('data-align')
        },
        renderHTML: ({ align }) => {
          return align ? { 'data-align': align } : {}
        },
      },
      minWidth: {
        default: this.options.minWidth,
      },
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-type="image-node"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'image-node' }, HTMLAttributes)]
  },
  addNodeView() {
    return VueNodeViewRenderer(ImageNodeComponent)
  },
  addCommands() {
    return {
      /*uploadImage: (file) => {
        const headers =
          typeof this.options.uploadHeaders === 'object'
            ? this.options.uploadHeaders
            : typeof this.options.uploadHeaders === 'function'
            ? this.options.uploadHeaders()
            : {}
        // 上传前执行的方法
        if (this.options.uploaderEvent && this.options.uploaderEvent.onUploadBefore) {
          if (
            this.options.uploaderEvent.onUploadBefore(file, this.options.uploadUrl, headers) ===
            false
          ) {
            return false
          }
        }
        // 清除其他选区
        setTimeout(() => {
          this.editor.commands.deleteSelection()
        })
        /!**
         * 立即创建一个带唯一ID的装饰器
         * 这个装饰器作为临时标记占据图片将要插入的位置
         * 防止在异步上传期间用户在该位置编辑内容
         *!/
        const id = uuid()
        const {
          state: { tr },
          view,
          schema,
        } = this.editor
        view.dispatch(
          tr.setMeta(actionKey, {
            type: 'add',
            id,
            pos: tr.selection.from,
          })
        )
        // 上传方法
        const uploader = this.options.uploader || getUploader(this.options.uploadUrl)
        const uploadFormName = this.options.uploadFormName || 'image'
        uploader(file, this.options.uploadUrl, headers, uploadFormName)
          .then((json) => {
            if (this.options.uploaderEvent?.onSuccess) {
              const result = this.options.uploaderEvent.onSuccess(file, json)
              if (typeof result === 'boolean' && !result) {
                return
              }
              if (typeof result === 'object') {
                json = result
              }
              if (json.errorCode === 0 && json.data && json.data.src) {
                /!**
                 * 通过ID找到对应的装饰器位置
                 * 在装饰器位置插入真实的图片节点
                 * 移除临时装饰器
                 *!/
                const decorations = key.getState(this.editor.state)
                let found = decorations.find(void 0, void 0, (spec) => spec.id == id)
                view.dispatch(
                  view.state.tr
                    .insert(
                      found[0].from - 1,
                      schema.nodes.image.create({
                        src: json.data.src,
                        alt: json.data.alt,
                        align: json.data.align || 'left',
                        width: json.data.width || this.options.defaultSize,
                        height: json.data.height || 'auto',
                        'data-src': json.data['data-src'],
                        loading: json.data.loading,
                        class: json.data.class,
                      })
                    )
                    .setMeta(actionKey, { type: 'remove', id })
                )
              } else {
                // 如果上传失败，立即移除对应的装饰器，清理临时状态。
                view.dispatch(tr.setMeta(actionKey, { type: 'remove', id }))
                if (this.options.uploaderEvent && this.options.uploaderEvent.onFailed) {
                  this.options.uploaderEvent.onFailed(file, json)
                }
              }
            }
          })
          .catch((err) => {
            // 如果上传失败，立即移除对应的装饰器，清理临时状态。
            const {
              state: { tr },
              view,
            } = this.editor
            view.dispatch(tr.setMeta(actionKey, { type: 'remove', id }))
            if (this.options.uploaderEvent && this.options.uploaderEvent.onError) {
              this.options.uploaderEvent.onError(file, err)
            }
          })
        return true
      },*/
      uploadImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})
