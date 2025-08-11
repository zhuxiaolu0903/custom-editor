<template>
  <div>
    <el-select
      v-model="curSelected"
      :disabled="isDisabled"
      style="width: 100px"
      class="toolbar-select-button-wrapper"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'FontFamilyButton',
  props: {
    value: String,
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
