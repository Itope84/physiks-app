<template>
  <v-layout row wrap>
    <!-- error dialog -->
    <v-dialog persistent v-model="showError" max-width="290">
      <v-card>
        <v-card-text v-if="errorType === 1">
          Sorry, we were unable to submit your responses. Please verify your internet connection and click try again. <br>
          <span class="error--text">Please note that leaving this page without submitting your responses will make you lose your data.</span>
          <p>You can also click on the reload button to try submitting your responses again.</p>
        </v-card-text>

        <v-card-text v-else>
          Network error, please try again
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error darken-1" flat="flat" @click="showError = false">
            Close
          </v-btn>

          <v-btn color="accent darken-1" @click="submitData()">
            Reload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-flex xs12 class="pt-4">
      <v-layout class="pa-3 mx-2 mt-5">
        <v-flex xs4>
          <v-layout column align-center>
            <profile-avatar :size="60" :name="`Santiago`" :username="`Tope`"></profile-avatar>
            <h5 class="subheading py-2 text-xs-center" :class="[scoreClass(this.challenge.challenger_score, this.challenge.opponent_score)]">{{this.challenge.challenger.username}}</h5>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-card-text>
            <h2 class="mt-2 title text-xs-center"><span :class="[scoreClass(this.challenge.challenger_score, this.challenge.opponent_score)]">{{this.challenge.challenger_score}}</span> : <span :class="[scoreClass(this.challenge.opponent_score, this.challenge.challenger_score)]">{{this.challenge.opponent_score}}</span></h2>
          </v-card-text>
        </v-flex>

        <v-flex xs4>
          <v-layout column align-center>
            <profile-avatar :size="60" :name="`Santiago`" :username="`Tope`"></profile-avatar>
            <h5 class="subheading py-2 text-xs-center" :class="[scoreClass(this.challenge.opponent_score, this.challenge.challenger_score)]">{{this.challenge.opponent.username}}</h5>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12>
      <h5 class="primary--text subheading text-uppercase text-xs-center" v-if="!isScored">WINNER GETS</h5>

      <h5 class="success--text subheading text-uppercase text-xs-center" v-else-if="userWon > 0">YOU WON</h5>

      <h5 class="error--text subheading text-uppercase text-xs-center" v-else-if="userWon < 0">YOU LOST</h5>

      <h5 class="primary--text subheading text-uppercase text-xs-center" v-else>DRAW</h5>

      <h5 class="text-uppercase text-xs-center" v-if="isScored && userWon < 0"><v-chip label outline color="error">- {{this.pointsToLose}} POINTS  </v-chip></h5>

      <h5 class="text-uppercase text-xs-center" v-if="!isScored"><v-chip label outline :color="'primary'"> + {{this.pointsToGain}} POINTS  </v-chip></h5>

      <h5 class="text-uppercase text-xs-center" v-if="isScored && userWon >= 0"><v-chip label outline :color="'success'"> + {{this.userWon * this.pointsToGain}} POINTS  </v-chip></h5>
    </v-flex>

    <v-card class="pa-3 mt-3 mb-5 mx-5 full elevation-6" style="width: 100%;" v-if="isScored">
      <v-layout row wrap class="text-xs-center">
        <v-flex xs4>You</v-flex>
        <v-flex xs4></v-flex>
        <v-flex xs4>Somebody</v-flex>
      </v-layout>

      <v-layout row wrap v-for="(item, index) in challenge.questions" :key="index" justify-center class="text-xs-center mb-2">
        <v-flex xs4><v-icon :color="item.challenger_answer === item.question.answer ? 'success' : 'error'">{{item.challenger_answer === item.question.answer ? 'check' : 'close'}}</v-icon></v-flex>

        <v-flex xs4>{{index + 1}}</v-flex>

        <v-flex xs4>
          <v-icon :color="item.opponent_answer === item.question.answer ? 'success' : 'error'">{{item.opponent_answer === item.question.answer ? 'check' : 'close'}}</v-icon>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn color="primary" outline>
          View Details
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-btn style="bottom: 4rem; position: absolute; width: 80%; margin-left: 10%" color="primary" v-if="!userIsDone" :to="{name: 'ChallengeQuestion', params:{challengeId: challenge.id}}">Start Now</v-btn>

    <h5 class="text-uppercase text-xs-center" v-else-if="!OpponentIsDone"  style="bottom: 4rem; position: absolute; width: 80%; margin-left: 10%"><v-chip label outline color="primary"> Waiting for Opponent  </v-chip>
    <br>
    <v-btn color="primary" outline @click="submitData()">
      <v-icon>refresh</v-icon> Reload
    </v-btn>
    </h5>
  </v-layout>
