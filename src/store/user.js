import { lastItemIn, randomItemIn, findById } from '../functions'
import router from '../router'
import store from './index.js'

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
  user: userTemplate,
  activeModule: null,
  activeQuestion: null,
  ansQuestions: 0,
  correctAttempts: null
}

const getters = {
  user: state => state.user,
  module: state => state.activeModule,
  question: state => state.activeQuestion,
  answeredQuestions: state => state.ansQuestions,
  correctAttempts: state => state.correctAttempts
}

const actions = {
  updateAnsweredQuestions ({commit, state}) {
    let x = lastItemIn(state.user.modules.filter(mod => mod.id === state.activeModule.id)[0].attempts).questions.length
    console.log(x)
    commit('SetAns', x)
  },
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
        mods.push(m)
      }

      // the user has some modules recorded but not this one
      let thisModule = mods.filter(module => module.id === attempt.module_id)
      if (!thisModule.length) {
        mods.push(m)
        thisModule = [m]
      }

      // perhaps the module is recorded without attempts, or the last attempt in there is up to 20
      let thisAttempt = thisModule[0].attempts[thisModule[0].attempts.length - 1]
      if (!thisModule[0].attempts.length || thisAttempt.questions.length === questionsPerAttempt) {
        thisModule[0].attempts.push(a)
        thisAttempt = a
      }

      // attempts have been recorded, but this question aint there
      let thisQstn = thisModule[0].attempts[thisModule[0].attempts.length - 1].questions.filter(qstn => qstn.id === attempt.question_id)
      if (!thisQstn.length) {
        thisAttempt.questions.push(q)
      }
    })
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

  startModule ({commit, state}, module) {
    let u = state.user
    let userModule = u.modules.filter(mod => mod.id === module.id)[0]
    if (!userModule) {
      u.modules.push({
        id: module.id,
        attempts: [{
          questions: [],
          score: null
        }]
      })
    }
    if (lastItemIn(userModule.attempts).questions.length === module.questions.length) {
      userModule.attempts.push({
        questions: [],
        score: null
      })
    }
    commit('setUser', u)
  },

  addQuestion ({commit, state, actions}, {question, choice}) {
    let u = state.user
    let userModule = u.modules.filter(mod => mod.id === question.module_id)[0]
    let q = {
      id: question.id,
      attempt: choice
    }
    // see if this question has been attempted during this attempt, if so, duh, you want to change your answer abi, I don't know what your punishment will be, but for now, just skip.
    let questionExists = userModule.attempts[userModule.attempts.length - 1].questions.filter(qstn => qstn.id === question.id)[0]

    if (!questionExists) {
      console.log('question does not exist')
      userModule.attempts[userModule.attempts.length - 1].questions.push(q)
    }

    console.log('out')

    commit('setUser', u)
  },

  nextQuestion ({commit, state}, module) {
    // wee need to compare the questions inside this attempt to the questions in the given module, then we pick any random qstn from the module that isn't aready in the module
    let questionsInLastAttempt = lastItemIn(state.user.modules.filter(mod => mod.id === module.id)[0].attempts).questions

    // filter through all qstns in module and see if you can find each qstn in questionsInLastAttempt
    let untouchedQuestions = module.questions.filter(qstn => questionsInLastAttempt.filter(q => q.id === qstn.id)[0] ? 0 : 1)

    let nextqstn = randomItemIn(untouchedQuestions)

    router.push({ name: 'Question', params: { id: module.id, questionId: nextqstn.id } })

    // TODO: remove this two lines, do we really need to update module?
    let modules = store.getters['ModulesIndex/modules']
    commit('setModule', modules.filter(mod => mod.id === module.id)[0])
    commit('setQuestion', nextqstn)
  },

  setActiveQuestion ({commit, state}, question) {
    commit('setQuestion', question)
  },

  markLatestAttempt ({commit, state}, {module, actualModule}) {
    // find the latest complete attempt
    let att = module.attempts.filter(a => a.questions.length === actualModule.questions.length)[0]

    console.log(att)

    let correctAttempts = att.questions.filter(q => q.attempt === findById(actualModule.questions, q.id).answer)

    let u = state.user

    let points = 0
    correctAttempts.map(q => {
      // only if the question hasn't been marked before
      if (!att.score) {
        switch (findById(actualModule.questions, q.id).difficulty) {
          case 1:
            points += 3
            break
          case 2:
            points += 4
            break
          case 3:
            points += 5
            break
          default:
          // for debugging only
            points += 1
            break
        }
      }
    })

    u.points += points

    let mod = findById(u.modules, module.id)
    findById(mod.attempts, att.id).score = correctAttempts.length

    state.correctAttempts = correctAttempts

    commit('setUser', u)
  },

  setActiveModule ({commit}, module) {
    commit('setModule', module)
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))

    if (state.activeModule) {
      state.ansQuestions = lastItemIn(state.user.modules.filter(mod => mod.id === state.activeModule.id)[0].attempts).questions.length
    }
  },

  setQuestion (state, question) {
    state.activeQuestion = question
    if (state.activeModule) {
      state.ansQuestions = lastItemIn(state.user.modules.filter(mod => mod.id === state.activeModule.id)[0].attempts).questions.length
    }
  },

  setModule (state, module) {
    state.activeModule = module
  },

  setAns (state, val) {
    console.log(val)
    state.ansQuestions = val
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
