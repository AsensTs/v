<template>
<div id="details-page" >
  <van-popup v-model:show="isShowPage" @close="handleClosePage" position="right" :style="{ height: '100%', width: '100%' }">
  <div class="details-page">
    <div @click.stop="" class="details-content">
      <div class="topbar">
        <div class="back" @click="handleClosePage"><van-icon name="arrow-left" /></div>
        <div class="title">{{title}}</div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</van-popup>
</div>
</template>

<script setup>
/**
 * 详情页面 ( Details page )
 * vue3 + store
 * 1. store: 详情页面配合 store 实现打开关闭页面， 通过 props 传入 store(dispath字符串) 来控制。
 *    <DetailsPage store="transmissionSecurity_details">
 * 
 * 2. v-model:show: 通过 props 传入一个布尔值来实现页面打开关闭。
 *    <DetailsPage v-model:show="show">
 * */ 
import { computed, defineProps, nextTick, onMounted, defineEmits } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import pushState from '@/utils/pushState'
import { removeTouch } from '@utils/touchs'

onMounted(async ()=>{
  await nextTick()
  removeTouch(document.getElementById('details-page'));
})
const emit = defineEmits();
const props = defineProps({
  store: {
    type: String,
    default: ""
  },
  title: String,
  show: Boolean
})
const store = useStore();
const route = useRoute();


let dp = ''
if (props.store.indexOf('details/') !== -1) {
  dp = props.store + '';
} else {
  dp = 'details/' + props.store;
}

const isShowPage = computed(() => {
  return store.getters[dp] ? store.getters[dp] : props.show;
})

// 关闭页面
const handleClosePage = () => {
  if (props.store) {
    store.dispatch(dp, false);
  } else {
    console.log(123);
    emit('update:show', false)
  }
  pushState(route.fullPath);
}
</script>

<style lang="scss" scoped>

</style>