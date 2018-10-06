<template>
  <v-layout row wrap accent justify-center align-center class="full-height">
    <v-flex xs5 d-block>
      <div class="d-flex">
        <v-img :src="`./static/img/white-logo.png`" alt="Logo">
          <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="secondary lighten-1"></v-progress-circular>
          </v-layout>
        </v-img>
      </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.full-height {
  min-height: 100vh;
}
</style>
