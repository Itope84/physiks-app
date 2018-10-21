<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 px-3 pt-3 pb-1>
      <v-card>
        <v-card-text>
          <div class="d-flex px-3">
            <span class="">Difficulty: <b class="success--text">{{question.difficulty > 2 ? 'Difficult' : question.difficulty > 1 ? 'Medium' : 'Easy'}}</b></span>
          </div>

        </v-card-text>
      </v-card>
    </v-flex>


    <v-flex xs12 sm6 offset-sm3 pa-3>
      <v-card flat class="pb-1 accent" dark>

        <v-card-title primary-title>
          <div>
            <h6 class="body-2">{{module.title}}</h6>
            <h5 class="subheading mb-0 text-uppercase">Question {{answeredQuestions + 1}} of {{module.questions.length}}</h5>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <!-- <v-card-actions>
          <v-btn color="secondary" :to="{ name: 'Module', props: {id: module.id}}"> <v-icon>keyboard_arrow_left</v-icon>
            Return </v-btn>

        </v-card-actions> -->

        <v-card-text>
          <div v-html="question.body"></div>
        </v-card-text>

        <!-- <v-card-actions>
          <v-btn flat color="secondary" :to="module.slide_link"> <v-icon>file_download</v-icon> Slides</v-btn>
          <v-btn color="primary" class="ml-auto">Start Solving <v-icon>play_arrow</v-icon> </v-btn>
        </v-card-actions> -->

      </v-card>
    </v-flex>


    <v-flex xs12 sm6 offset-sm3 class="px-3 mb-3">
      <v-card class="primary" dark>
        <v-card-text>
          <v-radio-group v-model="choice" class="my-1 py-0">
            <v-radio :label="`Option A`" value="A"></v-radio>
            <div v-html="question.option_a" class="mb-2"></div>

            <v-radio :label="`Option B`" value="B"></v-radio>
            <div v-html="question.option_b" class="mb-2"></div>

            <v-radio :label="`Option C`" value="C"></v-radio>
            <div v-html="question.option_c" class="mb-2"></div>

            <v-radio :label="`Option D`" value="D"></v-radio>
            <div v-html="question.option_d" class="mb-2" ></div>
          </v-radio-group>
          <v-card-actions>
            <v-btn color="secondary">Return </v-btn>
            <v-btn color="accent" style="margin-left: auto" @click="submitAttempt">Submit </v-btn>
          </v-card-actions>
        </v-card-text>

      </v-card>
    </v-flex>

    <v-bottom-sheet v-model="bottomSheet.open">
      <v-alert
        :value="true"
        type="error"
      >
        {{bottomSheet.message}}
      </v-alert>

    </v-bottom-sheet>

  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { findById } from '../../../functions'
export default {
  data () {
    return {
      choice: null,
      ungotten: null,
      bottomSheet: {
        open: false,
        message: []
      }
    }
  },

  watch: {
    question: function () {
      this.choice = null
    }
  },

  methods: {
    ...mapActions('User', ['addQuestion', 'nextQuestion', 'setActiveModule', 'setActiveQuestion', 'updateAnsweredQuestions', 'submitAnswers', 'updateUser']),
    ...mapActions('Navigation', ['startLoading', 'stopLoading']),
    submitAttempt () {
      if (!this.choice) {
        this.bottomSheet.message = 'Please select an option'
        this.bottomSheet.open = true
      } else {
        this.addQuestion({question: this.question, choice: this.choice})
        let m = this.module
        this.answeredQuestions === this.module.questions.length ? this.submitAll() : this.nextQuestion(m)
      }
    },

    submitAll () {
      this.startLoading()
      // set the module as completed and submit it
      let a = findById(this.user.modules, this.module.id).attempts.filter(a => a.questions.length === this.module.questions.length)[0]

      if (a) {
        findById(this.user.modules, this.module.id).completed = true
      }
      this.updateUser(this.user)

      this.submitAnswers(this.module).finally(
        console.log('done')
      )
    }
  },

  created () {
    this.setActiveModule(findById(this.modules, parseInt(this.$route.params.id)))

    this.setActiveQuestion(findById(this.module.questions, parseInt(this.$route.params.questionId)))
  },

  mounted () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')

    this.stopLoading()
  },
  computed: {
    ...mapGetters('User', ['user', 'module', 'question', 'answeredQuestions']),
    ...mapGetters('ModulesIndex', ['modules'])
  }

}
</script>
