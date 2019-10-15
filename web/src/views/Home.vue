<template>
  <div class="w-full h-full">
    <Header></Header>
    <div class="container pt-20"></div>
  </div>
</template>

<script>
import Header from '../components/Common/Header'
export default {
  components: {
    Header,
  },
}
</script>

<style lang="postcss" scoped>
.menu-item {
  @apply h-full px-3 flex items-center border-b-2 border-transparent;
}

.menu-item:hover {
  @apply border-b-2 border-blue-500;
}
</style>