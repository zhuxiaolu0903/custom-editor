<template>
  <el-select
    v-model="curSelected"
    :disabled="isDisabled"
    style="width: 80px"
    class="toolbar-select-button-wrapper"
    popper-class="heading-button-popper"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      <span :class="'heading-option-' + item.value">{{ item.content }}</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'HeadingButton',
  props: {
    value: Number,
    isDisabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    curSelected: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('selected', value)
      },
    },
  },
}
</script>

<style lang="scss">
.heading-button-popper {
  .heading-option-4 {
    height: 38px;
    line-height: 38px;
  }
  .heading-option-0 {
    font-weight: 400;
    height: 34px;
    line-height: 34px;
  }
  .heading-option-1,
  .heading-option-2,
  .heading-option-3 {
    height: 44px;
    line-height: 44px;
  }
  .heading-option-1 {
    font-size: 20px;
  }
  .heading-option-2 {
    font-size: 19px;
  }
  .heading-option-3 {
    font-size: 18px;
  }
  .heading-option-4 {
    height: 38px;
    line-height: 38px;
    font-size: 16px;
  }
  .heading-option-5,
  .heading-option-6 {
    height: 34px;
    line-height: 34px;
    font-size: 14px;
  }
  .el-select-dropdown__wrap {
    max-height: 300px;
  }
  .el-select-dropdown__item {
    height: auto;
    line-height: normal;
  }
}
</style>
