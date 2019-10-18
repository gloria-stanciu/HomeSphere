<template>
  <div class="card">
    <div class="card-header flex flex-row justify-between">
      <h4>Current</h4>
      <div class="options">
        <select name="period" id="current-period" v-model="timePeriod">
          <option value="0">Last 6 Hours</option>
          <option value="1">Last 24 Hours</option>
          <option value="2">Last 7 Days</option>
          <option value="3">Last Month</option>
        </select>
      </div>
    </div>
    <div class="card-body">
      <span class="font-bold text-blue-700 mr-6">Live - Current Cost 0: {{currentCost0}}</span>
      <span class="font-bold text-green-500">Live - Current Cost 1: {{currentCost1}}</span>
      <div v-if="loading" class="loading">Loading</div>
      <vue-apex-charts
        v-else
        :series="chart.series"
        :options="chart.options"
        :type="'line'"
        :height="300"
      ></vue-apex-charts>
    </div>
    <div v-if="notification" class="notification absolute left-0 bottom-0 m-6">
      <div class="card" style="min-width: 200px !important;">
        <div class="card-header bg-red-500 font-bold text-white">{{ notificationTitle }}</div>
        <div class="card-body">{{ notification }}</div>
        <div class="card-footer font-bold" @click="notification = notificationTitle = null">Dismiss</div>
      </div>
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
      notification: null,
      notificationTitle: null,
      currentCost0: 0,
      currentCost1: 0,
    }
  },
  mounted: function() {
    this.real()
    this.notify()
    this.populateChart(24, 'hours')
  },
  watch: {
    timePeriod: function(val) {
      switch (this.timePeriod) {
        case '0':
          this.populateChart(6, 'hours')
          break
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
            data: response.valuesOfGivenPeriod.map(el => {
              return el.mean.toFixed(1)
            }),
          })
          this.chart.options.xaxis.categories = response.valuesOfGivenPeriod.map(
            el => el.date
          )
          this.loading = false
        })
      } catch (err) {
        console.log(err)
      }
    },
    real: function() {
      this.loading = false
      this.sockets.subscribe(
        `/api/sockets/sensor/5da3a8814162560018dcb1f9`,
        payload => {
          this.currentCost0 = payload.data
        }
      )
      this.sockets.subscribe(
        `/api/sockets/sensor/5da3a8814162560018dcb1fa`,
        payload => {
          this.currentCost1 = payload.data
        }
      )
    },
    notify: function() {
      for (const sensor of this.sensors) {
        this.sockets.subscribe(
          `/api/sockets/sensor/${sensor._id}/notify`,
          payload => {
            this.notification = payload.message
            this.notificationTitle = payload.title
          }
        )
      }
    },
  },
}
</script>

<style>
</style>