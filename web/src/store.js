import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devices: null,
    user: null,
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
    ['AUTHENTICATE'](state, credentials) {
      console.log('Authenticated')
      state.user = credentials.user
    },
  },
  actions: {
    fetchDevices({ commit }) {
      return http
        .get('/devices')
        .then(res => {
          console.log(res.data)
          commit('ADD_DEVICES', res.data)
        })
        .catch(err => {
          console.log('error fetching devices', err)
        })
    },
    updateSensorReadings({ commit }, readings) {
      commit('ADD_READINGS', readings)
    },
    registerUser({ commit }, credentials) {
      return http
        .post('/users/auth', {
          username: credentials.username,
          password: credentials.password,
          email: credentials.email,
        })
        .then(res => {
          console.log('New user:', res)
        })
        .catch(err => {
          console.log('error registering', err)
        })
    },
    async authUser({ commit }, credentials) {
      try {
        const response = await http.post('/users/login', {
          username: credentials.username,
          password: credentials.password,
        })
        localStorage.setItem('token', response.data.token)
        return response.data
      } catch (err) {
        throw new Error('Username or password do not match!')
      }
    },
  },
})
