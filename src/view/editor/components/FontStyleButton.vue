<template>
  <BaseTrigger ref="triggerRef" trigger="mouseenter">
    <IconButton
      :tips="tips"
      :is-active="false"
      :is-disabled="isDisabled"
      class="select-btn-container"
    >
      <svg
        width="24"
        height="24"
        viewBox="-3.5 -3.5 24 24"
        xmlns="http://www.w3.org/2000/svg"
        :style="{ backgroundColor: activeFontStyle.bgColor, borderRadius: '4px' }"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            d="M15 4.5h-2v-1H9.75l-.001 11H11V16H7v-1.5h1.249l.001-11H5v1H3V2h12v2.5z"
            :fill="activeFontStyle.color"
          ></path>
        </g>
      </svg>
      <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" class="fold-icon-container">
        <g fill="none" fill-rule="evenodd">
          <path
            d="M3.993 6.034a.498.498 0 01-.311-.145L.854 3.061a.5.5 0 11.707-.707l2.5 2.5 2.5-2.5a.5.5 0 11.707.707L4.439 5.889a.498.498 0 01-.31.145z"
            fill="#74767A"
          ></path>
        </g>
      </svg>
    </IconButton>
    <div slot="content">
      <div class="text-color-container">
        <div class="text-color-des">文字颜色</div>
        <div class="color-select-sec-color">
          <div
            :class="['color-select-content', item.value === activeFontStyle.color && 'is-active']"
            v-for="item in fontColorList"
            :key="item.label"
            @click="onClickFontColor(item)"
          >
            <div class="color-select-option" :data-value="item.value" :style="item.style"></div>
          </div>
        </div>
        <div class="text-color-des">背景颜色</div>
        <div class="color-select-sec-color">
          <div
            :class="['color-select-content', item.value === activeFontStyle.bgColor && 'is-active']"
            v-for="item in fontBgColorList"
            :key="item.label"
            @click="onClickFontBgColor(item)"
          >
            <div class="color-select-option" :data-value="item.value" :style="item.style"></div>
          </div>
        </div>
      </div>
    </div>
  </BaseTrigger>
</template>

<script>
import { BaseTrigger, IconButton } from '@/components'

