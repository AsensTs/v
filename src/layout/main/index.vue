<template>
  <div class="main" id="main">
    <router-view v-slot="{ Component }">
    <transition :enter-active-class="enter + 'animate__faster'" :leave-active-class="leave">
      <keep-alive>
        <component :is="Component" class="component"/>
      </keep-alive>
    </transition>
    </router-view>
  </div>
</template>

<script>
import animate from '@utils/animate'
import touch from '@utils/touchs'
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
      let toDepth = to.meta.depth;
      let fromDepth = from.meta.depth;
      if (fromDepth > toDepth) {
        this.enter = animate('fadeIn');
        this.leave = animate('fadeIn');
      } else if (fromDepth < toDepth) {
        this.enter = animate('fadeIn');
        this.leave = animate('fadeIn');
      } else {
        this.enter = animate('fadeIn');
        this.leave = animate('fadeOut');
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