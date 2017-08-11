
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/flex',
      name: 'flex',
      component: require('../components/flex/index.vue')
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: require('../components/carousel/index.vue')
    },

  ]
})
