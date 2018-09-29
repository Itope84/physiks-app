<template>
  <v-container fluid pa-0>
    <div class="text-xs-center pa-3">
      <v-btn color="primary">
        Challenge Someone Now
      </v-btn>
    </div>



      <v-list>

        <v-subheader>Recent Challenges</v-subheader>
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
      </v-list>

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
        }
      ]
    }
  }
}
</script>
