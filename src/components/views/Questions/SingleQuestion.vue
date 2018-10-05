<template>
  <v-layout row wrap dark primary>
    <v-flex xs12 sm6 offset-sm3>
      <v-card flat class="pb-1 primary" dark>

        <v-card-title primary-title>
          <div>
            <h5 class="subheading mb-0 text-uppercase">Question 1</h5>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <!-- <v-card-actions>
          <v-btn color="secondary" :to="{ name: 'Module', props: {id: module.id}}"> <v-icon>keyboard_arrow_left</v-icon>
            Return </v-btn>

        </v-card-actions> -->

        <v-card-text>
          <div v-html="question.body"></div>
        </v-card-text>

        <!-- <v-card-actions>
          <v-btn flat color="secondary" :to="module.slide_link"> <v-icon>file_download</v-icon> Slides</v-btn>
          <v-btn color="primary" class="ml-auto">Start Solving <v-icon>play_arrow</v-icon> </v-btn>
        </v-card-actions> -->

      </v-card>
    </v-flex>
    <v-flex xs12 sm6 offset-sm-3 class="px-2">
      <v-card>
        <v-card-text>
          <v-radio-group v-model="attempt" class="my-1 py-0">
            <v-radio :label="`Option A`" value="A"></v-radio>
            <div v-html="question.option_a" class="mb-2"></div>

            <v-radio :label="`Option B`" value="B"></v-radio>
            <div v-html="question.option_b" class="mb-2"></div>

            <v-radio :label="`Option C`" value="C"></v-radio>
            <div v-html="question.option_c" class="mb-2"></div>

            <v-radio :label="`Option D`" value="D"></v-radio>
            <div v-html="question.option_d" class="mb-2" ></div>
          </v-radio-group>
          <v-card-actions>
            <v-btn color="secondary">Return </v-btn>
            <v-btn color="primary" style="margin-left: auto">Submit </v-btn>
          </v-card-actions>
        </v-card-text>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      question: null,
      module: null,
      attempt: null
    }
  },
  created () {
    this.module = this.modules.filter(mod => parseInt(mod.id) === parseInt(this.$route.params.id))[0]
    console.log(this.module)
    this.question = this.module.questions.filter(qstn => parseInt(qstn.id) === parseInt(this.$route.params.questionId))[0]
    console.log(this.question)
    // console.log(this.modules)
  },
  computed: {
    ...mapGetters('ModulesIndex', ['modules'])
  }

}
</script>
