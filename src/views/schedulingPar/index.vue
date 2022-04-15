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
              <div class="table-item" @click="handleClickItem(item)">
                <div class="item-top"><p>{{item.czmd}}</p></div>
                <div class="item-bottom">
                  <div class="item">拟票人：{{item.nlr}}</div>
                  <div class="item"><span class="time">{{formaDate(item.nprTime, "yyyy-MM-dd hh:mm:ss")}}</span></div>
                  <!-- <div class="item czrw">工作任务：{{item.czmd}}</div> -->
                  <div class="item"><van-tag :type="formaResult(item.description).type">{{formaResult(item.description).text}}</van-tag></div>
                  <div class="item check" @click="handleClickItem(item)">详情</div>
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
   
    <transition :enter-active-class="animate('fadeInRight animate__faster')" :leave-active-class="animate('fadeOut animate__faster')">
      <DetailsPage v-if="isDetailsPage" :title="title">
        <div class="basic-info">
            <div class="checkResultImg">
            <img v-if="ticketDetails.description === '正确'" class="seal" src="@assets/images/true.png" alt />
            <img v-else class="seal" src="@assets/images/false.png" alt/>
          </div>
          <h3>基础信息</h3>
          <van-cell-group inset>
            <van-cell title="拟票人" :value="ticketDetails.nlr" />
            <van-cell title="拟票时间" :value="formaDate(ticketDetails.nprTime, 'yyyy-MM-dd hh:mm:ss')" />
            <van-cell title="工作任务" :value="ticketDetails.czmd" class="van-cell-custom"/>
          </van-cell-group>
        </div>
        <div class="oper-step">
          <ts-table v-model="tableData" title="校核结果">
            <ts-table-item label="序号" prop="type" width="60"></ts-table-item>
            <ts-table-item label="合序" prop="result" width="60"></ts-table-item>
            <ts-table-item label="操作单位" prop="result" width="100"></ts-table-item>
            <ts-table-item label="操作内容" prop="content"></ts-table-item>
            </ts-table>
        </div>
      </DetailsPage>
    </transition>
  </div>
</template>

<script setup>
import { watch, nextTick, reactive, ref, toRaw, computed} from 'vue';
import { Toast } from 'vant';
import { useStore } from 'vuex'
import { predictateTicket, predictateTicketDetails } from '@apis/schedulingPar'
import SearchPage from '@components/search/searchPage'
import ScrollTop from '@components/scrollTop'
import DetailsPage from '@components/details'
import tsTable from '@components/table/ts-table'
import tsTableItem from '@components/table/ts-table-item'
import filter from '@utils/filter'
import animate from '@utils/animate'
import pushState from '@/utils/pushState'
import { useRoute } from 'vue-router';

const title = '调度操作票校核';
const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
const listLen = ref(0);
const listRef = ref('listRef');
const store = useStore();
const route = useRoute();
const isSearchPage = computed(() => {
  return store.getters['search/schedulingPar_search'];
})
const isDetailsPage = computed(() => {
  return store.getters['details/schedulingPar_details'];
})
const states = reactive({
  step: 0,
  params: { offset: 0, limit: 10, },
  limit: 0
})
const description = ref('');
const czmd = ref('');
const nprTime = ref('');
const showCalendar = ref(false);
const ticketDetails = ref(null); // details data
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
  getData(states.params)
  list_loading.value = false;
}

const getData = async (params) => {
  let res = await predictateTicket(params);
  list.value = [...list.value, ...res.data];
}

const onRefresh = () => {
  setTimeout(() => {
    Toast('刷新成功');
    refresh_loading.value = false;
    states.params =  {offset: 0, limit: 10 };
    getData(states.params);
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

const formaResult = (result) => {
  if (result === "正确") {
    return { type: 'success', text: "正确" };
  }
  return { type: 'danger', text: "错误" };
}

const handleClickItem = (data) => {
  store.dispatch('details/schedulingPar_details', true);
  pushState(route.fullPath);
  getDetails(data.instId);
}

const getDetails = (instId) => {
  predictateTicketDetails(instId).then(res => {
    if (!res === 200) {
      console.error(res.code, res);
    }
    const { ticket } = res.data;
    ticketDetails.value = ticket;
  }).catch(error => {
    console.error(error);
  })
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
  .details-page {
    background: #f9fbff;
    .basic-info {
      position: relative;
      background: #fff;
      margin: 10px;
      margin-top: 20px;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0 0 10px #e9e9e9;
      .checkResultImg {
        right: 20px;
        top: 15px;
        img {
          transform: rotate(20deg);
        }
      }
      h3 {
        @include title();
      }
    }
  }
}
</style>