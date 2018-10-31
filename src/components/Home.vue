<template>

  <v-container fluid pa-0>
    <v-jumbotron dark color="primary">
      <v-container fill-height>
        <v-layout column align-center class="text-xs-center py-1">
          <v-flex xs12 class="mb-2 relative">
            <profile-avatar :name="user.name" :username="user.username"></profile-avatar>
            <!-- <v-btn fab flat icon color="pink" absolute>
              <v-icon dark>edit</v-icon>
            </v-btn> -->
          </v-flex>

          <v-flex xs12>
             <h1 class="title mb-1">{{ user.username }}</h1>

              <h5 class="body-2" style="color: #cecece">Level {{getUserLevel(user.points)}} ({{user.points}} points)</h5>
          </v-flex>

          <v-flex xs12>
            <v-card-text>
              <i v-html="joke.joke"></i>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

      <v-container>
        <v-layout row wrap align-center>
          <!-- Current module card -->
          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="mt-4 mb-2 pt-2 elevation-5" style="border-radius: 1rem; overflow: hidden;">

                  <v-avatar :size="30" class=" white--text d-block mx-auto" color="primary">
                    <v-icon color="white">lightbulb_outline</v-icon>
                  </v-avatar>

                    <v-card-text class="px-2 text-xs-center pt-1 pb-0">
                      <!--  <p class="body-1 grey--text">Current Module</p> -->
                      <h4 class="subheading primary--text mb-2 text-capitalize"><b>{{activeModule ? activeModule.title : `You have not started any module`}}</b></h4>
                      <!-- <h3 class="subheading">2280 points</h3> -->
                    </v-card-text>

                <v-card-text class="px-3 py-0 mb-2"><h3 class="subheading grey--text text-xs-center"  style="font-size: 18px;" v-if="activeModule">
                  {{activeModule.qstnsInLastAttempt}} of {{activeModule.totalQstns}} questions</h3>
                </v-card-text>

                <div class="d-flex">
                  <v-btn class="mx-0 mb-0" large depressed color="primary" :to="{ name: 'Module', params: {id: activeModule ? activeModule.id : 1} }">
                      {{activeModule ? `Continue` : `Start Now`}}
                  </v-btn>
                </div>

              </v-card>
            </v-flex>


          </v-slide-y-transition>

          <v-flex xs12 class="d-flex py-3">
            <v-btn color="primary" class="mx-auto mw-50" :to="{ name: 'Modules'}">View All Modules</v-btn>
          </v-flex>

          <!-- random question -->
          <!-- <v-slide-y-transition mode="out-in">
            <v-flex xs12 pb-3>
              <v-card light class="mt-4 mb-2 elevation-5 rounded-card">
                <v-layout column pt-2 justify-center align-center mb-1>
                  <v-flex xs12>
                    <v-avatar :size="30" class="white--text" color="secondary">
                      <b class="subheading">?</b>
                    </v-avatar>
                  </v-flex>

                  <v-flex xs12>
                    <v-card-text class="px-2 pt-2 pb-0">
                      <h4 class="title secondary--text mb-2"><span>Random Question</span></h4>
                    </v-card-text>
                  </v-flex>

                </v-layout>

                <v-card-text class="px-3 py-0 mb-2"><h3 class="body-1 grey--text text-xs-center">Busy? Solve a quick question before you go</h3></v-card-text>

                <div class="d-flex">
                  <v-btn class="mx-0 mb-0 rounded-bottom" large depressed color="secondary">
                      Test your Knowledge
                  </v-btn>
                </div>

              </v-card>
            </v-flex>


          </v-slide-y-transition> -->

          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="mt-4 mb-2 elevation-5" style="border-radius: 1rem; overflow: hidden;">
                <v-layout column align-center mb-2>
                  <v-flex xs3 class="ml-3 mr-1 white--text pt-2">
                      <h3 style="width: 30px;" class="pa-1 rounded-all"><svg-icon icon="star" csclass="ma-auto"></svg-icon></h3>
                  </v-flex>
                  <v-flex xs9>
                    <v-card-text class="px-2 pt-2 pb-0">
                      <h4 class="title mb-2 secondary--text"><span>Challenges</span></h4>
                      <!-- <h3 class="subheading">2280 points</h3> -->
                    </v-card-text>
                  </v-flex>

                </v-layout>

                <v-card-text class="px-3 py-0 mb-2"><h3 class="body-1 grey--text">Challenges are a good way to level up and gain more points...</h3></v-card-text>

                <div class="d-flex">
                  <v-btn class="mx-0 mb-0 rounded-bottom" large depressed color="secondary" :to="{name: 'FindOpponent'}">
                      Challenge Someone
                  </v-btn>
                </div>

              </v-card>
            </v-flex>


          </v-slide-y-transition>


          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="mt-4 pa-2 elevation-5" style="border-radius: 1rem; overflow: hidden;">
                <!-- the results -->

                <v-layout class="pt-2" v-if="latestChallenge">
                  <v-flex xs4>
                    <v-layout column align-center>
                      <profile-avatar :username="latestChallenge.challenger.username" :size="30"></profile-avatar>
                      <h5 class="subheading py-2 text-xs-center" :class="[scoreClass(latestChallenge.challenger_score, latestChallenge.opponent_score)]">{{latestChallenge.challenger.username}}</h5>
                    </v-layout>
                  </v-flex>

                  <v-flex xs4>
                    <v-card-text>
                      <h2 class="subheading py-2 text-xs-center"><span :class="[scoreClass(latestChallenge.challenger_score, latestChallenge.opponent_score)]">{{latestChallenge.challenger_score}}</span> - <span :class="[scoreClass(latestChallenge.opponent_score, latestChallenge.challenger_score)]">{{latestChallenge.opponent_score}}</span></h2>
                    </v-card-text>
                  </v-flex>

                  <v-flex xs4>
                    <v-layout column align-center>
                      <profile-avatar :username="latestChallenge.opponent.username" :size="30"></profile-avatar>
                      <h5 class="subheading py-2 text-xs-center" :class="[scoreClass(latestChallenge.opponent_score, latestChallenge.challenger_score)]">{{latestChallenge.opponent.username}}</h5>
                    </v-layout>
                  </v-flex>
                </v-layout>

                <v-layout class="pt-2" v-else>
                  <v-card-text>
                    Challenges you've participated in will show up here...
                  </v-card-text>
                </v-layout>

                <!--  -->

                <div class="d-flex"><v-btn color="accent" class="mx-auto"  :to="{name: 'Challenges'}">View All</v-btn></div>

              </v-card>
            </v-flex>
          </v-slide-y-transition>

          <v-flex xs12>
            <blockquote class="text-xs-center my-3">
              <!-- &#8220;First, solve the problem. Then, write the code.&#8221; -->


              <footer>
                <small class="primary--text">
                  <!-- <em>Built with love by Temitope I. (Santiago)</em> -->
                </small>
              </footer>
            </blockquote>
          </v-flex>
        </v-layout>
      </v-container>
  </v-container>
