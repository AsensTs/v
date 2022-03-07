<template>
  <div class="search-mod" ref="searchContainerRef" @click="handleClickSearchBox">
    <van-search ref="searchRef" v-model="searchValue" @search="handleClickSearch" @blur="handleSearchBlur" clearable placeholder="请输入搜索关键词" shape="round" />
  </div>
</template>

<script setup>
import { ref, toRaw, defineEmits } from "vue"
import { setClassName, delClassName } from "@utils/base"
const showInput = ref(false);
const searchContainerRef = ref('searchContainerRef');
const searchRef = ref('searchRef');
const searchValue = ref(null);
const emit = defineEmits(['handleSearch']);

// 展开输入框
function handleClickSearchBox() {
  showInput.value = true;
  let dom = toRaw(searchContainerRef.value);
  delClassName(dom, 'toggle-hide');
  setClassName(dom, 'toggle-show');
  searchFocus();
}
// 提交搜索
function handleClickSearch () {
  console.log('搜索内容', searchValue);
  emit('handleSearch', searchValue);
}
// 失去焦点
function handleSearchBlur() {
  let dom = toRaw(searchContainerRef.value);
  delClassName(dom, 'toggle-show');
  setClassName(dom, 'toggle-hide');
}
// 获取焦点
function searchFocus() {
  searchRef.value.focus();
}
</script>

<style lang="scss" scoped>
.search-mod {
  width: 60px;
  .van-search {
    background-color: rgba(255, 255, 255, 0);
  }
}

.toggle-show {
  width: 200px !important;
  transition: width .5s;
}
.toggle-hide {
  width: 60px;
  transition: width .5s;
}
</style>