<template>
  <div class="terminal">
    <div class="title">输出</div>
    <div class="xterm" ref="xtermRef"></div>
  </div>
</template>

<script lang="ts" setup>
import xtermOutputService from '@/services/xterm/xterm-output.service'
import { onMounted, ref } from 'vue'
const xtermRef = ref(null)
onMounted(() => {
  const xtermOutput = xtermOutputService()
  xtermOutput.open(xtermRef.value)
  xtermOutput.writeln('输出终端初始化完成')
})
</script>

<style scoped lang="scss">
.terminal {
  width: 100%;
  height: 330px;
  display: flex;
  flex-direction: column;
  .title {
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #326bf1;
    color: #fff;
    font-size: 15px;
  }
  .xterm {
    width: 100%;
    height: 300px;
    border: 1px solid #ccc;
    overflow: hidden;
  }
}
</style>
