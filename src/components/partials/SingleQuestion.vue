<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3 pa-3>
      <v-card flat class="pb-1 accent" dark>

        <v-card-title primary-title>
          <div>
            <h6 class="body-2">{{module.title}}</h6>
            <h5 class="subheading mb-0 text-uppercase">Question 1 of {{totalQuestions}}</h5>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <div v-html="question.body"></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import {  } from "vuex";
export default {
  props: ['question', 'totalQuestions'],
  data () {
    choice: null
  }
}
</script>
