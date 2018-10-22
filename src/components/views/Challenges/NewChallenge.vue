<template>
  <v-layout row wrap>
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

      <h5 class="success--text subheading text-uppercase text-xs-center" v-else-if="userWon">YOU WON</h5>

      <h5 class="error--text subheading text-uppercase text-xs-center" v-else>YOU LOST</h5>

      <h5 class="text-uppercase text-xs-center" v-if="isScored && !userWon"><v-chip label outline color="error">- {{this.pointsToLose}} POINTS  </v-chip></h5>

      <h5 class="text-uppercase text-xs-center"><v-chip label outline :color="userWon ? 'success' : 'primary'"> + {{this.pointsToGain}} POINTS  </v-chip></h5>
    </v-flex>

    <v-card class="pa-3 my-3 mx-5 full" style="width: 100%;" v-if="isScored">
      <v-layout row wrap class="text-xs-center">
        <v-flex xs4>You</v-flex>
        <v-flex xs4></v-flex>
        <v-flex xs4>Somebody</v-flex>
      </v-layout>

      <v-layout row wrap v-for="(item, index) in challenge.questions" :key="index" justify-center class="text-xs-center">
        <v-flex xs4><v-icon :color="item.challenger_answer === item.question.answer ? 'success' : 'error'">{{item.challenger_answer === item.question.answer ? 'check' : 'close'}}</v-icon></v-flex>

        <v-flex xs4>{{index + 1}}</v-flex>

        <v-flex xs4>
          <v-icon :color="item.opponent_answer === item.question.answer ? 'success' : 'error'">{{item.opponent_answer === item.question.answer ? 'check' : 'close'}}</v-icon>
        </v-flex>
      </v-layout>
    </v-card>

    <v-btn style="bottom: 4rem; position: absolute; width: 80%; margin-left: 10%" color="primary" v-if="!isScored">Start Now</v-btn>
  </v-layout>
</template>

<script>
import ProfileAvatar from '../../partials/ProfileAvatar.vue'
import { mapGetters, mapActions } from 'vuex'
// import findById from '../../../functions'
export default {
  components: {
    ProfileAvatar
  },

  methods: {
    ...mapActions('ChallengesIndex', ['fetchChallenges', 'scoreChallenge']),
    scoreClass (a, b) {
      return a > b ? 'success--text' : 'error--text'
    }
  },

  computed: {
    ...mapGetters('ChallengesIndex', ['challenges']),
    challenge () {
      if (!this.challenges) {
        this.fetchChallenges()
      }
      return this.challenges.filter(c => c.id === parseInt(this.$route.params.id))[0]
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
      // is his challenge scored?
      let challenges = JSON.parse(localStorage.getItem('scoredChallenges'))

      return challenges && challenges.filter(c => c.id === this.challenge.id)[0]
    },

    role () {
      let uid = JSON.parse(localStorage.getItem('user')).id

      return this.challenge.challenger.id === uid ? 'challenger' : 'opponent'
    },

    userWon () {
      // did our hero win?

      let otherRole = this.role === 'challenger' ? 'opponent' : 'challenger'

      return this.isScored && this.challenge[this.role + '_score'] > this.challenge[otherRole + '_score']
    }
  },

  mounted () {
    if (!(this.isScored) && this.challenge.completed) {
      this.scoreChallenge({challenge: this.challenge, score: this.userWon ? this.pointsToGain : -1 * this.pointsToLose})
    }
  }
}
</script>
