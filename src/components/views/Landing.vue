<template>
  <v-layout row wrap accent justify-center align-content-start class="full-height pt-5">

    <!-- welcome snackbar -->
    <v-snackbar
      v-model="snackbar"
      color= "secondary"
      :timeout="6000"
      top class="pa-3"
    >
      <h5 class="body-2 py-2">Welcome aboard, please login or sign up to continue</h5>
      <v-btn
        color="yellow"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-bottom-sheet v-model="bottomSheet.open">
      <v-alert
        :value="true"
        type="error"
      >
        Oops!
        <li v-for="(item, index) in bottomSheet.message" :key="index">{{item}}</li>
      </v-alert>

    </v-bottom-sheet>

    <v-dialog v-model="showBonusModal">
      <v-card>
        <v-card-text>
          Thanks for entering your matric number. You have been awarded <span class="orange--text">{{bonusPoints}} bonus points</span>.

          <v-card-actions justify-end>
            <v-btn color="primary" @click="proceed()">Continue</v-btn>
          </v-card-actions>
        </v-card-text>

      </v-card>
    </v-dialog>

    <v-flex xs6 d-block>
      <div class="d-flex column mb-5">
        <v-img :src="`./static/img/white-logo.png`" alt="Logo">
          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="secondary lighten-1"></v-progress-circular>
          </v-layout>
        </v-img>
      </div>

    </v-flex>

    <v-flex xs12 class="px-3" v-if="showMatricInput">
      <v-card flat>
        <v-card-title>
          ENter Matric Number
        </v-card-title>
        <v-card-text>
          Welcome, before you proceed, please enter your matric number and get <span class="orange--text">{{bonusPoints}}</span> bonus points. This is completely voluntary, so you can also <span class="accent--text" @click="proceed()">skip this step.</span>

          <v-form ref="matricForm" v-model="matricForm.valid" lazy-validation>
            <v-text-field label="Matric No" required :value="user.matric_no" :disabled="user.matric_no ? true : false" :rules="signup.matricnumRules" v-model="matric_no"></v-text-field>
          </v-form>

          <v-card-actions class="justify-end">
            <v-btn @click="proceed()" color="primary" flat>Skip</v-btn>
            <v-btn color="secondary" :disabled="user.matric_no != null || !matricForm.valid || !matric_no" @click="saveMatricNumber()">Submit</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 class="px-3" v-else>
      <v-tabs fixed-tabs v-model="active" color="accent" dark slider-color="white" >

        <v-tab ripple>Sign Up</v-tab>
        <v-tab ripple> Login </v-tab>

        <!-- sign up form -->
        <v-tab-item>
          <v-card dark color="accent" flat class="py-3">
            <v-form ref="signup" v-model="signup.valid" lazy-validation>
              <!-- name -->
              <v-text-field v-model="signup.name" :rules="signup.nameRules" label="Name" prepend-icon="person" required
              ></v-text-field>

              <!-- username -->
              <v-text-field v-model="signup.username" :rules="signup.usernameRules" :counter="10" label="Username" prepend-icon="person_pin" required
              ></v-text-field>

              <!-- email -->
              <v-text-field v-model="signup.email" :rules="signup.emailRules" label="E-mail" prepend-icon="mail" required
              ></v-text-field>
              <v-text-field v-model="signup.password"
                :append-icon="signup.show ? 'visibility_off' : 'visibility'"
                :type="signup.show ? 'text' : 'password'"
                :rules="signup.passwordRules"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter
                required
                prepend-icon="lock_outline"
                @click:append="signup.show = !signup.show"
              ></v-text-field>

              <!-- matric number -->
              <v-text-field
                prepend-icon="school"
                hint="This is optional!"
                v-model="signup.matricnum"
                label="Matric Number"
                :rules="signup.matricnumRules"></v-text-field>
              <!-- <v-select  v-model="select" :items="items" :rules="[v => !!v ||  'Item is required']" label="Item" required
              ></v-select> -->
              <!-- <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox> -->

              <v-card-actions>
              <v-btn
                :disabled="!signup.valid"
                @click="submitSignup"
                outline color="white" style="margin-left: auto !important"
              >
                submit
              </v-btn>
              </v-card-actions>

              <!-- <v-btn @click="clear">clear</v-btn> -->
            </v-form>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card dark color="accent" flat class="py-3">
            <v-form ref="login" v-model="login.valid" lazy-validation>

              <!-- email -->
              <v-text-field v-model="login.email" :rules="signup.emailRules" label="E-mail" prepend-icon="mail" required
              ></v-text-field>

              <v-text-field v-model="login.password"
                :append-icon="signup.show ? 'visibility_off' : 'visibility'"
                :type="signup.show ? 'text' : 'password'"
                :rules="signup.passwordRules"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter
                required
                prepend-icon="lock_outline"
                @click:append="signup.show = !signup.show"
              ></v-text-field>

              <v-card-actions>
              <v-btn
                :disabled="!login.valid"
                @click="signIn"
                outline color="white" style="margin-left: auto !important"
              >
                Login
              </v-btn>
              </v-card-actions>

              <!-- <v-btn @click="clear">clear</v-btn> -->
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <!-- <div class="text-xs-center mt-3">
        <v-btn @click="next">next tab</v-btn>
      </div> -->
    </v-flex>
  </v-layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from '../../http'
