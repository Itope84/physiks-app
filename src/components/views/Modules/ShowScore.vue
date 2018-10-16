<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 pa-3>
      <v-card class="pb-1 ma-2 elevation-6">
        <v-card-title primary-title class="accent white--text elevation-3">
          <div>
            <h6 class="body-2">Electric Charges</h6>
            <h5 class="subheading mb-0 text-uppercase">Results</h5>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-layout align-center justify-center pa-3 row wrap>
          <v-progress-circular
            :size="150"
            :width="10"
            :value="value"
            :rotate="120"
            color="primary"
            class="xs-12 pa-2"
          >
            <h2 class="display-2">{{ value }}%</h2>

            <h1 class="text-xs-center"><span class="headline">14/</span><span class="subheading">20</span></h1>
          </v-progress-circular>

          <v-card-text>
            <h3 class="display-2 text-xs-center secondary--text">+300 pts</h3>
          </v-card-text>

          <v-card-actions></v-card-actions>

        </v-layout>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      value: 0
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.value += 10
      if (this.value === 70) {
        clearInterval(this.interval)
      }
    }, 100)
  }
}
</script>
