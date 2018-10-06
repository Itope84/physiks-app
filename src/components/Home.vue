<template>

  <v-container fluid pa-0>
    <v-jumbotron dark color="primary">
      <v-container fill-height>
        <v-layout column align-center class="text-xs-center py-1">
          <v-flex xs12 class="mb-2 relative">
            <v-avatar :size="70" color="grey lighten-4">
            <v-img :src="`./static/img/icons/physics-concepts/005-physics.png`" aspect-ratio="1" class="grey lighten-2">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </v-img>

            </v-avatar>
            <!-- <v-btn fab flat icon color="pink" absolute>
              <v-icon dark>edit</v-icon>
            </v-btn> -->
          </v-flex>

          <v-flex xs12>
             <h1 class="title mb-1">Santiago</h1>

              <h5 class="body-2" style="color: #cecece">Level 12 (2280 points)</h5>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

      <v-container>
        <v-layout row wrap align-center>
          <!-- Current module card -->
          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="mt-4 mb-2">

                  <v-avatar :size="30" class=" white--text d-block mx-auto Pt-3" color="primary">
                    <v-icon color="white">lightbulb_outline</v-icon>
                  </v-avatar>

                    <v-card-text class="px-2 text-xs-center pt-3 pb-0">
                      <!--  <p class="body-1 grey--text">Current Module</p> -->
                      <h4 class="subheading primary--text mb-2 text-capitalize"><b> Magnetic Properties of Solids</b></h4>
                      <!-- <h3 class="subheading">2280 points</h3> -->
                    </v-card-text>

                <v-card-text class="px-3 py-0 mb-2"><h3 class="subheading grey--text text-xs-center"  style="font-size: 18px;">2 of 10 questions</h3></v-card-text>

                <div class="d-flex">
                  <v-btn class="mx-0 mb-0 rounded-0" large depressed color="primary">
                      Continue
                  </v-btn>
                </div>

              </v-card>
            </v-flex>


          </v-slide-y-transition>

          <v-flex xs12 class="d-flex py-3">
            <v-btn color="primary" class="mx-auto mw-50">View All Modules</v-btn>
          </v-flex>

          <!-- random question -->
          <v-slide-y-transition mode="out-in">
            <v-flex xs12 pb-3>
              <v-card light class="mt-4 mb-2">
                <v-layout column pt-2 justify-center align-center mb-1>
                  <v-flex xs12>
                    <v-avatar :size="30" class="white--text" color="secondary">
                      <b class="subheading">?</b>
                    </v-avatar>
                  </v-flex>

                  <v-flex xs12>
                    <v-card-text class="px-2 pt-2 pb-0">
                      <h4 class="title secondary--text mb-2"><span>Random Question</span></h4>
                      <!-- <h3 class="subheading">2280 points</h3> -->
                    </v-card-text>
                  </v-flex>

                </v-layout>

                <v-card-text class="px-3 py-0 mb-2"><h3 class="body-1 grey--text text-xs-center">Busy? Solve a quick question before you go</h3></v-card-text>

                <div class="d-flex">
                  <v-btn class="mx-0 mb-0 rounded-0" large depressed color="secondary">
                      Test your Knowledge
                  </v-btn>
                </div>

              </v-card>
            </v-flex>


          </v-slide-y-transition>

          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="mt-4 mb-2">
                <v-layout column align-center mb-2>
                  <v-flex xs3 class="ml-3 mr-1 white--text pt-2">
                      <h3 style="width: 30px;" class="pa-1 rounded-all"><svg-icon icon="star" csclass="ma-auto"></svg-icon></h3>
                  </v-flex>
                  <v-flex xs9>
                    <v-card-text class="px-2 pt-2 pb-0">
                      <h4 class="title mb-2 accent--text"><span>Challenges</span></h4>
                      <!-- <h3 class="subheading">2280 points</h3> -->
                    </v-card-text>
                  </v-flex>

                </v-layout>

                <v-card-text class="px-3 py-0 mb-2"><h3 class="body-1 grey--text">Challenges are a good way to level up and gain more points...</h3></v-card-text>

                <div class="d-flex">
                  <v-btn class="mx-0 mb-0 rounded-0" large depressed color="accent">
                      Challenge Someone
                  </v-btn>
                </div>

              </v-card>
            </v-flex>


          </v-slide-y-transition>


          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="mt-4 pa-2">
                <!-- the results -->
                <v-layout class="py-1">
                  <v-flex xs4>
                    <v-layout column>
                      <v-avatar size="30" class="ml-auto mr-auto" tile style="border-radius: 20px; overflow: hidden;" color="grey lighten-4">
                        <v-img :src="`./static/img/icons/physics-concepts/005-physics.png`" aspect-ratio="1" class="grey lighten-2">
                          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                          </v-layout>
                        </v-img>
                      </v-avatar>
                      <h5 class="subheading py-2 text-xs-center success--text"><span>Santiago</span></h5>
                    </v-layout>
                  </v-flex>

                  <v-flex xs4>
                    <v-card-text>
                      <h2 class="subheading py-2 text-xs-center"><span class="success--text">3</span> - <span class="error--text">2</span></h2>
                    </v-card-text>
                  </v-flex>

                  <v-flex xs4>
                    <v-layout column>
                      <v-avatar size="30" class="ml-auto mr-auto" tile style="border-radius: 20px; overflow: hidden;" color="grey lighten-4">
                        <v-img :src="`./static/img/icons/physics-concepts/005-physics.png`" aspect-ratio="1" class="grey lighten-2">
                          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                          </v-layout>
                        </v-img>
                      </v-avatar>
                      <h5 class="subheading py-2 text-xs-center error--text"><span>Death Star</span></h5>
                    </v-layout>
                  </v-flex>
                </v-layout>

                <!--  -->

                <div class="d-flex"><v-btn color="primary" class="mx-auto">View All</v-btn></div>

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
import SvgIcon from './partials/SvgIcon.vue'

export default {
  components: {
    'svg-icon': SvgIcon
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
