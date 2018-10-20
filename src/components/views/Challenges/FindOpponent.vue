<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm-6 class="pt-3 px-2">
      <p class="subtitle text-uppercase text-xs-center accent--text"><b>Find someone to challenge</b></p>

      <!-- TODO: add append-icon-cb -->
      <v-text-field
        solo color="primary"
        label="Append"
        append-icon="search"
      ></v-text-field>

      <v-layout row wrap>
        <v-flex xs4 class="text-xs-right py-3 pr-3">
          SORT BY
        </v-flex>
        <v-flex xs8>
          <v-select
            :items="filter_array"
            label="SORT BY"
            solo
            append-icon="filter_list"
            class="text-truncate"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-flex>

    <v-flex class="py-3 px-3">

      <p class="subtitle text-uppercase text-xs-center">Select an Opponent</p>


      <v-layout row wrap>
        <v-flex xs6 sm4 v-for="(user, index) in users" :key ="index" class="pa-2">
          <v-card class="pa-3 text-xs-center">
            <v-flex xs12 class="mb-2 relative">
              <profile-avatar :size="50" :name="user.name" :username="user.username"></profile-avatar>
            </v-flex>
            <h2 class="title mb-2">{{user.username}}</h2>
            <p class="subtitle mb-0">Level {{user.level}}</p>
            <p class="subtitle">challenges: {{user.challenges_count}}</p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileAvatar from '../../partials/ProfileAvatar.vue'
export default {
  data () {
    return {
      filter_array: [
        { text: 'Name' },
        { text: 'Challenges Completed' },
        { text: 'Level' }
      ]
    }
  },

  computed: {
    ...mapGetters('ChallengesIndex', ['users'])
  },

  components: {
    ProfileAvatar
  }
}
</script>

