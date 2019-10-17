<template>
  <div class="card grid grid-columns-3">
    <vue-apex-charts :options="cpuChart.options" :series="cpuChart.series" :type="'radialBar'"></vue-apex-charts>
    <vue-apex-charts :options="diskChart.options" :series="diskChart.series" :type="'radialBar'"></vue-apex-charts>
    <vue-apex-charts :options="ramChart.options" :series="ramChart.series" :type="'radialBar'"></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapActions } from 'vuex'

export default {
  components: {
    VueApexCharts,
  },
  data: function() {
    return {
      cpuChart: {
        options: {
          labels: ['CPU Usage'],
        },
        series: [0],
      },
      diskChart: {
        options: {
          labels: ['Disk Usage'],
        },
        series: [0],
      },
      ramChart: {
        options: {
          labels: ['RAM Usage'],
        },
        series: [0],
      },
    }
  },
  props: {
    cpuData: { type: [Object], required: true },
    diskData: { type: [Object], required: true },
    ramData: { type: [Object], required: true },
    diskTotal: { type: [String, Number], required: true },
    ramTotal: { type: [String, Number], required: true },
  },
  mounted: function() {
    this.liveFeed()
  },
  methods: {
    liveFeed: function() {
      this.sockets.subscribe(
        `/api/sockets/sensor/${this.cpuData._id}`,
        payload => {
          console.log('cpu')
          this.cpuChart.series = [payload.data]
        }
      )
      this.sockets.subscribe(
        `/api/sockets/sensor/${this.diskData._id}`,
        payload => {
          console.log('disk')
          this.diskChart.series = [
            ((100 * payload.data) / this.diskTotal).toFixed(2),
          ]
        }
      )
      this.sockets.subscribe(
        `/api/sockets/sensor/${this.ramData._id}`,
        payload => {
          console.log('ram')
          this.ramChart.series = [
            ((100 * payload.data) / this.ramTotal).toFixed(2),
          ]
        }
      )
    },
  },
}
</script>

<style lang="postcss" scoped>
</style>