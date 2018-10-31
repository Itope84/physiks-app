<template>
  <v-layout row wrap>

    <v-dialog v-model="showBonusModal">
      <v-card>
        <v-card-text>
          Thanks for entering your matric number. You have been awarded <span class="orange--text">{{bonusPoints}} bonus points</span>.

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="showBonusModal = false">Okay, thanks</v-btn>
          </v-card-actions>
        </v-card-text>

      </v-card>
    </v-dialog>

    <v-dialog :max-width="290" v-model="showMatricEditor">
      <v-card>
        <v-card-title>Enter Matric Number</v-card-title>

        <v-card-text>
          Enter your matric number and get some bonus points to kickstart the fun

          <v-form ref="matricForm" v-model="matricForm.valid" lazy-validation>
            <v-text-field label="Matric No" required :value="user.matric_no" :disabled="user.matric_no ? true : false" :rules="matricForm.matricNoRules" v-model="matric_no"></v-text-field>
          </v-form>

          <v-card-actions class="justify-end">
            <v-btn color="primary" :disabled="user.matric_no != null || !matricForm.valid || !matric_no" @click="saveMatricNumber()">Submit</v-btn>
          </v-card-actions>

        </v-card-text>

      </v-card>
    </v-dialog>

    <v-bottom-sheet v-model="bottomSheet.open">
      <v-alert :value="true" type="error">
        Oops!
        {{bottomSheet.message}}
      </v-alert>

    </v-bottom-sheet>

    <v-flex xs12 sm6 offset-sm3>
        <v-list two-line class="py-4">
          <v-subheader>
            <v-layout row>
              <v-list-tile avatar>
                  <profile-avatar :username="user.username" :name="user.name" :size="50"></profile-avatar>

                <v-list-tile-content class="ml-4">
                  <v-list-tile-title>{{user.name}}</v-list-tile-title>
                  <v-list-tile-sub-title>Level {{getUserLevel(user.points)}} ({{user.points}} points)</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-layout>
          </v-subheader>

          <v-divider class="mt-3"></v-divider>

          <v-list-tile avatar v-ripple @click="showMatricEditor = true">
            <v-list-tile-content>
              <v-list-tile-title>Matric Number</v-list-tile-title>
              <v-list-tile-sub-title>{{user.matric_no ? user.matric_no : 'Enter matric number for bonus points'}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile avatar v-ripple>
            <v-list-tile-content>
              <v-list-tile-title>Credits</v-list-tile-title>
              <v-list-tile-sub-title>The awesome people behind the scenes</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>

        <v-card-text style="position: absolute; bottom: 1rem" class="text-xs-center">
          Built with <v-icon color="red">favorite</v-icon> by Temitope I. (Santiago)
        </v-card-text>
    </v-flex>
  </v-layout>
</template>

<script>
import ProfileAvatar from '../partials/ProfileAvatar'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from '../../http'
import { getUserLevel } from '../../functions'

const bonusPoints = 100

export default {
  data () {
    return {
      showMatricEditor: false,
      showBonusModal: false,
      bonusPoints,
      matric_no: null,
      matricForm: {
        valid: true,
        matricNoRules: [
          v => !!v || 'Matric No is required',
          v => v.match(/[a-zA-Z]{3}\/[0-9]{4}\/[0-9]{3}/gi) || 'Invalid Matric Number'
        ]
      },
      bottomSheet: {
        open: false,
        message: ''
      }
    }
  },
  components: {
    ProfileAvatar
  },
  computed: {
    ...mapGetters('User', ['user'])
  },
  methods: {
    getUserLevel,
    // ...mapActions('User', ['updateUser']),
    ...mapMutations('User', ['setUser']),
    ...mapActions('User', ['updateUser']),
    ...mapActions('Navigation', ['startLoading', 'stopLoading', 'setTitle']),
    saveMatricNumber () {
      if (this.$refs.matricForm.validate()) {
        this.startLoading()
        axios.post(`users/${this.user.id}`, {
          name: this.user.name,
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
          matric_no: this.matric_no,
          points: parseInt(this.user.points) + bonusPoints
        }).then(response => {
          this.user.matric_no = this.matric_no
          this.user.points = parseInt(this.user.points) + bonusPoints

          this.updateUser({details: this.user, dontPost: true})
          this.showBonusModal = true
          this.stopLoading()
        }).catch(error => {
          this.bottomSheet.open = true
          this.bottomSheet.message = ['Sorry, we were unable to upload that data, try again later']
          console.log(error)
          this.stopLoading()
        })
      }
    }
  },
  mounted () {
    this.setTitle('Profile Settings')
  }
}
</script>
