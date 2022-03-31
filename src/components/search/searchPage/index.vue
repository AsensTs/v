<template>
  <van-search ref="searchRef"  v-model="searchValue" @search="handleClickSearch" @blur="handleCloseSearchPage"  placeholder="请输入搜索关键词" clearable  shape="round" v-bind="$attrs"/>
</template>

<script setup>
import { onMounted, ref, toRaw, defineEmits } from "vue" 
const searchValue = ref(null);
const searchRef = ref('searchRef');
const emit = defineEmits(['handleCloseSearchPage']);

onMounted(()=>{
  let dom = toRaw(searchRef.value);
  dom.focus();
})

const handleClickSearch = (value) => {
  console.log(value);
}

const handleCloseSearchPage = () => {
  emit('handleCloseSearchPage', true);
}
</script>

<style lang="scss" scoped>

</style>