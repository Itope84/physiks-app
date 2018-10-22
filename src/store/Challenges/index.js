import axios from '../../http'
import { getUserLevel } from '../../functions'

const state = {
  users: [],
  challenges: null
}

const getters = {
  users: state => state.users,
  challenges: state => state.challenges
}

const actions = {
  fetchUsers ({commit}) {
    axios.get('users').then(response => {
      commit('setUsers', response.data)
    })
  },

  fetchChallenges ({commit}) {
    let challenges = localStorage.getItem('challenges')
    commit('setChallenges', JSON.parse(challenges))
  },

  addChallenge ({commit, state}, challenge) {
    let challenges = state.challenges
    challenges.push(challenge)
    commit('setChallenges', challenges)
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
  },

  setChallenges (state, challenges) {
    challenges.map(challenge => {
      challenge.challenger_score = challenge.opponent_score = 0
      challenge.questions.map(q => {
        q.challenger_answer === q.question.answer ? challenge.challenger_score += 1 : challenge.challenger_score += 0

        q.opponent_answer === q.question.answer ? challenge.opponent_score += 1 : challenge.opponent_score += 0
      })
    })

    state.challenges = challenges

    localStorage.setItem('challenges', JSON.stringify(challenges))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
