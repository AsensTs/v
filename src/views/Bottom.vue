<template>
  <van-row class="bottom">
    <van-col span="24"></van-col>
  </van-row>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';

.bottom {
  @include line-height(50px, 50px);
  @include position(fixed, $bottom: 0)
}
</style>