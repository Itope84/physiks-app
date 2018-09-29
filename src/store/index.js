import Vue from 'vue'
import Vuex from 'vuex'

import Navigation from './navigation'
import ModulesIndex from './Modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Navigation,
    ModulesIndex
  }
})

export default store
