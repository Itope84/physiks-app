<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 pa-3>
      <v-card class="pb-1 mx-2 mt-2 mb-4 elevation-12" dark style="background: linear-gradient(to bottom, #000428, #004e92); border-radius: 1rem !important">
        <v-card-title primary-title class="white--text elevation-3">
          <div>
            <h6 class="body-2">Electric Charges</h6>
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
            class="xs-12 pa-2 white--text"
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
        <v-card-text>
          You have attained a score \(\ge\) 50%. You can now proceed to the next stage. Alternatively, you can chose to view answers for all questions you got wrong <span class="orange--text text--darken-4">This will cost you some points</span>.
        </v-card-text>

        <v-card-actions>
          <v-btn color="success" dark>Next Module</v-btn>

          <v-btn color="orange darken-4" dark>View Answers</v-btn>

          <!-- <v-btn color="accent"></v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-dialog v-model="detailsDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>Hello</v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { findById } from '../../../functions'
export default {
  data () {
    return {
      detailsDialog: false
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
