<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition :enter-active-class="enter" :leave-active-class="leave">
        <keep-alive>
          <component :is="Component" class="component"/>
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <!-- <transition :enter-active-class="enter" :leave-active-class="leave"> -->
    <!-- <router-view></router-view> -->
  <!--</transition> -->
</template>

<script>
import animate from '@utils/animate'
export default {
  data() {
    return {
      enter: animate('fadeInLeft'),
      leave: animate('fadeInLeft')
    }
  },
  watch: {
    $route (to, from) {
      console.log(to,from);
      // 切页面动画
      let toDepth = to.meta.depth;
      let fromDepth = from.meta.depth;
      if (fromDepth > toDepth) {
        this.enter = animate('fadeInLeft');
        this.leave = animate('fadeInLeft');
      } else if (fromDepth < toDepth) {
        this.enter = animate('fadeInRight');
        this.leave = animate('fadeInRight');
      } else {
        this.enter = animate('fadeInLeft');
        this.leave = animate('fadeOutLeft');
      }
    }
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