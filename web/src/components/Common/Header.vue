<template>
  <div class="w-full h-full">
    <header class="container h-16 flex flex-row items-center justify-between">
      <div class="brand">
        <span class="font-bold">HomeSphere</span>
      </div>
      <div class="menu flex flex-row h-full items-center">
        <router-link to="/" class="menu-item">
          <span>Home</span>
        </router-link>
        <router-link to class="menu-item">
          <span>About</span>
        </router-link>
        <div class="separator h-8 w-1 bg-gray-300 mx-3"></div>
        <router-link to="/auth" class="menu-item">
          <span>Log In</span>
        </router-link>
        <router-link to="/auth" class="menu-item">
          <span>Sign Up</span>
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.menu-item {
  @apply h-full px-3 flex items-center border-b-2 border-transparent;
}

.menu-item:hover {
  @apply border-b-2 border-blue-500;
}
</style>