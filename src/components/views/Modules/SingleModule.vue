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
          <v-btn flat color="primary" style="margin-left: auto !important">Skip summary <v-icon>keyboard_arrow_right</v-icon> </v-btn>
        </v-card-actions>

        <v-card-text>
          <h5 class="subheading mb-2"><b>Summary:</b></h5>

          <div v-html="module.summary"></div>
        </v-card-text>

        <v-card-actions>
          <v-btn flat color="secondary" :to="module.slide_link"> <v-icon>file_download</v-icon> Slides</v-btn>
          <v-btn color="primary" class="ml-auto" @click="startMod()">Start Solving <v-icon>play_arrow</v-icon> </v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>,
    <v-flex xs12 sm6 offset-sm-3 class="my-3 px-2">
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
  </v-layout>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { toPosition } from '../../../functions.js'
export default {
  data () {
    return {
      // module: null,
      introDialog: false
    }
  },

  created () {

    // get this module's info from the user's profile
  },

  mounted () {
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')
    // console.log(this.user.modules)
  },

  computed: {
    ...mapGetters('User', ['user']),
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
    ...mapActions('User', ['startModule', 'nextQuestion']),
    startMod () {
      this.startModule(this.module.id)
      this.introDialog = true
    }
  }
}
</script>

