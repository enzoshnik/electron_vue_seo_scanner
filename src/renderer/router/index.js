import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import ConfigPage from '@/components/ConfigPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/config',
      name: 'config-page',
      component: ConfigPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
