<template>
<div class="header">
  <HeaderTop logo="" title="一体化平台" search></HeaderTop>
  <Navigation :navData="iconList.navData" class="header-nav"></Navigation>
</div>
</template>

<script setup>
import { reactive } from '@vue/reactivity'
import HeaderTop from '@components/header/top'
import Navigation from '@components/header/navigation'
const iconList = reactive({
  navData: [
    { name: "orders-o", title: "变", path: "/substationCheck"},
    { name: "comment-o", title: "许", path: "/2"},
    { name: "description", title: "预", path: ""},
    { name: "pause-circle-o", title: "启", path: ""},
    { name: "records", title: "调", path: ""},
    { name: "guide-o", title: "输", path: ""},
  ],
})
</script>
<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';

.header {
  background-color: $bg-color-header;
  // background-image: url(../assets/images/bg.jpg);
  .header-top {
    height: $height-top;
  }
  .header-nav {
    @include flex($height-nav, space-around);
    margin:0 10px;
  }
}
</style>