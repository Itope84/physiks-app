<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card flat class="pb-3">

        <v-card-title primary-title>
          <div>
            <h3 class="title mb-0 text-uppercase">{{module.title}}</h3>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn flat color="secondary" :to="{ name: 'Modules'}"> <v-icon>keyboard_arrow_left</v-icon> Return</v-btn>
          <v-btn flat color="primary" style="margin-left: auto !important">Skip summary <v-icon>keyboard_arrow_right</v-icon> </v-btn>
        </v-card-actions>

        <v-card-text>
          <h5 class="subheading mb-2"><b>Summary:</b></h5>

          <div v-html="module.summary"></div>
        </v-card-text>

        <v-card-actions>
          <v-btn flat color="secondary" :to="module.slide_link"> <v-icon>file_download</v-icon> Slides</v-btn>
          <v-btn color="primary" class="ml-auto">Start Solving <v-icon>play_arrow</v-icon> </v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>,
    <v-flex xs12 sm6 offset-sm-3 class="my-3 px-2">
      <v-expansion-panel>
        <v-expansion-panel-content class="py-1">
          <div slot="header">ADDITIONAL RESOURCES</div>
          <v-card>
            <v-card-text v-html="module.additional_resources"></v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      module: null
    }
  },

  created () {
    this.module = this.modules.filter(mod => parseInt(mod.id) === parseInt(this.$route.params.id))[0]
    // console.log(this.modules)
  },

  computed: {
    ...mapGetters('ModulesIndex', ['modules'])
  },

  methods: {
    ...mapActions('ModulesIndex', ['fetchModules'])
  }
}
</script>
