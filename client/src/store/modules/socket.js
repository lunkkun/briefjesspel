import Vue from 'vue'

export default {
  state: {
    isConnected: false,
    reconnectError: false,
  },
  mutations: {
    SOCKET_ONOPEN(state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.isConnected = true
    },
    SOCKET_ONCLOSE(state, event)  {
      state.isConnected = false
    },
    SOCKET_ONERROR(state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message)  {
      console.info(message)
    },
    SOCKET_RECONNECT(state, count) {
      console.debug(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.reconnectError = true;
    },
  },
  actions: {
    async sendMessage({state}, {action, data}) {
      if (!state.isConnected) {
        throw new Error('Not connected; could not send message ' + action)
      }
      console.log(data)
      Vue.prototype.$socket.send(JSON.stringify({action, data}))
    },
  },
}
