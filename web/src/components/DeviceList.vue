<template>
  <section class="w-full flex flex-col">
    <div v-if="isLoading">Loading...</div>
    <DeviceListItem v-else v-for="device in devices" :key="device._id" :device="device"></DeviceListItem>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DeviceListItem from './DeviceListItem'

export default {
  components: {
    DeviceListItem,
  },
  data: function() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapState(['devices']),
  },
  created() {
    this.loadDevices()
  },
  methods: {
    ...mapActions(['fetchDevices']),

    loadDevices: async function() {
      try {
        await this.fetchDevices()
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>