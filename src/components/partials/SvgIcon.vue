<template>
  <div>
    <v-img
      :src="require(`./../../../static/svg/icon-${icon}.svg`)"
      aspect-ratio="1"
      class="icon-img"
      :class="csclass"
    ></v-img>
  </div>
</template>

<script>
export default {
  props: ['icon', 'csclass']
}
</script>

<style scoped>
  .icon-img {
    max-width: 3rem;
  }
</style>
