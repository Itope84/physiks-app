<template>
  <v-app>
    <!-- show constants dialog -->
    <v-dialog v-model="showConstants">
      <v-card class="px-2">
        <v-card-title>
          Some useful constants

          <v-spacer></v-spacer>
          <v-btn fab small color="accent" @click="showConstants = false"><v-icon>close</v-icon></v-btn>
          </v-card-actions>
        </v-card-title>

        <v-card-text>
          You might need these constants while solving any question. Simply activate this modal by clicking the lightbulb icon at the right of the topbar.

          <v-list>
            <!-- TODO: Future releases: fetch the constants list from the backend -->
            <p>
              <b class="mr-2">Permitivitty constant (\(\displaystyle{\epsilon _0}\)) :</b>
              \( 8.85 \times 10^{-12} C^2/N.m^2 \)
            </p>

            <p>
              <b class="mr-2">Elementary charge (\(e\)) :</b>
              \(1.6 \times 10^{-19}C\)
            </p>

            <p>
              <b class="mr-2">Speed of light in vacuum (\(c\)) :</b>
              \(3 \times 10^8 ms^{-1}\)
            </p>

            <p>
              <b class="mr-2">Planck's constant (\(h\)) :</b>
              \(6.63 \times 10^{-34}Js\)
            </p>

            <p>
              <b class="mr-2">Escape Velocity (\(V_c\)) :</b>
              \(11.2km/s\)
            </p>

            <p>
              <b class="mr-2">Density of water:</b>
              \(1g/cm^3 or 1000kg/m^3\)
            </p>

            <p>
              <b class="mr-2">Density of seawater:</b>
              \(1024kg/m^3\)
            </p>

            <p>
              <b class="mr-2">Electron Mass(\(m_e\)) :</b>
              \(9.11 \times 10^{-27}\)
            </p>

            <p>
              <b class="mr-2">Proton Mass(\(m_p\)) </b>
              \(1.67 \times 10^{-27}\)
            </p>

            <p>
              <b class="mr-2">Neutron mass</b>
              \(1.68 \times 10^{-27}\)
            </p>

            <p>
              <b class="mr-2">Permeability of free space (\(\mu_0\))</b>
              \(4\pi \times 10^{-7}W/Am\)
            </p>

          </v-list>

          <v-card-actions class="justify-end">
            <v-btn @click="showConstants = false" color="primary">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
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

      <v-toolbar-title class="ml-0">
        <v-layout align-center>
          <v-btn v-if="!isTopLevel" fab flat small class="ma-0" @click="$router.go(-1)"><v-icon>keyboard_backspace</v-icon></v-btn>
        {{title}}
        </v-layout>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn fab flat @click="showConstants = true">
          <v-icon>lightbulb_outline</v-icon>
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

      <v-btn dark :to="{name: 'ProfileSettings'}">
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
      showConstants: false
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
    ...mapGetters('Navigation', ['title', 'ajaxLoading']),
    isTopLevel () {
      return this.$route.name === 'Modules' || this.$route.name === 'Home' || this.$route.name === 'Challenges' || this.$route.name === 'ProfileSettings'
    }
  },

  mounted () {
    let el = window.document.querySelector('#preloader')
    el.parentElement.removeChild(el)

    eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])')
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
