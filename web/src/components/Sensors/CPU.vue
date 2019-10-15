<template>
  <div class="card">
    <div class="card-body">
      <vue-apex-charts
        :type="'radialBar'"
        :widht="200"
        :options="chart.options"
        :series="chart.series"
        :labels="chart.labels"
      ></vue-apex-charts>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapActions } from 'vuex'

export default {
  components: {
    VueApexCharts,
  },
  props: {
    sensor: { type: Object, required: true },
  },
  data: function() {
    return {
      chart: {
        options: {
          labels: ['CPU Usage (%)'],
        },
        series: [0],
      },
    }
  },
  methods: {
    ...mapActions(['getSensorReading']),
    setUsage: async function() {
      try {
        const response = await this.getSensorReading(this.sensor._id)
        this.chart.series = [response.data]
      } catch (err) {
        console.log(err)
      }
    },
  },
  mounted: function() {
    this.setUsage()
  },
}
</script>

<style>
</style>