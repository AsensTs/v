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
    <Search @handleSearch="handleSearch"></Search>
    <div class="user-mod">
      <div class="user">
        <i class="iconfont icon-switchuser user-icon"></i>
        <p class="username">user</p>
      </div>
    </div>
  </div>
</van-row>
</template>

<script setup>
import { defineProps } from "vue"
import Search from '@components/search'
import { suffix } from "@utils/base"
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

const getSuffix = suffix;
const handleSearch = (searchValue) => {
  console.log(searchValue, "父组件接收");
}

</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/common.scss';

.header-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .top-left {
    width: 100px;
    min-width: 0;
    padding: 0 8px;
    color: $color;
    font-weight: bold;
    text-align: center;
  }
  .top-center {
    color: $color;
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
      .user {
        .user-icon {
          font-size: 25px;
          color: $color;
        }
        .username {
          line-height: 0.7; 
          color: $color;
        }
      }
    }
  }
}
</style>