export default {
  name: 'FontStyleButton',
  components: { BaseTrigger, IconButton },
  props: {
    tips: {
      type: Array,
      default: () => [],
    },
    editor: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Function,
      default: () => () => {},
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fontColorList: [
        {
          label: '皓白',
          value: '#ffffff',
          style: {
            backgroundColor: '#ffffff',
            border: '1px solid #e8ebf0',
            boxShadow: 'rgba(208, 211, 217, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '烟灰色',
          value: '#878d99',
          style: {
            backgroundColor: '#878d99',
            boxShadow: 'rgba(135, 141, 153, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '胭脂粉',
          value: '#ff9999',
          style: {
            backgroundColor: '#ff9999',
            boxShadow: 'rgba(255, 128, 128, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '杏黄',
          value: '#ffc859',
          style: {
            backgroundColor: '#ffc859',
            boxShadow: 'rgba(255, 200, 89, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '嫩绿',
          value: '#4fd972',
          style: {
            backgroundColor: '#4fd972',
            boxShadow: 'rgba(79, 217, 114, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '湖蓝',
          value: '#4da3ff',
          style: {
            backgroundColor: '#4da3ff',
            boxShadow: 'rgba(77, 163, 255, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '丁香紫',
          value: '#8995fa',
          style: {
            backgroundColor: '#8995fa',
            boxShadow: 'rgba(137, 149, 250, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '月灰',
          value: '#e1e6f0',
          style: {
            backgroundColor: '#e1e6f0',
            boxShadow: 'rgba(225, 230, 240, 0.5) 0px 2px 4px 0px',
          },
        },
        {
          label: '玄青黑',
          value: '#1c1d1f',
          style: {
            backgroundColor: '#1c1d1f',
            boxShadow: 'rgba(28, 29, 31, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '赤红',
          value: '#e61300',
          style: {
            backgroundColor: '#e61300',
            boxShadow: 'rgba(230, 19, 0, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '橙黄',
          value: '#ff930f',
          style: {
            backgroundColor: '#ff930f',
            boxShadow: 'rgba(255, 188, 50, 0.3) 0px 2px 4px 0px',
          },
        },
        {
          label: '柳绿',
          value: '#0dae2f',
          style: {
            backgroundColor: '#0dae2f',
            boxShadow: 'rgba(13, 174, 47, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '靛蓝',
          value: '#0f6fd6',
          style: {
            backgroundColor: '#0f6fd6',
            boxShadow: 'rgba(15, 111, 214, 0.2) 0px 2px 4px 0px',
          },
        },
        {
          label: '靛紫',
          value: '#4f54d6',
          style: {
            backgroundColor: '#4f54d6',
            boxShadow: 'rgba(79, 84, 214, 0.2) 0px 2px 4px 0px',
          },
        },
      ],
      fontBgColorList: [
        {
          label: '无色',
          value: '',
          style: {
            backgroundColor: '',
            border: '1px solid rgb(233, 235, 240)',
          },
        },
        {
          label: '浅灰',
          value: '#f2f4f7',
          style: {
            backgroundColor: '#f2f4f7',
            border: '1px solid rgb(237, 239, 242)',
          },
        },
        {
          label: '浅红',
          value: '#ffe6e6',
          style: {
            backgroundColor: '#ffe6e6',
            border: '1px solid rgb(242, 219, 219)',
          },
        },
        {
          label: '浅黄',
          value: '#faeac8',
          style: {
            backgroundColor: '#faeac8',
            border: '1px solid rgb(242, 227, 194)',
          },
        },
        {
          label: '浅绿',
          value: '#c2f2ce',
          style: {
            backgroundColor: '#c2f2ce',
            border: '1px solid rgb(185, 230, 196)',
          },
        },
        {
          label: '浅蓝',
          value: '#d5e7fb',
          style: {
            backgroundColor: '#d5e7fb',
            border: '1px solid rgb(206, 223, 242)',
          },
        },
        {
          label: '浅紫',
          value: '#e1e4ff',
          style: {
            backgroundColor: '#e1e4ff',
            border: '1px solid rgb(211, 214, 240)',
          },
        },
        {
          label: '灰色',
          value: '#878d99',
          style: {
            backgroundColor: '#878d99',
            border: '1px solid rgb(124, 129, 140)',
          },
        },
        {
          label: '深灰',
          value: '#636568',
          style: {
            backgroundColor: '#636568',
            border: '1px solid rgb(85, 87, 89)',
          },
        },
        {
          label: '水红',
          value: '#f86f59',
          style: {
            backgroundColor: '#f86f59',
            border: '1px solid rgb(230, 103, 82)',
          },
        },
        {
          label: '柠黄',
          value: '#ffe14d',
          style: {
            backgroundColor: '#ffe14d',
            border: '1px solid rgb(242, 214, 73)',
          },
        },
        {
          label: '草绿',
          value: '#51c56f',
          style: {
            backgroundColor: '#51c56f',
            border: '1px solid rgb(73, 179, 101)',
          },
        },
        {
          label: '海蓝',
          value: '#4498f2',
          style: {
            backgroundColor: '#4498f2',
            border: '1px solid rgb(64, 144, 230)',
          },
        },
        {
          label: '藤紫',
          value: '#6977ec',
          style: {
            backgroundColor: '#6977ec',
            border: '1px solid rgb(100, 113, 224)',
          },
        },
      ],
    }
  },
  methods: {
    onClickFontColor(item) {
      let value = item.style.backgroundColor
      value = value === 'transparent' ? '' : value
      this.$emit('click', { value, type: 'fontColor' })
    },
    onClickFontBgColor(item) {
      let value = item.style.backgroundColor
      value = value === 'transparent' ? '' : value
      this.$emit('click', { value, type: 'fontBgColor' })
    },
  },
  computed: {
    activeFontStyle() {
      const fontStyle = this.editor.getAttributes('textStyle')
      const highlight = this.editor.getAttributes('highlight')
      return {
        color: fontStyle.color || '#1c1d1f',
        bgColor: highlight.color || 'transparent',
      }
    },
  },
}
</script>

<style scoped lang="scss">
.text-color-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
  .text-color-des {
    font-size: 14px;
  }
  .color-select-sec-color {
    display: grid;
    grid-template-columns: repeat(7, 26px);
    gap: 2px;
  }
  .color-select-content {
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #f2f3f5;
    }
    &.is-active {
      background-color: #f2f3f5;
    }
  }
  .color-select-option {
    position: relative;
    height: 18px;
    border-radius: 50%;
    box-sizing: border-box;
    /*&[data-value='transparent']::before {
      background-color: #ff2c0b;
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      top: 8px;
      transform: translate(0) rotate(43deg);
      width: 16px;
    }*/
  }
}
</style>
