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
          @click="goto(item.to)"
        >

            <v-list-tile-action>
              <v-icon v-html="item.icon" :color="item.active ? 'teal' : 'grey'"></v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <!-- <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="primary"
      dark
      class="elevation-0"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

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

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      menu: [{
        icon: 'bubble_chart',
        title: 'Home',
        active: true,
        to: '/'
      },
      {
        icon: 'bubble_chart',
        title: 'Modules',
        active: false,
        to: '/modules'
      },
      {
        icon: 'bubble_chart',
        title: 'Challenges',
        active: false,
        to: '/modules'
      },
      {
        icon: 'bubble_chart',
        title: 'Random Question',
        active: false,
        to: '/modules'
      },
      {
        icon: 'bubble_chart',
        title: 'Edit Profile',
        active: false,
        to: '/modules'
      }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Physiks'
    }
  },
  methods: {
    goto (link) {
      this.$router.push(link)
    }
  },
  name: 'App'
}
</script>

<style>
  @import 'assets/css/main.css';

</style>
