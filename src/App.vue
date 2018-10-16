<template>
  <v-app>
    <v-toolbar app color="accent" dark :class="{'elevation-0': $route.name === 'Home'}" v-if="!isLanding">

      <v-toolbar-title class="ml-0">Physiks</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn fab flat>
          <v-icon>settings</v-icon>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-content class="mb-5">
      <router-view/>
    </v-content>
    <v-card class="hide--overflow">
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed shift color="accent">

      <v-btn dark :to="{name: 'Home'}">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn dark :to="{name: 'Modules'}">
        <span>Modules</span>
        <v-icon>library_books</v-icon>
      </v-btn>

      <v-btn dark :to="{name: 'Challenges'}">
        <span>Challenges</span>
        <v-icon>bookmark</v-icon>
      </v-btn>

      <v-btn dark>
        <span>Profile</span>
        <v-icon>person</v-icon>
      </v-btn>
    </v-bottom-nav>

    </v-card>

  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      bottomNav: 0,
      fixed: false,
      title: 'Physiks'
    }
  },

  created () {
    this.fetchModules()
  },

  computed: {
    isLanding () {
      return this.$route.name === 'Landing'
    },
    ...mapGetters('User', ['user'])
  },

  methods: {
    ...mapActions('ModulesIndex', ['fetchModules']),
    ...mapActions('User', ['fetchUser'])
  },

  mounted () {
    this.fetchUser()
  },
  name: 'App'
}
</script>

<style>
.rounded-card {
    border-radius: 1rem;
    overflow: hidden;
  }

  .mw-50 {
    max-width: 50%;
  }

  .mh100 {
    min-height: 100vh;
  }

  aside.v-navigation-drawer {
    background-image: url('/static/img/364.jpg');
    background-size: cover;
    background-position: center;
  }

  .full-height.cover {
    background-color: rgba(49,27,146,.8);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }


.sidebar-menu--item.active {
  background: rgba(255,255,255,0.08);
}

.relative {
  position: relative;
}

.rounded-0{
  border-radius: 0 !important;
}

.rounded-all {
  border-radius: 50%;
}

</style>
