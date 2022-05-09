<template>
<van-popup class="search-page" v-model:show="isSearchPage" @close="handleCloseSearchPage" position="right" closeable :style="{ height: '100%', width: '100%' }">
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
  dispath: {
    type: String,
    default: ""
  }
})
const store = useStore();
const route = useRoute();
let dp = ''
if (props.dispath.indexOf('search/') !== -1) {
  dp = props.dispath + '';
} else {
  dp = 'search/' + props.dispath;
}

const isSearchPage = computed(() => {  // search-page
  return store.getters[dp];
})

const handleCloseSearchPage = () => {
  store.dispatch(dp, false);
  pushState(route.fullPath); 
}


</script>

<style lang="scss" scoped>

</style>