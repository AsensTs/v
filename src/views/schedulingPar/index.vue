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
                </div>
                <div class="item-btnGroup">
                  <van-button size="mini" style="margin-right: 10px;" @click.stop="handleCheckMsg(item)">短信查询</van-button>
                  <van-button size="mini" @click="handleClickItem(item)">查看详情</van-button>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <ScrollTop :max="20" :len="listLen" @scrollTop="scrollTop"></ScrollTop>
    
    <SearchPage dispath="schedulingPar_search">
      <div class="title"><p>{{title}}</p></div>
      <van-cell-group inset>
        <van-search class="cell-item" v-model="gzrw" placeholder="工作任务" clearable  shape="round" @search="onSearch"/>
        <van-search class="cell-item" v-model="ph" placeholder="票号" clearable  shape="round" @search="onSearch"/>
        <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="创建日期：" :value="createsj" @click="showCalendar = true" /></div>
        <ts-calendar v-model:show="showCalendar" title="选择日期" :show-confirm="false" @confirm="onSearch"></ts-calendar>
        <!-- <van-button class="search-btn" type="primary" size="small">搜索</van-button> -->
        <p v-if="searchData && searchData.length" style="text-align:center;color:#c6c6c6;font-size: 12px;">{{searchData.length >= 999?'999':searchData.length}} 条数据</p>
      </van-cell-group>
      <van-list>
        <van-cell v-for="item in searchData" :key="item" > 
          <div class="table-item" @click="handleClickItem(item)">
            <div class="item-top"><p>{{item.czmd}}</p></div>
            <div class="item-bottom">
              <div class="item">拟票人：{{item.nlr}}</div>
              <div class="item"><span class="time">{{formaDate(item.nprTime, "yyyy-MM-dd hh:mm:ss")}}</span></div>
              <!-- <div class="item czrw">工作任务：{{item.czmd}}</div> -->
              <div class="item"><van-tag :type="formaResult(item.description).type">{{formaResult(item.description).text}}</van-tag></div>
            </div>
            <div class="item-btnGroup">
              <van-button size="mini" style="margin-right: 10px;" @click.stop="handleCheckMsg(item)">短信查询</van-button>
              <van-button size="mini" @click="handleClickItem(item)">查看详情</van-button>
            </div>
          </div>
        </van-cell>
      </van-list>
    </SearchPage>
   
    <transition :enter-active-class="animate('fadeInRight animate__faster')" :leave-active-class="animate('fadeOut animate__faster')">
      <DetailsPage v-if="isDetailsPage" :title="title">
        <div class="basic-info" v-if="ticketDetails">
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
          <div class="top">
            <div class="title">校核结果</div>
            <van-button size="small" type="primary" @click="rescan">重新扫描</van-button>
          </div>
          <ul>
            <li style="width: 13%">序号</li>
            <li style="width: 13%">合序</li>
            <li style="width: 24%">操作单位</li>
            <li style="width: 50%">操作内容</li>
          </ul>
          <van-list>
            <van-cell v-for="(item, index) in orderList" :key="'校核结果' + index" > 
              <div class="oper-list">
                <!-- <div class="item-top">
                  <p v-if="item.description" style="color: red;">{{item.description}}</p>
                </div> -->
                <p class="description" v-if="item.description" style="color: red;">{{item.description}}</p>
                <div class="list-item" v-if="!item.description">
                  <div class="item" style="width: 13%">{{item.dindex}}</div>
                  <div class="item" style="width: 13%">{{item.oindex}}</div>
                  <div class="item" style="width: 24%">{{item.czdw}}</div>
                  <div class="item" style="width: 50%">{{item.cznr}}</div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </div>
      </DetailsPage>
    </transition>

    <van-action-sheet v-model:show="showCheckMsg" title="短信详情">
      <div class="check-msg">
        <div class="msg-info">
          <van-cell-group inset>
            <van-cell title="拟票人" :value="msgInfo.nlr" />
            <van-cell title="拟票日期" :value="formaDate(msgInfo.nprTime, 'yyyy-MM-dd hh:mm:ss')"/>
            <van-cell title="操作任务" :label="msgInfo.czmd" />
          </van-cell-group>
        </div>
        <div class="content">
          <ul>
            <li style="width: 20%">姓名</li>
            <li style="width: 20%">岗位</li>
            <li style="width: 30%">创建时间</li>
            <li style="width: 30%">发送时间</li>
          </ul>
          <van-list v-if="msgData.length">
            <van-cell v-for="(item, index) in msgData" :key="'校核结果' + index" >
              <div class="msg-list">
                <div class="list-item">
                  <div class="item" style="width: 20%">{{ msgData.name }}</div>
                  <div class="item" style="width: 20%">{{ msgData.position }}</div>
                  <div class="item" style="width: 30%">{{ formaDate(msgData.createDate, 'yyyy-MM-dd hh:mm:ss') }}</div>
                  <div class="item" style="width: 30%">{{ formaDate(msgData.sendTime, 'yyyy-MM-dd hh:mm:ss') }}</div>
                </div>
              </div>
            </van-cell>
          </van-list>
          <div v-else style="text-align:center;font-size: 14px;padding:10px;">暂无数据</div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { watch, nextTick, reactive, ref, toRaw, computed} from 'vue';