const bonusPoints = 100

export default {
  data () {
    return {
      snackbar: true,
      bonusPoints,
      showBonusModal: false,
      bottomSheet: {
        open: false,
        message: ['No internet connection']
      },
      matric_no: '',
      matricForm: {
        valid: true
      },
      active: null,
      signup: {
        show: false,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required'
        ],
        username: '',
        usernameRules: [
          v => !!v || 'Username is required',
          v => (v && v.length <= 10) || 'Username must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => v.match(/.+@.+\.[a-zA-Z]+/gi) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required'
        ],
        matricnum: '',
        matricnumRules: [
          v => (!v || v.match(/[a-zA-Z]{3}\/[0-9]{4}\/[0-9]{3}/gi)) || 'Invalid matric number'
        ]
      },
      login: {
        valid: true,
        email: '',
        password: ''
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters('User', ['user'])
  },
  beforeCreate () {
    // check if
    // 1. user is signed up and logged in, i.e localstorage.user is set
    // 2. user has set matric number... if both are true, then just bounce away from here
    if (localStorage.getItem('user.token')) {
      if (JSON.parse(localStorage.getItem('user')).matric_no) {
        this.$router.push('/home')
      } else {
        // show them the input to update matric number
        this.showMatricInput = true
      }
    }
  },
  methods: {
    ...mapActions('User', ['storeUser', 'updateUser']),
    ...mapActions('Navigation', ['startLoading', 'stopLoading']),
    submitSignup () {
      if (this.$refs.signup.validate()) {
        // set loading
        this.startLoading()
        // sign up
        axios.post('signup', {name: this.signup.name, email: this.signup.email, password: this.signup.password, username: this.signup.username, matric_no: this.signup.matricnum}).then(response => {
          // if successful, let's store the user info and go home
          this.storeUser({user: response.data.user})
          localStorage.setItem('user.token', response.data.token)
          this.$router.push('/home')
        }).catch(error => {
          // otherwise, there's work to be done
          console.log(error.response)
          this.stopLoading()
          this.bottomSheet.open = true
          // unset
          if (error.response) {
            this.bottomSheet.message = []
            for (let i in error.response.data.error) {
              this.bottomSheet.message.push(...error.response.data.error[i])
            }
          }
        })
      }
    },
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
    },
    proceed () {
      this.$router.push('/home')
    },
    signIn () {
      if (this.$refs.login.validate()) {
        // set loading
        this.startLoading()

        // sign in
        axios.post('signin', {email: this.login.email, password: this.login.password}).then(response => {
          console.log(response.data)
          localStorage.setItem('user.token', response.data.token)
          this.storeUser({user: response.data.user})
          this.$router.push('/home')
        }).catch(error => {
          // otherwise, there's work to be done
          this.stopLoading()
          this.bottomSheet.open = true
          // unset
          this.bottomSheet.message = []
          this.bottomSheet.message.push(error.response.data.error)
        })
      }
    }
  }
}
</script>


<style scoped>
.full-height {
  min-height: 100vh;
}
</style>
