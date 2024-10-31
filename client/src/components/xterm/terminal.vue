<template>
  <div class="terminal">
    <div class="title">终端</div>
    <div class="xterm" ref="xterm"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Terminal } from 'xterm'

let terminal: Terminal

const setValue = (value: string) => {
  terminal.writeln(value)
}

onMounted(() => {
  const xterm = ref(null)
  terminal = new Terminal({
    disableStdin: true
  })
  terminal.open(xterm.value)
  terminal.writeln('init finished \x1B[1;3;31mxterm.js\x1B[0m $ ')
})

defineExpose({
  setValue
})
</script>

<style scoped lang="scss">
.terminal {
  width: 100%;
  height: 100%;
  .title {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #326bf1;
    color: #fff;
    font-size: 15px;
  }
  .xterm {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
  }
}
</style>
