<template>
  <div class="w-full h-full">
    <Header></Header>
    <section id="auth" class="container">
      <div class="card w-1/3">
        <div class="card-header">
          <h1>
            <span
              :class="{ 'text-blue-500': inAuth }"
              @click="inAuth = true"
              class="mr-4 cursor-pointer"
              tabindex="0"
            >Log In</span>
            <span
              :class="{ 'text-blue-500': !inAuth }"
              @click="inAuth = false"
              class="cursor-pointer"
              tabindex="0"
            >Sign Up</span>
          </h1>
        </div>
        <div class="card-body">
          <p>Some details here about login or some motivational bullcrap.</p>
          <transition name="fade" mode="out-in">
            <form @submit.prevent="login" class="flex flex-col" v-if="inAuth">
              <input
                type="text"
                placeholder="Username"
                v-model="auth.username"
                class="input-base"
                required
              />
              <input
                type="password"
                placeholder="Password"
                v-model="auth.password"
                class="input-base"
                required
              />
              <button class="button-base" :disabled="loading">Log In</button>
            </form>
            <form @submit.prevent="register" class="flex flex-col" v-else>
              <input
                type="text"
                placeholder="Username"
                v-model="reg.username"
                class="input-base"
                required
              />
              <input
                type="email"
                placeholder="E-Mail"
                v-model="reg.email"
                class="input-base"
                required
              />
              <input
                type="password"
                placeholder="Password"
                v-model="reg.password"
                class="input-base"
                required
              />
              <button class="button-base" :disabled="loading">Sign Up</button>
            </form>
          </transition>
          <div v-if="error" class="alert alert-error mt-3">{{ error }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '../components/Common/Header'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Header,
  },
  data: function() {
    return {
      inAuth: true,
      loading: false,
      error: null,
      auth: {
        username: null,
        password: null,
      },
      reg: {
        username: null,
        email: null,
        password: null,
      },
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['registerUser', 'authUser']),

    login: async function() {
      this.loading = true
      try {
        const user = await this.authUser(this.auth)
        this.error = user.token
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },

    register: function() {
      console.log('signin-up')
      this.registerUser(this.reg).then(value => {
        console.log(value)
      })
    },
  },
}
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>