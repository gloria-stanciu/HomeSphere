<template>
  <div class="card">
    <div class="card-header flex flex-row justify-between">
      <h4>Current</h4>
      <div class="options">
        <select name="period" id="current-period" v-model="timePeriod">
          <option value="0">Realtime</option>
          <option value="1">Last 24 Hours</option>
          <option value="2">Last 7 Days</option>
          <option value="3">Last Month</option>
        </select>
      </div>
    </div>
    <div class="card-body">
      <div v-if="loading" class="loading">Loading</div>
      <vue-apex-charts
        v-else-if="timePeriod > 0 && !loading"
        :series="chart.series"
        :options="chart.options"
        :type="'line'"
        :height="300"
      ></vue-apex-charts>
      <vue-apex-charts
        v-else-if="timePeriod === '0'"
        :series="realtimechart.series"
        :options="realtimechart.options"
        :type="'line'"
        :height="300"
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
    sensors: { type: Array, required: true },
  },
  data: function() {
    return {
      timePeriod: 1,
      loading: true,
      chart: {
        options: {
          xaxis: {
            categories: [],
            labels: {
              show: false,
            },
          },
        },
        series: [],
      },
      realtimechart: {
        options: {
          xaxis: {
            categories: [],
            labels: {
              show: false,
            },
          },
        },
        series: [],
      },
      realtimeDates: [],
      realtimeSeries: [],
    }
  },
  mounted: function() {
    this.initChart()
    this.populateChart(24, 'hours')
  },
  watch: {
    timePeriod: function(val) {
      if (val === '0') {
        this.realtime()
      } else {
        switch (this.timePeriod) {
          case '1':
            this.populateChart(24, 'hours')
            break
          case '2':
            this.populateChart(7, 'days')
            break
          case '3':
            this.populateChart(31, 'days')
            break
        }
      }
    },
  },
  methods: {
    ...mapActions(['getStats']),
    populateChart: async function(startTime, type) {
      this.chart.options.xaxis.categories = []
      this.chart.series = []
      try {
        this.sensors.forEach(async sensor => {
          const response = await this.getStats({
            id: sensor._id,
            startTime: startTime,
            type: type,
            days: 0,
          })
          this.chart.series.push({
            name: sensor.name,
            data: response.meanValuesOfGivenPeriod.map(el => {
              return el.data.toFixed(1)
            }),
          })
          this.chart.options.xaxis.categories = response.meanValuesOfGivenPeriod.map(
            el => el.date
          )
          this.loading = false
        })
      } catch (err) {
        console.log(err)
      }
    },
    initChart: function() {
      for (const sensor of this.sensors) {
        this.realtimeSeries.push({
          name: sensor.name,
          data: [],
        })
      }
    },
    realtime: function() {
      this.loading = false
      // for (const sensor of this.sensors) {
      //   this.sockets.subscribe(`/sensor/${sensor._id}`, payload => {
      //     i
      //     this.realtimeDates.push(payload.date)
      //     if()
      //   })
      // }
    },
  },
}
</script>

<style>
</style>