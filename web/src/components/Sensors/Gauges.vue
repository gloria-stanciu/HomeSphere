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
    this.getUsage()
  },
  methods: {
    ...mapActions(['getSensorReading']),
    getUsage: async function() {
      let response = null
      try {
        response = await this.getSensorReading(this.cpuData._id)
        this.cpuChart.series = [response.data]
        response = await this.getSensorReading(this.diskData._id)
        this.diskChart.series = [
          ((100 * response.data) / this.diskTotal).toFixed(2),
        ]
        response = await this.getSensorReading(this.ramData._id)
        this.ramChart.series = [
          ((100 * response.data) / this.ramTotal).toFixed(2),
        ]
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
</style>