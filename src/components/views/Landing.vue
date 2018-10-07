<template>
  <v-layout row wrap accent justify-center align-content-start class="full-height pt-5">
    <v-flex xs6 d-block>
      <div class="d-flex column mb-2">
        <v-img :src="`./static/img/white-logo.png`" alt="Logo">
          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="secondary lighten-1"></v-progress-circular>
          </v-layout>
        </v-img>
      </div>

    </v-flex>

    <p class="white--text mb-5 px-2 text-xs-center body-1"><i>
      Welcome, please sign up or login to continue</i>
    </p>

    <v-flex xs12 class="px-3">
      <v-tabs fixed-tabs v-model="active" color="accent" dark slider-color="white" >

        <v-tab ripple>Sign Up</v-tab>
        <v-tab ripple> Login </v-tab>

        <!-- sign up form -->
        <v-tab-item>
          <v-card dark color="accent" flat class="py-3">
            <v-form ref="form" v-model="signup.valid" lazy-validation>
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
            <v-form ref="form" v-model="signup.valid" lazy-validation>

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
export default {
  data () {
    return {
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
      }
    }
  },
  beforeCreate () {
    // check if
    // 1. user is signed up and logged in, i.e localstorage.user is set
    // 2. user has set matric number... if both are true, then just bounce away from here
    // if (this.$route.name === 'Landing') {
    //   this.$router.push('/home')
    // }
  },
  methods: {
    submitSignup () {
      if (this.$refs.form.validate()) {
        console.log(this.signup)
      }
    },
    signIn () {
      if (this.$refs.form.validate()) {
        console.log(this.login)
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
