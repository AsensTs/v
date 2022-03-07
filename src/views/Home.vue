<template>
  <div class="home">
    <Header></Header>
    <Main></Main>
    <Bottom></Bottom>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Main from './Main.vue'
import Bottom from './Bottom.vue'
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
}
</style>
