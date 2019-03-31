<template>
  <v-avatar :size="size ? size : 70" :color="color">
    <h5 class="headline text-uppercase white--text">{{initials}}</h5>
  </v-avatar>
</template>

<script>
import { randomItemIn } from '../../functions'
export default {
  props: ['name', 'username', 'size'],
  computed: {
    initials () {
      return (this.name ? this.name[0] : '') + (this.username ? this.username[0] : '')
    },
    color () {
      let colorArr = ['red', 'indigo', 'purple', 'pink', 'blue', 'deep-purple', 'teal', 'cyan', 'lime darken-4', 'green', 'amber darken-3', 'orange darken-4', 'deep-orange', 'blue-grey']

      return randomItemIn(colorArr)
    }
  }
}
</script>

