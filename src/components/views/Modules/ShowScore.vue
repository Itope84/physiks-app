<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 pa-3>
      <v-card class="pb-1 mx-2 mt-2 mb-4 elevation-12" dark style="background: linear-gradient(to bottom, #000428, #004e92); border-radius: 1rem !important">
        <v-card-title primary-title class="white--text elevation-3">
          <div>
            <h6 class="body-2">{{module.title}}</h6>
            <h5 class="subheading mb-0 text-uppercase">Results</h5>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-layout align-center justify-center pa-3 row wrap>
          <v-progress-circular
            :size="150"
            :width="10"
            :value="parseInt(correctAttempts.length / module.questions.length * 100)"
            :rotate="120"
            class="xs-12 pa-2"
            :class = "[parseInt(correctAttempts.length / module.questions.length * 100) >= 70 ? 'orange--text text--darken-2': parseInt(correctAttempts.length / module.questions.length * 100) >= 50 ? 'success--text' : 'error--text' ]"
          >
            <h2 class="display-2 mt-4">{{ parseInt(correctAttempts.length / module.questions.length * 100) }}%</h2>

            <h1 class="text-xs-center"><span class="headline">{{correctAttempts.length}}/</span><span class="subheading">{{module.questions.length}}</span></h1>
          </v-progress-circular>

          <v-card-text>
            <h3 class="display-2 text-xs-center blue--text text--lighten-3">+{{gainedPoints}} pts</h3>
          </v-card-text>

          <v-card-actions>
            <v-card-actions>

              <v-btn color="primary" @click="showDetails">
              <!-- <v-icon>info_outline</v-icon> -->
                View Details</v-btn>

              <v-btn color="secondary" :to="{ name: 'Module', props: {id: 1}}"> <v-icon>refresh</v-icon>
                Try Again </v-btn>

            </v-card-actions>
          </v-card-actions>

        </v-layout>

      </v-card>

      <v-card class="pa-2 ma-2">
        <v-card-text v-if="correctAttempts.length / module.questions.length >= 0.5">
          You have attained a score \(\ge\) 50%. You can now proceed to the next stage. Alternatively, you can chose to view answers for all questions you got wrong <span class="orange--text text--darken-4">This will cost you some points</span>.
        </v-card-text>

        <v-card-text v-else>
          You didn't score up to 50%, you'll have to retry this module. Alternatively, you can chose to view the answers to all the questions, or return to modules list to try all modules
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="success" dark v-if="correctAttempts.length / module.questions.length >= 0.5">Next Module</v-btn>

          <v-btn v-else :to="{ name: 'Module', params:{id: module.id} }" color="success">
            Retry
          </v-btn>

          <v-btn color="orange darken-4" dark @click="showConfirmViewAnswersDialog">View Answers</v-btn>

        </v-card-actions>

        <v-card-actions>
          <v-btn color="accent" class="mx-auto" :to="{name: 'Modules'}">All Modules</v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>

    <!-- confirm view answers dialog -->

    <v-dialog v-model="confirmViewAnswersDialog" max-width="290">
      <v-card>
        <v-card-title class="title">Are you sure?</v-card-title>

        <v-card-text>
          This will cost you {{reducePointsPerAnswer * module.questions.length}} points
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error darken-1" flat="flat" @click="confirmViewAnswersDialog = false">
            Cancel
          </v-btn>

          <v-btn
            color="accent darken-1" @click="buyAnswers">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog for showing result details -->
    <v-dialog v-model="detailsDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>

        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="detailsDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="pa-2">
            <v-chip label color="orange darken-3" class="white--text"  v-if="!showAnswers" @click.native="showConfirmViewAnswersDialog">View Answers</v-chip>
          </v-toolbar-items>
        </v-toolbar>

        <v-layout v-if="showSingleQuestion" row wrap
         v-touch="{
            left: () => nextQuestion(),
            right: () => prevQuestion()
          }"
        >
        <v-flex xs12>
          <v-card-actions class="px-3">
          <v-btn color="secondary" @click="showSingleQuestion = false">Return</v-btn>

          <v-btn class="primary" style="margin-left: auto" @click="prevQuestion()"><v-icon>keyboard_arrow_left</v-icon> Prev</v-btn>
          <v-btn class="primary" @click="nextQuestion()">Next <v-icon>keyboard_arrow_right</v-icon></v-btn>
        </v-card-actions>
        </v-flex>
          <question-card :question="questionToShow.question" :questionNo="questionToShow.questionNo" :choice="questionToShow.choice" :showAnswer="showAnswers"></question-card>
        </v-layout>

        <v-card-text v-else>
          <div class="d-flex justify-center">
            <v-progress-circular :size="70" :width="7" :value="parseInt(correctAttempts.length / module.questions.length * 100)" :rotate="120" class="xs-12 pa-2"
            :class = "[parseInt(correctAttempts.length / module.questions.length * 100) >= 70 ? 'orange--text text--darken-2': parseInt(correctAttempts.length / module.questions.length * 100) >= 50 ? 'success--text' : 'error--text' ]">

              <h1 class="text-xs-center"><span class="headline">{{correctAttempts.length}}/</span><span class="subheading">{{module.questions.length}}</span></h1>
            </v-progress-circular>

          </div>

          <p class="body-2 info--text"><v-icon>info</v-icon>Click on each question to view more details</p>

          <!-- each card containing the results -->
          <v-flex xs12 class="pb-3" v-ripple style="border-radius: 1rem !important" v-for="(question, index) in thisAttempt.questions" :key="index" @click="showQuestion(question.id, index + 1)">

            <v-divider class="mb-3"></v-divider>

            <v-flex xs12 class="px-3">

              <h2 class="title" :class="[findById(correctAttempts, question.id) ? 'success--text' : 'error--text']">Question {{index + 1}}</h2>
              <p class="text-truncate" v-html="findById(module.questions, question.id).body"></p>

              <h5 class="body-2 d-flex" :class="[findById(correctAttempts, question.id) ? 'success--text' : 'error--text']">
                <span>CHOICE: {{question.attempt}}</span>

                <span class="ml-auto" v-if="showAnswers">ANSWER: {{findById(module.questions, question.id).answer}}</span>
              </h5>

            </v-flex>

          </v-flex>

        </v-card-text>


      </v-card>
    </v-dialog>

    <!-- error bottom sheet -->
    <v-bottom-sheet v-model="insufficientPoints">
      <v-alert :value="true" type="error">
        Sorry, you do not have sufficient points to view the answers.
      </v-alert>

    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { findById } from '../../../functions'
