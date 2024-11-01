<template>
  <el-tag type="success">所有库都可用，但是需要安装</el-tag>
  <div class="search">
    <el-input v-model="search" placeholder="搜索" clearable></el-input>
  </div>
  <el-scrollbar height="400px">
    <el-table :data="packageList" style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="version" label="版本"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            v-if="!row.isInstalled"
            type="primary"
            size="small"
            @click="handlePyodideInstall(row)"
            >安装</el-button
          >
          <el-button v-else type="success" size="small" disabled plain>已安装</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import loadingService from '@/services/loading.service'
import pyodideService from '@/services/pyodide/pyodide.service'
import pythonLibraryService, { ELibraryType } from '@/services/python-library.service';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue'

const search = ref('')

const packageList = computed(() => {
  const data = pyodideService().pyodideState.packageList
  const res: {
    isInstalled: boolean
    name: string
    version: string
  }[] = []
  for (const key of data.keys()) {
    res.push(data.get(key))
  }
  if (search.value) {
    return res.filter((item) => item.name.includes(search.value))
  }
  return res
})

const handlePyodideInstall = async (row: {
  name: string
  version: string
  isInstalled: boolean
}) => {
  try {
    loadingService.show('安装中...')
    const res = await pyodideService().loadPackageForNames([row.name])
    row.isInstalled = res.installed.includes(row.name)
    if (pythonLibraryService.getHasStorage()) {
      pythonLibraryService.setStorageLibrary(ELibraryType.PYODIDE, [row.name])
    }
    loadingService.hide()
    ElMessage.success('安装成功')
  } catch (error) {
    console.log(error)
    loadingService.hide()
    ElMessage.error('安装失败')
  }
}
</script>

<style scoped lang="scss">
.search {
  margin: 10px 0;
}
</style>
