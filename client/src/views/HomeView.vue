<template>
  <main>
    <Menu></Menu>
    <div class="container">
      <div class="left">
        <Filetree :onProjectChange="handleProjectChanged" v-if="pyodideReady"></Filetree>
        <Stage ref="stageRef" />
      </div>
      <div class="right">
        <div class="editor">
          <Editor ref="editorRef"></Editor>
          <div class="btns">
            <el-button-group>
              <el-button type="primary" :icon="Bicycle" @click="runPythonAsync()">运行</el-button>
              <el-button type="primary" :icon="Delete" @click="handleClear">清空</el-button>
              <el-button type="primary" :icon="Remove" @click="stopPythonAsync">停止</el-button>
            </el-button-group>
          </div>
        </div>
        <XtermOutput></XtermOutput>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { PyodideInterface } from 'pyodide'
import { computed, onMounted, ref } from 'vue'
import Menu from '@/components/menu/menu.vue'
import pyodideService, { EPyodideInitState } from '@/services/pyodide/pyodide.service'
import Editor from '@/components/editor/editor.vue'
import Filetree from '@/components/filetree/filetree.vue'
import Stage from '@/components/stage/stage.vue'
import XtermOutput from '@/components/xterm/xterm-output.vue'
import { Bicycle, Delete, Remove } from '@element-plus/icons-vue'
import apiService from '@/services/api.service'
import fileTreeService from '@/services/filetree.service'
import { ElMessage, ElMessageBox } from 'element-plus'
import pythonLibraryService, { ELibraryType } from '@/services/python-library.service'
import xtermOutputService from '@/services/xterm/xterm-output.service'

let pythonCodeFolder = ''
const editorRef = ref(null)
const stageRef = ref(null)
let pyodide: PyodideInterface

const pyodideReady = computed(() => pyodideService().pyodideState.init === EPyodideInitState.LOADED)

const handleProjectChanged = async (path: string) => {
  pythonCodeFolder = path
  const zipUrl = await apiService.getFileTreeZip(pythonCodeFolder)
  pyodideService().uploadFilesForZip(zipUrl, pythonCodeFolder)
}

const initpython = async () => {
  xtermOutputService().writeln('python环境初始化中...')
  const canvas = stageRef.value.$refs.stageCanvas
  try {
    pyodide = await pyodideService().init('./pyodide/', canvas)
  } catch (error: any) {
    xtermOutputService().writeln('python环境初始化异常')
    xtermOutputService().writeln(error)
    return
  }
  pyodide.setStdout({
    batched: (data: string) => {
      xtermOutputService().writeln(data)
    }
  })
  pyodide.setStderr({
    batched: (data: string) => {
      xtermOutputService().writeln(data)
    }
  })
  xtermOutputService().writeln('python环境初始化完成')

  const pyodideLibrary = pythonLibraryService.getStorageLibrary(ELibraryType.PYODIDE)
  const pypiLibrary = pythonLibraryService.getStorageLibrary(ELibraryType.PIPY)
  if (pyodideLibrary.length) {
    await pyodideService().loadPackageForNames(pyodideLibrary)
  }
  if (pypiLibrary.length) {
    for (const name of pypiLibrary) {
      await pyodideService().loadMicropipPackage(name)
    }
  }
}

let runWindow: WindowProxy | null = null;
const runPythonAsync = async () => {
  const { name, ext, path } = fileTreeService.getCurrentItem()
  if (ext !== 'py') {
    ElMessage({
      message: '请在左侧选择一个python文件',
      type: 'warning'
    })
    return
  }
  //   const code = `
  // import ${pythonCodeFolder}.${name}
  // ${pythonCodeFolder}.${name}.main()
  //   `
  // pyodide
  //   .runPythonAsync(runCode || code)
  //   .then(() => {
  //     xtermOutputService().writeln('运行结束')
  //   })
  //   .catch((error: any) => {
  //     const resStr = '\x1B[1;31m' + error.message + '\x1b[0m'
  //     xtermOutputService().writeln(resStr)
  //   })

  const width = 800
  const height = 1000
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2
  const runType = pythonCodeFolder.includes('Pygame') ? 'pygame' : 'matplotlib'
  stopPythonAsync()
  runWindow = window.open(
    '/run?project=' +
      pythonCodeFolder +
      '&runType=' +
      runType +
      '&path=' +
      encodeURIComponent(path),
    '_blank',
    `toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${width},height=${height},top=${top},left=${left}`
  )
}

const stopPythonAsync = () => {
  runWindow && runWindow.close()
  // ElMessage({
  //   message: '停止运行还没实现，请刷新网页',
  //   type: 'success'
  // })
  // return
  // pyodide.runPythonAsync('raise SystemExit')
}

const handleClear = () => {
  xtermOutputService().clear()
}

onMounted(() => {
  initpython()

  if (location.hostname === 'localhost') {
    return
  }
  ElMessageBox.alert(
    `
<ul>
  <li>兼容性解答 <a href="https://pyodide.org/en/stable/usage/wasm-constraints.html">https://pyodide.org/en/stable/usage/wasm-constraints.html</a></li>
  <li>python外部库使用库管理安装</li>
  <li>安装私有whl库（待实现的功能）</li>
  <li>pygame运行后无法停止，需要刷新页面（待实现的功能）</li>
  <li>页面刷新后，编写的代码不会被保存（待实现的功能）</li>
  <li>需要更新预置代码联系开发者</li>
  <li>开发web pygame和native pygame的区别，详见<a href="https://pyodide.org/en/stable/usage/sdl.html">https://pyodide.org/en/stable/usage/sdl.html</a></li>
  <li>
    <span>以下的库肯定可用的<a href="https://pyodide.org/en/stable/usage/packages-in-pyodide.html">https://pyodide.org/en/stable/usage/packages-in-pyodide.html</a></span>
  </li>
  <li>全平台python包都支持安装，纯python的一定可用，涉及到硬件调用的，不一定可用，需自己测试。</li>
  <li>pygame 在线demo <a href="https://ryanking13.github.io/pyodide-pygame-demo/">https://ryanking13.github.io/pyodide-pygame-demo/</a></li>
  <li>更多demo <a href="https://pyscript.com/@examples">https://pyscript.com/@examples</a></li>
  </ul>
    `,
    '使用注意',
    {
      dangerouslyUseHTMLString: true,
      customStyle: {
        width: '500px',
        maxWidth: '100%'
      }
    }
  ).catch(() => {})
})
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.modules {
  display: flex;
  align-items: center;
}
.modules-input {
  width: 500px;
  height: 30px;
}
.right {
  width: calc(100% - 300px);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  position: relative;
  .editor {
    width: 100%;
    height: 100%;
    position: relative;
    .btns {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      bottom: 10px;
      right: 30px;
      z-index: 99;
    }
  }
}
.left {
  width: 300px;
  height: 100%;
}

textarea {
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.btn {
  text-align: center;
  background-color: #409eff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 21px;
  margin: 0 10px;
}
</style>
