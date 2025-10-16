// 当前生效的工具栏
import { getMarkRange } from '@tiptap/vue-2'

export const TOOLBAR_MENU_LIST = [
  'undoRedo',
  'formatBrush',
  '|',
  'heading',
  'fontFamily',
  'fontSize',
  '|',
  'bold',
  'italic',
  'underline',
  'strike',
  'fontStyle',
  'code',
  'subscript',
  'superscript',
  '|',
  'textAlign',
  'lineHeight',
  'indent',
  'outdent',
  '|',
  'bulletList',
  'orderedList',
  'taskList',
  '|',
  'link',
  'codeBlock',
  'image',
]

// 工具栏图标集合
export const toolbarPathNameMap = {
  undo: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M15 8a5 5 0 010 10H6v-1.5h9a3.5 3.5 0 003.495-3.308L18.5 13A3.5 3.5 0 0015 9.5H6V8h9z"></path><path d="M7.8 6v5.5L4.5 8.75z"></path></g></svg>',
  redo: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M10 8a5 5 0 000 10h9v-1.5h-9a3.5 3.5 0 01-3.495-3.308L6.5 13A3.5 3.5 0 0110 9.5h9V8h-9z"></path><path d="M16.7 6v5.5L20 8.75z"></path></g></svg>',
  formatBrush:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M18 11v7a1 1 0 01-1 1H5.5l.867-1.733A6 6 0 007 14.584V11h11zm-1.5 1.5h-8v2.309a6 6 0 01-.455 2.292l-.165.399h8.62v-5zM12.5 4a1 1 0 011 1v2H17a1 1 0 011 1v2H7V8a1 1 0 011-1h3.5V5a1 1 0 011-1z"></path></g></svg>',
  bold: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M11.75 5a3.75 3.75 0 010 7.5H8V5h3.75zm0 1.5H9.5V11h2.25a2.25 2.25 0 100-4.5z"></path><path d="M13 11a4 4 0 110 8H8v-8h5zm0 1.5H9.5v5H13a2.5 2.5 0 100-5z"></path></g></svg>',
  italic:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M13 5h1.5l-3 13H10z"></path><path d="M10.5 5h6v1.5h-6zM8 17.5h6V19H8z"></path></g></svg>',
  underline:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M16.5 12.5a4.5 4.5 0 01-9 0v-7H10V7H9v5.5a3 3 0 005.995.176L15 12.5V7h-1V5.5h2.5v7zM8 18h8v1.5H8z"></path></g></svg>',
  strike:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M5 11.5h14V13H5z"></path><path d="M8 9a4 4 0 118 0h-1.5a2.5 2.5 0 10-2.5 2.5V13a4 4 0 01-4-4z"></path><path d="M12 17.5a2.5 2.5 0 001.488-4.51l.503-1.46A4 4 0 118 15h1.5a2.5 2.5 0 002.5 2.5z"></path></g></svg>',
  code: '<svg t="1754025195464" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12658" width="24" height="24"><path d="M597.333333 667.178667l180.053334-176.512L597.333333 314.154667 656.64 256 896 490.666667 656.64 725.333333zM203.946667 490.666667L384 667.178667 324.693333 725.333333 85.333333 490.666667 324.693333 256 384 314.154667z" fill="#39404D" p-id="12659"></path></svg>',
  codeBlock:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="mp-icon-container"><g fill="#39404D" fill-rule="evenodd"><path d="M9.096 9.303l-2.475 2.475 2.475 2.475-1.06 1.06-2.829-2.828a1 1 0 010-1.414l2.829-2.828 1.06 1.06zm10.253 1.768a1 1 0 010 1.414l-2.828 2.829-1.06-1.061 2.474-2.475-2.475-2.475 1.06-1.06 2.83 2.828zM12.735 6l1.449.388-2.847 10.626-1.449-.389z"></path></g></svg>',
  subscript:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 28 28"><path d="M5.59567 4L10.5 9.92831L15.4043 4H18L11.7978 11.4971L18 18.9943V19H15.4091L10.5 13.0659L5.59092 19H3V18.9943L9.20216 11.4971L3 4H5.59567ZM21.8 16C21.8 15.5582 21.4418 15.2 21 15.2C20.5582 15.2 20.2 15.5582 20.2 16C20.2 16.0762 20.2107 16.15 20.2306 16.2198L19.0765 16.5496C19.0267 16.375 19 16.1906 19 16C19 14.8954 19.8954 14 21 14C22.1046 14 23 14.8954 23 16C23 16.5727 22.7593 17.0892 22.3735 17.4538L20.7441 19H23V20H19V19L21.5507 16.5803C21.7042 16.4345 21.8 16.2284 21.8 16Z"></path></svg>',
  superscript:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 28 28"><path d="M5.59567 5L10.5 10.9283L15.4043 5H18L11.7978 12.4971L18 19.9943V20H15.4091L10.5 14.0659L5.59092 20H3V19.9943L9.20216 12.4971L3 5H5.59567ZM21.5507 6.5803C21.7042 6.43453 21.8 6.22845 21.8 6C21.8 5.55817 21.4418 5.2 21 5.2C20.5582 5.2 20.2 5.55817 20.2 6C20.2 6.07624 20.2107 6.14999 20.2306 6.21983L19.0765 6.54958C19.0267 6.37497 19 6.1906 19 6C19 4.89543 19.8954 4 21 4C22.1046 4 23 4.89543 23 6C23 6.57273 22.7593 7.08923 22.3735 7.45384L20.7441 9H23V10H19V9L21.5507 6.5803V6.5803Z"></path></svg>',
  link: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(45 4 18.5)" fill="#39404D" fill-rule="nonzero"><path d="M4 0a4 4 0 014 4v3l-.007.102A.75.75 0 016.5 7V4a2.5 2.5 0 00-4.995-.164L1.5 4v3A.75.75 0 010 7V4a4 4 0 014-4zM8 13a4 4 0 11-8 0v-3a.75.75 0 111.5 0v3a2.5 2.5 0 004.995.164L6.5 13v-3l.007-.102A.75.75 0 018 10v3z"></path><rect x="3.25" y="5.5" width="1.5" height="6" rx="0.75"></rect></g></svg>',
  bulletList:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M9 5h10v1.5H9zM9 11h10v1.5H9zM9 17h10v1.5H9zM5 5h1.5v1.5H5zM5 11h1.5v1.5H5zM5 17h1.5v1.5H5z"></path></g></svg>',
  orderedList:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M9 5h11v1.5H9zM9 11h11v1.5H9zM9 17h11v1.5H9zM5 4h1v4H5zM4 13v-1a1 1 0 011-1h1v-1H4.5a.5.5 0 010-1H6a1 1 0 01.993.883L7 10v1a1 1 0 01-.883.993L6 12H5v1h1.5a.5.5 0 010 1H5a1 1 0 01-1-1zM4.5 20a.5.5 0 110-1H6v-1H5v-1h1v-1H4.5a.5.5 0 110-1H6a1 1 0 01.993.883L7 16v3a1 1 0 01-.883.993L6 20H4.5z"></path></g></svg>',
  taskList:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="#39404D" fill-rule="evenodd" ><path d="M15 5v1.5H6.5v11h11V11H19v7a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h9z"></path><path d="M19.781 6.606l-6.364 6.364.002.003-1.06 1.06-3.536-3.535 1.06-1.06 2.473 2.471 6.364-6.363 1.061 1.06z"></path></g></svg>',
  blockquote:
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(7 8)" fill="#39404D" fill-rule="nonzero"><rect y="5" width="4" height="4" rx="1"></rect><rect x="6" y="5" width="4" height="4" rx="1"></rect><path d="M4 1.5A2.5 2.5 0 001.5 4v3H0V4a4 4 0 014-4v1.5zM10 1.5A2.5 2.5 0 007.5 4v3H6V4a4 4 0 014-4v1.5z"></path></g></svg>',
  outdent:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 28 28"><path d="M3 4H21V6H3V4ZM3 19H21V21H3V19ZM11 14H21V16H11V14ZM11 9H21V11H11V9ZM3 12.5L7 9V16L3 12.5Z"></path></svg>',
  indent:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -2 28 28"><path d="M3 4H21V6H3V4ZM3 19H21V21H3V19ZM11 14H21V16H11V14ZM11 9H21V11H11V9ZM7 12.5L3 16V9L7 12.5Z"></path></svg>',
  hardBreak:
    '<svg t="1754025137706" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10790" width="24" height="24"><path d="M621.696 704h54.848a91.392 91.392 0 1 0 0-182.848H219.52a36.544 36.544 0 0 1 0-73.152h457.152a164.608 164.608 0 0 1 0 329.152h-54.912v36.544a18.304 18.304 0 0 1-29.248 14.656l-78.016-58.496a36.672 36.672 0 0 1 0-58.56l78.08-58.496a18.304 18.304 0 0 1 29.184 14.656V704zM219.52 192h585.152a36.544 36.544 0 0 1 0 73.152H219.392a36.544 36.544 0 1 1 0-73.152z m182.848 548.544a36.608 36.608 0 0 1-36.608 36.608H219.52a36.608 36.608 0 0 1 0-73.152h146.24a36.544 36.544 0 0 1 36.608 36.544z" p-id="10791"></path></svg>',
}

