<template>
  <div class="menu">
    <div class="item">
      <PyodideStatus></PyodideStatus>
    </div>
    <div class="item">
      <el-button type="primary" @click="handlePackageManager" :icon="ShoppingTrolley"
        >库管理</el-button
      >
    </div>
  </div>
  <PackagesManager v-model="packagesManagerVisible"></PackagesManager>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PackagesManager from './packages-manager.vue'
import PyodideStatus from './pyodide-status.vue'
import { ShoppingTrolley } from '@element-plus/icons-vue'
const packagesManagerVisible = ref(false)

const handlePackageManager = () => {
  packagesManagerVisible.value = true
}
</script>

<style scoped lang="scss">
.menu {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 999;
  .item {
    margin: 0 10px;
  }
}
</style>
