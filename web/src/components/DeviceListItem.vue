<template>
  <div class="w-full">
    <div class="w-full p-3 bg-gray-800 shadow-lg rounded flex-col">
      <small class="uppercase text-xs text-gray-500">DEVICE NAME</small>
      <h1 class="text-2xl font-bold text-white">{{ device.deviceName }}</h1>
      <span class="text-gray-500">@{{ device.location }}</span>
      <button class="px-3 text-white font-bold" @click="$emit('onRefresh')">Refresh</button>
    </div>
    <SensorList :sensors="device.sensor"></SensorList>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SensorList from './SensorList'

export default {
  components: {
    SensorList,
  },
  props: {
    device: Object,
  },
}
</script>

<style lang="postcss" scoped>
</style>