let userTemplate = {
  name: '',
  username: '',
  email: '',
  password: '',
  matric_no: '',
  points: 0,
  modules: [],
  // a list of all modules started by user, including the questions he has solved in each.
  challenges: [],
  // a list of all challenges user has engaged in
  random_questions: []
  // a list of all random questions user has solved
}

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
      // we want to see if this attempt's module is recorded already, if so, is the attempt's question already recorded, if so, push the attempt into the question, else record the question and push the attempt into the question, otherwise of the initial, record the module and push the question, then the attempt
      let mods = u.modules
      let q = {
        id: attempt.question_id,
        attempts: [attempt]
      }
      let m = {
        id: attempt.module_id,
        questions: [q]
      }

      // if module is empty
      if (!mods.length) {
        mods.push(m)
      }

      let mod = mods.filter(module => module.id === attempt.module_id)
      // don't worry, if the first if executes, this one wont
      if (!mod.length) {
        // insert this attempt's module then
        mods.push(m)
        // we need this to continue
        mod = [m]
      }

      // if this module has no questions
      if (!mod[0].questions.length) {
        mod[0].questions.push(q)
      }

      let question = mod[0].questions.filter(qstn => qstn.id === attempt.question_id)

      // if this attempt's question is not yet in the module
      if (!question.length) {
        mod[0].questions.push(q)
        question = [q]
      }

      if (!question[0].attempts.length) {
        question[0].attempts.push(attempt)
      }

      // is this attempt in the question
      let att = question[0].attempts.filter(attmpt => attmpt.id === attempt.id)
      if (!att.length) {
        question[0].attempts.push(attempt)
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
