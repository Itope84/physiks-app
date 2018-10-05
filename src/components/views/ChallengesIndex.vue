<template>
  <v-container fluid pa-0>
    <div class="text-xs-center px-3 mt-3">
      <v-btn color="primary">
        Challenge Someone Now
      </v-btn>
    </div>



        <v-subheader>Recent Challenges</v-subheader>
        <v-flex xs12 v-for="(challenge, index) in challenges" :key="index">
          <v-card light class="my-2 pa-2">
            <!-- the results -->
            <v-layout class="py-1">
              <v-flex xs4>
                <v-layout column>
                  <v-avatar size="50" class="ml-auto mr-auto" tile style="border-radius: 20px; overflow: hidden;" color="grey lighten-4">
                    <v-img :src="`./static/img/icons/physics-concepts/005-physics.png`" aspect-ratio="1" class="grey lighten-2">
                      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </v-img>
                  </v-avatar>
                  <h5 class="subheading py-2 text-xs-center" :class="[scoreClass(challenge.challenger.score, challenge.opponent.score)]">{{challenge.challenger.name}}</h5>
                </v-layout>
              </v-flex>

              <v-flex xs4>
                <v-card-text>
                  <h2 class="display-1 py-2 text-xs-center"><span :class="[scoreClass(challenge.challenger.score, challenge.opponent.score)]">{{challenge.challenger.score}}</span> - <span :class="[scoreClass(challenge.opponent.score, challenge.challenger.score)]">{{challenge.opponent.score}}</span></h2>
                </v-card-text>
              </v-flex>

              <v-flex xs4>
                <v-layout column>
                  <v-avatar size="50" class="ml-auto mr-auto" tile style="border-radius: 20px; overflow: hidden;" color="grey lighten-4">
                    <v-img :src="`./static/img/icons/physics-concepts/005-physics.png`" aspect-ratio="1" class="grey lighten-2">
                      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </v-img>
                  </v-avatar>
                  <h5 class="subheading py-2 text-xs-center" :class="[scoreClass(challenge.opponent.score, challenge.challenger.score)]">{{challenge.opponent.name}}</h5>
                </v-layout>
              </v-flex>
            </v-layout>

          </v-card>
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
export default {
  data () {
    return {
      challenges: [
        {
          challenger: {
            name: 'Santiago',
            score: 3
          },
          opponent: {
            name: 'Opponent',
            score: 0
          }
        },
        {
          challenger: {
            name: 'Santiago',
            score: 1
          },
          opponent: {
            name: 'Opponent',
            score: 2
          }
        },
        {
          challenger: {
            name: 'Santiago',
            score: 5
          },
          opponent: {
            name: 'Opponent',
            score: 5
          }
        }
      ]
    }
  },
  methods: {
    scoreClass (a, b) {
      return a > b ? 'success--text' : 'error--text'
    }
  }
}
</script>
