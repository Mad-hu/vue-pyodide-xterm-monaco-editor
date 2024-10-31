<template>
  <el-dialog v-model="dialogVisible" title="库管理" width="500" :before-close="handleClose">
    <div class="has-storage">
      <el-switch
        v-model="hasStorage"
        active-text="保存安装的库，下次进入时自动加载"
        @change="handleHasStorageChange"
      />
    </div>
    <el-tabs class="demo-tabs" v-model="tabIndex">
      <el-tab-pane label="pyodide包管理" name="pyodide">
        <PackagesManagerTabPyodide></PackagesManagerTabPyodide>
      </el-tab-pane>
      <el-tab-pane label="pypi包管理" name="pypi">
        <PackagesManagerTabPypi></PackagesManagerTabPypi>
      </el-tab-pane>
    </el-tabs>
    <!-- 根据名称过滤 packageList -->
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import PackagesManagerTabPyodide from './packages-manager-tab-pyodide.vue'
import PackagesManagerTabPypi from './packages-manager-tab-pypi.vue'
import pythonLibraryService from '@/services/python-library.service';
const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])
const tabIndex = ref('pyodide')
const hasStorage = ref(false)
const dialogVisible = computed(() => props.modelValue)

const handleClose = () => {
  emit('update:modelValue', false)
}

const handleHasStorageChange = (value: boolean) => {
  pythonLibraryService.setHasStorage(value)
}

onMounted(() => {
  hasStorage.value = pythonLibraryService.getHasStorage()
})
</script>

<style scoped lang="scss">
.search {
  margin: 10px 0;
}
</style>
