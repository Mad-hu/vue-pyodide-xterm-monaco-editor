<template>
  <div class="stage">
    <div class="title">GUI</div>
    <canvas id="canvas" ref="stageCanvas"></canvas>
    <div id="matplotlibRender"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const stageCanvas = ref(null)

onMounted(() => {
  document.pyodideMplTarget = document.getElementById('matplotlibRender')
})

defineExpose({
  stageCanvas
})
</script>

<style scoped lang="scss">
.stage {
  width: 500px;
  text-align: center;
  height: 100%;
  position: absolute;
  bottom: 0;
  border-left: 1px solid #eee;
  .title {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #326bf1;
    color: #fff;
    font-size: 15px;
  }
  canvas {
    width: 100%;
    height: calc(100% - 30px);
    position: absolute;
    left: 0;
    bottom: 0;
  }
  #matplotlibRender {
    position: absolute;
    z-index: 2;
  }
}
</style>
