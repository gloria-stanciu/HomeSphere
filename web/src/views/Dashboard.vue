<template>
  <div class="w-full h-full">
    <Header></Header>
    <div v-if="loading" class="loading w-full h-full flex items-center justify-center">Loading...</div>
    <div v-else class="container pt-20 grid grid-gap-4 sm:grid-columns-2 lg:grid-columns-3">
      <div class="card w-full">
        <div class="card-header">
          <h1>Hello, {{ user.username }}!</h1>
        </div>
        <div class="card-body">
          <p>Welcome to HomeSphere, your very own Home Enviroment tracker.</p>
        </div>
        <div class="card-footer">
          <form @submit.prevent="addDevice" class="flex flex-col md:flex-row">
            <input
              type="text"
              class="input-base flex w-full md:w-2/3"
              placeholder="Device ID"
              required
              v-model="deviceIdToAdd"
            />
            <button class="button-base flex-1 md:ml-2">Add Device</button>
          </form>
          <div v-if="error" class="alert alert-error">{{ error }}</div>
        </div>
      </div>
      <DeviceList :devices="user.devices" class="col-span-1 md:col-span-2"></DeviceList>
    </div>
  </div>
</template>

<script>
import DeviceList from '@/components/DeviceList'
import Header from '../components/Common/Header'
import { mapState, mapActions } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Dashboard',
  components: {
    DeviceList,
    Header,
  },
  data: function() {
    return {
      loading: true,
      error: null,
      deviceIdToAdd: null,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  mounted: async function() {
    this.loading = true
    try {
      const users = await this.fetchUser()
      this.loading = false
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions(['fetchUser', 'registerDevice']),
    addDevice: async function() {
      try {
        await this.registerDevice(this.deviceIdToAdd)
      } catch (err) {
        this.error = err
      }
    },
  },
}
</script>