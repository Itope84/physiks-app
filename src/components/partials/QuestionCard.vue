<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 pa-3 mb-2>
      <v-card flat class="pb-1 accent" dark>

        <v-card-title primary-title>
          <div>
            <h5 class="subheading mb-0 text-uppercase">Question {{questionNo}}</h5>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <div v-html="question.body"></div>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 sm6 offset-sm3 px-3 mb-2>
      <v-card>
        <v-card flat class="pa-3 mb-0" dark :class="[showAnswer && question.answer === 'A' ? ' success' : question.answer === 'A' && choice === 'A' ? ' success' : choice === 'A' ? ' error' : 'primary']">
          <h2 class="title mb-1">Option A</h2>
          <div v-html="question.option_a"></div>
        </v-card>

        <v-divider></v-divider>


      <v-card flat class="pa-3 mb-0" dark :class="[showAnswer && question.answer === 'B' ? ' success' : question.answer === 'B' && choice === 'B' ? ' success' : choice === 'B' ? ' error' : 'primary']">
        <h2 class="title mb-1">Option B</h2>
        <div v-html="question.option_b"></div>
      </v-card>

      <v-divider></v-divider>

      <v-card flat class="pa-3 mb-0" dark :class="[showAnswer && question.answer === 'C' ? ' success' : question.answer === 'C' && choice === 'C' ? ' success' : choice === 'C' ? ' error' : 'primary']">
        <h2 class="title mb-1">Option C</h2>
        <div v-html="question.option_c"></div>
      </v-card>

      <v-divider></v-divider>

      <v-card class="pa-3 mb-0" dark :class="[showAnswer && question.answer === 'D' ? ' success' : question.answer === 'D' && choice === 'D' ? ' success' : choice === 'D' ? ' error' : 'primary']">
        <h2 class="title mb-1">Option D</h2>
        <div v-html="question.option_d"></div>
      </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  props: ['question', 'questionNo', 'choice', 'showAnswer']
}
</script>
