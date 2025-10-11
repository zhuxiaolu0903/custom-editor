<!--
<template>
  <node-view-wrapper class="vue-component">
    <div class="tiptap-image-upload-drag-area"></div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'

export default {
  components: {
    NodeViewWrapper,
  },
  data() {
    return {
      fileItems: [],
    }
  },
  props: nodeViewProps,
  methods: {
    uploadFile() {},
  },
  computed: {
    hasFiles() {
      return this.fileItems.length > 0
    },
  },
}
</script>

<style lang="scss">
.tiptap {
  /* Vue component */
  .vue-component {
    background-color: var(&#45;&#45;purple-light);
    border: 2px solid var(&#45;&#45;purple);
    border-radius: 0.5rem;
    margin: 2rem 0;
    position: relative;

    label {
      background-color: var(&#45;&#45;purple);
      border-radius: 0 0 0.5rem 0;
      color: var(&#45;&#45;white);
      font-size: 0.75rem;
      font-weight: bold;
      padding: 0.25rem 0.5rem;
      position: absolute;
      top: 0;
    }

    .content {
      margin-top: 1.5rem;
      padding: 1rem;
    }
  }
}
</style>
-->
<template>
  <node-view-wrapper>
    <div class="tiptap-image-upload" tabindex="0" @click="handleClick">
      <!-- 无文件时的拖拽区域 -->
      <div v-if="!hasFiles">
        <div
          class="tiptap-image-upload-drag-area"
          :class="{
            'drag-active': isDragActive,
            'drag-over': isDragOver,
          }"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          @dragover="handleDragOver"
          @drop="handleDrop"
        >
          <div class="tiptap-image-upload-dropzone">
            <svg
              width="43"
              height="57"
              viewBox="0 0 43 57"
              fill="currentColor"
              class="tiptap-image-upload-dropzone-rect-primary"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.75 10.75C0.75 5.64137 4.89137 1.5 10 1.5H32.3431C33.2051 1.5 34.0317 1.84241 34.6412 2.4519L40.2981 8.10876C40.9076 8.71825 41.25 9.5449 41.25 10.4069V46.75C41.25 51.8586 37.1086 56 32 56H10C4.89137 56 0.75 51.8586 0.75 46.75V10.75Z"
                fill="currentColor"
                fill-opacity="0.11"
                stroke="currentColor"
                stroke-width="1.5"
              ></path>
            </svg>
            <svg
              width="10"
              height="10"
              class="tiptap-image-upload-dropzone-rect-secondary"
              viewBox="0 0 10 10"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.75H0.343146C1.40401 0.75 2.42143 1.17143 3.17157 1.92157L8.82843 7.57843C9.57857 8.32857 10 9.34599 10 10.4069V10.75H4C1.79086 10.75 0 8.95914 0 6.75V0.75Z"
                fill="currentColor"
              ></path>
            </svg>
            <div class="tiptap-image-upload-icon-container">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="tiptap-image-upload-icon"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1953 4.41771C10.3478 4.08499 9.43578 3.94949 8.5282 4.02147C7.62062 4.09345 6.74133 4.37102 5.95691 4.83316C5.1725 5.2953 4.50354 5.92989 4.00071 6.68886C3.49788 7.44783 3.17436 8.31128 3.05465 9.2138C2.93495 10.1163 3.0222 11.0343 3.3098 11.8981C3.5974 12.7619 4.07781 13.5489 4.71463 14.1995C5.10094 14.5942 5.09414 15.2274 4.69945 15.6137C4.30476 16 3.67163 15.9932 3.28532 15.5985C2.43622 14.731 1.79568 13.6816 1.41221 12.5299C1.02875 11.3781 0.91241 10.1542 1.07201 8.95084C1.23162 7.74748 1.66298 6.59621 2.33343 5.58425C3.00387 4.57229 3.89581 3.72617 4.9417 3.10998C5.98758 2.4938 7.15998 2.1237 8.37008 2.02773C9.58018 1.93176 10.7963 2.11243 11.9262 2.55605C13.0561 2.99968 14.0703 3.69462 14.8919 4.58825C15.5423 5.29573 16.0585 6.11304 16.4177 7.00002H17.4999C18.6799 6.99991 19.8288 7.37933 20.7766 8.08222C21.7245 8.78515 22.4212 9.7743 22.7637 10.9036C23.1062 12.0328 23.0765 13.2423 22.6788 14.3534C22.2812 15.4644 21.5367 16.4181 20.5554 17.0736C20.0962 17.3803 19.4752 17.2567 19.1684 16.7975C18.8617 16.3382 18.9853 15.7172 19.4445 15.4105C20.069 14.9934 20.5427 14.3865 20.7958 13.6794C21.0488 12.9724 21.0678 12.2027 20.8498 11.4841C20.6318 10.7655 20.1885 10.136 19.5853 9.6887C18.9821 9.24138 18.251 8.99993 17.5001 9.00002H15.71C15.2679 9.00002 14.8783 8.70973 14.7518 8.28611C14.4913 7.41374 14.0357 6.61208 13.4195 5.94186C12.8034 5.27164 12.0427 4.75043 11.1953 4.41771Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M11 14.4142V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V14.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L12.7078 11.2936C12.7054 11.2912 12.703 11.2888 12.7005 11.2864C12.5208 11.1099 12.2746 11.0008 12.003 11L12 11L11.997 11C11.8625 11.0004 11.7343 11.0273 11.6172 11.0759C11.502 11.1236 11.3938 11.1937 11.2995 11.2864C11.297 11.2888 11.2946 11.2912 11.2922 11.2936L7.29289 15.2929C6.90237 15.6834 6.90237 16.3166 7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L11 14.4142Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>

          <div class="tiptap-image-upload-content">
            <span class="tiptap-image-upload-text">
              <em>Click to upload</em>
              or drag and drop
            </span>
            <span class="tiptap-image-upload-subtext">
              Maximum {{ limit }} file{{ limit === 1 ? '' : 's' }}, {{ maxSize / 1024 / 1024 }}MB
              each.
            </span>
          </div>
        </div>
      </div>
      <!-- 有文件时的预览区域 -->
      <div v-if="hasFiles" class="tiptap-image-upload-previews">
        <div v-if="fileItems.length > 1" class="tiptap-image-upload-header">
          <span>Uploading {{ fileItems.length }} files</span>
          <button type="button" class="button" data-style="ghost" @click.stop="clearAllFiles">
            Clear All
          </button>
        </div>

        <div v-for="fileItem in fileItems" :key="fileItem.id" class="tiptap-image-upload-preview">
          <div
            v-if="fileItem.status === 'uploading'"
            class="tiptap-image-upload-progress"
            :style="{ width: fileItem.progress + '%' }"
          ></div>

          <div class="tiptap-image-upload-preview-content">
            <div class="tiptap-image-upload-file-info">
              <div class="tiptap-image-upload-file-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="tiptap-image-upload-icon"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1953 4.41771C10.3478 4.08499 9.43578 3.94949 8.5282 4.02147C7.62062 4.09345 6.74133 4.37102 5.95691 4.83316C5.1725 5.2953 4.50354 5.92989 4.00071 6.68886C3.49788 7.44783 3.17436 8.31128 3.05465 9.2138C2.93495 10.1163 3.0222 11.0343 3.3098 11.8981C3.5974 12.7619 4.07781 13.5489 4.71463 14.1995C5.10094 14.5942 5.09414 15.2274 4.69945 15.6137C4.30476 16 3.67163 15.9932 3.28532 15.5985C2.43622 14.731 1.79568 13.6816 1.41221 12.5299C1.02875 11.3781 0.91241 10.1542 1.07201 8.95084C1.23162 7.74748 1.66298 6.59621 2.33343 5.58425C3.00387 4.57229 3.89581 3.72617 4.9417 3.10998C5.98758 2.4938 7.15998 2.1237 8.37008 2.02773C9.58018 1.93176 10.7963 2.11243 11.9262 2.55605C13.0561 2.99968 14.0703 3.69462 14.8919 4.58825C15.5423 5.29573 16.0585 6.11304 16.4177 7.00002H17.4999C18.6799 6.99991 19.8288 7.37933 20.7766 8.08222C21.7245 8.78515 22.4212 9.7743 22.7637 10.9036C23.1062 12.0328 23.0765 13.2423 22.6788 14.3534C22.2812 15.4644 21.5367 16.4181 20.5554 17.0736C20.0962 17.3803 19.4752 17.2567 19.1684 16.7975C18.8617 16.3382 18.9853 15.7172 19.4445 15.4105C20.069 14.9934 20.5427 14.3865 20.7958 13.6794C21.0488 12.9724 21.0678 12.2027 20.8498 11.4841C20.6318 10.7655 20.1885 10.136 19.5853 9.6887C18.9821 9.24138 18.251 8.99993 17.5001 9.00002H15.71C15.2679 9.00002 14.8783 8.70973 14.7518 8.28611C14.4913 7.41374 14.0357 6.61208 13.4195 5.94186C12.8034 5.27164 12.0427 4.75043 11.1953 4.41771Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11 14.4142V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V14.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L12.7078 11.2936C12.7054 11.2912 12.703 11.2888 12.7005 11.2864C12.5208 11.1099 12.2746 11.0008 12.003 11L12 11L11.997 11C11.8625 11.0004 11.7343 11.0273 11.6172 11.0759C11.502 11.1236 11.3938 11.1937 11.2995 11.2864C11.297 11.2888 11.2946 11.2912 11.2922 11.2936L7.29289 15.2929C6.90237 15.6834 6.90237 16.3166 7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L11 14.4142Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div class="tiptap-image-upload-details">
                <span class="tiptap-image-upload-text">{{ fileItem.file.name }}</span>
                <span class="tiptap-image-upload-subtext">
                  {{ formatFileSize(fileItem.file.size) }}
                </span>
              </div>
            </div>
            <div class="tiptap-image-upload-actions">
              <span
                v-if="fileItem.status === 'uploading'"
                class="tiptap-image-upload-progress-text"
              >
                {{ fileItem.progress }}%
              </span>
              <button
                type="button"
                class="button"
                data-style="ghost"
                @click.stop="removeFileItem(fileItem.id)"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 文件选择输入框 -->
      <input
        ref="fileInput"
        name="file"
        :accept="accept"
        type="file"
        :multiple="limit > 1"
        @change="handleChange"
        @click.stop
      />
    </div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'

export default {
  name: 'ImageUploadNode',
  components: { NodeViewWrapper },
  props: nodeViewProps,
  data() {
    return {
      fileItems: [],
      isDragActive: false,
      isDragOver: false,
    }
  },
  computed: {
    accept() {
      return this.node.attrs.accept
    },
    limit() {
      return this.node.attrs.limit
    },
    maxSize() {
      return this.node.attrs.maxSize
    },
    hasFiles() {
      return this.fileItems.length > 0
    },
    uploadOptions() {
      return {
        maxSize: this.maxSize,
        limit: this.limit,
        accept: this.accept,
        upload: this.extension.options.upload,
        onSuccess: this.extension.options.onSuccess,
        onError: this.extension.options.onError,
      }
    },
  },
  methods: {
    // 文件上传相关方法
    async uploadFile(file) {
      if (file.size > this.uploadOptions.maxSize) {
        const error = new Error(
          `File size exceeds maximum allowed (${this.uploadOptions.maxSize / 1024 / 1024}MB)`
        )
        this.uploadOptions.onError?.(error)
        return null
      }

      const abortController = new AbortController()
      const fileId = crypto.randomUUID()

      const newFileItem = {
        id: fileId,
        file,
        progress: 0,
        status: 'uploading',
        abortController,
      }

      this.fileItems = [...this.fileItems, newFileItem]

      try {
        if (!this.uploadOptions.upload) {
          throw new Error('Upload function is not defined')
        }

        const url = await this.uploadOptions.upload(
          file,
          (event) => {
            this.fileItems = this.fileItems.map((item) =>
              item.id === fileId ? { ...item, progress: event.progress } : item
            )
          },
          abortController.signal
        )

        if (!url) throw new Error('Upload failed: No URL returned')

        if (!abortController.signal.aborted) {
          this.fileItems = this.fileItems.map((item) =>
            item.id === fileId ? { ...item, status: 'success', url, progress: 100 } : item
          )
          this.uploadOptions.onSuccess?.(url)
          return url
        }

        return null
      } catch (error) {
        if (!abortController.signal.aborted) {
          this.fileItems = this.fileItems.map((item) =>
            item.id === fileId ? { ...item, status: 'error', progress: 0 } : item
          )
          this.uploadOptions.onError?.(error instanceof Error ? error : new Error('Upload failed'))
        }
        return null
      }
    },

    async uploadFiles(files) {
      if (!files || files.length === 0) {
        this.uploadOptions.onError?.(new Error('No files to upload'))
        return []
      }

      if (this.uploadOptions.limit && files.length > this.uploadOptions.limit) {
        this.uploadOptions.onError?.(
          new Error(
            `Maximum ${this.uploadOptions.limit} file${
              this.uploadOptions.limit === 1 ? '' : 's'
            } allowed`
          )
        )
        return []
      }

      // Upload all files concurrently
      const uploadPromises = files.map((file) => this.uploadFile(file))
      const results = await Promise.all(uploadPromises)

      // Filter out null results (failed uploads)
      return results.filter((url) => url !== null)
    },

    removeFileItem(fileId) {
      const fileToRemove = this.fileItems.find((item) => item.id === fileId)
      if (fileToRemove?.abortController) {
        fileToRemove.abortController.abort()
      }
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url)
      }
      this.fileItems = this.fileItems.filter((item) => item.id !== fileId)
    },

    clearAllFiles() {
      this.fileItems.forEach((item) => {
        if (item.abortController) {
          item.abortController.abort()
        }
        if (item.url) {
          URL.revokeObjectURL(item.url)
        }
      })
      this.fileItems = []
    },

    // 拖拽相关方法
    handleDragEnter(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragActive = true
    },

    handleDragLeave(e) {
      e.preventDefault()
      e.stopPropagation()
      if (!e.currentTarget.contains(e.relatedTarget)) {
        this.isDragActive = false
        this.isDragOver = false
      }
    },

    handleDragOver(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragOver = true
    },

    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragActive = false
      this.isDragOver = false

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        this.handleUpload(files)
      }
    },

    // 文件处理相关方法
    async handleUpload(files) {
      const urls = await this.uploadFiles(files)

      if (urls.length > 0) {
        const pos = this.getPos()

        if (this.isValidPosition(pos)) {
          const imageNodes = urls.map((url, index) => {
            const filename = files[index]?.name.replace(/\.[^/.]+$/, '') || 'unknown'
            return {
              type: 'image',
              attrs: { src: url, alt: filename, title: filename },
            }
          })

          this.editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + 1 })
            .insertContentAt(pos, imageNodes)
            .run()
        }
      }
    },

    handleChange(e) {
      const files = e.target.files
      if (!files || files.length === 0) {
        this.extension.options.onError?.(new Error('No file selected'))
        return
      }
      this.handleUpload(Array.from(files))
    },

    handleClick() {
      if (this.$refs.fileInput && this.fileItems.length === 0) {
        this.$refs.fileInput.value = ''
        this.$refs.fileInput.click()
      }
    },

    // 工具方法
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
    },

    isValidPosition(pos) {
      return pos !== undefined && pos !== null && pos >= 0
    },
  },
}
</script>

