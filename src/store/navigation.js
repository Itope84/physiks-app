function initialState () {
  return {
    pageTitle: 'Physiks',
    ajaxLoading: false,
    showConstants: false
  }
}

const getters = {
  title: state => state.pageTitle,
  ajaxLoading: state => state.ajaxLoading,
  showConstants: state => state.showConstants
}

const actions = {
  setTitle ({commit}, title) {
    commit('setTitle', title)
  },

  startLoading ({state}) {
    state.ajaxLoading = true
  },

  stopLoading ({state}) {
    state.ajaxLoading = false
  },

  activateConstants ({ state }) {
    state.showConstants = true
  },

  hideConstants ({state}) {
    state.showConstants = false
  }
}

const mutations = {
  setTitle (state, title) {
    state.pageTitle = title
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
