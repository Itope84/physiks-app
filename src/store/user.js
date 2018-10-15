let userTemplate = {
  name: '',
  username: '',
  email: '',
  password: '',
  matric_no: '',
  points: 0,
  // module is an array of all attemots
  modules: [
    // {
    // id: 1,
    // attempts: [{
    // id: attempt_id, questions: [], score
    // }
  // ]}
  ],
  // a list of all modules started by user, including the questions he has solved in each.
  challenges: [],
  // a list of all challenges user has engaged in
  random_questions: []
  // a list of all random questions user has solved
}

// we'll do sth about this later
let questionsPerAttempt = 30

const state = {
  user: userTemplate
}

const getters = {
  user: state => state.user
}

const actions = {
  storeUser ({commit, state}, {user}) {
    // this action is meant to be called only when we fetch user from database after logging in or signing up!
    let u = state.user = userTemplate
    // mass assign u those behaviours you know
    u = { ...u, name: user.name, id: user.id, matric_no: user.matric_no, email: user.email, points: user.points, username: user.username }
    // now to the hard part.
    user.attempts.map(attempt => {
      // we want to see if this attempt's module is recorded already, if so, is the attempt already recorded? If so, push in the attempt
      let mods = u.modules

      let q = {
        id: attempt.question_id,
        attempt: attempt.answer
      }
      let a = {
        questions: [q],
        score: null
      }
      let m = {
        id: attempt.module_id,
        attempts: [a]
      }

      // does the ser have any modules recorded yet? If not,
      if (!mods.length) {
        console.log('a ran')
        mods.push(m)
      }

      // the user has some modules recorded but not this one
      let thisModule = mods.filter(module => module.id === attempt.module_id)
      if (!thisModule.length) {
        console.log('b ran')
        mods.push(m)
        thisModule = [m]
      }

      // perhaps the module is recorded without attempts, or the last attempt in there is up to 20
      let thisAttempt = thisModule[0].attempts[thisModule[0].attempts.length - 1]
      if (!thisModule[0].attempts.length || thisAttempt.questions.length === questionsPerAttempt) {
        console.log('c ran')
        thisModule[0].attempts.push(a)
        thisAttempt = a
      }

      // attempts have been recorded, but this question aint there
      let thisQstn = thisModule[0].attempts[thisModule[0].attempts.length - 1].questions.filter(qstn => qstn.id === attempt.question_id)
      if (!thisQstn.length) {
        thisAttempt.questions.push(q)
      }
    })
    console.log(u)
    commit('setUser', u)
  },

  fetchUser ({commit}) {
    let user = JSON.parse(localStorage.getItem('user'))
    commit('setUser', user)
  },

  updateUser ({commit, state}, {details}) {
    let u = state.user
    u = {...u, ...details}
    commit('setUser', u)
  },

  startModule ({commit, state}, moduleId) {
    let u = state.user
    let userModule = u.modules.filter(mod => mod.id === moduleId)[0]
    if (!userModule) {
      u.modules.push({
        id: moduleId,
        attempts: [{
          questions: [],
          score: null
        }]
      })
    }
    console.log(u)
    commit('setUser', u)
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
