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
      <Tellstick class="col-span-2"></Tellstick>
      <TemperatureMap :sensor="temp" class="col-span-2"></TemperatureMap>
      <TemperaturePrediction :sensor="temp" class="col-span-2"></TemperaturePrediction>
      <Current :sensors="current" class="col-span-2"></Current>
    </div>
  </div>
</template>

<script>
import Gauges from './Sensors/Gauges'
import TemperatureMap from './Sensors/TemperatureMap'
import TemperaturePrediction from './Sensors/TemperaturePrediction'
import Current from './Sensors/Current'
import Tellstick from './Sensors/Tellstick'

export default {
  components: {
    Gauges,
    TemperatureMap,
    TemperaturePrediction,
    Current,
    Tellstick,
  },
  props: {
    device: Object,
  },
  mounted() {
    console.log(this.device)
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
    temp: function() {
      return this.device.sensors.find(sensor => sensor.name === 'temperature')
    },
    current: function() {
      return this.device.sensors.filter(sensor =>
        sensor.name.includes('current')
      )
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