<style scoped lang="scss">
.tiptap-image-upload {
  margin: 2rem 0;

  input[type='file'] {
    display: none;
  }

  .tiptap-image-upload-dropzone {
    position: relative;
    width: 3.125rem;
    height: 3.75rem;
    display: inline-flex;
    align-items: flex-start;
    justify-content: center;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none;
  }

  .tiptap-image-upload-icon-container {
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    bottom: 0;
    right: 0;
    background-color: #0000ee;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tiptap-image-upload-icon {
    width: 0.875rem;
    height: 0.875rem;
    color: #ffffff;
  }

  .tiptap-image-upload-dropzone-rect-primary {
    color: rgba(37, 39, 45, 0.1);
    position: absolute;
  }

  .tiptap-image-upload-dropzone-rect-secondary {
    position: absolute;
    top: 0;
    right: 0.25rem;
    bottom: 0;
    color: #d5d6d7;
  }

  .tiptap-image-upload-text {
    color: #3f4146;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: normal;

    em {
      font-style: normal;
      text-decoration: underline;
    }
  }

  .tiptap-image-upload-subtext {
    color: rgba(40, 44, 51, 0.42);
    font-weight: 600;
    line-height: normal;
    font-size: 0.75rem;
  }

  .tiptap-image-upload-drag-area {
    padding: 2rem 1.5rem;
    border: 1.5px dashed rgba(47, 50, 55, 0.2);
    border-radius: 0.5rem;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;

    &:hover {
      border-color: rgba(40, 44, 51, 0.42);
    }

    &.drag-active {
      border-color: #0000ee;
      background-color: rgba(0, 123, 255, 0.05);
    }

    &.drag-over {
      border-color: #0000ee;
      background-color: rgba(0, 123, 255, 0.1);
    }
  }

  .tiptap-image-upload-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.25rem;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none;
  }

  .tiptap-image-upload-previews {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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
}
</style>
