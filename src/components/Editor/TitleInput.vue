<template>
  <div class="title-input-container">
<!--    <input type="text" id="DOC_TITLE_INPUT_ID" placeholder="请输入标题...">-->
    <div
      class="title-container"
      id="documentTitleDiv"
      contenteditable="true"
      spellcheck="false"
      @input="handleChange"
      @keyDown="handleKeyDown"
      @blur="handleSave"
      @focus="() => $emit('disableToolbar', true)"
      :data-placeholder="placeholder">{{ docTitle }}</div>
  </div>
</template>

<script>
import {TITLE_MAX_LENGTH} from "@/constants/document/title";

const ENTER_KEY_CODE = 13;
export default {
  name: "TitleInput",
  props: {
    docTitle: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      placeholder: '请输入标题...',
      title: '',
    }
  },
  methods: {
    handleChange(e) {
      // 注意：safari下存在兼容性问题 (chrome没有问题，稳的一)
      // 问题：在删除标题的情况下，e.target.textContent会得到正常的空字符串""，但是e.target.innerText会得到带换行字符的字符串，长度为1
      // 原因：猜测原因是 safari 对contenteditable div处理存在问题，在删除标题时，会自动插入一个<br />元素
      // 解决：使用textContent，并在删除标题后需要手动清空safari自动插入的 <br /> 元素，才能显示placeholder
      const text = e.target.textContent;
      if (!text) {
        e.target.innerText = '';
      }
      const newTitle = text.slice(0, TITLE_MAX_LENGTH);
      
      // 字数超出处理
      if (text.length >= TITLE_MAX_LENGTH) {
        e.target.innerText = newTitle;
        const range = window.getSelection();
        range?.selectAllChildren(e.target); // 选中target下所有子内容
        range?.collapseToEnd(); // 光标移至最后
      }
      
      this.title = newTitle
      this.$emit('updateDoTitle', newTitle);
    },
    handleKeyDown(e) {
      // 处理回车事件
      if (e.keyCode === ENTER_KEY_CODE) {
        e.target.blur();
        e.preventDefault();
        e.stopPropagation();
        // 下方的编辑器获取焦点
        this.$emit('focusToEditor', true);
      }
    },
    handleSave() {
      console.log(this.title);
    },
  }
}
</script>

<style scoped lang="scss">
.title-input-container {
  display: flex;
  input {
    flex: 1;
    font-size: 34px;
    line-height: 42px;
    border: none;
    color: #9ea0a3;
    outline: none;
    &::placeholder {
      opacity: 0.5;
    }
  }
  .title-container {
    color: #1c1d1f;
    font-size: 34px;
    font-weight: 600;
    line-height: 42px;
    width: 100%;
    word-break: break-all;
    outline: none;
    &:empty:before {
      color: #9ea0a3;
      content: attr(data-placeholder);
      font-weight: 400;
    }
  }
}
</style>