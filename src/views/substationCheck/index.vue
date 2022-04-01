<template>
  <div class="main-container">
    <div class="table">
      <div class="table-title">
        <div class="title">变电操作票校核</div>
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="status" :options="statusOptions" @change="handleChange"/>
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
            <van-cell v-for="(item, index) in list" :key="item.instId" @click="handleClickItem(item, index)"> 
              <div class="table-item">
                <div class="item-top"><p>{{item.target}}</p></div>
                <div class="item-bottom">
                  <div class="item"><van-icon name="location" />{{item.czdw}}</div>
                  <div class="item"><van-icon name="calendar-o" /><span class="time">{{formatDate(item.generateTime)}}</span></div>
                  <div class="item"><van-tag :type="formaStatus(item.description).type">{{formaStatus(item.description).text}}</van-tag></div>
                  <div class="item check" @click="handleCheck">查看</div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <ScrollTop :max="20" :len="listLen" @scrollTop="scrollTop"></ScrollTop>
    
    <transition :enter-active-class="animate('fadeInRight animate__faster')" :leave-active-class="animate('fadeOut animate__faster')">
      <SearchPage v-if="isSearchPage" dispath="search/substationCheck_search">
        <div class="title"><p>搜索变电操作票</p></div>
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
import { computed, watch, nextTick, reactive, ref, toRaw } from 'vue';
import { Toast } from 'vant';
import { getStationTicket } from '@apis/substationCheck'
import SearchPage from '@components/search/searchPage'
import ScrollTop from '@components/scrollTop'
import filter from '@utils/filter'
import animate from '@utils/animate'
import { useStore } from 'vuex';

const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
const status = ref(4);
const listLen = ref(0);
const listRef = ref('listRef');
const store = useStore();
const state = reactive({
  step: 10,
  params: { status: "已生成", offset: 0, limit: 0, },
  limit: 0
})
const statusOptions = [
  { text: '错误集', value: 0 },
  { text: '未校验', value: 1 },
  { text: '未审核', value: 2 },
  { text: '已初审', value: 3 },
  { text: '已生成', value: 4 },
];
const target = ref('');
const search = ref('');
const nprTime = ref('');
const showCalendar = ref(false);
const isSearchPage = computed(() => {
  return  store.getters['search/substationCheck_search'];
})

// 直接监听 ref
watch(listLen, (newListLen) => {
  listLen.value = newListLen
})

// 加载数据
const onLoad = async () => {
  state.params.limit += state.step;
  state.params.offset = state.params.limit - state.step;
  listLen.value = state.params.limit;
  let res = await getStationTicket(state.params);
  list.value = res.data;
  list_loading.value = false;
}

const onRefresh = () => {
  setTimeout(() => {
    Toast('刷新成功');
    refresh_loading.value = false;
  }, 1000);
};

// 格式化状态（status）信息
const formaStatus = (status) => {
  if (status === "错误") {
    return { type: 'danger', text: "错误" };
  } else if (status === undefined) {
    return;
  } else {
    return { type: 'success', text: "正确" };
  }
}

// 格式化日期
const formatDate = (time) => {
  let arr = time.split(' ');
  return arr[0];
}

// 选择状态(status)
const handleChange = async (value) => {
  let element = statusOptions[value];
  state.params = {status: element.text, offset: 0, limit: 0};
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
  nprTime.value = filter.formaDate(value, 'yyyy-MM-dd');
}

const handleClickItem = (data, index) => {
  console.log(data, index);
}

const handleCheck = () => {

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
        font-size: 14px;
        color: #797979;
        font-weight: bold;
      }
    }
    .table-container {
      background: $bg-color;
      border-radius: 10px;
      height: calc(100% - 50px - 16px);
      overflow: auto;
      .table-item {
        height: 80px;
        padding: 5px 10px;
        box-shadow: 0 0 5px #eee;
        border: 1px solid $border-light;
        border-radius: 5px;
        .item-top {
          width: 100%;
          height: 50%;
          @include flex($justify-content: space-between, $text-align: left);
          font-weight: bold;
          color: #6b6b6b;
          p {
            width: 95%;
            @include ellipsis();
            font-size: 14px;
          }
        }
        .item-bottom {
          height: 50%;
          font-size: 13px;
          @include flex($justify-content: space-between);
          color: #888888;
          .item {
            .van-icon {
              font-size: 13px
            }
            .time {
              padding-left: 2px;
            }
          }

          .check {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .search {
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