<template>
  <div class="main">
    <van-row gutter="10" class="navigation">
      <van-col span="4"><van-icon name="setting" /></van-col>
      <van-col span="4"><van-icon name="todo-list" /></van-col>
      <van-col span="4"><van-icon name="label" /></van-col>
      <van-col span="4"><van-icon name="column" /></van-col>
      <van-col span="4"><van-icon name="setting" /></van-col>
      <van-col span="4"><van-icon name="label" /></van-col>
    </van-row>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';

.main {
  background: #fff;
  @include line-height(80px);
}
</style>