<template>
  <div class="editor" ref="editorRef"></div>
</template>

<script lang="ts" setup>
import apiService from '@/services/api.service'
import { ITreeItem } from '@/services/filetree.service'
import pyodideService from '@/services/pyodide/pyodide.service'
import * as monaco from 'monaco-editor'
import { onMounted, onUnmounted, ref } from 'vue'

const hasChange = ref(false)
const props = defineProps({
  fileData: {
    type: Object as () => ITreeItem,
    required: true
  }
})

const editorRef = ref(null)
let editor: monaco.editor.IStandaloneCodeEditor

const getValue = () => {
  return editor.getValue()
}

const clear = () => {
  editor.setValue('')
}

const queryFileValue = async () => {
  const res = await apiService.getFileContent(props.fileData.filePath)
  return res
}

const resize = () => {
  editor.layout()
}

const saveCode = async () => {
  const value = editor.getValue()

  hasChange.value = false
}

const initEditor = async () => {
  const value = await queryFileValue()
  editor = monaco.editor.create(editorRef.value, {
    value: value || `# ${props.fileData.label}`,
    language: 'python'
  })

  // 监听编辑器内容更改
  editor.onDidChangeModelContent(() => {
    hasChange.value = true
    pyodideService().saveFileToPyodide(props.fileData.path, editor.getValue())
  })
  window.addEventListener('resize', resize)
}

onMounted(() => {
  initEditor()
  console.log('editor created')
})

onUnmounted(() => {
  editor.dispose()
  window.removeEventListener('resize', resize)
  console.log('editor disposed')
})

defineExpose({
  getValue,
  clear
})
</script>

<style scoped lang="scss">
.editor {
  width: 100%;
  height: 100%;
}
</style>
