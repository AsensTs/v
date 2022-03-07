<template>
  <div class="row bottom">
    <div class="col">
      <div class="item" v-for="item in state.navBottomData" :key="item.name">
        <div v-if="!item.name||item.name=='logo'" class="img"><img :src="item.logo" /></div>
        <div v-else class="icon-item">
          <p class="icon"><van-icon :name="item.icon"/></p>
          <p class="title">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({
  navBottomData: [
    { name: "安全管控", icon: "orders-o", path: "" },
    { name: "专家库", icon: "comment-circle-o", path: "" },
    { name: "logo", logo: require('../assets/images/logo1.png'), path: "" },
    { name: "设置", icon: "setting-o", path: "" },
    { name: "我的", icon: "user-circle-o", path: "" },
  ],
  navWidth: 'red'
})

state.navWidth = (() => {
  let len = state.navBottomData.length;
  return 100/len + '%';
})();

</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/common.scss';

.bottom {
  @include position(absolute, $bottom: 0);
  background-color: $bottomBgColor;
  border-top: 1px solid #eee;
  .col {
    @include flex(50px, space-around);
    .item {
      width: v-bind('state.navWidth');
      @include flex(50px);
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
            font-size: 24px;
          }
        }
        .title {
          font-size: 12px;
          color: #191919;
        }
      }
    }
  }
}
</style>