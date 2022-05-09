<template>
<van-popup v-model:show="isShowPage" @close="handleClosePage" position="right" :style="{ height: '100%', width: '100%' }">
  <div id="details-page" class="details-page">
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
  <div>
    <slot></slot>
  </div>
</van-popup>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import pushState from '@/utils/pushState'
const props = defineProps({
  store: {
    type: String,
    default: ""
  },
  title: String
})
const store = useStore();
const route = useRoute();
let dp = ''
if (props.store.indexOf('details/') !== -1) {
  dp = props.store + '';
} else {
  dp = 'details/' + props.store;
}


const isShowPage = computed(() => {  // search-page
  return store.getters[dp];
})

const handleClosePage = () => {
  store.dispatch(dp, false);
  pushState(route.fullPath);
}


</script>

<style lang="scss" scoped>

</style>