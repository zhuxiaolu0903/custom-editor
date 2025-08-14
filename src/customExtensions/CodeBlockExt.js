import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import tippy from 'tippy.js'

// 可选语言合集
export const languages = [
  { name: 'Auto', value: 'auto' },
  { name: 'Plain Text', value: 'plaintext', alias: ['text', 'txt'] },
  { name: 'Bash', value: 'bash', alias: ['sh'] },
  { name: 'BASIC', value: 'basic', alias: [] },
  { name: 'C', value: 'c', alias: ['h'] },
  { name: 'Clojure', value: 'clojure', alias: ['clj', 'edn'] },
  { name: 'CMake', value: 'cmake', alias: ['cmake.in'] },
  {
    name: 'CoffeeScript',
    value: 'coffeescript',
    alias: ['coffee', 'cson', 'iced'],
  },
  {
    name: 'C++',
    value: 'cpp',
    alias: ['cc', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'],
  },
  { name: 'C#', value: 'csharp', alias: ['cs', 'c#'] },
  { name: 'CSS', value: 'css', alias: [] },
  { name: 'Dart', value: 'dart', alias: [] },
  { name: 'Delphi', value: 'delphi', alias: ['dpr', 'dfm', 'pas', 'pascal'] },
  { name: 'Dockerfile', value: 'dockerfile', alias: ['docker'] },
  { name: 'Erlang', value: 'erlang', alias: ['erl'] },
  { name: 'Go', value: 'go', alias: ['golang'] },
  { name: 'GraphQL', value: 'graphql', alias: ['gql'] },
  { name: 'Groovy', value: 'groovy', alias: [] },
  { name: 'Java', value: 'java', alias: ['jsp'] },
  {
    name: 'JavaScript',
    value: 'javascript',
    alias: ['js', 'jsx', 'mjs', 'cjs'],
  },
  { name: 'JSON', value: 'json', alias: [] },
  { name: 'Kotlin', value: 'kotlin', alias: ['kt', 'kts'] },
  { name: 'Lua', value: 'lua', alias: [] },
  { name: 'Makefile', value: 'makefile', alias: ['mk', 'mak', 'make'] },
  { name: 'Markdown', value: 'markdown', alias: ['md', 'mkdown', 'mkd'] },
  { name: 'Matlab', value: 'matlab', alias: [] },
  {
    name: 'Objective-C',
    value: 'objectivec',
    alias: ['mm', 'objc', 'obj-c', 'obj-c++', 'objective-c++'],
  },
  { name: 'PHP', value: 'php', alias: [] },
  { name: 'Properties', value: 'properties', alias: [] },
  { name: 'Python', value: 'python', alias: ['py', 'gyp', 'ipython'] },
  {
    name: 'Ruby',
    value: 'ruby',
    alias: ['rb', 'gemspec', 'podspec', 'thor', 'irb'],
  },
  { name: 'Rust', value: 'rust', alias: ['rs'] },
  { name: 'Scala', value: 'scala', alias: [] },
  { name: 'SCSS', value: 'scss', alias: [] },
  { name: 'Shell', value: 'shell', alias: ['console', 'shellsession'] },
  { name: 'SQL', value: 'sql', alias: [] },
  { name: 'Swift', value: 'swift', alias: [] },
  { name: 'TypeScript', value: 'typescript', alias: ['ts', 'tsx'] },
  { name: 'WebAssembly', value: 'wasm', alias: [] },
  {
    name: 'HTML, XML',
    value: 'xml',
    alias: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist', 'wsf', 'svg'],
  },
  { name: 'YAML', value: 'yaml', alias: ['yml'] },
]

export const CodeBlockExt = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: null,
      lowlight: {},
      languages: [],
    }
  },
  // 添加代码块头部
  addNodeView() {
    return (props) => {
      const container = document.createElement('div')
      container.classList.add('code-block-wrapper')
      const { language } = props.node.attrs
      // 编辑器不可编辑时
      if (!this.editor.isEditable) {
        container.innerHTML = `
                <div class="code-block-tools" contenteditable="false">
                    <div class="code-block-tools-lang" contenteditable="false" style="margin-right: 10px">${
                      language || this.options.defaultLanguage
                    }</div>
                </div>
                <pre class="hljs"><code></code></pre>
                `
        return {
          dom: container,
          contentDOM: container.querySelector('code'),
        }
      }
      container.innerHTML = `
                <div class="code-block-tools" contenteditable="false">
                    <div class="code-block-tools-lang" contenteditable="false"><span>${
                      language || this.options.defaultLanguage
                    }</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 16L6 10H18L12 16Z"></path></svg></div>
                </div>
                <pre class="hljs"><code></code></pre>
                `
      // 语言下拉框
      const createEL = () => {
        const div = document.createElement('div')
        div.classList.add('code-block-lang')
        div.innerHTML = `
                ${this.options.languages
                  ?.map((lang) => {
                    return `<div class="code-block-lang-item" data-item="${lang.value}">${lang.name}</div>`
                  })
                  .join('')}`
        div.addEventListener('click', (event) => {
          const target = event.target.closest('.code-block-lang-item')
          if (target) {
            const language = target.getAttribute('data-item')
            props.editor.chain().setCodeBlock({ language: language }).run()
          }
        })
        return div
      }
      const instance = tippy(container.querySelector('.code-block-tools-lang'), {
        content: createEL(),
        appendTo: props.editor.options.element,
        placement: 'bottom-end',
        trigger: 'click',
        interactive: true,
        arrow: false,
        aria: {
          content: null,
          expanded: false,
        },
      })
      return {
        dom: container,
        contentDOM: container.querySelector('code'),
        destroy: () => {
          instance.destroy()
        },
      }
    }
  },
})
