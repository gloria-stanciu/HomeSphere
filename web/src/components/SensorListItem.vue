<template>
  <div class="shadow-md rounded">
    <div class="px-3 py-2 mb-3 bg-blue-500 rounded shadow-lg flex justify-between">
      <p class="font-bold text-white uppercase" contenteditable="false">{{ sensor.name }}</p>
      <!-- <span class="text-white">Current: {{ series[0].data[series[0].data.length - 1] }}</span> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    // chart: VueApexCharts,
  },
  props: {
    sensor: Object,
  },
  computed: mapState(['devices']),
  watch: {
    // devices: function() {
    //   this.filterReadings(this.sensor)
    // },
  },
  data: function() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    // this.filterReadings(this.sensor)
    // this.sockets.subscribe(`reading/${this.$store.state.devices[0]._id}`, _ => {
    //   this.filterReadings(this.sensor)
    // })
  },
  methods: {
    // filterReadings: function(sensor) {
    //   const filteredDate = sensor.readings.map(val =>
    //     new Date(val.date).toLocaleString()
    //   )
    //   const filteredData = sensor.readings.map(val => val.data.toFixed(2))
    //   this.options.xaxis.categories = filteredDate
    //   this.series = [
    //     {
    //       name: 'Readings',
    //       data: filteredData,
    //     },
    //   ]
    //   this.isLoading = false
    // },
  },
}
</script>

<style lang="postcss" scoped></style>
