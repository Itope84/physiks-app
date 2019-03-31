import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Landing from '@/components/views/Landing'
import ModulesIndex from '@/components/views/ModulesIndex'
import ChallengeIndex from '@/components/views/ChallengesIndex'
import FindOpponent from '@/components/views/Challenges/FindOpponent'
import NewChallenge from '@/components/views/Challenges/NewChallenge'
import ChallengeQuestion from '@/components/views/Challenges/ChallengeQuestion'
import SingleModule from '@/components/views/Modules/SingleModule'
import SingleQuestion from '@/components/views/Questions/SingleQuestion'
import ShowScore from '@/components/views/Modules/ShowScore'
import ProfileSettings from '@/components/views/ProfileSettings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/home',
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
    },
    {
      path: '/modules/:id/score',
      name: 'Score',
      component: ShowScore
    },
    {
      path: '/challenges/challenge',
      name: 'FindOpponent',
      component: FindOpponent
    },
    {
      path: '/challenges/challenge/:id',
      name: 'NewChallenge',
      component: NewChallenge
    },
    {
      path: '/challenges/challenge/:challengeId/questions',
      name: 'ChallengeQuestion',
      component: ChallengeQuestion
    },
    {
      path: '/settings',
      name: 'ProfileSettings',
      component: ProfileSettings
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