// 获取激活的链接文本或者选中的文本和激活的链接
export const getLinkContent = (editor, isEdit = false) => {
  let text = '',
    href = ''
  const { state } = editor.view
  const { selection, doc } = state
  const { empty } = selection
  if (!empty) {
    // 获取选区内的文本
    text = doc.textBetween(selection.from, selection.to)
  } else if (isEdit) {
    // 从当前鼠标焦点处获取文本
    const $pos = state.doc.resolve(selection.from) // 获取链接标记
    const linkMark = state.schema.marks.link
    // 使用 getMarkRange 获取链接的完整范围
    const range = getMarkRange($pos, linkMark)
    if (range) {
      const { from: start, to: end } = range
      // 获取链接文本内容
      text = state.doc.textBetween(start, end)
    }
  }
  if (isEdit) {
    // 获取当前激活的链接
    const linkData = editor.getAttributes('link')
    if (linkData.href) {
      href = linkData.href
    }
  }
  return {
    text,
    href,
  }
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const handleImageUpload = async (file, onProgress, abortSignal) => {
  // Validate file
  if (!file) {
    throw new Error('No file provided')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`)
  }

  // For demo/testing: Simulate upload progress. In production, replace the following code
  // with your own upload implementation.
  for (let progress = 0; progress <= 100; progress += 10) {
    if (abortSignal?.aborted) {
      throw new Error('Upload cancelled')
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    onProgress?.({ progress })
  }

  return '/images/tiptap-ui-placeholder-image.jpg'
}
