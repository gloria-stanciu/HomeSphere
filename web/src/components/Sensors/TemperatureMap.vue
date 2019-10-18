<template>
  <div class="card">
    <div class="card-header flex flex-row justify-between">
      <h4>
        Temperature
        <span class="font-bold text-blue-800">Live: {{ currentTemp }}C</span>
      </h4>
      <div>
        <button @click="setMean" class="py-0">Mean</button>
        <button @click="setMin" class="py-0">Min</button>
        <button @click="setMax" class="py-0">Max</button>
      </div>
    </div>
    <div class="card-body">
      <div v-if="loading" class="loading">Loading</div>
      <calendar-heatmap v-else :values="data" :end-date="new Date()" tooltip-unit="Celsius"></calendar-heatmap>
    </div>
  </div>
</template>

<script>
import { CalendarHeatmap } from 'vue-calendar-heatmap'
import { mapActions } from 'vuex'
export default {
  components: {
    CalendarHeatmap,
  },
  props: {
    sensor: { type: Object, required: true },
  },
  data: function() {
    return {
      loading: true,
      data: null,
      allData: null,
      currentTemp: 0,
    }
  },
  mounted: function() {
    this.populateMap()
    this.getLive()
  },
  methods: {
    ...mapActions(['getStats']),
    populateMap: async function() {
      try {
        const response = await this.getStats({
          id: this.sensor._id,
          startTime: 365,
          type: 'days',
          days: 0,
        })
        this.data = response.valuesOfGivenPeriod.map(el => {
          return {
            date: el.date,
            count: el.mean,
          }
        })
        this.allData = response.valuesOfGivenPeriod
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    setMin: function() {
      this.data = this.allData.map(el => {
        return {
          date: el.date,
          count: el.min,
        }
      })
    },
    setMax: function() {
      this.data = this.allData.map(el => {
        return {
          date: el.date,
          count: el.max,
        }
      })
    },
    setMean: function() {
      this.data = this.allData.map(el => {
        return {
          date: el.date,
          count: el.mean,
        }
      })
    },
    getLive: function() {
      this.sockets.subscribe(
        `/api/sockets/sensor/${this.sensor._id}`,
        payload => {
          this.currentTemp = payload.data.toFixed(2)
        }
      )
    },
  },
  // /api/stats/:id => maxValue
}
</script>

<style>
</style>