<template>
<van-row class="header-top">
  <div class="top-left">
    <div v-if="getSuffix(logo)" ><img :src="logo" alt="logo"></div>
    <div v-else>{{logo}}</div>
  </div>
  <div class="top-center" v-if="title || subtitle">
    <p v-if="title" class="title">{{ title }}</p>
    <p v-else class="subtitle">{{ subtitle }}</p>
  </div>
  <div class="top-right" v-if="search">
    <div class="user-mod">
      <div class="user" @click="logout">
        <i class="iconfont icon-switchuser user-icon"></i>
        <p class="username">{{authUser}}</p>
      </div>
    </div>
  </div>
</van-row>
</template>

<script setup>
import { defineProps, ref } from "vue"
import { suffix } from "@utils/base"
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Dialog } from 'vant';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  logo: {
    type: String,
    default: ""
  },
  subtitle: {
    type: String,
    default: ""
  },
  search: {
    type: Boolean,
    default: false
  },
})
const store = useStore();
const router = useRouter();
console.log(store);
const authUser = ref(store.getters['user/authUser']);
const getSuffix = suffix;
// const VanDialog = Dialog.Component;

// logout
const logout = () => {
  Dialog.alert({
    title: '退出登录',
    message: '正在退出登录，是否确认退出？',
    overlay: true,
    closeOnClickOverlay: true,
    theme: 'round-button',
  }).then(async () => {
    // Dialog.close()
    await store.dispatch('user/logout');
    router.push('/login');
  });
}
</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';

.header-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .top-left {
    min-width: $height-htop-item; // 60px
    padding: 0 8px;
    color: $text-primary;
    font-weight: bold;
    text-align: center;
  }
  .top-center {
    color: $text-primary;
    line-height: 50px;
    .title {
      font-size: 16px;
      font-weight: bold;
      padding-left: 10px;
      @include ellipsis($display: block);
    }
    .subtitle {
      font-size: 16px;
    }
  }
  .top-right {
    display: flex;
    .user-mod {
      @include flex();
      padding-right: 5px;
      width: $height-htop-item;
      .user {
        .user-icon {
          font-size: 20px;
          color: $text-primary;
        }
        .username {
          @include ellipsis($height-htop-item);
          line-height: 0.7; 
          color: $text-primary;
          font-size: 12px;
          padding-top: 3px;
        }
      }
    }
  }
}
</style>