<template>
  <div class="card">
    <div class="card-header">
      <h4>Temperature</h4>
    </div>
    <div class="card-body">
      <div v-if="loading" class="loading">Loading</div>
      <calendar-heatmap v-else :values="vals" :end-date="new Date()" tooltip-unit="Celsius"></calendar-heatmap>
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
      vals: null,
    }
  },
  mounted: function() {
    this.populateMap()
  },
  methods: {
    ...mapActions(['getStats']),
    populateMap: async function() {
      try {
        const response = await this.getStats({
          id: this.sensor._id,
          startTime: 0,
          type: 'days',
          days: 365,
        })
        this.vals = response.maxValue
        console.log(response)
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