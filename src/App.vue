<template>
  <div id="app">
    <div class="view-wrapper theme-light">
      <div class="view-container">
        <CustomEditor />
      </div>
    </div>
  </div>
</template>

<script>
import CustomEditor from './components/CustomEditor.vue'

export default {
  name: 'App',
  components: {
    CustomEditor,
  },
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
.view-wrapper {
  background-color: #f5f6fb;
  padding: 24px;
  height: calc(100% - 48px);
  .view-container {
    background-color: #ffffff;
    border-radius: 8px;
    height: 100%;
  }
}
</style>
