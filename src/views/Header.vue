<template>
<div class="header">
  <van-row class="header-top">
    <van-col span="24">
      <i class="iconfont icon-search1"></i>
    </van-col>
  </van-row>
  <Navigation></Navigation>
</div>
</template>

<script setup>
import Navigation from '@components/navigation'
</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';

.header {
  .header-top {
    @include line-height(45px, 45px);
  }
}
</style>