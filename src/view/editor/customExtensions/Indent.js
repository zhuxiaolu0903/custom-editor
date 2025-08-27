import { Extension } from '@tiptap/vue-2'

export const IndentExt = Extension.create({
  addOptions() {
    return {
      types: ['heading', 'paragraph'],
      excludeTypes: ['listItem', 'bulletList', 'orderedList', 'taskList', 'taskItem'], // 明确排除列表相关类型
      indentStep: 30, // 每次缩进的步进值（像素）
      indentMin: 0, // 最小缩进值
      indentMax: 300, // 最大缩进值
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: this.options.indentMin,
            parseHTML: (element) => parseInt(element.style.paddingLeft) || this.options.indentMin,
            renderHTML: (attributes) => {
              const { indent } = attributes
              if (!indent || indent === this.options.indentMin) {
                return {}
              }
              return {
                style: `padding-left: ${indent}px;`,
              }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      indent:
        () =>
        ({ state, dispatch, chain }) => {
          const { selection, doc } = state
          const { types, excludeTypes, indentStep, indentMin, indentMax } = this.options
          return chain()
            .command(({ tr }) => {
              const isInclude = excludeTypes.some((item) => this.editor.isActive(item))
              if (isInclude) return false
              let transaction = tr
              doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                if (types.includes(node.type.name)) {
                  const currentIndent = node.attrs.indent || indentMin
                  const newIndent = Math.min(currentIndent + indentStep, indentMax)
                  if (newIndent !== currentIndent) {
                    transaction = transaction.setNodeMarkup(pos, undefined, {
                      ...node.attrs,
                      indent: newIndent,
                    })
                  }
                }
              })
              if (dispatch) dispatch(transaction)
              return true
            })
            .run()
        },
      outdent:
        () =>
        ({ state, dispatch, chain }) => {
          const { selection, doc } = state
          const { types, excludeTypes, indentStep, indentMin } = this.options
          return chain()
            .command(({ tr }) => {
              const isInclude = excludeTypes.some((item) => this.editor.isActive(item))
              if (isInclude) return false
              let transaction = tr
              doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                if (types.includes(node.type.name)) {
                  const currentIndent = node.attrs.indent || indentMin
                  const newIndent = Math.max(currentIndent - indentStep, indentMin)
                  if (newIndent !== currentIndent) {
                    transaction = transaction.setNodeMarkup(pos, undefined, {
                      ...node.attrs,
                      indent: newIndent,
                    })
                  }
                }
              })
              if (dispatch) dispatch(transaction)
              return true
            })
            .run()
        },
    }
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        const isInclude = this.options.excludeTypes.some((item) => this.editor.isActive(item))
        if (isInclude) return false
        return this.editor.commands.indent()
      },
      'Shift-Tab': () => {
        const isInclude = this.options.excludeTypes.some((item) => this.editor.isActive(item))
        if (isInclude) return false
        return this.editor.commands.outdent()
      },
      // 处理 Backspace 键
      Backspace: ({ editor }) => {
        const { state } = editor
        const { selection } = state
        const { $from, empty } = selection

        // 1. 只有在光标选择（非范围选择）且位于行首时才考虑减少缩进
        if (!empty) {
          // 如果有文本被选中，则执行默认的删除行为，不处理缩进
          return false
        }

        // 2. 检查光标是否在当前文本节点的最开头
        // $from.parentOffset 是光标在当前父节点中的偏移量
        const isAtStartOfNode = $from.parentOffset === 0

        // 3. 检查光标是否在整个文档或当前“行”的绝对起始位置
        // 例如，它可能位于一个段落、列表项或其他块级节点的最开始
        const isAtAbsoluteStart = $from.pos === $from.start(0) // 这里可以根据需要调整深度判断

        // 一个更通用的“行首”判断：光标前面没有内容（除了可能的文档结构）
        // 这里使用 state.doc.resolve($from.pos - 1) 来探查前一个位置
        let isTrulyAtLineStart = false
        if ($from.pos === 0) {
          // 光标在整个文档的最开始
          isTrulyAtLineStart = true
        } else {
          // 获取当前光标位置之前的一个字符的解析位置
          const prevPos = state.doc.resolve($from.pos - 1)
          // 如果前一个位置和当前位置不在同一个“块”节点内，或者前一个位置是文档开始，则认为是在行首
          // 这是一种常见的行首判断启发式方法
          if ($from.node(1) !== prevPos.node(1)) {
            // 检查深度1的节点（通常是块节点）是否不同
            isTrulyAtLineStart = true
          }
        }

        // 综合判断：我们认为在节点内部偏移为0，或者处于绝对的块起始位置，都属于“行首”
        const isAtLineStart = isAtStartOfNode || isAtAbsoluteStart || isTrulyAtLineStart

        if (!isAtLineStart) {
          // 光标不在行首，执行默认的 Backspace 删除行为
          return false
        }

        // 4. 现在光标在行首，检查当前是否在列表中
        const isInclude = this.options.excludeTypes.some((item) => this.editor.isActive(item))
        // 在列表中，让列表扩展处理 Backspace 键（例如，可能会减少列表项缩进）
        // 返回 false 表示不阻止列表扩展的处理
        if (isInclude) return false

        // 5. 不在列表中，且光标在行首，尝试执行减少缩进
        // 注意：需要确保当前节点确实可以 outdent
        const canOutdent = this.editor.commands.outdent() // 注意：这里直接调用命令，但需要检查是否成功

        // 如果成功执行了 outdent，则阻止默认的 Backspace 行为（删除字符）
        // 因为我们的目的是减少缩进，而不是删除前面的节点或内容
        if (canOutdent) {
          return true // 阻止默认的 Backspace 行为
        }

        // 如果 outdent 命令没有成功执行（例如，当前已经是最小缩进），则回退到默认的 Backspace 行为
        return false
      },
    }
  },
})
