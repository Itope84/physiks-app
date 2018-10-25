import axios from '../../http'
import { getUserLevel } from '../../functions'
// import store from 'vuex'

const state = {
  users: [],
  challenges: null,
  scoredChallenges: []
}

const getters = {
  users: state => state.users,
  challenges: state => state.challenges,
  scoredChallenges: state => state.scoredChallenges
}

const actions = {
  fetchUsers ({ commit }) {
    axios.get('users').then(response => {
      commit('setUsers', response.data)
    })
  },

  fetchChallenges ({ commit, state }) {
    let challenges = localStorage.getItem('challenges')
    commit('setChallenges', JSON.parse(challenges))

    let s = JSON.parse(localStorage.getItem('scoredChallenges'))

    if (!s) {
      s = []
    }

    state.scoredChallenges = s
  },

  addChallenge ({ commit, state, dispatch }, challenge) {
    if (!state.challenges) {
      dispatch('fetchChallenges')
    }
    let challenges = state.challenges
    challenges.push(challenge)
    commit('setChallenges', challenges)
  },

  scoreChallenge ({ dispatch, commit, state, rootGetters }, { challenge, score }) {
    let a = { ...challenge }
    let user = rootGetters['User/user']
    user.points += score
    a.scored = true
    dispatch('User/updateUser', { details: user }, { root: true })
    commit('scoreChallenge', a)
  },

  searchUser ({ commit }, query) {
    axios.get('users/search?q=' + query).then(response => {
      commit('setUsers', response.data)
    })
  },

  updateChallenge ({ commit, state }, challenge) {
    let challenges = state.challenges
    let x = challenges.filter(c => c.id === challenge.id)[0]
    x = { ...x, ...challenge }
    console.log(x)
    // challenges.filter(c => c.id === challenge.id)[0] = x

    commit('setChallenges', challenges)
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
      let d = 1
      challenge.questions.map(q => {
        q.challenger_answer && q.opponent_answer ? d *= 1 : d *= 0

        q.challenger_answer === q.question.answer ? challenge.challenger_score += 1 : challenge.challenger_score += 0

        q.opponent_answer === q.question.answer ? challenge.opponent_score += 1 : challenge.opponent_score += 0
      })
      challenge.completed = d
    })

    state.challenges = challenges

    localStorage.setItem('challenges', JSON.stringify(challenges))
  },

  scoreChallenge (state, challenge) {
    let c = localStorage.getItem('scoredChallenges')
    c = JSON.parse(c)
    if (!c) {
      c = []
    }
    c.push(challenge)
    state.scoredChallenges = c
    localStorage.setItem('scoredChallenges', JSON.stringify(c))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
