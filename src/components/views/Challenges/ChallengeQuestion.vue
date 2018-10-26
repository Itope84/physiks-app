<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 px-3 pt-3 pb-1>
      <v-card v-if="!completed">
        <v-card-text>
          <div class="d-flex px-3">
            <span class="">Difficulty: <b class="success--text">{{challengeQuestion.question.difficulty > 2 ? 'Difficult' : challengeQuestion.question.difficulty > 1 ? 'Medium' : 'Easy'}}</b></span>

            <span class="ml-auto">
              Timer: <span class="red--text">{{time}}</span>
            </span>
          </div>

        </v-card-text>
      </v-card>

      <v-card v-else px-2>
        <v-layout class="pt-2" align-center>
          <v-flex xs3>
            <v-layout column align-center>
              <profile-avatar :username="challenge.challenger.username" :size="30"></profile-avatar>
            </v-layout>
          </v-flex>

          <v-flex xs6>
            <v-card-text class="d-flex px-0">
              <v-icon :color="optionColorClass(challengeQuestion.challenger_answer)" class="mr-auto">{{challengeQuestion.challenger_answer === challengeQuestion.question.answer ? `check` : `close`}}</v-icon>
               -
              <v-icon :color="optionColorClass(challengeQuestion.opponent_answer)" class="ml-auto">{{challengeQuestion.opponent_answer === challengeQuestion.question.answer ? `check` : `close`}}</v-icon>
            </v-card-text>
          </v-flex>

          <v-flex xs3>
            <v-layout column align-center>
              <profile-avatar :username="challenge.opponent.username" :size="30"></profile-avatar>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 sm6 offset-sm3 v-if="challengeQuestion" class="mb-3">
      <v-layout row wrap>
        <v-flex xs12 pa-3 mb-2>
          <v-card flat class="pb-1 accent" dark>

            <v-card-title primary-title>
              <div>
                <h5 class="subheading mb-0 text-uppercase">Question {{challenge.questions.indexOf(challengeQuestion) + 1}}</h5>
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <div v-html="challengeQuestion.question.body"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 offset-sm3 px-3 mb-2>
          <v-card>
            <v-card flat class="pa-3 mb-0" dark :class="optionColorClass('A')" ripple @click.native="chooseOption('A')">
              <h2 class="title mb-1">Option A</h2>
              <div v-html="challengeQuestion.question.option_a"></div>
            </v-card>

            <v-divider></v-divider>


          <v-card flat class="pa-3 mb-0" dark :class="optionColorClass('B')" ripple @click.native="chooseOption('B')">
            <h2 class="title mb-1">Option B</h2>
            <div v-html="challengeQuestion.question.option_b"></div>
          </v-card>

          <v-divider></v-divider>

          <v-card flat class="pa-3 mb-0" dark :class="optionColorClass('C')" ripple @click.native="chooseOption('C')">
            <h2 class="title mb-1">Option C</h2>
            <div v-html="challengeQuestion.question.option_c"></div>
          </v-card>

          <v-divider></v-divider>

          <v-card class="pa-3 mb-0" dark :class="optionColorClass('D')" ripple @click.native="chooseOption('D')">
            <h2 class="title mb-1">Option D</h2>
            <div v-html="challengeQuestion.question.option_d"></div>
          </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12 class="mb-3">
      <v-card-actions class="px-3">
        <v-btn class="secondary" v-if="completed" @click="prevSolution" :disabled="completed && challenge.questions.indexOf(challengeQuestion) - 1 < 0">Previous</v-btn>

        <v-btn class="primary" style="margin-left: auto" @click="nextSolution" v-if="completed" :disabled ="challenge.questions.indexOf(challengeQuestion) + 1 >= this.challenge.questions.length">Next</v-btn>

        <v-btn class="primary" style="margin-left: auto" @click="submit" v-if="!completed">Next</v-btn>
      </v-card-actions>
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
import ProfileAvatar from '../../partials/ProfileAvatar.vue'

export default {
  data () {
    return {
      time: 0,
      bottomSheet: {
        open: false,
        message: 'Please chose a valid option'
      },
      challengeQuestion: null,
      completed: false,
      choice: null
    }
  },
  components: {
    ProfileAvatar
  },
  computed: {
    ...mapGetters('ChallengesIndex', ['challenges']),
    challenge () {
      if (!this.challenges) {
        this.fetchChallenges()
      }
      return this.challenges.filter(c => c.id === parseInt(this.$route.params.challengeId))[0]
    },
    role () {
      let uid = JSON.parse(localStorage.getItem('user')).id
      return this.challenge.challenger.id === uid ? 'challenger' : 'opponent'
    },
    opponentRole () {
      return this.role === 'challenger' ? 'opponent' : 'challenger'
    }
  },

  methods: {
    ...mapActions('ChallengesIndex', ['fetchChallenges', 'updateChallenge']),
    nextQuestion () {
      let unanswered = this.challenge.questions.filter(q => !q[this.role + '_answer'])
      console.log(unanswered)
      let OpponentIsDone = !this.challenge.questions.filter(q => !q[this.opponentRole + '_answer']).length
      if (!unanswered.length) {
        // user has answered all the questions, find out if we're still waiting for the opponent
        if (OpponentIsDone) {
          this.completed = true
          this.challenge.completed = true
        }
        this.$router.push({name: 'NewChallenge', params: {id: this.challenge.id}})
        // if we're not waiting for opponent, show choice details
      } else {
        this.challengeQuestion = unanswered[0]
        window.scrollTo(0, 0)
        this.startTimer()
      }
    },
    nextSolution () {
      this.challengeQuestion ? this.challengeQuestion = this.challenge.questions[this.challenge.questions.indexOf(this.challengeQuestion) + 1] : this.challengeQuestion = this.challenge.questions[0]

      window.scrollTo(0, 0)

      this.choice = this.challengeQuestion[this.role + '_answer']
    },

    prevSolution () {
      this.challengeQuestion ? this.challengeQuestion = this.challenge.questions[this.challenge.questions.indexOf(this.challengeQuestion) - 1] : this.challengeQuestion = this.challenge.questions[0]

      window.scrollTo(0, 0)

      this.choice = this.challengeQuestion[this.role + '_answer']
    },
    startTimer () {
      this.challengeQuestion.question.difficulty > 2 ? this.time = 300 : this.challengeQuestion.question.difficulty > 1 ? this.time = 200 : this.time = 100
      let expired = () => {
        clearInterval(countdown)
        this.chooseOption('E')
        this.nextQuestion()
      }
      let countdown = setInterval(() => {
        this.time === 0 ? expired() : --this.time
      }, 1000)
    },
    optionColorClass (option) {
      return this.completed ? this.challengeQuestion.question.answer === option ? 'success' : this.choice === option ? 'error' : 'primary' : this.choice === option ? 'blue-grey' : 'primary'
    },
    chooseOption (option) {
      if (!this.completed) {
        this.choice = option
        this.challengeQuestion[this.role + '_answer'] = option
        let x = this.challenge.questions.filter(c => c.id === this.challengeQuestion.id)[0]
        x[this.role + '_answer'] = option
        this.updateChallenge(this.challenge)
      }
    },
    submit () {
      if (!(this.completed || this.choice)) {
        this.bottomSheet.open = true
      } else {
        this.choice = null
        this.nextQuestion()
      }
    }
  },

  beforeMount () {
    if (this.challenge.completed) {
      this.completed = true
      this.nextSolution()
    } else {
      this.nextQuestion()
    }
  }
}
</script>
