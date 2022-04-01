<template>
  <div v-if="collapse" class="search-mod-collapse" ref="searchContainerRef" @click="handleClickSearchBox">
    <van-search ref="searchRef" v-model="searchValue" @search="handleClickSearch" @blur="handleSearchBlurToCollapse" clearable placeholder="请输入搜索关键词" shape="round" />
  </div>

  <div v-else class="search-mod" :style={width:formattWidth(width)}>
    <van-search ref="searchRef" @focus="handleOpenSearchPage"  placeholder="请输入搜索关键词" clearable  shape="round" v-bind="$attrs"/>
  </div>
</template>

<script setup>

import { ref, toRaw, defineEmits, defineProps } from "vue"
import { setClassName, delClassName } from "@utils/base"
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const showInput = ref(false);
const searchContainerRef = ref('searchContainerRef');
const searchRef = ref('searchRef');
const searchValue = ref(null);
const emit = defineEmits(['handleSearch']);
const route = useRoute();
const store = useStore();
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

// Expand the input field
function handleClickSearchBox() {
  showInput.value = true;
  let dom = toRaw(searchContainerRef.value);
  delClassName(dom, 'toggle-hide');
  setClassName(dom, 'toggle-show');
  searchFocus();
}
// Submitted to the search
function handleClickSearch () {
  console.log('搜索内容', searchValue);
  emit('handleSearch', searchValue);
}
// Lose focus
function handleSearchBlurToCollapse() {
  let dom = toRaw(searchContainerRef.value);
  delClassName(dom, 'toggle-show');
  setClassName(dom, 'toggle-hide');
}
// Focus
function searchFocus() {
  searchRef.value.focus();
}
// Get focus to open the search page
const handleOpenSearchPage = async () => {
  // 去掉外层搜索框的焦点
  searchRef.value.blur();
  // 添加一个状态（state）, 控制搜索页面的物理返回。
  history.pushState(null, null, `/#${route.fullPath}/search`); 

  let dispath = '';
  switch (route.fullPath) {
    case '/substationCheck':
      dispath = 'search/substationCheck_search';
      break;
    case '/permissiongd': 
      dispath = 'search/permission_search';
      break;
    case '/schedulingPar': 
      dispath = 'search/schedulingPar_search';
      break;
    case '/transmissionSecurity': 
      dispath = 'search/transmissionSecurity_search';
      break;
    case '/associatedCheck': 
      dispath = 'search/associatedCheck_search';
      break;
    default: break;
  }
  store.dispatch(dispath, true);
}

// Formatting width
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

.toggle-show {
  width: 200px !important;
  transition: width .5s;
}
.toggle-hide {
  width: 60px;
  transition: width .5s;
}
</style>