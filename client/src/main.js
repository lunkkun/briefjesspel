import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import App from './App.vue'
import store from './store'

const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
const url = `${scheme}://${window.location.host}/ws/`

Vue.use(VueNativeSock, url, {
  store: store,
  reconnection: true,
  passToStoreHandler: function (eventName, event) {
    if (!eventName.startsWith('SOCKET_')) return

    let target = eventName.toUpperCase()
    let data = event

    if (event.data) {
      let msg = JSON.parse(event.data)
      target = msg.mutation
      data = msg.data
    }

    this.store.commit(target, data)
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
