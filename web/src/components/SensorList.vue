<template>
  <div class="w-full max-w-full">
    <div v-if="sensors" class="grid md:grid-columns-2 lg:grid-columns-3 grid-gap-4 max-w-full mt-6">
      <SensorListItem v-for="sensor in sensors" :key="sensor._id" :sensor="sensor"></SensorListItem>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SensorListItem from './SensorListItem'

export default {
  components: {
    SensorListItem,
  },
  props: {
    sensors: Array,
  },
}
</script>

<style lang="postcss" scoped>
</style>
