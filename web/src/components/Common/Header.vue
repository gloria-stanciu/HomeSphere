<template>
  <header class="w-full h-16 flex flex-row fixed bg-white">
    <div class="container h-full flex flex-row items-center justify-between">
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
        <router-link to="/auth" class="menu-item" v-if="loggedIn">
          <span>Log In</span>
        </router-link>
        <router-link to="/auth" class="menu-item" v-if="loggedIn">
          <span>Sign Up</span>
        </router-link>
        <router-link to="/dashboard" class="menu-item" v-if="!loggedIn">
          <span>Dashboard</span>
        </router-link>
        <router-link to="/" class="menu-item" v-if="!loggedIn">
          <span>Log Out</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: function() {
    return {
      loggedIn: false,
    }
  },
  mounted: function() {},
  methods: {
    checkToken: function() {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          this.loggedIn = true
        }
      } catch (err) {
        this.loggedIn = false
      }
    },
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