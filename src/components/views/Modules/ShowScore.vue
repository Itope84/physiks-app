<template>
  <v-container fluid pa-3>
    <v-jumbotron dark gradient="to top right, rgba(21, 153, 87, .85), rgba(21, 87, 153, .85)" :src="`./static/img/celebration.png`">

    <v-progress-circular
      :size="100"
      :width="15"
      :value="value"
      color="primary"
    >
      <h2 class="display-1 white--text">{{ value }}</h2>
    </v-progress-circular>

    </v-jumbotron>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      value: 0
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.value += 10
      if (this.value === 70) {
        clearInterval(this.interval)
      }
    }, 100)
  }
}
</script>
