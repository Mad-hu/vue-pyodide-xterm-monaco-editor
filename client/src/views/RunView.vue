<template>
  <div class="renders">
    <div class="canvas-box" v-show="type === 'pygame'">
      <canvas id="canvasRender" ref="canvasRef"></canvas>
    </div>
    <div class="matplotlib-box" v-show="type === 'matplotlib'">
      <div id="matplotlibRender"></div>
    </div>
  </div>
  <XtermOutput></XtermOutput>
</template>

<script lang="ts" setup>
import apiService from '@/services/api.service'
import { ITreeItem } from '@/services/filetree.service'
import pyodideService from '@/services/pyodide/pyodide.service'
import pythonLibraryService, { ELibraryType } from '@/services/python-library.service'
import xtermOutputService from '@/services/xterm/xterm-output.service'
import { PyodideInterface } from 'pyodide'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { runType } = route.query

const type = ref(runType)
const canvasRef = ref(null)

const path = decodeURIComponent(route.query.path as string || '') 
let pythonCodeFolder = route.query.project as string
let pyodide: PyodideInterface

const initpython = async () => {
  xtermOutputService().writeln('python环境初始化中...')
  const canvas = canvasRef.value
  try {
    pyodide = await pyodideService().init('./pyodide/', canvas)
  } catch (error: any) {
    xtermOutputService().writeln('初始化异常')
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

  xtermOutputService().writeln('获取python代码文件...')
  const zipUrl = await apiService.getFileTreeZip(pythonCodeFolder)
  await pyodideService().uploadFilesForZip(zipUrl, pythonCodeFolder)
  xtermOutputService().writeln('python代码文件解压完成')
  xtermOutputService().writeln('安装库中...')
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
  xtermOutputService().writeln('安装库完成')
  await runPythonAsync()
}

const findNodeByPath = (tree: ITreeItem[], path: string): ITreeItem => {
  for (let node of tree) {
    if (node.path === path) {
      return node;
    }
    if (node.children) {
      const result = findNodeByPath(node.children, path);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

const getRootFileItem = async () => {
  const treeData = await apiService.getFileTree(pythonCodeFolder)
  const queryItem = findNodeByPath(treeData, path)
  return queryItem
}

const runPythonAsync = async () => {
  xtermOutputService().writeln('启动运行...')
  const { name } = await getRootFileItem()
  const code = `
import ${pythonCodeFolder}.${name}
${pythonCodeFolder}.${name}.main()
  `
  pyodide
    .runPythonAsync(code)
    .then(() => {
      xtermOutputService().writeln('运行结束')
    })
    .catch((error: any) => {
      const resStr = '\x1B[1;31m' + error.message + '\x1b[0m'
      xtermOutputService().writeln(resStr)
    })
}

onMounted(() => {
  console.log('RunView mounted')
  document.pyodideMplTarget = document.getElementById('matplotlibRender')
  initpython()
})
</script>

<style scoped lang="scss">
.renders {
  width: 100%;
  height: calc(100% - 330px);

  .canvas-box {
    width: 100%;
    height: 100%;
    canvas {
      width: 100%;
      height: 100%;
    }
  }

  .matplotlib-box {
    width: 100%;
    height: 100%;
    #matplotlibRender {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
