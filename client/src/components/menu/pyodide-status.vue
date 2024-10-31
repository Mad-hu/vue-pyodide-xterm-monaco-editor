<template>
  <div class="status">
    <el-tooltip effect="dark" content="python环境初始化状态">
      <el-button plain type="primary" :loading="loading">{{ statusText }}</el-button>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import pyodideService, { EPyodideInitState } from '@/services/pyodide/pyodide.service'
import { computed, ref } from 'vue'

const loading = ref(false)
const type = ref('info')
const statusText = computed(() => {
  const stat = pyodideService().pyodideState.init
  switch (stat) {
    case EPyodideInitState.NONE:
      type.value = 'info'
      return '未初始化'
    case EPyodideInitState.LOADING:
      type.value = 'warning'
      loading.value = true
      return '加载中..'
    case EPyodideInitState.LOADED:
      type.value = 'success'
      loading.value = false
      return '已加载'
    default:
      type.value = 'danger'
      return '未知状态'
  }
})
</script>

<style scoped lang="scss">
.menu {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
