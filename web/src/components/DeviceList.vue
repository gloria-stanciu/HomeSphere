<template>
  <section class="w-full flex flex-col" v-if="!loading">
    <DeviceListItem v-for="device in user.devices" :key="device._id" :device="device"></DeviceListItem>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DeviceListItem from './DeviceListItem'

export default {
  components: {
    DeviceListItem,
  },
  props: {
    devices: { type: Array, required: true },
  },
  data: function() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  mounted: async function() {
    await this.fetchDevices(this.user.devices)
    this.loading = false
  },
  methods: {
    ...mapActions(['fetchDevices']),
  },
}
</script>

<style lang="postcss" scoped></style>