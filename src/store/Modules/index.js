import axios from '../../http'

function initialState () {
  return {
    modules: []
  }
}

const getters = {
  sanitisedModules: state => state.modules.map(module => {
    // module.summary = module.summary.replace(/<\bimg.*?\B>\B/gi, '')
    // strip all tags
    module.summary = module.summary.replace(/<.*?>/gi, '')
    return module
  })
}

const actions = {
  fetchModules ({commit}) {
    // check if localstorage.modules is set
    let modules = localStorage.getItem('modules')
    if (modules) {
      commit('setModules', JSON.parse(modules))
    }
    axios.get('modules').then(response => {
      // this is a quick hack, we need to mapo each module and format it to our needs before storing
      localStorage.setItem('modules', JSON.stringify(response.data.data))
      // check if module has been completed etc...
    }).finally(commit('setModules', JSON.parse(localStorage.getItem('modules'))))
  }
}

const mutations = {
  setModules (state, modules) {
    state.modules = modules
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
