<template>
  <div class="row navigation">
    <div class="col" v-for="(navItem, index) in navData" :key="index + navItem.name">
      <div @click="handleClickNav(navItem)">
        <van-icon :name="navItem.name"/>
        <p class="title">{{ navItem.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps } from "vue";
import { onUpdated } from "@vue/runtime-core";
import { useRouter } from "vue-router";

const props = defineProps({
  navData: {
    type: Array,
    default: () => {
      return []
    }
  },
  iconSize: String
})

const state = reactive({
  colSpan: 0,
})

const Router = useRouter();

onUpdated(() => {
  countColSpan();
})

const countColSpan = () => {
  state.colSpan = Math.floor(24/props.navData.length)
}
countColSpan()


const handleClickNav = (navItem) => {
  Router.push(navItem.path)
}

</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';

.navigation {
  .van-icon, .title {
    color: #fff;
  }
  .van-icon {
    font-size: 28px;
    font-weight: bold;
  }
  .title {
    font-size: 15px;
    font-weight: bold;
    padding-top: 5px;
  }
}
</style>