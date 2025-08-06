// 获取当前选区激活的所有标记及其属性
export const getActiveMarks = (editor) => {
    const { state } = editor
    const { selection } = state
    const { $from, $to } = selection

    // 收集所有标记
    const marks = []

    // 遍历选区内的每个节点
    state.doc.nodesBetween($from.pos, $to.pos, (node) => {
        node.marks.forEach(mark => {
            if (!marks.some(m => m.type.name === mark.type.name)) {
                marks.push({
                    type: mark.type,
                    attrs: mark.attrs
                })
            }
        })
    })

    return marks
}