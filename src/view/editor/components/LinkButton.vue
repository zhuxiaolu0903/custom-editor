<template>
  <BaseTrigger ref="triggerRef" @show="onShow">
    <IconButton :tips="tips" :is-active="isActive" :is-disabled="isDisabled">
      <svg
        v-if="isEdit"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="24"
        height="24"
        viewBox="-4 -4 32 32"
        class="iconify iconify--isle-editor"
        style="color: currentcolor; vertical-align: middle; display: inline-block"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path
            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
          ></path>
        </g>
      </svg>
      <svg v-else width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <g fill="#39404D" fill-rule="evenodd">
          <g transform="rotate(45 4 18.5)" fill="#39404D" fill-rule="nonzero">
            <path
              d="M4 0a4 4 0 014 4v3l-.007.102A.75.75 0 016.5 7V4a2.5 2.5 0 00-4.995-.164L1.5 4v3A.75.75 0 010 7V4a4 4 0 014-4zM8 13a4 4 0 11-8 0v-3a.75.75 0 111.5 0v3a2.5 2.5 0 004.995.164L6.5 13v-3l.007-.102A.75.75 0 018 10v3z"
            ></path>
            <rect x="3.25" y="5.5" width="1.5" height="6" rx="0.75"></rect>
          </g>
        </g>
      </svg>
    </IconButton>
    <div class="link-button-content" slot="content">
      <el-form :model="params" label-width="40px" size="small">
        <el-form-item label="文本" prop="text">
          <el-input ref="textInputRef" v-model="params.text" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="href">
          <el-input
            ref="linkInputRef"
            v-model="params.href"
            placeholder="输入或粘贴链接"
            @keydown.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <div class="form-footer">
          <el-button type="primary" size="small" @click="onSubmit" :disabled="checkRequired">
            确定
          </el-button>
        </div>
      </el-form>
    </div>
  </BaseTrigger>
</template>

<script>
import { BaseTrigger, IconButton } from '@/components'
import { getLinkContent } from '../common'

export default {
  name: 'LinkButton',
  components: { BaseTrigger, IconButton },
  props: {
    // 是否是编辑模式，区分 icon
    isEdit: {
      type: Boolean,
      default: false,
    },
    tips: {
      type: Array,
      default: () => [],
    },
    editor: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      params: {
        text: '',
        href: '',
      },
    }
  },
  methods: {
    onShow() {
      const { text = '', href = '' } = getLinkContent(this.editor, this.isEdit)
      this.params = { text, href }
      // 输入框聚焦
      const refItem = 'textInputRef'
      this.$nextTick(() => {
        this.$refs[refItem].focus()
      })
    },
    onSubmit() {
      if (this.checkRequired) return
      // 校验 todo
      const { text, href } = this.params
      this.$emit('click', {
        text,
        href,
        target: '_blank',
        isEdit: this.isEdit,
      })
      // 手动关闭弹窗
      this.$refs.triggerRef.hide()
    },
  },
  computed: {
    checkRequired() {
      const { text, href } = this.params
      let check = false
      check = !text.trim() || !href.trim()
      return check
    },
  },
}
</script>

<style scoped lang="scss">
.link-button-content {
  padding: 8px;
  .form-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
