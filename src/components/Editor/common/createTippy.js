// 创建 Tippy 实例
import tippy from 'tippy.js'

export const createTippy = (element, tippyOptions = {}) => {
  return tippy(element, {
    duration: 0,
    getReferenceClientRect: null,
    interactive: true,
    trigger: 'manual',
    placement: 'top',
    hideOnClick: 'toggle',
    appendTo: document.body,
    ...tippyOptions,
  })
}
