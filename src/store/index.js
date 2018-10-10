import Vue from 'vue'
import Vuex from 'vuex'

import Navigation from './navigation'
import ModulesIndex from './Modules'
import User from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Navigation,
    ModulesIndex,
    User
  }
})

export default store
