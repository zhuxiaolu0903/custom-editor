<template>
  <el-select
    v-model="curSelected"
    :disabled="isDisabled"
    style="width: 70px"
    class="toolbar-select-button-wrapper"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'FontSizeButton',
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

<style lang="scss"></style>
