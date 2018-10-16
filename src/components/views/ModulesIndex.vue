<template>
  <v-container fluid pa-0>
    <v-list two-line>

      <v-subheader>
        <h5 class="title">All Modules</h5>
      </v-subheader>

      <v-divider></v-divider>

      <template v-for="(item, index) in sanitisedModules">

        <!-- <v-list-tile
          :key="index"
          avatar
          @click="null"
        > -->

        <v-list-tile
          :key="index"
          @click="openModule(item)"
        >
          <!-- <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar> -->

          <v-list-tile-content>
            <v-list-tile-title v-html="item.title" class="primary--text"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.summary"></v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-divider :key="`line` + index"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('ModulesIndex', ['sanitisedModules'])
  },

  methods: {
    openModule (item) {
      this.$router.push({name: 'Module', params: {id: item.id}})
    }
  }

}
</script>