import { Toast } from 'vant';
import { useStore } from 'vuex'
import { predictateTicket, predictateTicketDetails, predictateTicketAgainCheck, messageSearch } from '@apis/schedulingPar'
import SearchPage from '@components/search/searchPage'
import ScrollTop from '@components/scrollTop'
import DetailsPage from '@components/details'
import TsCalendar from '@components/calendar'
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

const isDetailsPage = computed(() => {
  return store.getters['details/schedulingPar_details'];
})
const states = reactive({
  step: 0,
  params: { offset: 0, limit: 10, },
  limit: 0
})
// search
const gzrw = ref('');
const ph = ref('');
const createsj = ref('');
const showCalendar = ref(false);
const searchData = ref([])

const ticketDetails = ref(null); // details data
const workTaskError = ref(null);
const orderList = ref(null);
const instId = ref('');
const showCheckMsg = ref(false); // 短信查询
const msgInfo = ref(null);       // 短信基本信息
const msgData = ref([]);         // 短信数据
const formaDate = filter.formaDate;

// 直接监听 ref
watch(listLen, (newListLen) => {
  listLen.value = newListLen
})


const onLoad = async () => { // 加载数据
  states.step += 10;
  states.params.offset = states.step - 10;
  listLen.value = states.step;
  let res = await getData(states.params);
  if (res.code == 200) list.value = [...list.value, ...res.data];
  list_loading.value = false;
}

const getData = async (params) => { // 请求数据
  let res = await predictateTicket(params);
  return res
  // if (res.code == 200) {
  //   if (type === 'search') {
  //     searchData.value = res.data;
  //     return;
  //   }

  //   list.value = [...list.value, ...res.data];
  // }
}

const onRefresh = () => {
  setTimeout(async () => {
    refresh_loading.value = false;
    states.params =  {offset: 0, limit: 10 };
    await getData(states.params);
    Toast('刷新成功');
  }, 1000);
};

const scrollTop = async () => { // 返回顶部
  await nextTick();
  let dom = toRaw(listRef.value);
  dom.scrollTop = 0;
  listLen.value = 0;
}

const onSearch = async (value) => { // 搜索
  if (value instanceof Date) {
    createsj.value = filter.formaDate(value, 'yyyy-MM-dd');
    if (showCalendar.value) showCalendar.value = false;     // 关闭日历
  }

  Toast.loading({
    message: '搜索中...',
    forbidClick: true,
  });

  let params = {
    gzrw: gzrw.value,
    ph: ph.value,
    createsj: createsj.value,
    offset: 0,
    limit: 1000
  }

  let res = await getData(params);
  if (res.code == 200) searchData.value = res.data;
  list_loading.value = false;
}

