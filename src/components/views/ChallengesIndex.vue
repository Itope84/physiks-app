<template>
  <v-container fluid pa-0>
    <div class="text-xs-center px-3 mt-3">
      <v-btn color="primary" :to="{name: 'FindOpponent'}">
        Challenge Someone Now
      </v-btn>
    </div>



        <v-subheader class="d-flex justify-center text-uppercase">Recent Challenges</v-subheader>
        <v-flex xs12 v-for="(challenge, index) in challenges" :key="index">
          <v-layout class="pt-2">
              <v-flex xs4>
                <v-layout column align-center>
                  <profile-avatar :username="challenge.challenger.username" :size="30"></profile-avatar>
                  <h5 class="subheading py-2 text-xs-center" :class="[scoreClass(challenge.challenger_score, challenge.opponent_score)]">{{challenge.challenger.username}}</h5>
                </v-layout>
              </v-flex>

              <v-flex xs4>
                <v-card-text>
                  <h2 class="subheading py-2 text-xs-center"><span :class="[scoreClass(challenge.challenger_score, challenge.opponent_score)]">{{challenge.challenger_score}}</span> - <span :class="[scoreClass(challenge.opponent_score, challenge.challenger_score)]">{{challenge.opponent_score}}</span></h2>
                </v-card-text>
              </v-flex>

              <v-flex xs4>
                <v-layout column align-center>
                  <profile-avatar :username="challenge.opponent.username" :size="30"></profile-avatar>
                  <h5 class="subheading py-2 text-xs-center" :class="[scoreClass(challenge.opponent_score, challenge.challenger_score)]">{{challenge.opponent.username}}</h5>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-divider class="mb-4"></v-divider>

        </v-flex>


      <!-- <v-list>

          <v-list-tile v-for="(challenge, index) in challenges" :key="index">


            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center py-2 mb-2" style="height: auto">
                {{challenge.challenger.name}}
                <v-chip label color="primary">
                  {{challenge.challenger.score}} vs {{challenge.opponent.score}}
                </v-chip>
                 {{challenge.opponent.name}}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>
      </v-list> -->

  </v-container>
</template>

<script>
import axios from '../../http'
import ProfileAvatar from '../partials/ProfileAvatar.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('Navigation', ['startLoading', 'stopLoading']),
    ...mapMutations('ChallengesIndex', ['setChallenges']),
    scoreClass (a, b) {
      return a > b ? 'success--text' : 'error--text'
    }
  },

  components: {
    ProfileAvatar
  },

  computed: {
    ...mapGetters('ChallengesIndex', ['challenges'])
  },

  beforeMount () {
    this.startLoading()
    let id = JSON.parse(localStorage.getItem('user')).id
    axios.get(`/users/${id}/challenges`).then(response => {
      this.setChallenges(response.data.data)
      this.stopLoading()
    }).catch(err => {
      this.stopLoading()
      console.log(err)
    })
  }
}
</script>
