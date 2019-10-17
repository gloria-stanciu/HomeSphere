<template>
  <div class="w-full">
    <div class="w-full bg-gray-800 card card-header flex-col overflow-hidden mb-4">
      <small class="uppercase text-xs text-gray-500">DEVICE NAME</small>
      <h1 class="text-2xl font-bold text-white">{{ device.name }}</h1>
      <p class="text-gray-500">@{{ device.location }}</p>
      <p class="text-gray-500">{{ device._id }}</p>
    </div>
    <div class="grid grid-gap-4 grid-columns-2">
      <Gauges
        :cpuData="cpu"
        :diskData="disk"
        :ramData="ram"
        :diskTotal="device.disk_total"
        :ramTotal="device.ram_total"
        class="col-span-2"
      ></Gauges>
    </div>
  </div>
</template>

<script>
import Gauges from './Sensors/Gauges'
export default {
  components: {
    Gauges,
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
    disk: function() {
      return this.device.sensors.find(sensor => sensor.name === 'disk_used')
    },
    ram: function() {
      return this.device.sensors.find(sensor => sensor.name === 'ram_used')
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
