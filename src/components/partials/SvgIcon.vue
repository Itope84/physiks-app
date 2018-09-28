<template>
  <div>
    <v-img
      :src="require(`./../../../static/svg/icon-${icon}.svg`)"
      aspect-ratio="1"
      class="icon-img"
    ></v-img>
  </div>
</template>

<script>
export default {
  props: ['icon']
}
</script>

<style scoped>
  .icon-img {
    max-width: 3rem;
  }
</style>
