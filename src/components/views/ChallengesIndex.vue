<template>
  <v-container fluid pa-0>
    <div class="text-xs-center px-3 mt-3">
      <v-btn color="primary" :to="{name: 'FindOpponent'}">
        Challenge Someone Now
      </v-btn>
    </div>



        <v-subheader class="d-flex justify-center text-uppercase">Recent Challenges</v-subheader>

        <v-flex xs12 v-for="(challenge, index) in challenges" :key="index" @click="goToChallenge(challenge.id)">
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

        <v-bottom-sheet v-model="bottomSheet.open">
          <v-alert
            :value="true"
            type="error"
          >
            {{bottomSheet.message}}
          </v-alert>

        </v-bottom-sheet>

  </v-container>
</template>

<script>
import axios from '../../http'
import ProfileAvatar from '../partials/ProfileAvatar.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      bottomSheet: {
        open: false,
        message: ''
      }
    }
  },
  methods: {
    ...mapActions('Navigation', ['startLoading', 'stopLoading', 'setTitle']),
    ...mapMutations('ChallengesIndex', ['setChallenges']),
    scoreClass (a, b) {
      return a > b ? 'success--text' : 'error--text'
    },

    goToChallenge (id) {
      this.$router.push({name: 'NewChallenge', params: { id: id }})
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
      this.bottomSheet.open = true
      this.bottomSheet.message = 'Network error, please try again later'
      this.stopLoading()
      console.log(err)
    })
  },

  mounted () {
    this.setTitle('Challenges')
  }
}
</script>
