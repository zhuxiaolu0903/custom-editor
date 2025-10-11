<template>
  <!-- react-renderer 可以修复 click 事件不生效的问题 https://github.com/ueberdosis/tiptap/issues/6901#issuecomment-3248454426 -->
  <div class="drop-menu-container react-renderer" @click.stop>
    <template v-if="items.length">
      <div
        ref="dropMenuItemRef"
        :class="{ 'drop-menu-item': true, 'is-active': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
      >
        {{ item.label }}
      </div>
    </template>
    <div class="item" v-else>No result</div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },
  mounted() {
    /*this.$refs.dropMenuItemRef.forEach((item) => {
      console.dir(333, item)
      item.addEventListener('click', () => {
        console.log(333333)
      })
    })*/
  },
  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },
    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command({ id: item.label })
      }
    },
  },
}
</script>
