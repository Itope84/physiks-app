import router from '../router'

function initialState () {
  return {
    menu: [{
      icon: 'home',
      title: 'Home',
      active: true,
      to: '/'
    },
    {
      icon: 'library_books',
      title: 'Modules',
      active: false,
      to: '/modules'
    },
    {
      icon: 'bookmark',
      title: 'Challenges',
      active: false,
      to: '/challenges'
    },
    {
      icon: 'question_answer',
      title: 'Random Question',
      active: false,
      to: '/modules'
    },
    {
      icon: 'person',
      title: 'Edit Profile',
      active: false,
      to: '/modules'
    }
    ]
  }
}

const getters = {
  menu: state => state.menu
}

const actions = {
  goto ({ commit }, menuItem) {
    router.push(menuItem.to)
    commit('visit', menuItem)
  }
}

const mutations = {
  visit (state, menuItem) {
    let menu = state.menu.map(item => {
      item !== menuItem ? item.active = false : item.active = true
      // this.$root.$emit('close-sidebar')
      return item
    })
    state.menu = menu
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
