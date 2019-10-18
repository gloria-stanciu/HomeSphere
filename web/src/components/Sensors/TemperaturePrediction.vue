<template>
  <div class="card">
    <div class="card-header">
      <h4>Forecast next 5 days</h4>
    </div>
    <div class="card-body">
      <div v-if="loading" class="loading">Loading</div>
      <vue-apex-charts
        v-else
        :series="chart.series"
        :options="chart.options"
        :type="'bar'"
        :height="200"
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
      loading: true,
      chart: {
        options: {
          xaxis: {
            categories: [],
          },
        },
        series: [
          {
            name: 'Temperature',
            data: [],
          },
        ],
      },
    }
  },
  mounted: function() {
    this.populateChart()
  },
  methods: {
    ...mapActions(['forecast']),
    populateChart: async function() {
      try {
        const response = await this.forecast(this.sensor._id)
        response.forEach(el => {
          this.chart.options.xaxis.categories.push(el.date)
          this.chart.series[0].data.push(el.data)
        })
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
  },
  // /api/stats/:id => maxValue
}
</script>

<style>
</style>