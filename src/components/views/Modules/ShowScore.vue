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
            :class = "[parseInt(correctAttempts.length / module.questions.length * 100) > 70 ? 'orange--text text--darken-2': parseInt(correctAttempts.length / module.questions.length * 100) > 50 ? 'success--text' : 'error--text' ]"
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
        <v-card-text v-if="correctAttempts.length / module.questions.length > 0.5">
          You have attained a score \(\ge\) 50%. You can now proceed to the next stage. Alternatively, you can chose to view answers for all questions you got wrong <span class="orange--text text--darken-4">This will cost you some points</span>.
        </v-card-text>

        <v-card-text v-else>
          You didn't score up to 50%, you'll have to retry this module. Alternatively, you can chose to view the answers to all the questions, or return to modules list to try all modules
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="success" dark v-if="correctAttempts.length / module.questions.length > 0.5">Next Module</v-btn>

          <v-btn v-else :to="{ name: 'Module', params:{id: module.id} }" color="success">
            Retry
          </v-btn>

          <v-btn color="orange darken-4" dark>View Answers</v-btn>

        </v-card-actions>

        <v-card-actions>
          <v-btn color="accent" class="mx-auto">All Modules</v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>

    <v-dialog v-model="detailsDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>

        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="detailsDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="pa-2">
            <v-chip label color="orange darken-3" class="white--text" @click.native="this.showAnswers = true">View Answers</v-chip>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <h1 class="text-xs-center"><span class="headline">{{correctAttempts.length}}/</span><span class="subheading">{{module.questions.length}}</span></h1>
        </v-card-text>


      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { findById } from '../../../functions'
export default {
  data () {
    return {
      detailsDialog: false,
      showAnswers: false
    }
  },

  computed: {
    ...mapGetters('User', ['user', 'module', 'answeredQuestions', 'correctAttempts']),
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
    }
  },

  methods: {
    ...mapActions('User', ['setActiveModule', 'updateAnsweredQuestions', 'markLatestAttempt']),

    showDetails () {
      this.detailsDialog = true
    }
  },

  created () {
    this.setActiveModule(findById(this.modules, parseInt(this.$route.params.id)))
  },

  mounted () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')

    let m = findById(this.user.modules, parseInt(this.$route.params.id))

    this.markLatestAttempt({module: m, actualModule: this.module})
  }
}
</script>
