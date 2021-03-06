/* eslint no-eval: 0 */
<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card flat class="pb-3">

        <v-card-title primary-title>
          <div>
            <h3 class="title mb-0 text-uppercase">{{module.title}}</h3>
          </div>
        </v-card-title>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat color="secondary" :to="{ name: 'Modules'}"> <v-icon>keyboard_arrow_left</v-icon> Return</v-btn>
          <v-btn flat color="primary" style="margin-left: auto !important" @click="startMod()">Skip summary <v-icon>keyboard_arrow_right</v-icon> </v-btn>
        </v-card-actions>

        <v-card-text>
          <h5 class="subheading mb-2"><b>Summary:</b></h5>

          <div v-html="module.summary"></div>
        </v-card-text>

        <v-card-actions class="justify-space-around">
          <v-btn flat color="secondary" :href="module.slide_link" target="_blank"> <v-icon>file_download</v-icon> Slides</v-btn>
          <v-btn color="primary" class="ml-auto" @click="startMod()">Start Solving <v-icon>play_arrow</v-icon> </v-btn>
        </v-card-actions>

        <v-card-actions class="justify-center">
          <v-btn color="accent" @click="submit(module)" v-if="userModule && userModule.completed">View Previous Score</v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>,
    <v-flex xs12 sm6 offset-sm3 class="my-3 px-2">
      <v-expansion-panel>
        <v-expansion-panel-content class="py-1">
          <div slot="header">ADDITIONAL RESOURCES</div>
          <v-card>
            <v-card-text v-html="module.additional_resources"></v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>

    <v-dialog
      v-model="introDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="title primary white--text">Before you continue...</v-card-title>

        <v-card-text>
          This is your {{module.attempts ? toPosition(module.attempts) : `first`}} attempt at this module. You have solved <span class="primary--text">{{userModule ? userModule.attempts[userModule.attempts.length - 1].questions.length : 0}}</span> questions of <span class="info--text">{{module.questions.length}}</span>.
          <p>You need to get 10 questions right to complete this module. Remember:</p>

          <ul>
            <li>If you get less than 10, you have to try again. Otherwise, you can view the answers but you'll lose some points</li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            flat="flat"
            @click="introDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="accent darken-1"
            @click="nextQuestion(module)"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { toPosition, lastItemIn } from '../../../functions.js'
export default {
  data () {
    return {
      // module: null,
      introDialog: false,
      bottomSheet: {
        open: false,
        message: []
      }
    }
  },

  created () {
    // get this module's info from the user's profile
  },

  watch: {
    uploadError: function () {
      this.stopLoading()
      this.bottomSheet.open = true
      this.bottomSheet.message = 'Unable to upload results, please try again later. DON\'T PANIC! Your responses have been saved. You can submit when you\re connected by clicking VIEW PREVIOUS SCORE on this page. Then you can see your score.'
    }
  },

  updated () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')
  },

  mounted () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')
    this.setTitle(this.module.title)
  },

  computed: {
    ...mapGetters('User', ['user', 'uploadError']),
    ...mapGetters('ModulesIndex', ['modules']),
    userModule () {
      return this.user.modules.filter(mod => parseInt(mod.id) === parseInt(this.$route.params.id))[0]
    },

    module () {
      let m = this.userModule

      let attempts

      if (m) {
        attempts = m.attempts ? m.attempts.length : 0
      } else {
        attempts = 0
      }

      return {
        ...this.modules.filter(mod => parseInt(mod.id) === parseInt(this.$route.params.id))[0],
        attempts
      }
    }

  },

  methods: {
    ...mapActions('ModulesIndex', ['fetchModules']),
    toPosition,
    ...mapActions('User', ['startModule', 'nextQuestion', 'submitAnswers']),
    ...mapActions('Navigation', ['startLoading', 'stopLoading', 'setTitle']),

    submit (mod) {
      this.startLoading()
      this.submitAnswers(mod)
    },
    startMod () {
      this.startModule(this.module)
      this.introDialog = true
    },
    lastItemIn
  }
}
</script>

