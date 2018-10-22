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
      <h5 class="primary--text subheading text-uppercase text-xs-center">WINNER GETS</h5>
      <h5 class="secondary--text text-uppercase text-xs-center">25 Points</h5>
    </v-flex>

    <v-btn style="bottom: 4rem; position: absolute; width: 80%; margin-left: 10%" color="primary">Start Now</v-btn>
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
    ...mapActions('ChallengesIndex', ['fetchChallenges']),
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
      console.log(this.challenges)
      return this.challenges.filter(c => c.id === parseInt(this.$route.params.id))[0]
    }
  }
}
</script>
