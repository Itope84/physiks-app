import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ModulesIndex from '@/components/views/ModulesIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/modules',
      name: 'Modules',
      component: ModulesIndex
    }
  ]
})
