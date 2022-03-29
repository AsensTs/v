<template>
  <div class="row footer">
    <div class="col">
      <div class="item" v-for="(item, index) in navigator" :key="item.title + index">
        <div v-if="!item.title||item.title=='logo'" class="img"><img :src="item.logo" /></div>
        <div v-else class="icon-item" @click="handleNavClick(item.path, index)" :style="{ color: activeIndex == index ? 'rgb(19 65 142)' : ''}">
          <p class="icon"><van-icon :name="activeIndex == index ? (item.activeIcon ? item.activeIcon : item.icon) : item.icon"/></p>
          <p class="title">{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { navigator } from '@/settings'

console.log(navigator);
const router = useRouter();

const state = reactive({
  navWidth: 'red'
})
const activeIndex = ref(0)

state.navWidth = (() => {
  let len = navigator.length;
  return 100/len + '%';
})();

const handleNavClick = (path, index) => {
  activeIndex.value = index;
  router.push(path)
}

</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';

.footer {
  @include position(absolute, $bottom: 0);
  background-color: $bg-color-bottom;
  border-top: 1px solid #eee;
  .col {
    @include flex($height-footer, space-around);
    .item {
      width: v-bind('state.navWidth');
      @include flex($height-footer);
      padding-top: 3px;
      .img {
        height: 100%;
        img{
          height: 90%;
        }
      }
      .icon-item {
        .icon {
          .van-icon {
            font-weight: 500;
          }
        }
        .title {
          font-size: 11px;
        }
      }
    }
  }
}
</style>