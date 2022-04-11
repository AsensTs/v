<template>
  <div class="main-container">
    <div class="table">
      <div class="table-title">
        <div class="title">{{ title }}</div>
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
                <div class="item-top"><p>{{item.czmd}}</p></div>
                <div class="item-bottom">
                  <div class="item">拟票人：{{item.nlr}}</div>
                  <div class="item"><span class="time">{{formaDate(item.nprTime, "yyyy-MM-dd hh:mm:ss")}}</span></div>
                  <!-- <div class="item czrw">工作任务：{{item.czmd}}</div> -->
                  <div class="item"><van-tag :type="formaResult(item.description).type">{{formaResult(item.description).text}}</van-tag></div>
                  <div class="item check">详情</div>
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
        <div class="title"><p>{{ title }}</p></div>
        <van-cell-group inset>
          <van-search class="cell-item" v-model="description" placeholder="结果" clearable  shape="round"/>
          <van-search class="cell-item" v-model="czmd" placeholder="工作任务" clearable  shape="round"/>
          <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="拟票时间：" :value="nprTime" @click="showCalendar = true" /></div>
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
import { predictateTicket } from '@apis/schedulingPar'
import SearchPage from '@components/search/searchPage'
import ScrollTop from '@components/scrollTop'
import { useStore } from 'vuex'
import filter from '@utils/filter'

const title = '调度操作票校核';
const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
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
const description = ref('');
const czmd = ref('');
const nprTime = ref('');
const showCalendar = ref(false);
const formaDate = filter.formaDate;

// 直接监听 ref
watch(listLen, (newListLen) => {
  listLen.value = newListLen
})

// 加载数据
const onLoad = async () => {
  states.step += 10;
  states.params.offset = states.step - 10;
  listLen.value = states.step;
  let res = await predictateTicket(states.params);
  list.value = [...list.value, ...res.data];
  list_loading.value = false;
}

const onRefresh = () => {
  setTimeout(() => {
    Toast('刷新成功');
    refresh_loading.value = false;
  }, 1000);
};

// 选择状态(status)
// const handleChange = async (value) => {
//   states.params = {state: value, offset: 0, limit: 0};
//   await nextTick();
//   let dom = toRaw(listRef.value);
//   dom.scrollTop = 0;
//   onLoad();
// }

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
  if (result === "正确") {
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
        min-height: 80px;
        padding: 5px 10px;
        box-shadow: 0 0 5px #eee;
        border: 1px solid $border-light;
        border-radius: 5px;
        .item-top {
          width: 100%;
          line-height: 40px;
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
            cursor: pointer;
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