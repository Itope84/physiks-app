import Vue from 'vue'
import Vuex from 'vuex'

import Navigation from './navigation'
import ModulesIndex from './Modules'
import User from './user'
import ChallengesIndex from './Challenges'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Navigation,
    ModulesIndex,
    User,
    ChallengesIndex
  }
})

export default store
