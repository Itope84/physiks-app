<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 pa-3>
      <v-card class="pb-1 ma-2 elevation-6" dark style="background: linear-gradient(to bottom, #000428, #004e92); border-radius: 1rem !important">
        <v-card-title primary-title class="white--text elevation-3">
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
            class="xs-12 pa-2 white--text"
          >
            <h2 class="display-2 mt-4">{{ value }}%</h2>

            <h1 class="text-xs-center"><span class="headline">14/</span><span class="subheading">20</span></h1>
          </v-progress-circular>

          <v-card-text>
            <h3 class="display-2 text-xs-center blue--text text--lighten-3">+300 pts</h3>
          </v-card-text>

          <v-card-actions>
            <v-card-actions>

              <v-btn color="primary">
              <!-- <v-icon>info_outline</v-icon> -->
                View Details</v-btn>

              <v-btn color="secondary" :to="{ name: 'Module', props: {id: 1}}"> <v-icon>refresh</v-icon>
                Try Again </v-btn>

            </v-card-actions>
          </v-card-actions>

        </v-layout>

      </v-card>

      <v-card class="pa-2 ma-2">
        <v-card-text>
          You have attained a score \(\ge\) 50%. You can now proceed to the next stage. Alternatively, you can chose to view answers for all questions you got wrong <span class="orange--text text--darken-4">This will cost you some points</span>.
        </v-card-text>

        <v-card-actions>
          <v-btn color="success" dark>Next Module</v-btn>

          <v-btn color="orange darken-4" dark>View Answers</v-btn>

          <!-- <v-btn color="accent"></v-btn> -->
        </v-card-actions>
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

    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')
  }
}
</script>
