<template>
  <main>
    <Menu></Menu>
    <div class="container">
      <div class="left">
        <Filetree :onProjectChange="handleProjectChanged" v-if="pyodideReady"></Filetree>
      </div>
      <div class="right">
        <div class="cont">
          <div class="editor-cont">
            <Editor></Editor>
          </div>
          <div class="stage-cont">
            <Stage ref="stageRef" />
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
import apiService from '@/services/api.service'
import { ElMessageBox } from 'element-plus'
import pythonLibraryService, { ELibraryType } from '@/services/python-library.service'
import xtermOutputService from '@/services/xterm/xterm-output.service'

let pythonCodeFolder = ''
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

onMounted(() => {
  initpython()
  ElMessageBox.alert(
    `
<ul>
  <li>python外部库使用库管理安装</li>
  <li>安装私有whl库（待实现的功能）</li>
  <li>兼容性解答 <a href="https://pyodide.org/en/stable/usage/wasm-constraints.html">https://pyodide.org/en/stable/usage/wasm-constraints.html</a></li>
  <li>开发web pygame和native pygame的区别，详见<a href="https://pyodide.org/en/stable/usage/sdl.html">https://pyodide.org/en/stable/usage/sdl.html</a></li>
  <li>以下的库肯定可用的<a href="https://pyodide.org/en/stable/usage/packages-in-pyodide.html">https://pyodide.org/en/stable/usage/packages-in-pyodide.html</a></li>
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
  .cont {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
  }
  .stage-cont {
    width: 500px;
    height: 100%;
  }
  .editor-cont {
    width: calc(100% - 500px);
    height: 100%;
    position: relative;
    display: flex;
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
