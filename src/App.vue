<template>
  <v-app>
    <v-navigation-drawer
      temporary
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      dark
      class="primary lighten-3"
      app
      v-on:close-sidebar="isActive = !isActive"
    >
      <v-list dark class="full-height cover">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="`./static/img/icons/physics-concepts/005-physics.png`" alt="John">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Santiago</v-list-tile-title>
            <v-list-tile-sub-title>Level 12 (2280 points)</v-list-tile-sub-title>
          </v-list-tile-content>


          <v-list-tile-action>
            <v-btn icon>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile
          v-for="item in menu"
          :key="item.title"
          @click="visit(item)"
          class="sidebar-menu--item"
          :class="{'active' : item.active}"
        >

            <v-list-tile-action>
              <v-icon v-html="item.icon" color="white"></v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="accent" dark :class="{'elevation-0': $route.name === 'Home'}">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="ml-0">{{activeEl.title === 'Home' ? 'Physics' : activeEl.title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn fab flat>
          <v-icon>{{activeEl.icon}}</v-icon>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Physiks'
    }
  },

  created () {
    this.fetchModules()
  },

  computed: {
    ...mapGetters('Navigation', ['menu']),
    activeEl: function () {
      return this.menu.filter(item => item.active)[0]
    }
  },
  methods: {
    ...mapActions('ModulesIndex', ['fetchModules']),
    ...mapActions('Navigation', ['goto']),
    visit (item) {
      this.goto({routeName: item.routeName, activeEl: item})
    }
  },
  name: 'App'
}
</script>

<style>
  @import 'assets/css/main.css';

</style>
