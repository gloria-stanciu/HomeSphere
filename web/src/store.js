import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    ['ADD_USER'](state, user) {
      state.user = user
    },
    // ['ADD_READINGS'](state, readings) {
    //   console.log(state.devices[0].sensor[0].readings.length)
    //   for (const device of state.devices) {
    //     if (device._id === readings.deviceId) {
    //       for (const sensor of readings.data) {
    //         for (const s of device.sensor) {
    //           if (s.sensorName === sensor.sensorName) {
    //             s.readings.push({
    //               data: sensor.data,
    //               date: sensor.date,
    //             })
    //           }
    //         }
    //       }
    //     }
    //   }
    //   console.log(state.devices[0].sensor[0].readings.length)
    //   console.groupEnd()
    // },
    ['AUTHENTICATE'](state, credentials) {
      state.user = credentials.user
    },
    ['REGISTER_USER'](state, username) {
      state.user = username
    },
    ['REGISTER_DEVICE'](state, deviceId) {
      state.user.devices.push(deviceId)
    },
    ['UPDATE_DEVICE'](state, device) {
      let i = 0
      state.user.devices.forEach(dev => {
        if (device._id === dev) {
          state.user.devices.splice(i)
        }
      })
      state.user.devices.push(device)
    },
  },
  actions: {
    // updateSensorReadings({ commit }, readings) {
    //   commit('ADD_READINGS', readings)
    // },
    async fetchUser({ commit }) {
      try {
        const response = await http.get('/users/me', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        commit('ADD_USER', response.data)
        return response.data
      } catch (err) {
        throw new Error(err.response.data)
      }
    },
    async registerUser({ commit }, credentials) {
      try {
        const response = await http.post('/users/auth', {
          username: credentials.username,
          password: credentials.password,
          email: credentials.email,
        })
        return true
      } catch (err) {
        throw new Error(err.response.data)
      }
    },
    async authUser({ commit }, credentials) {
      try {
        const response = await http.post('/users/login', {
          username: credentials.username,
          password: credentials.password,
        })
        localStorage.setItem('token', response.data)
        return response.data
      } catch (err) {
        throw new Error(err.response.data)
      }
    },
    async registerDevice({ commit }, deviceId) {
      try {
        const response = await http.post('/users/devices', [deviceId], {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        commit('REGISTER_DEVICE', response.data)
        fetchDevices(response.data)
      } catch (err) {
        throw new Error(err.response.data)
      }
    },
    async fetchDevices({ commit }, idsOfDevices) {
      try {
        for (const id of idsOfDevices) {
          const response = await http.get(`/devices/${id}`, {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          commit('UPDATE_DEVICE', response.data)
        }
      } catch (err) {
        return err.response.data
      }
    },
    async getSensorReading({ commit }, sensorId) {
      try {
        const response = await http.get(`/sensors/${sensorId}`)
        return response.data
      } catch (err) {
        throw new Error(err.response.data)
      }
    },
  },
})
