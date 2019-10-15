<template>
  <div class="container mx-auto px-3 py-3">
    <DeviceList></DeviceList>
  </div>
</template>

<script>
import DeviceList from '@/components/DeviceList'
// @ is an alias to /src

export default {
  name: 'Dashboard',
  components: {
    DeviceList,
  },
}
</script>
