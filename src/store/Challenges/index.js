import axios from '../../http'
import { getUserLevel } from '../../functions'

const state = {
  users: []
}

const getters = {
  users: state => state.users
}

const actions = {
  fetchUsers ({commit}) {
    axios.get('users').then(response => {
      commit('setUsers', response.data)
    })
  },

  searchUser ({commit}, query) {
    axios.get('users/search?q=' + query).then(response => {
      commit('setUsers', response.data)
    })
  }
}

const mutations = {
  setUsers (state, users) {
    state.users = users.map(user => {
      user.level = getUserLevel(user.points)
      return user
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
