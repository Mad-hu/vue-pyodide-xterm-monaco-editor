<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="editor-tabs"
    closable
    @tab-remove="handleRemoveTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.path"
      :label="item.label"
      :name="item.path"
    >
      <div class="editor-content">
        <div class="img-view" v-if="isImgFile(item)">
          <img :src="item.filePath" alt="" />
        </div>
        <div v-else-if="isEditFile(item)" class="monaco-editor">
          <MonacoEditor :fileData="item" />
        </div>
        <div v-else>{{ `不支持的文件类型${item.label}` }}</div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import fileTreeService, { ITreeItem } from '@/services/filetree.service'
import { computed, ref, watch } from 'vue'
import MonacoEditor from './monaco-editor.vue'
const editableTabsValue = ref('')

const isEditFile = (item: ITreeItem) => {
  return ['txt', 'py', 'c', 'cpp', 'md', 'java', 'svg'].includes(item.ext)
}
const isImgFile = (item: ITreeItem) => {
  return ['png', 'jpg', 'jpeg', 'ico'].includes(item.ext)
}
const editableTabs = computed(() => {
  const data = fileTreeService.getTreeSelectItem()
  if (data.length !== 0 && editableTabsValue.value === '') {
    editableTabsValue.value = data[0].path
  } else if (data.length === 0) {
    editableTabsValue.value = ''
  }
  return data
})

watch(
  () => fileTreeService.getCurrentItem().path,
  (val) => {
    editableTabsValue.value = val
  }
)

const handleRemoveTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  editableTabsValue.value = activeName
  fileTreeService.delSelectTreeItem(targetName)
}
</script>

<style scoped lang="scss">
.editor {
  width: 100%;
  height: 100%;
  .editor-content,
  .monaco-editor {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-view {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .editor-tabs {
    width: 100%;
    height: 100%;
  }
}
:deep(.el-tab-pane) {
  background-color: #f0f2f5;
  height: 100%;
}
</style>
