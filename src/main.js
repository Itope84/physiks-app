/* eslint no-eval: 0 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import isFuture from 'date-fns/is_future'
import {
  Vuetify,
  VAlert,
  VApp,
  VBottomSheet,
  VCard,
  VChip,
  VNavigationDrawer,
  VJumbotron,
  VDivider,
  VFooter,
  VList,
  VBtn,
  VDialog,
  VExpansionPanel,
  VForm,
  VIcon,
  VGrid,
  VRadioGroup,
  VToolbar,
  VAvatar,
  VImg,
  VProgressLinear,
  VProgressCircular,
  VSnackbar,
  VSubheader,
  VTabs,
  VTextField,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VBottomSheet,
    VChip,
    VNavigationDrawer,
    VFooter,
    VDialog,
    VDivider,
    VJumbotron,
    VList,
    VBtn,
    VCard,
    VExpansionPanel,
    VForm,
    VIcon,
    VGrid,
    VRadioGroup,
    VToolbar,
    VAvatar,
    VImg,
    VProgressCircular,
    VProgressLinear,
    VSnackbar,
    VSubheader,
    VTabs,
    VTextField,
    transitions
  },
  theme: {
    primary: '#3F51B5',
    secondary: '#009688',
    accent: '#303F9F',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

let modules = require('../static/modules.json')

// to ensure it only happens once, we check if we've done this before, or perhaps this is an update to the app
let md = localStorage.getItem('modulesdata')
if (!md || JSON.parse(md).updated_at !== modules.updated_at) {
  localStorage.setItem('modulesdata', JSON.stringify(modules))
}

// if token is set and today is less than token's expiry date
if (!localStorage.getItem('user.token') || !isFuture(JSON.parse(localStorage.getItem('user.token')).expires_at)) {
  router.push('/')
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
