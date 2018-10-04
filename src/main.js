// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
  Vuetify,
  VApp,
  VCard,
  VChip,
  VNavigationDrawer,
  VJumbotron,
  VDivider,
  VFooter,
  VList,
  VBtn,
  VExpansionPanel,
  VIcon,
  VGrid,
  VToolbar,
  VAvatar,
  VImg,
  VProgressCircular,
  VSubheader,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VChip,
    VNavigationDrawer,
    VFooter,
    VDivider,
    VJumbotron,
    VList,
    VBtn,
    VCard,
    VExpansionPanel,
    VIcon,
    VGrid,
    VToolbar,
    VAvatar,
    VImg,
    VProgressCircular,
    VSubheader,
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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
