<template>
  <div class="title">
    <div>项目</div>
    <el-select
      v-model="path"
      class="m-2"
      placeholder="请选择项目"
      size="small"
      style="width: 240px"
      @change="getTreeData"
    >
      <el-option
        v-for="(item, index) in projects"
        :key="index"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
  <el-tree style="max-width: 600px" :data="data" @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
import { defineProps, onMounted, Ref, ref } from 'vue'
import { ElTree } from 'element-plus'
import apiService from '@/services/api.service'
import fileTreeService, { ITreeItem } from '@/services/filetree.service'

const props = defineProps({
  onProjectChange: Function, 
})

const projects = ref([])
const path = ref('')

const handleNodeClick = (data: ITreeItem) => {
  fileTreeService.setTreeSelectItem(data)
}

const data: Ref<ITreeItem[]> = ref([])

const getTreeData = async () => {
  const resdata = await apiService.getFileTree(path.value)
  data.value = resdata
  fileTreeService.clearTreeSelectItem()
  props.onProjectChange(path.value)
}

const getProject = async () => {
  console.log('初始化项目')
  const resdata = await apiService.getProject()
  projects.value = resdata
  if (projects.value.length > 0) {
    path.value = projects.value[0]
    getTreeData()
  }
}

onMounted(() => {
  getProject()
})
</script>
<style scoped lang="scss">
.title {
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #326bf1;
  color: #fff;
  font-size: 15px;
}
.filetree {
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
}
</style>
