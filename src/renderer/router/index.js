import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'wrtier',
      component: require('@/components/Writer').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
