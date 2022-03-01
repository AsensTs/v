<template>
  <router-view v-slot="{ Component }">
    <transition :enter-active-class="transitionClass" :leave-active-class="transitionClass">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import animate from '@utils/animate';
export default {
  name: 'app',
  data() {
    return {
      transitionClass: animate('fadeIn')
    }
  },
  watch: {
    $route (to, from) {
      // 切页面动画
      let toDepth = to.meta.depth;
      let fromDepth = from.meta.depth;
      if (fromDepth > toDepth) {
        this.transitionClass = animate('fadeInLeft');
      } else if (fromDepth < toDepth) {
        this.transitionClass = animate('fadeInRight');
      } else {
        this.transitionClass = animate('fadeIn');
      }
    }
  }
}
</script>
