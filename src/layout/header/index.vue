<template>
<div class="header">
  <HeaderTop :title="title" search></HeaderTop>
  <div class="header-bottom-container">
    <searchInput width="100" placeholder="请输入搜索关键词" searchpage></searchInput>
  </div>
</div>
</template>

<script setup>
import HeaderTop from './top'
import searchInput from '@components/search/searchInput'
import { useStore } from 'vuex'

const store = useStore();
const title = store.getters['common/appTitle'];
</script>
<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';

.header {
  background-color: $bg-color-header;
  .header-top {
    height: $height-header-top;
  }
  .header-bottom-container {
    @include flex($height-header-bottom, space-around);
    margin:0 10px;
  }
}
</style>