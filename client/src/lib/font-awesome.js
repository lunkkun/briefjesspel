import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faClipboard, faClipboardCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner, faClipboard, faClipboardCheck, faTimesCircle)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
