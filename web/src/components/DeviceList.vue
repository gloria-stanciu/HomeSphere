<template>
  <section class="w-full flex flex-col">
    <div v-if="isLoading">Loading...</div>
    <DeviceListItem
      v-else
      v-for="device in devices"
      :key="device._id"
      :device="device"
      @onRefresh="onRefresh()"
    ></DeviceListItem>
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
  methods: {
    ...mapActions(['fetchDevices']),
    onRefresh: function() {
      this.fetchDevices()
    },
  },
  created() {
    this.fetchDevices().then(() => {
      this.isLoading = false
    })
  },
}
</script>

<style lang="postcss" scoped>
</style>