<template>
  <div class="home">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from './header'
import Main from './main/index.vue'
import Footer from './footer/index.vue'
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
}
</style>
