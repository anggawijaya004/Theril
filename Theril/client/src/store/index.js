import Vue from 'vue'
import Vuex from 'vuex'
import socket from '../config/socket.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    SET_USERNAME(state, payload) {
      console.log(payload, 'dari mutation')
      state.username = payload
    },
    JOIN_ROOM(state, roomName) {
      const payload = {
        username: state.username,
        roomName
      }
      socket.emit('join-room', payload)
    }
  },
  actions: {
  },
  getters: {
    username: (state) => state.username
  },
  modules: {
  }
})
