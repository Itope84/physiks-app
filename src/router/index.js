import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ModulesIndex from '@/components/views/ModulesIndex'
import ChallengeIndex from '@/components/views/ChallengesIndex'
import SingleModule from '@/components/views/Modules/SingleModule'
import SingleQuestion from '@/components/views/Questions/SingleQuestion'

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
    },
    {
      path: '/challenges',
      name: 'Challenges',
      component: ChallengeIndex
    },
    {
      path: '/modules/:id',
      name: 'Module',
      component: SingleModule
    },
    {
      path: '/modules/:id/questions/:questionId',
      name: 'Question',
      component: SingleQuestion
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
