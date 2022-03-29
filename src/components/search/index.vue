<template>
  <div v-if="collapse" class="search-mod-collapse" ref="searchContainerRef" @click="handleClickSearchBox">
    <van-search ref="searchRef" v-model="searchValue" @search="handleClickSearch" @blur="handleSearchBlur" clearable placeholder="请输入搜索关键词" shape="round" />
  </div>
  <div v-else class="search-mod" :style={width:formattWidth(width)}>
    <van-search v-model="searchValue" @search="handleClickSearch" placeholder="请输入搜索关键词" clearable  shape="round" v-bind="$attrs"/>
  </div>
</template>

<script setup>
import { ref, toRaw, defineEmits, defineProps } from "vue"
import { setClassName, delClassName } from "@utils/base"
const showInput = ref(false);
const searchContainerRef = ref('searchContainerRef');
const searchRef = ref('searchRef');
const searchValue = ref(null);
const emit = defineEmits(['handleSearch']);
const props = defineProps({
  width: {
    type: String,
    default: "100%"
  },
  collapse: {
    type: Boolean,
    default: false
  }
})
console.log(props);

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
// 格式化宽度
function formattWidth(width) {
  let w = width;
  if (w.indexOf('%') !== -1 || w.indexOf('px') !== -1 || w.indexOf('rem') !== -1 || w.indexOf('em') !== -1 || w.indexOf('vw') !== -1 || w.indexOf('vh') !== -1) {
    return w;
  } else {
    w += '%'
  }
  return w;
}
</script>

<style lang="scss" scoped>
.search-mod-collapse {
  width: 60px;
}
.search-mod {
  width: 100%;
}
.van-search {
  background-color: rgba(255, 255, 255, 0);
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