<template>
  <div class="w-full h-full">
    <Header></Header>
    <div class="container pt-20">
      <h1>Hello {{ $store.user }}!</h1>
      <DeviceList></DeviceList>
    </div>
  </div>
</template>

<script>
import DeviceList from '@/components/DeviceList'
import Header from '../components/Common/Header'
// @ is an alias to /src

export default {
  name: 'Dashboard',
  components: {
    DeviceList,
    Header,
  },
}
</script>
