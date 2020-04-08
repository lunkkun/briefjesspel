import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faClipboard, faClipboardCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner, faClipboard, faClipboardCheck, faWindowClose)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
