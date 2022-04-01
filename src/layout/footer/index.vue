<template>
  <div class="row footer">
    <div class="col">
      <div class="item" v-for="(item, index) in navigator" :key="item.title + index">
        <div v-if="!item.title||item.title=='logo'" class="img"><img :src="item.logo" /></div>
        <div v-else :class="['icon-item', activeNavIndex == index + 1 ? 'activeColor' : '']" @click="handleNavClick(item.path, index)">
          <p class="icon"><van-icon :name="activeNavIndex == index + 1 ? (item.activeIcon ? item.activeIcon : item.icon) : item.icon"/></p>
          <p class="title">{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive , ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { navigator } from '@/config'
import { useStore } from 'vuex'

const router = useRouter();
const route = useRoute();
const store = useStore();

const state = reactive({
  navWidth: 0
})
const activeNavIndex = ref(0);
activeNavIndex.value = store.getters['common/activeNavIndex'];

watch(
  () => route.meta.order,
  (order, oldOrder) => {
    if (order < oldOrder) { // 右滑
      activeNavIndex.value = order;
      setActive(order);
    } else if (order > oldOrder){ // 左滑
      activeNavIndex.value = order;
      setActive(order);
    } else {
      return;
    }
  },
  {
    immediate: true, // 立即执行
    deep: true // 深度监听
  }
)

state.navWidth = (() => {
  let len = navigator.length;
  return 100/len + '%';
})();

const handleNavClick = (path, index) => {
  activeNavIndex.value = index;
  setActive(index)
  router.push(path)
}

const setActive = (value) => {
  store.dispatch('common/activeNavIndex', value)
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