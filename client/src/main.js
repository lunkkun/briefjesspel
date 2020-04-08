import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

import './lib/directives'
import App from './App.vue'
import store from './store'
import passToStoreHandler from './lib/pass-to-store-handler'

const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
const url = `${scheme}://${window.location.host}/ws/`

Vue.use(VueNativeSock, url, {
  store: store,
  reconnection: true,
  passToStoreHandler,
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
