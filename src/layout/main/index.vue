<template>
  <div class="main" id="main">
    <router-view v-slot="{ Component }">
    <transition :enter-active-class="enter" :leave-active-class="leave">
      <keep-alive>
        <component :is="Component" class="component"/>
      </keep-alive>
    </transition>
    </router-view>
  </div>
</template>

<script>
import animate from '@utils/animate'
import { touch } from '@utils/touchs'
export default {
  data() {
    return {
      enter: animate('fadeIn'),
      leave: animate('fadeOut')
    }
  },
  computed:{
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route (to, from) {
      // 切页面动画
      let toOrder = to.meta.order;
      let fromOrder = from.meta.order;
      if (fromOrder > toOrder) { // 右滑
        this.enter = animate('slideInLeft animate__faster');
        this.leave = animate('slideOutRight animate__faster');
      } else if (fromOrder < toOrder) { // 左滑
        this.enter = animate('slideInRight animate__faster');
        this.leave = animate('slideOutLeft animate__faster');
      } else {
        this.enter = animate('fadeIn animate__faster');
        this.leave = animate('fadeOut animate__faster');
      }
    }
  },
  mounted() {
    const mainDom = document.getElementById('main');
    touch(mainDom);
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';
.main {
  .component {
    position: absolute;
    width: 100%;
  }
}
</style>