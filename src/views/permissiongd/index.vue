<template>
  <div class="main-container">
    <div class="table">
      <div class="table-title">
        <div class="title">{{title}}</div>
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="state" :options="stateOptions" @change="handleChange"/>
        </van-dropdown-menu>
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
                  <div class="item">申请单位：{{item.sqdw}}</div>
                  <div class="item">申请日期：<span class="time">{{formaDate(item.sqrq, "yyyy-MM-dd hh:mm:ss")}}</span></div>
                  <div class="item"><p>操作任务：{{item.czrw}}</p></div>
                  <div class="item">许可来源：{{item.xklx}}</div>
                  <div class="item">填写人：{{item.txr}}</div>
                  <div class="item">结果：<van-tag :type="formaResult(item.checkResult).type">{{formaResult(item.checkResult).text}}</van-tag></div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <ScrollTop :max="20" :len="listLen" @scrollTop="scrollTop"></ScrollTop>
    
    <transition enter-active-class="animate__animated animate__fadeInRight animate__faster" leave-active-class="animate__animated animate__fadeOut">
      <SearchPage v-if="isSearchPage" dispath="search/permission_search">
        <div class="title"><p>{{title}}</p></div>
        <van-cell-group inset>
          <van-search class="cell-item" v-model="target" placeholder="操作任务" clearable  shape="round"/>
          <van-search class="cell-item" v-model="search" placeholder="站点" clearable  shape="round"/>
          <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="选择日期：" :value="nprTime" @click="showCalendar = true" /></div>
          <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
          <van-button class="search-btn" type="primary" size="small">搜索</van-button>
        </van-cell-group>
      </SearchPage>
    </transition>
  </div>
</template>

<script setup>
import { watch, nextTick, reactive, ref, toRaw, computed} from 'vue';
import { Toast } from 'vant';
import { getPermissiongd } from '@apis/permissiongd'
import SearchPage from '@components/search/searchPage'
import ScrollTop from '@components/scrollTop'
import { useStore } from 'vuex'
import filter from '@utils/filter'

const title = '厂站许可校核';
const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
const state = ref(1);
const listLen = ref(0);
const listRef = ref('listRef');
const store = useStore();
const isSearchPage = computed(() => {
  return store.getters['search/permission_search'];
})
const states = reactive({
  step: 0,
  params: { state: 1, offset: 0, limit: 10, },
  limit: 0
})
const stateOptions = [
  { text: '已提交调度', value: 1 },
  { text: '待提交调度', value: 0 },
];
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
  getPermissiongd(states.params).then(res => {
    if (res.code === 200) {
      list.value = [...list.value, ...res.data];
      list_loading.value = false;
      
      if (res.data.length < 10) {
        finished.value = true;
      }
    }
  }).catch((error) => {
    console.error(error);
  })
}

const onRefresh = () => {
  setTimeout(() => {
    Toast('刷新成功');
    refresh_loading.value = false;
  }, 1000);
};

// 选择状态(status)
const handleChange = async (value) => {
  finished.value = false;
  list_loading.value = true;
  list.value = [];
  states.step = 0;
  states.params.state = value;
  states.params.offset = 0;
  await nextTick();
  let dom = toRaw(listRef.value);
  dom.scrollTop = 0;
  onLoad();
}

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

const formaResult = (result) => {
  if (result === "TRUE") {
    return { type: 'success', text: "正确" };
  }
  return { type: 'danger', text: "错误" };
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
          color: #888888;
          .item {
            .time {
              padding-left: 2px;
            }
          }
          .czrw {
            width: 100%;
            color: #6b6b6b;
            p {
              width: 100%;
              @include ellipsis();
              
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
        ::v-deep .van-cell__title {
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