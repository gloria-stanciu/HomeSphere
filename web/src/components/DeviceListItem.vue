<template>
  <div class="w-full">
    <div class="w-full bg-gray-800 card card-header flex-col overflow-hidden mb-4">
      <small class="uppercase text-xs text-gray-500">DEVICE NAME</small>
      <h1 class="text-2xl font-bold text-white">{{ device.name }}</h1>
      <p class="text-gray-500">@{{ device.location }}</p>
      <p class="text-gray-500">{{ device._id }}</p>
    </div>
    <div class="grid grid-gap-4 grid-columns-2">
      <CPU :sensor="cpu" class="col-span-1"></CPU>
    </div>
  </div>
</template>

<script>
import CPU from './Sensors/CPU'
export default {
  components: {
    CPU,
  },
  props: {
    device: Object,
  },
  mounted() {
    console.log(this.device)
    // this.sockets.subscribe(`reading/${this.device._id}`, payload => {
    //   this.$store.dispatch('updateSensorReadings', payload.data)
    // })
  },
  computed: {
    cpu: function() {
      return this.device.sensors.find(sensor => sensor.name === 'cpu')
    },
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

<style lang="postcss" scoped>
.bg-gray-800 {
  background-color: #2d3748 !important;
}
</style>
