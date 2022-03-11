<template>
  <div class="home">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
}
</style>
