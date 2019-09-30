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
  },
  actions: {
    fetchDevices({ commit }) {
      return http.get('devices').then(res => {
        console.log(res.data.device)
        commit('ADD_DEVICES', res.data.device)
        return res.data.device
      })
    },
  },
})
