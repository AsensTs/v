<template>
  <div class="main-container">
    <div class="table">
      <div class="table-title">
        <div class="title">{{title}}</div>
      </div>
      <div class="table-container" ref="listRef">
        <van-pull-refresh class="refresh" v-model="refresh_loading" @refresh="onRefresh">
          <van-list
            v-model:loading="list_loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in list" :key="item" > 
              <div class="table-item">
                <div class="item-bottom">
                  <div class="item">停电线路名称：{{item.tdxlmc}}</div>
                  <div class="item gzrw"><p>工作任务: {{item.gzrw}}</p></div>
                  <div class="item">特殊工作票：{{item.tsbz}}</div>
                  <div class="item">审批状态：{{item.jxdState}}</div>
                  <div class="item">批准工作开始时间：{{item.jhkssj?formaDate(item.jhkssj, "yyyy-MM-dd hh:mm:ss"):''}}</div>
                  <div class="item">批准工作结束时间：{{item.jhjssj?formaDate(item.jhjssj, "yyyy-MM-dd hh:mm:ss"):''}}</div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <ScrollTop :max="20" :len="listLen" @scrollTop="scrollTop"></ScrollTop>
    <SearchPage v-if="isSearchPage" dispath="permissiongd_search">
      <div class="title"><p>输电线路安全搜索</p></div>
      <van-cell-group inset>
        <van-search class="cell-item" v-model="target" placeholder="操作任务" clearable  shape="round"/>
        <van-search class="cell-item" v-model="search" placeholder="站点" clearable  shape="round"/>
        <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="选择日期：" :value="nprTime" @click="showCalendar = true" /></div>
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
        <van-button class="search-btn" type="primary" size="small">搜索</van-button>
      </van-cell-group>
    </SearchPage>
  </div>
</template>

<script setup>
import { watch, nextTick, reactive, ref, toRaw, computed} from 'vue';
import { Toast } from 'vant';
import { transmissionXlyzp } from '@apis/transmissionSecurity'
import SearchPage from '@components/search/searchPage'
import ScrollTop from '@components/scrollTop'
import { useStore } from 'vuex'
import filter from '@utils/filter'

const title = '输电线路安全措施填写';
const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
const listLen = ref(0);
const listRef = ref('listRef');
const store = useStore();
const isSearchPage = computed(() => {
  return store.getters['search/permissiongd_search'];
})
const states = reactive({
  step: 0,
  params: { offset: 0, limit: 10 },
  limit: 0
})
const target = ref('');
const search = ref('');
const nprTime = ref('');
const showCalendar = ref(false);
const formaDate = filter.formaDate

// 直接监听 ref
watch(listLen, (newListLen) => {
  listLen.value = newListLen
})

// 加载数据
const onLoad = () => {
  states.step += 10;
  states.params.offset = states.step - 10;
  listLen.value = states.step;
  getData(states.params);
  list_loading.value = false;
}

const getData = (params) => {
  transmissionXlyzp(params).then(res => {
    if (res.code === 200) {
      list.value = [...list.value, ...res.data];
      
      if (res.data.length < 10) {
        finished.value = true;
      }
    } else {
      console.error(res.code, res.msg);
      Toast.fail("获取数据失败");
      return;
    }
  }).catch((error) => {
    console.error(error);
  })
}

// 下拉刷新
const onRefresh = () => {
  setTimeout(() => {
    refresh_loading.value = false;
    states.params =  { status: status, offset: 0, limit: 10 };
    getData(states.params);
    Toast('刷新成功');
  }, 1000);
};

// 返回顶部
const scrollTop = async () => {
  await nextTick();
  let dom = toRaw(listRef.value);
  dom.scrollTop = 0;
  listLen.value = 0;
}

const onConfirm = (value) => {
  showCalendar.value = false;
  nprTime.value = formaDate(value, 'yyyy-MM-dd');
}
</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';
.main-container {
  position: relative;
  height: $height-main;
  .table {
    height: 100%;
    .table-title {
      height: 50px;
      line-height: 50px;
      @include flex($justify-content:space-between);
      padding: 0 18px;
      box-shadow: 0 0 10px #eee;
      background: $bg-color;
      .title {
        color: #797979;
      }
    }
    .table-container {
      background: $bg-color;
      border-radius: 10px;
      height: calc(100% - 50px - 16px);
      overflow: auto;
      .table-item {
        padding: 10px 16px;
        box-shadow: 0 0 5px #eee;
        border: 1px solid $border-light;
        border-radius: 5px;
        background: #fbfcff;
        .item-bottom {
          font-size: 14px;
          color: #717171;
          .item {
            .time {
              padding-left: 2px;
            }
          }
          .gzrw {
            width: 100%;
            color: #2e2e2e;
            p {
              width: 100%;
              @include ellipsis($clamp: 2);
              
            }
          }
        }
      }
    }
  }

  .search-page {
    .title {
      text-align: center;
      margin: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #737373;
    }
    .cell-item {
      padding: 5px 8px;
    }
    .calendar-label {
      .calendar-cell {
        padding: 6px 9px;
        background-color: #f7f8fa;
        border-radius: 25px;
        :deep(.van-cell__title) {
          color: #c6c6c6;
          span {
            padding-left: 10px;
          }
        }
      }
    }
    .search-btn {
      float: right;
      margin: 8px 12px;
      padding: 0 16px;
    }
  }
}


</style>