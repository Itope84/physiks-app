<template>

  <v-container fluid pa-0>
    <v-jumbotron dark color="primary" gradient="to bottom, #311b92, #009688">
      <v-container fill-height>
        <v-layout column align-center class="text-xs-center py-3">
          <v-flex xs12>
            <v-avatar
              :size="120"
              color="grey lighten-4"
            >
            <v-img
                  :src="`./static/img/icons/physics-concepts/005-physics.png`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
              <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </v-img>

            </v-avatar>
          </v-flex>

          <v-flex xs12>
             <h1 class="headline">Santiago</h1>

              <h3 class="subheading">Level 12 (2280 points)</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>

      <v-container>
        <v-layout row wrap align-center>
          <!-- Current module card -->
          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="my-2">
                <v-layout row>
                  <v-flex xs4 class="primary white--text d-flex align-center">
                    <v-card-text class="text-xs-center">
                      <h5 class="headline">Module</h5>
                      <h3 class="display-3">8</h3>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs9>
                    <v-card-text class="px-3 py-2">
                      <h1 class="title primary--text mb-2">Magnetic Properties of Solids</h1>
                      <h3 class="body-2">2 of 10 questions</h3>
                      <v-btn class="mx-0" color="accent">
                        Continue
                      </v-btn>
                      <!-- <h3 class="subheading">2280 points</h3> -->
                    </v-card-text>
                  </v-flex>
                </v-layout>

              </v-card>
            </v-flex>


          </v-slide-y-transition>

          <v-flex xs12 class="d-flex py-3">
            <v-btn color="primary" class="mx-auto mw-50">View All Modules</v-btn>
          </v-flex>

          <!-- random question -->
          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="my-2">
                <v-layout row>

                  <v-flex xs9 class="d-flex align-center">
                    <v-card-text class="px-3 py-2">
                      <h1 class="title secondary--text mb-2">Random Question</h1>
                      <p class="caption font-weight-thin"><em>Busy? let's solve one quick question before you go!</em></p>
                      <v-btn class="mx-0" color="secondary">
                        Continue
                      </v-btn>
                      <!-- <h3 class="subheading">2280 points</h3> -->
                    </v-card-text>
                  </v-flex>

                  <v-flex xs4 class="secondary white--text d-flex align-center">
                    <v-card-text class="text-xs-center">
                      <!-- <h5 class="headline">Random</h5> -->
                      <h3 class="display-3">?</h3>
                    </v-card-text>
                  </v-flex>
                </v-layout>

              </v-card>
            </v-flex>


          </v-slide-y-transition>

          <v-slide-y-transition mode="out-in">
            <v-flex xs12>
              <v-card light class="my-2 pa-4">
                <h3 class="headline accent--text font-weight-medium">
                  <v-layout row wrap align-center>
                    <v-flex xs2 pa-1><svg-icon icon="star"></svg-icon></v-flex>
                    <v-flex pa-1>Challenges</v-flex>
                  </v-layout>

                </h3>

                <v-divider class="accent mt-2"></v-divider>

                <v-card-text>
                  <p class="body-text-1 accent--text font-weight-thin mb-0">
                    Challenges are a good way to level up and gain more points...
                  </p>

                  <v-btn color="accent" class="right" small>Play Now</v-btn>
                  <v-btn color="secondary white--text" small class="right">Help</v-btn>
                </v-card-text>

                <h5 class="title mt-5 accent--text">Latest Challenge:</h5>

                <v-divider class="my-2" color="primary lighten-3"></v-divider>

                <!-- the results -->
                <v-layout class="py-3">
                  <v-flex xs12>
                    <v-layout justify-content-start align-center>
                      <v-avatar :size="40" color="grey lighten-4">
                          <v-img :src="`./static/img/icons/physics-concepts/005-physics.png`" aspect-ratio="1" class="grey lighten-2">
                            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                          </v-img>
                        </v-avatar>

                      <h5 class="title error--text px-2">Santiago</h5>
                    </v-layout>

                    <v-layout class="justify-center align-center py-2">
                      <h5 class="title font-weight-black primary--text">3 : 3</h5>
                    </v-layout>

                    <v-layout class="justify-end align-center">
                        <v-avatar :size="40" color="grey lighten-4">
                          <v-img :src="`./static/img/icons/physics-concepts/005-physics.png`" aspect-ratio="1" class="grey lighten-2">
                            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                          </v-img>
                        </v-avatar>

                      <h5 class="title success--text px-2">Santiago</h5>
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
