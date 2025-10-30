<template>
  <node-view-wrapper class="react-render image-node">
    <div
      v-if="isLoading"
      class="tiptap-image-upload-previews"
      :style="{
        width: attrs.width + 'px',
        height: attrs.width + 'px',
      }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M12 3C16.9706 3 21 7.02944 21 12H19C19 8.13401 15.866 5 12 5V3Z"></path>
      </svg>
    </div>
    <div
      v-else
      class="tiptap-image"
      contenteditable="false"
      data-node-view-wrapper=""
      style="white-space: normal"
      :data-align="attrs.align"
      :data-width="attrs.width"
    >
      <div
        class="tiptap-image-container"
        :style="{
          width: attrs.width + 'px',
        }"
      >
        <div class="tiptap-image-content">
          <img
            :alt="fileItem.file.name"
            class="tiptap-image-img"
            contenteditable="false"
            draggable="false"
            :src="fileItem.url"
          />
          <div
            class="tiptap-image-handle tiptap-image-handle-left"
            @mousedown="startDrag('left', $event)"
          ></div>
          <div
            class="tiptap-image-handle tiptap-image-handle-right"
            @mousedown="startDrag('right', $event)"
          ></div>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'

export default {
  name: 'ImageNode',
  components: { NodeViewWrapper },
  props: nodeViewProps,
  data() {
    return {
      fileItem: {
        url: '',
        status: '',
        progress: 0,
        file: {},
      },
      isLoading: true,
      isHover: false,
    }
  },
  created() {
    this.fileItem.file = this.attrs.file
    this.uploadImage()
  },
  methods: {
    // 工具方法
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
    },
    uploadImage() {
      /*const url = this.attrs.uploadUrl
      const uploader = getUploader(url)
      const headers = this.attrs.uploadHeaders ? this.attrs.uploadHeaders : {}
      uploader(this.fileItem.file, url, headers, 'img')
        .then((json) => {
          if (json.errorCode === 0 && json.data && json.data.src) {
            this.isLoading = false
            // 上传成功
          } else {
            // 移除节点
          }
        })
        .then(() => {
          // 移除节点
        })*/
      this.fileItem.status = 'uploading'
      setTimeout(() => {
        this.isLoading = false
        this.fileItem.url =
          'http://devv2.xiaoneng.com/pm/hep-pm-server/v1/pm/image/show?path=pm/defaultFileNumber/20240611/defaultObjectType/1bc63ae2ca5048599ea86630c16cabfa.png'
      }, 1000)
    },
    startDrag(type, event) {
      this.isDragging = true
      this.dragType = type
      this.startX = event.clientX
      this.startWidth = this.imageWidth
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.stopDrag)
      event.preventDefault()
    },
    onDrag(event) {
      if (!this.isDragging) return
      const deltaX = event.clientX - this.startX
      let newWidth
      if (this.dragType === 'right') {
        newWidth = this.startWidth + deltaX
      } else {
        newWidth = this.startWidth - deltaX
      }
      // 应用宽度限制
      const maxWidth = this.editor.view.dom.clientWidth - 10
      newWidth = Math.max(this.attrs.minWidth, Math.min(maxWidth, newWidth))
      this.imageWidth = newWidth
    },
    stopDrag() {
      this.isDragging = false
      this.dragType = null
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.stopDrag)
    },
  },
  computed: {
    attrs() {
      return this.node.attrs
    },
    imageWidth: {
      get() {
        return this.attrs.width
      },
      set(value) {
        this.updateAttributes({
          width: value,
        })
      },
    },
  },
}
</script>

<style scoped lang="scss">
.tiptap-image-upload-previews {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efefef;
  svg {
    margin: auto;
    width: 120px;
    fill: #cccccc;
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

.tiptap-image-upload-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(47, 50, 55, 0.2);
  margin-bottom: 0.5rem;

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(35, 37, 42, 0.87);
  }
}

// === Individual File Preview Styles ===
.tiptap-image-upload-preview {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;

  .tiptap-image-upload-progress {
    position: absolute;
    inset: 0;
    background-color: rgba(239, 238, 255, 1);
    transition: all 300ms ease-out;
  }

  .tiptap-image-upload-preview-content {
    position: relative;
    border: 1px solid rgba(47, 50, 55, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tiptap-image-upload-file-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 2rem;

    .tiptap-image-upload-file-icon {
      padding: 0.5rem;
      background-color: #0000ee;
      border-radius: 0.75rem;

      svg {
        width: 0.875rem;
        height: 0.875rem;
        color: #ffffff;
      }
    }
  }

  .tiptap-image-upload-details {
    display: flex;
    flex-direction: column;
  }

  .tiptap-image-upload-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .tiptap-image-upload-progress-text {
      font-size: 0.75rem;
      color: #0000ee;
      font-weight: 600;
    }
  }
}

.tiptap-image {
  display: flex;
  margin: 1.5rem 0;
  width: 100%;
  &[data-align='right'] {
    text-align: right;
    justify-content: flex-end;
  }
  &[data-align='center'] {
    text-align: center;
    justify-content: center;
  }
  &:hover {
    .tiptap-image-handle {
      display: block;
    }
  }
}
.tiptap-image-container {
  cursor: pointer;
  user-select: none;
  flex-direction: column;
  display: flex;
  width: 100%;
}
.tiptap-image-content {
  align-items: center;
  display: flex;
  max-width: 100%;
  position: relative;
  transition: all 0.3s ease;
}
.tiptap-image-img {
  width: 100%;
  border-radius: 0.25rem;
  transition: width 0.2s ease;
}
.tiptap-image-handle {
  display: none;
  position: absolute;
  top: 50%;
  width: 0.375rem;
  height: 50%;
  max-height: 3rem;
  background-color: #7a52ff;
  border-radius: 1.875rem;
  cursor: ew-resize;
  transform: translateY(-50%);
  z-index: 10;
  &.tiptap-image-handle-left {
    left: 4px;
  }
  &.tiptap-image-handle-right {
    right: 4px;
  }
}
</style>
