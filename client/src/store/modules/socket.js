import Vue from 'vue'

export default {
  state: {
    isConnected: false,
    reconnectError: false,
  },
  mutations: {
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.isConnected = true
    },
    SOCKET_ONCLOSE (state, event)  {
      state.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      console.info(message)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.debug(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.reconnectError = true;
    },
  },
  actions: {
    sendMessage: function(context, message) {
      Vue.prototype.$socket.send(message)
    },
  },
}