import QuestionCard from '../../partials/QuestionCard'

export default {
  data () {
    return {
      detailsDialog: false,
      showAnswers: false,
      insufficientPoints: false,
      confirmViewAnswersDialog: false,
      showSingleQuestion: false,
      questionToShow: null
    }
  },

  computed: {
    ...mapGetters('User', ['user', 'module', 'answeredQuestions', 'correctAttempts', 'reducePointsPerAnswer']),
    ...mapGetters('ModulesIndex', ['modules']),

    gainedPoints () {
      let points = 0
      this.correctAttempts.map(q => {
        // only if the question hasn't been marked before
        switch (findById(this.module.questions, q.id).difficulty) {
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
      })

      return points
    },

    thisAttempt () {
      return findById(this.user.modules, this.module.id).attempts.filter(a => a.questions.length === this.module.questions.length)[0]
    }
  },

  methods: {
    ...mapActions('User', ['setActiveModule', 'updateAnsweredQuestions', 'markLatestAttempt', 'reducePoints']),
    ...mapActions('Navigation', ['startLoading', 'stopLoading']),

    showDetails () {
      this.detailsDialog = true
    },

    showConfirmViewAnswersDialog () {
      this.confirmViewAnswersDialog = true
    },

    buyAnswers () {
      let pointsToReduce = this.reducePointsPerAnswer * this.module.questions.length
      if (this.user.points < pointsToReduce) {
        this.insufficientPoints = true
      } else {
        this.reducePoints(pointsToReduce).then(this.showAnswers = true)
        this.showDetails()
      }
    },

    showQuestion (id, questionNo) {
      this.questionToShow = {
        question: findById(this.module.questions, id),
        questionNo,
        choice: findById(this.thisAttempt.questions, id).attempt,
        showAnswer: this.showAnswers
      }
      this.showSingleQuestion = true
    },

    currentQuestionNo () {
      // current question, recall all qstns are randomised
      let q = findById(this.thisAttempt.questions, this.questionToShow.question.id)
      let no = this.thisAttempt.questions.indexOf(q)
      return no
    },

    nextQuestion () {
      let nextq = this.thisAttempt.questions[this.currentQuestionNo() + 1]

      this.showQuestion(nextq.id, (this.currentQuestionNo() + 2))
    },

    prevQuestion () {
      let prevNo = this.currentQuestionNo() - 1
      let prev = this.thisAttempt.questions[prevNo]

      this.showQuestion(prev.id, this.currentQuestionNo())
    },

    findById
  },

  created () {
    this.setActiveModule(findById(this.modules, parseInt(this.$route.params.id)))
  },

  mounted () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')

    this.stopLoading()

    let m = findById(this.user.modules, parseInt(this.$route.params.id))

    this.markLatestAttempt({module: m, actualModule: this.module})
  },

  components: {
    QuestionCard
  }
}
</script>