</template>

<script>
import { getUserLevel, lastItemIn, randomItemIn } from '../functions.js'
import SvgIcon from './partials/SvgIcon.vue'
import ProfileAvatar from './partials/ProfileAvatar.vue'
import { mapGetters, mapActions } from 'vuex'
let jokes = require('../../static/jokes.json')
console.log(jokes)
export default {
  components: {
    'svg-icon': SvgIcon,
    ProfileAvatar
  },
  computed: {
    ...mapGetters('User', ['user']),
    ...mapGetters('ModulesIndex', ['sanitisedModules']),
    ...mapGetters('ChallengesIndex', ['challenges']),
    activeModule () {
      let m = this.user.modules[this.user.modules.length - 1]
      if (!m) {
        return null
      }
      let p = this.sanitisedModules.filter(module => parseInt(module.id) === parseInt(m.id))[0]
      return {
        id: m.id,
        title: p.title,
        qstnsInLastAttempt: m.attempts.length ? m.attempts[m.attempts.length - 1].questions.length : 0,
        totalQstns: p.questions.length
      }
    },
    latestChallenge () {
      return this.challenges ? lastItemIn(this.challenges) : null
    },
    joke () {
      return randomItemIn(jokes)
    }
  },
  methods: {
    getUserLevel,
    ...mapActions('Navigation', ['startLoading', 'stopLoading', 'setTitle']),
    ...mapActions('ChallengesIndex', ['fetchChallenges']),

    scoreClass (a, b) {
      return a > b ? 'success--text' : 'error--text'
    }
  },

  beforeMount () {
    this.fetchChallenges()
  },

  mounted () {
    this.stopLoading()
    this.setTitle('Physiks')
    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .v-jumbotron {
    height: auto !important;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
