import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://glos.digital:3000/',
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devices: null,
  },
  mutations: {
    ['ADD_DEVICES'](state, devices) {
      state.devices = devices
    },
    ['ADD_READINGS'](state, readings) {
      console.group('reading_add')
      console.log(state.devices[0].sensor[0].readings.length)
      for (const device of state.devices) {
        if (device._id === readings.deviceId) {
          for (const sensor of readings.data) {
            for (const s of device.sensor) {
              if (s.sensorName === sensor.sensorName) {
                s.readings.push({
                  data: sensor.data,
                  date: sensor.date,
                })
              }
            }
          }
        }
      }
      console.log(state.devices[0].sensor[0].readings.length)
      console.groupEnd()
    },
  },
  actions: {
    fetchDevices({ commit }) {
      return http.get('devices').then(res => {
        console.log(res.data.device)
        commit('ADD_DEVICES', res.data.device)
        return res.data.device
      })
    },
    updateSensorReadings({ commit }, readings) {
      commit('ADD_READINGS', readings)
    },
  },
})
