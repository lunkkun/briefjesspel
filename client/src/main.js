import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import App from './App.vue'
import store from './store'

const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
const url = `${scheme}://${window.location.host}/ws/`;
Vue.use(VueNativeSock, url, { store: store, format: 'json', reconnection: true })

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
