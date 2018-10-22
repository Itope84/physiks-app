<template>
  <v-app>
    <!-- loading dialog -->
    <v-dialog
      v-model="ajaxLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card color="primary" class="pa-3" dark>
        <v-card-text>
          Just a minute...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-toolbar app color="accent" dark :class="{'elevation-0': $route.name === 'Home'}" v-if="!isLanding">

      <v-toolbar-title class="ml-0">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn fab flat>
          <v-icon>settings</v-icon>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-content :class="{'mb-5' : !isLanding}">
      <router-view/>
    </v-content>
    <v-card class="hide--overflow">
    <v-bottom-nav v-if="!isLanding" :active.sync="bottomNav" :value="true" fixed shift color="accent">

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
      fixed: false
    }
  },

  created () {
    this.fetchModules()
    this.fetchUser()
  },

  computed: {
    isLanding () {
      return this.$route.name === 'Landing'
    },
    ...mapGetters('User', ['user']),
    ...mapGetters('Navigation', ['title', 'ajaxLoading'])
  },

  mounted () {
    let el = window.document.querySelector('#preloader')
    el.parentElement.removeChild(el)
  },

  methods: {
    ...mapActions('ModulesIndex', ['fetchModules']),
    ...mapActions('User', ['fetchUser'])
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
