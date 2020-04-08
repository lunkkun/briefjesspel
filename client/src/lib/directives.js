import Vue from 'vue'

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.directive('select', {
  inserted: function (el) {
    el.select()
  }
})
