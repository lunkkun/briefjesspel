import Vue from 'vue'
import Vuex from 'vuex'
import socket from './modules/socket'
import game from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    socket,
    game,
  },
})
