<template>
  <div id="search-page" class="search-page"  @click="handleCloseSearchPage" >
    <div class="search">
      <div @click.stop="()=>{}"> 
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
import { useStore } from 'vuex';
import { removeTouch } from '@utils/touchs'
import { useRoute } from 'vue-router';
const props = defineProps({
  dispath: {
    type: String,
    default: ""
  }
})
const store = useStore();
const route = useRoute();

onMounted(()=>{
  removeTouch(document.getElementById('search-page'))
})

const handleCloseSearchPage = () => {
  store.dispatch(props.dispath, false);
  history.pushState(null, null, `/#${route.fullPath}`); 
}


</script>

<style lang="scss" scoped>

</style>