</template>

<script>
import axios from '../../../http'
import ProfileAvatar from '../../partials/ProfileAvatar.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
// import findById from '../../../functions'
export default {
  data () {
    return {
      showError: false,
      errorType: 1
    }
  },
  components: {
    ProfileAvatar
  },

  methods: {
    ...mapActions('ChallengesIndex', ['fetchChallenges', 'scoreChallenge']),
    ...mapMutations('ChallengesIndex', ['setChallenges']),
    ...mapActions('Navigation', ['startLoading', 'stopLoading']),
    scoreClass (a, b) {
      return a > b ? 'success--text' : 'error--text'
    },
    submitData: async function () {
      this.startLoading()
      axios.post(`challenges/${this.challenge.id}/update`, {
        challenge: JSON.stringify(this.challenge)
      }).then(response => {
        this.showError = false
        this.challenge.questions = response.data.questions
        this.challenge.submitted = true
        this.setChallenges(this.challenges)
        this.tryScoring()
        this.stopLoading()
      }).catch(error => {
        this.stopLoading()
        console.log(error)
        this.showError = true
        this.challenge.submitted ? this.errorType = 1 : this.errorType = 2
      })
    },

    tryScoring () {
      if (this.challenge.completed && !(this.isScored)) {
        this.scoreChallenge({challenge: this.challenge, score: this.userWon ? this.pointsToGain : -1 * this.pointsToLose})
      }
    }
  },

  computed: {
    ...mapGetters('ChallengesIndex', ['challenges', 'scoredChallenges']),
    challenge () {
      if (!this.challenges) {
        this.fetchChallenges()
      }
      return this.challenges.filter(c => c.id === parseInt(this.$route.params.id))[0]
    },

    userIsDone () {
      return !this.challenge.questions.filter(q => !q[this.role + '_answer']).length
    },

    OpponentIsDone () {
      let otherRole = this.role === 'challenger' ? 'opponent' : 'challenger'

      return !this.challenge.questions.filter(q => !q[otherRole + '_answer']).length
    },

    pointsToGain () {
      let points = 0
      this.challenge.questions.map(q => {
        switch (q.question.difficulty) {
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

    pointsToLose () {
      return Math.ceil(this.pointsToGain / 3)
    },

    isScored () {
      // is this challenge scored?
      let challenges = this.scoredChallenges

      return challenges.length && challenges.filter(c => c.id === this.challenge.id).length
    },

    role () {
      let uid = JSON.parse(localStorage.getItem('user')).id

      return this.challenge.challenger.id === uid ? 'challenger' : 'opponent'
    },

    userWon () {
      // did our hero win? return 0 if draw, -1 if lose, 1 if won

      let otherRole = this.role === 'challenger' ? 'opponent' : 'challenger'

      return this.challenge[this.role + '_score'] > this.challenge[otherRole + '_score'] ? 1 : this.challenge[this.role + '_score'] < this.challenge[otherRole + '_score'] ? -1 : 0
    }
  },

  mounted () {
    this.submitData().then(response => {
      if (this.userIsDone && this.OpponentIsDone) {
        this.challenge.completed = true
      }

      this.tryScoring()
    })
  }
}
</script>
