import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'control-room',
      component: require('@/components/ControlRoom').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
