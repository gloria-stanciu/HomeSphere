<template>
  <div id="app">
    <div class="bg"></div>
    <router-view></router-view>
  </div>
</template>

<style lang="postcss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bg {
  transform: rotate(-10deg);
  z-index: -1;
  height: 480px;
  overflow: hidden;
  top: -180px;
  width: 120%;
  left: -10%;
  @apply absolute bg-blue-600;
}
</style>
