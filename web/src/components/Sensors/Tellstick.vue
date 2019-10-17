<template>
  <div class="card grid grid-columns-3">
    <div class="flex w-full h-full justify-center items-center py-3 hover:bg-gray-200" @click="ton">
      <span>Turn On</span>
    </div>
    <div class="w-full h-full flex items-center justify-center">
      <img src="https://image.flaticon.com/icons/png/512/206/206470.png" alt class="h-6" />
    </div>
    <div
      class="flex w-full h-full justify-center items-center py-3 hover:bg-gray-200"
      @click="toff"
    >
      <span>Turn Off</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['turnOn', 'turnOff']),
    ton: async function() {
      try {
        await this.turnOn()
      } catch (err) {
        console.log(err)
      }
    },
    toff: async function() {
      try {
        await this.turnOff()
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style>
</style>