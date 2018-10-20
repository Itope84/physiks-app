import router from '../router'

function initialState () {
  return {
    menu: [{
      icon: 'home',
      title: 'Home',
      active: true,
      routeName: 'Home',
      to: '/'
    },
    {
      icon: 'library_books',
      title: 'Modules',
      active: false,
      routeName: 'Modules',
      to: '/modules'
    },
    {
      icon: 'bookmark',
      title: 'Challenges',
      active: false,
      routeName: 'Challenges',
      to: '/challenges'
    },
    {
      icon: 'question_answer',
      title: 'Random Question',
      active: false,
      routeName: 'Home',
      to: '/modules'
    },
    {
      icon: 'person',
      title: 'Edit Profile',
      active: false,
      routeName: 'Home',
      to: '/modules'
    }
    ],
    pageTitle: 'Physiks'
  }
}

const getters = {
  menu: state => state.menu,
  title: state => state.pageTitle
}

const actions = {
  goto ({ commit }, {routeName, activeEl, params}) {
    router.push({ name: routeName, params: params })
    // router.push(menuItem.to)
    if (!activeEl) {
      activeEl = routeName
    }
    commit('setActive', activeEl)
  },

  setTitle ({commit}, title) {
    commit('setTitle', title)
  }
}

const mutations = {
  setActive (state, menuItem) {
    let menu = state.menu.map(item => {
      item !== menuItem ? item.active = false : item.active = true
      // this.$root.$emit('close-sidebar')
      return item
    })
    state.menu = menu
  },

  setTitle (state, title) {
    state.title = title
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