const formaResult = (result) => {
  if (result === "正确") {
    return { type: 'success', text: "正确" };
  }
  return { type: 'danger', text: "错误" };
}

const handleClickItem = (data) => {
  instId.value = data.instId
  ticketDetails.value = null;
  orderList.value = null;
  store.dispatch('details/schedulingPar_details', true);
  pushState(route.fullPath + '/details');
  getDetails(data.instId);
}

const getDetails = async (instId) => {
  await predictateTicketDetails(instId).then(res => {
    if (!res === 200) {
      console.error(res.code, res.msg);
      Toast.fail("获取数据失败");
      return;
    }
    const { orders, results, ticket } = res.data;
    ticketDetails.value = ticket;
    if (results) {
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        for (let k = 0; k < results.length; k++) {
          let r = results[k];

          if (order.instId == r.orderId) {
            orders.splice(i + 1, 0, r);
            order.instId = order.instId + "true";
          }

          if (r.orderId == "null") workTaskError.value = r.description;
        }
      }
    }
    orderList.value = orders;
  }).catch(error => {
    console.error(error);
  })
}

const rescan = () => {
  ticketDetails.value = null;
  orderList.value = null;
  workTaskError.value = null;
  // eslint-disable-next-line no-unused-vars
  predictateTicketAgainCheck(instId.value).then(async (res) => {
    await getDetails(instId.value||"");
    Toast.success('扫描成功');
  })
}

const handleCheckMsg = (data) => {
  msgInfo.value = data;
  showCheckMsg.value = true; 

  messageSearch(data.instId).then((res) => {
    if (res.code == 200) {
      msgData.value = res.data;
    } else {
      console.error(res.code, res.msg);
      Toast.fail("短信查询失败");
      return;
    }
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
      .van-list {
        .table-item {
          border: 1px solid #e4e7ed;
          border-radius: 10px;
          padding: 5px 10px;
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
          .item-btnGroup {
            margin-top: 5px;
          }
        }
      }
    }
  }
  
  .search-page {
    .title {
      height: 45px;
      @include title($font-size: 16px, $color: #737373);
    }
    .van-cell-group {
      height: 154px;
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
    .van-list {
      height: 468px;
      overflow: auto;
      .table-item {
        border: 1px solid #e4e7ed;
        border-radius: 10px;
        padding: 5px 10px;
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
        .item-btnGroup {
          margin-top: 5px;
        }
      }
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
    .oper-step {
      position: relative;
      background: #fff;
      margin: 2.666667vw;
      margin-top: 5.333333vw;
      border-radius: 2.666667vw;
      box-sizing: border-box;
      box-shadow: 0 0 2.666667vw #e9e9e9;
      padding: 10px;
      .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
      }
      ul {
        height: 40px;
        display: flex;
        align-items: center;
        background: #f7f8fa;
        border-radius: 5px 5px 0 0;
        padding: 0 10px;
        li {
          font-size: 14px;
          padding: 0 3px;
        }
      }
      .van-list {
        .van-cell {
          padding: 10px 0;
          border-bottom: 1px solid rgb(245, 245, 245);
          .oper-list {
            .description {
              padding-left: 27%;
            }
            .list-item {
              padding: 0;
              display: flex;
              padding: 0 10px;
              .item {
                padding: 0 3px;
              }
            }
          }
        }
      }
      
    }
  }

  .check-msg {
    .content {
      padding: 16px 16px 20px;
      ul {
        height: 40px;
        display: flex;
        align-items: center;
        background: #f7f8fa;
        border-radius: 5px 5px 0 0;
        padding: 0 10px;
        li {
          font-size: 12px;
          padding: 0 3px;
        }
      }
      .van-list {
        .van-cell {
          padding: 10px 0;
          border-bottom: 1px solid rgb(245, 245, 245);
          .msg-list {
            .description {
              padding-left: 27%;
            }
            .list-item {
              padding: 0;
              display: flex;
              padding: 0 10px;
              .item {
                padding: 0 3px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>