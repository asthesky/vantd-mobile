
import Vue from 'vue'
import App from './App'
import router from './router'
import components from '../src/main'

Vue.use(components)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
