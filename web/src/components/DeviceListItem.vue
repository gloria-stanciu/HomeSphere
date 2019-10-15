<template>
  <div class="w-full">
    <div class="w-full p-3 bg-gray-800 shadow-lg rounded flex-col overflow-hidden">
      <small class="uppercase text-xs text-gray-500">DEVICE NAME</small>
      <h1 class="text-2xl font-bold text-white">{{ device.deviceName }}</h1>
      <p class="text-gray-500">@{{ device.location }}</p>
      <p class="text-gray-500">{{ device._id }}</p>
    </div>
    <SensorList :sensors="device.sensors"></SensorList>
  </div>
</template>

<script>
import SensorList from './SensorList'

export default {
  components: {
    SensorList,
  },
  props: {
    device: Object,
  },
  mounted() {
    this.sockets.subscribe(`reading/${this.device._id}`, payload => {
      this.$store.dispatch('updateSensorReadings', payload.data)
    })
  },
  sockets: {
    connect() {
      console.log('connected')
    },
    disconnect() {
      console.log('disconnected')
    },
  },
}
</script>

<style lang="postcss" scoped></style>
