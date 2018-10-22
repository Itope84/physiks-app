<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm-6 class="pt-3 px-2">
      <p class="subtitle text-uppercase text-xs-center accent--text"><b>Find someone to challenge</b></p>

      <!-- TODO: add append-icon-cb -->
      <v-text-field
        solo color="primary"
        label="Search a friend's name or username"
        append-icon="search"
        v-model="searchText"
        :append-icon-cb="search"
      ></v-text-field>

      <v-layout row wrap>
        <v-flex xs7 class="text-xs-right">
          <v-select
            :items="filter_array"
            label="Sort by"
            solo
            v-model="sortBy"
            append-icon="filter_list"
            class="text-truncate"
          ></v-select>
        </v-flex>
        <v-flex xs5 class="px-2">
          <v-select
            :items="[{text: 'Ascending'}, {text: 'Descending'}]"
            label="Order"
            v-model="order"
            append-icon="sort"
            class="text-truncate"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-flex>

    <v-flex class="py-3 px-3">

      <p class="subtitle text-uppercase text-xs-center">Select an Opponent</p>


      <v-layout row wrap>
        <v-flex xs6 sm4 v-for="(user, index) in sortedUsers" :key ="index" class="pa-2">
          <v-card class="pa-3 text-xs-center" ripple @click.native="startChallenge(user.id)">
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

    <v-bottom-sheet v-model="bottomSheet.open">
      <v-alert
        :value="true"
        type="error"
      >
        Oops!
        {{bottomSheet.message}}
      </v-alert>

    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import axios from '../../../http'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ProfileAvatar from '../../partials/ProfileAvatar.vue'
export default {
  data () {
    return {
      filter_array: [
        { text: 'Name' },
        { text: 'Challenges Completed' },
        { text: 'Level' }
      ],
      bottomSheet: {
        open: false,
        message: 'Error while fetching data, please check your internet connection'
      },
      sortBy: null,
      order: null,
      searchText: ''
    }
  },

  beforeMount () {
    this.startLoading()
  },

  mounted () {
    axios.get('users').then(response => {
      this.setUsers(response.data)
      this.stopLoading()
    }).catch(error => {
      this.stopLoading()
      this.bottomSheet.open = true
      error.response ? this.bottomSheet.message = error.message : this.bottomSheet.message = 'Error while fetching data, please check your internet connection'
    })
  },

  computed: {
    ...mapGetters('ChallengesIndex', ['users']),

    sortedUsers () {
      let users = []
      switch (this.sortBy) {
        case 'Name':
          users = this.sortByName(this.order)
          break
        case 'Challenges Completed':
          users = this.sortByChallenges(this.order)
          break
        case 'Level':
          users = this.sortByPoints(this.order)
          break
        default:
          users = this.sortByName(this.order)
          break
      }
      return users
    }
  },

  components: {
    ProfileAvatar
  },

  methods: {
    ...mapActions('ChallengesIndex', ['fetchUsers', 'searchUser']),
    ...mapActions('Navigation', ['startLoading', 'stopLoading']),
    ...mapMutations('ChallengesIndex', ['setUsers']),

    search () {
      this.startLoading()
      axios.get('users/search?q=' + this.searchText).then(response => {
        this.setUsers(response.data)
        this.stopLoading()
      }).catch(error => {
        this.stopLoading()
        this.bottomSheet.open = true
        error.response ? this.bottomSheet.message = error.message : this.bottomSheet.message = 'Error while fetching data, please check your internet connection'
      })
    },

    sortByName (order) {
      return this.users.sort((a, b) => order && order.toLowerCase() === 'descending' ? b.username > a.username ? 1 : b.username < a.username ? -1 : 0 : b.username > a.username ? -1 : b.username < a.username ? 1 : 0)
    },

    sortByChallenges (order) {
      return this.users.sort((a, b) => order && order.toLowerCase() === 'ascending' ? b.challenges_count > a.challenges_count ? -1 : b.challenges_count < a.challenges_count ? 1 : 0 : b.challenges_count > a.challenges_count ? 1 : b.challenges_count < a.challenges_count ? -1 : 0)
    },

    sortByPoints (order) {
      return this.users.sort((a, b) => order && order.toLowerCase() === 'ascending' ? b.points > a.points ? -1 : b.points < a.points ? 1 : 0 : b.points > a.points ? 1 : b.points < a.points ? -1 : 0)
    },

    startChallenge (opponentId) {
      this.startLoading()

      axios.post('challenges/new', {opponent_id: opponentId}).then(response => {
        console.log(response.data)
        this.stopLoading()
        this.$router.push({name: 'NewChallenge', params: {id: response.data.id}})
      }).catch(error => {
        this.stopLoading()
        this.bottomSheet.open = true
        error.response ? this.bottomSheet.message = error.message : this.bottomSheet.message = 'Error while fetching data, please check your internet connection'
      })
    }
  }
}
</script>

