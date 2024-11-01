<template>
  <div class="btns">
    <el-button-group>
      <el-button type="primary" :icon="Bicycle" @click="runNewWindowPythonAsync()"
        >新窗口运行</el-button
      >
      <el-button type="primary" :icon="Remove" @click="stopNewWindowPythonAsync" title="关闭新窗口运行的程序"
        >停止</el-button
      >
    </el-button-group>
    <el-button-group style="{marginLeft: '15px'}">
      <el-button type="primary" :icon="Bicycle" @click="runPythonAsync()" title="页面内显示结果">运行</el-button>
      <el-button type="primary" :icon="Remove" @click="stopPythonAsync" title="关闭新窗口运行的程序"
        >停止</el-button
      >
      <el-button type="primary" :icon="Delete" @click="handleClear" title="清空控制台">清空</el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts" setup>
import fileTreeService from '@/services/filetree.service'
import pyodideService from '@/services/pyodide/pyodide.service'
import xtermOutputService from '@/services/xterm/xterm-output.service'
import { ElMessage } from 'element-plus'
import { Bicycle, Delete, Remove } from '@element-plus/icons-vue'

let runWindow: WindowProxy | null = null
const runNewWindowPythonAsync = async () => {
  const { ext, path } = fileTreeService.getCurrentItem()
  if (ext !== 'py') {
    ElMessage({
      message: '请在左侧选择一个python文件',
      type: 'warning'
    })
    return
  }
  const width = 800
  const height = 1000
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2
  const folder = pyodideService().extractFolder
  const runType = folder.includes('Pygame') ? 'pygame' : 'matplotlib'
  stopPythonAsync()
  runWindow = window.open(
    '/run?project=' + folder + '&runType=' + runType + '&path=' + encodeURIComponent(path),
    '_blank',
    `toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${width},height=${height},top=${top},left=${left}`
  )
}

const runPythonAsync = () => {
  const { name, ext } = fileTreeService.getCurrentItem()
  if (ext !== 'py') {
    ElMessage({
      message: '请在左侧选择一个python文件',
      type: 'warning'
    })
    return
  }
  const pythonCodeFolder = pyodideService().extractFolder
  const code = `
  import ${pythonCodeFolder}.${name}
  ${pythonCodeFolder}.${name}.main()
    `
  pyodideService()
    .pyodide.runPythonAsync(code)
    .then(() => {
      xtermOutputService().writeln('运行结束')
    })
    .catch((error: any) => {
      const resStr = '\x1B[1;31m' + error.message + '\x1b[0m'
      xtermOutputService().writeln(resStr)
    })
}

const stopNewWindowPythonAsync = () => {
  runWindow && runWindow.close()
}

const stopPythonAsync = () => {
    const { name, ext } = fileTreeService.getCurrentItem()
  if (ext !== 'py') {
    ElMessage({
      message: '请在左侧选择一个python文件',
      type: 'warning'
    })
    return
  }
  const pythonCodeFolder = pyodideService().extractFolder
  const code = `
  ${pythonCodeFolder}.${name}.stop()
    `
    pyodideService()
    .pyodide.runPythonAsync(code)
    .then(() => {
      xtermOutputService().writeln('运行停止结束')
    })
    .catch((error: any) => {
      const resStr = '\x1B[1;31m' + error.message + '\x1b[0m'
      xtermOutputService().writeln(resStr)
    })
}

const handleClear = () => {
  xtermOutputService().clear()
  const matplotlibRender = document.getElementById('matplotlibRender');
  if (matplotlibRender) {
    matplotlibRender.innerHTML = '';
  }
}
</script>

<style scoped lang="scss">
.btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 30px;
  z-index: 99;

  :deep(.el-button-group) {
    margin-right: 15px;
  }
}
</style>
