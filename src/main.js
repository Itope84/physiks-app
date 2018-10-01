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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
