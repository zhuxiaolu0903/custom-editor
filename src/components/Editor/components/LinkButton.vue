<template>
  <base-trigger ref="triggerRef">
    <IconButton :name="name" :is-active="isActive" :is-disabled="isDisabled" />
    <div class="link-button-content" slot="content">
      <el-form :model="params" label-width="40px" size="small">
        <el-form-item label="文本" prop="text">
          <el-input v-model="params.text" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="params.link" placeholder="输入或粘贴链接"></el-input>
        </el-form-item>
        <div class="form-footer">
          <el-button type="primary" size="small" @click="onSubmit" :disabled="checkRequired">
            确定
          </el-button>
        </div>
      </el-form>
    </div>
  </base-trigger>
</template>

<script>
import { IconButton } from '@/components/Editor/components/index'
import BaseTrigger from '@/components/Editor/common/BaseTrigger.vue'

export default {
  name: 'LinkButton',
  components: { BaseTrigger, IconButton },
  props: {
    name: {
      type: String,
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
        link: '',
      },
    }
  },
  methods: {
    onSubmit() {
      // 校验 todo
      this.$emit('click')
      // 手动关闭弹窗
      this.$refs.triggerRef.hide()
    },
  },
  computed: {
    checkRequired() {
      const { text, link } = this.params
      return !text.trim() || !link.trim()
    },
  },
}
</script>

<style scoped lang="scss">
.link-button-content {
  padding: 13px 16px;
  .form-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
