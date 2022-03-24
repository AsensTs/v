<template>
  <div class="row footer">
    <div class="col">
      <div class="item" v-for="(item, index) in state.navBottomData" :key="item.name + index">
        <div v-if="!item.name||item.name=='logo'" class="img"><img :src="item.logo" /></div>
        <div v-else class="icon-item" @click="handleNavClick(item.path, index)" :style="{ color: activeIndex == index ? 'rgb(19 65 142)' : ''}">
          <p class="icon"><van-icon :name="activeIndex == index ? (item.activeIcon ? item.activeIcon : item.icon) : item.icon"/></p>
          <p class="title">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
  navBottomData: [
    { name: "安全管控", icon: "orders-o", activeIcon: "",  path: "./123" },
    { name: "专家库", icon: "comment-circle-o",activeIcon: "", path: "" },
    { name: "logo", logo: require('@assets/images/logo1.png'), path: "" },
    { name: "设置", icon: "setting-o", activeIcon: "", path: "" },
    { name: "我的", icon: "user-circle-o", activeIcon: "", path: "" },
  ],
  navWidth: 'red'
})
const activeIndex = ref(0)

state.navWidth = (() => {
  let len = state.navBottomData.length;
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
        .title {
          font-size: 12px;
        }
      }
    }
  }
}
</style>