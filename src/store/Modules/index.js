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
    let o = {...module}
    o.summary = o.summary.replace(/<.*?>/gi, '')
    return o
  }),
  modules: state => state.modules
}

const actions = {
  fetchModules ({commit}) {
    // check if localstorage.modules is set
    let modules = localStorage.getItem('modules')
    if (modules) {
      commit('setModules', JSON.parse(modules))
    } else if (localStorage.getItem('modulesdata')) {
      // console.log('in here')
      // don't just do this, take it through the process of formatting to will
      localStorage.setItem('modules', JSON.stringify(JSON.parse(localStorage.getItem('modulesdata')).data))
    }
    axios.get('modules').then(response => {
      // this is a quick  hack, we need to map each module and format it to our needs before storing
      localStorage.setItem('modules', JSON.stringify(response.data.data))
      // check if module has been completed etc...
    }).finally(commit('setModules', JSON.parse(localStorage.getItem('modules'))))
  },
  fetchQuestion ({commit, state}, questionId) {

  },
  activeMod ({state}, id) {
    return state.modules.filter(module => module.id === id)[0]
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
