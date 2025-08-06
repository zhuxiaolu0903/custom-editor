import { Extension } from '@tiptap/core'
import { Plugin } from "@tiptap/pm/state";
import {getActiveMarks} from "@/utils";

const BrushMode = {
    NONE: "NONE",
    ONCE: "ONCE",
    ALWAYS: "ALWAYS", // 持续进行
}

export const FormatBrush = Extension.create({
    name: 'formatBrush',
    addOptions() {
        return {
            editorContainerEle: null,
        };
    },
    addStorage() {
        return {
            // 格式化模式
            mode: BrushMode.NONE,
            // 当前记录的格式
            formatRecord: null,
            // 是否正在使用
            isBrushing: false,
        }
    },
    addCommands() {
        return {
            startBrushing: (mode) => ({commands}) => {
                this.storage.mode = mode
                this.storage.isBrushing = true
                commands.recordFormat()
                this.options.editorContainerEle.className += ' sandbox-type-in-brushing'
            },
            endBrushing: () => () => {
                this.storage.mode = BrushMode.NONE
                this.storage.isBrushing = false
                this.storage.formatRecord = null
                const className = this.options.editorContainerEle.className
                this.options.editorContainerEle.className = className.split(' ')[0]
            },
            toggleBrushing: (mode) => ({commands}) => {
                // 进行中，则关闭
                if (this.storage.isBrushing) {
                    commands.endBrushing(mode);
                }
                // 否则、并且传入了 mode 参数，则开始格式刷
                else if (mode !== undefined) {
                    commands.startBrushing(mode);
                }
                // 待机状态但未传入 mode 参数，静默失败
                },
            recordFormat: () => ({ editor }) => {
                const marks = getActiveMarks(editor)
                this.storage.formatRecord = {
                    textMarks: marks
                }
            },
            applyTextFormat: () => ({ commands, chain }) => {
                const formatRecord = this.storage.formatRecord
                const marks = formatRecord.textMarks
                // 先清除选区内文字的所有标记
                chain().focus().unsetAllMarks().run()
                // 应用所有新标记
                marks.forEach(mark => commands.setMark(mark.type.name))
            },
        }
    },
    // 在FormatPainter扩展中添加
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        mouseup: () => {
                            if (!this.storage.isBrushing) {
                                return;
                            }
                            this.editor.commands.applyTextFormat();
                            // 如果模式为单次，则自动关闭格式刷
                            if (this.storage.mode === BrushMode.ONCE) {
                                this.editor.commands.endBrushing();
                            }
                            return false
                        }
                    }
                }
            })
        ]
    }
})