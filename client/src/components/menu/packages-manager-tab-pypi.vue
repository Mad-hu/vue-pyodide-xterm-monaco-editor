<template>
  <el-tag type="danger"
    >全平台包安装，纯python的一定可用，涉及到硬件调用的，不一定可用，需自己测试。</el-tag
  >
  <div class="search">
    <el-input v-model="installPypiName" placeholder="输入要安装的包名" clearable>
      <template #append>
        <el-button type="primary" size="small" @click="handlePypiInstall">安装</el-button>
      </template>
      <template #prepend>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import pyodideService from '@/services/pyodide/pyodide.service'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import pythonLibraryService, { ELibraryType } from '@/services/python-library.service';
import loadingService from '@/services/loading.service';

const installPypiName = ref('')

const handlePypiInstall = async () => {
  try {
    if (!installPypiName.value) {
      ElMessage.warning('请输入要安装的包名')
      return
    }
    loadingService.show('安装中...')
    await pyodideService().loadMicropipPackage(installPypiName.value)
    if (pythonLibraryService.getHasStorage()) {
      pythonLibraryService.setStorageLibrary(ELibraryType.PIPY, [installPypiName.value])
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
