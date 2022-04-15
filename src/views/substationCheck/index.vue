<template>
  <div class="main-container">
    <div class="table">
      <div class="table-title">
        <div class="title">{{ title }}</div>
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
            <van-cell v-for="(item, index) in list" :key="item.instId + '-' + index" @click="handleItemCheck(item)"> 
              <div class="table-item">
                <div class="item-top"><p>{{item.target}}</p></div>
                <div class="item-bottom">
                  <div class="item"><van-icon name="location" />{{item.czdw}}</div>
                  <div class="item"><van-icon name="calendar-o" /><span class="time">{{formatDate(item.time)}}</span></div>
                  <div class="item"><van-tag :type="getResultTagType(item)">{{getResultTagType(item)=='success'?'正确':'错误'}}</van-tag></div>
                  <div class="item check" @click.stop="handleItemCheck(item)">查看</div>
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

    <transition :enter-active-class="animate('fadeInRight animate__faster')" :leave-active-class="animate('fadeOut animate__faster')">
      <DetailsPage v-if="isDetailsPage" :title="'变电操作票'">
        <div class="details">
          <div class="checkResultImg">
            <img v-if="details.keyCount > 0 || details.operationCount > 0 || details.stateCount > 0 " class="seal" src="@assets/images/false.png" alt />
            <img v-else class="seal" src="@assets/images/true.png" alt/>
          </div>
          <div class="basic-info">
            <div class="subtitle">{{ details.czdw }}</div>
            <van-row gutter="5"><van-col class="d_label" :span="d_label">票号：</van-col> <van-col class="d_value" :span="d_value">{{ details.number }}</van-col></van-row>
            <van-row gutter="5"><van-col class="d_label" :span="d_label">拟票时间：</van-col> <van-col class="d_value" :span="d_value">{{ details.time }}</van-col></van-row>
            <van-row gutter="5"><van-col class="d_label" :span="d_label">拟票人：</van-col> <van-col class="d_value" :span="d_value">{{ details.npr }}</van-col></van-row>
            <van-row gutter="5"><van-col class="d_label" :span="d_label">票类型：</van-col> <van-col class="d_value" :span="d_value">{{ details.type }}</van-col></van-row>
            <van-row gutter="5"><van-col class="d_label" :span="d_label">操作任务：</van-col> <van-col class="d_value" :span="d_value"><span style="font-weight:bold;color:#333">{{ details.target }}</span></van-col></van-row>
            <van-row gutter="5"><van-col class="d_label" :span="d_label">生成时间：</van-col> <van-col class="d_value" :span="d_value">{{ details.generateTime }}</van-col></van-row>
            <van-row gutter="5"><van-col class="d_label" :span="d_label">审核人：</van-col> <van-col class="d_value" :span="d_value">{{ details.shr }}</van-col></van-row>
          </div>
          <div class="oper-content">
            <div class="subtitle">操作步骤</div>
            <div class="btn-group">
              <van-button type="primary" size="small" @click="getStationTicketCheckResult(details.inst_id)">票面校核</van-button>
              <van-button type="primary" size="small" @click="getStationStateCheckResult(details.inst_id)">状态校核</van-button>
              <van-button type="primary" size="small" @click="getStationOperationCheckResult(details.inst_id)">拓扑校核</van-button>
              <!-- <van-button type="primary" size="small">查看规则</van-button> -->
            </div>
            <div class="steps">
              <van-loading v-show="steps_loading" color="#1989fa" vertical>正在重新校核...</van-loading>
              <van-steps v-show="!steps_loading" direction="vertical" :active="-1">
                <van-step v-for="item in tableList" :key="item.inst_id">
                  <h3 :class="[item.type=='error'?'red':'']">{{ item.cznr }}</h3>
                  <div class="result">
                    <!-- <div class="resultAll">
                      <span :style="{color: isCheck(item, 'result')?'#67C23A':'#f74747'}">总结果: </span>
                      <van-icon name="success" color="#67C23A" v-if="checkType && isCheck(item, 'result')" />
                      <van-icon name="cross" color="#f74747" v-else/>
                    </div> -->
                    <div class="resultCheck" v-if="isCheck(item)">
                      <p>
                        <span :style="{color: isCheck(item, 'result')?'#67C23A':'#f74747'}">总结果: </span>
                        <van-icon name="success" color="#67C23A" v-if="checkType && isCheck(item, 'result')" />
                        <van-icon name="cross" color="#f74747" v-else/>
                      </p>
                      <p>
                        <span :style="{color: isCheckColor(item, 'parCheck')}">票面校验: </span> 
                        <van-icon name="success" color="#67C23A" v-if="checkType && isCheck(item, 'parCheck', 'yes')" />
                        <van-icon name="cross" color="#f74747" v-else-if="checkType && isCheck(item, 'parCheck', 'no')"/>
                        <span v-else>-</span>
                      </p>
                      <p>
                        <span :style="{color: isCheckColor(item, 'stationCheck')}">状态校验: </span>
                        <van-icon name="success" color="#67C23A" v-if="checkType && isCheck(item, 'stationCheck', 'yes')" />
                        <van-icon name="cross" color="#f74747" v-else-if="checkType && isCheck(item, 'stationCheck', 'no')" />
                        <span v-else>-</span>
                      </p>
                      <p>
                        <span :style="{color: isCheckColor(item, 'operaCheck')}">拓扑校验: </span>
                        <van-icon name="success" color="#67C23A" v-if="checkType && isCheck(item, 'operaCheck', 'yes')" />
                        <van-icon name="cross" color="#f74747" v-else-if="checkType && isCheck(item, 'operaCheck', 'no')" />
                        <span v-else>-</span>
                      </p>
                    </div>
                  </div>
                </van-step>
              </van-steps>
            </div>
          </div>
        </div>
      </DetailsPage>
    </transition>
  </div>
</template>

<script setup>
import { computed, watch, nextTick, reactive, ref, toRaw } from 'vue';
import { Toast } from 'vant';
import { getStationTicket, getSTCheckResult, substationAgainTicketCheck, ticketStateCheck, stationOperationCheck } from '@apis/substationCheck'
import SearchPage from '@components/search/searchPage'
import ScrollTop from '@components/scrollTop'
import DetailsPage from '@components/details'
import animate from '@utils/animate'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import pushState from '@/utils/pushState'
import filter from '@utils/filter'

const store = useStore();
const route = useRoute();
const state = reactive({
  step: 0,
  params: { status: "已生成", offset: 0, limit: 10, },
  limit: 0
})

const title = '变电操作票校核';
const refresh_loading = ref(false);  // 下拉刷新 loading
const list_loading = ref(false);     // 列表加载 loading
const showCalendar = ref(false);     // 显示日历
const steps_loading = ref(true);
const finished = ref(false);         // ....
const list = ref([]);     // 数据列表
const listLen = ref(0);   // 数据长度（控制动态加载数据）
const details = ref(null);
const d_label = ref(6);   // details label
const d_value = ref(18);  // details value
const status = ref(4);    // 状态
const target = ref('');   // 操作任务（搜索参数）
const search = ref('');   // 站点（搜索参数）
const nprTime = ref('');  // 时间（搜索参数）
const ticketList = ref(null);
const listRef = ref('listRef'); // ref

const statusOptions = [
  { text: '错误集', value: 0 },
  { text: '未校验', value: 1 },
  { text: '未审核', value: 2 },
  { text: '已初审', value: 3 },
  { text: '已生成', value: 4 },
];

const isSearchPage = computed(() => {
  return  store.getters['search/substationCheck_search'];
})
const isDetailsPage = computed(() => {
  return store.getters['details/substationCheck_details'];
})

// 直接监听 ref
watch(listLen, (newListLen) => {
  listLen.value = newListLen;
})

// 加载数据
const onLoad = () => {
  state.step += 10;
  state.params.offset = state.step - 10;
  listLen.value = state.step;
  getStationTicket(state.params).then(res => {
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

// 格式化日期
const formatDate = (time) => {
  if (time.indexOf(' ') !== -1) {
    let arr = time.split(' ');
    return arr[0];
  } else {
    return time;
  }
}

// 选择状态(status)
const handleChange = async (value) => {
  finished.value = false;
  list_loading.value = true;
  list.value = [];
  let element = statusOptions[value];
  state.params.status = element.text;
  state.params.offset = 0;
  state.step = 0;
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

const handleItemCheck = (data) => {
  steps_loading.value = true;
  store.dispatch('details/substationCheck_details', true);
  details.value = data;
  pushState(route.fullPath);
  getTicketResult(data.inst_id);
}


const getTicketResult = async (id) => {
  let res = await getSTCheckResult(id);
  if (res.code === 200) {
    ticketList.value = res.data;
    steps_loading.value = false;
  }
}
const tableList = computed(() => {
  let validations = ticketList.value ? ticketList.value.validations : [];
  let orders = ticketList.value !== null ? ticketList.value.orders : [];
  return orderData(validations, orders);
})
function orderData(validations, orderList) {
  // 各条操作指令打勾还是打叉
  var orderResults = {}; // orderId: {parCheck: y/n, stationCheck: y/n, operaCheck: y/n}
  validations.forEach(validation => {
    var orderId = validation.orderId;
    if (!orderId) return;

    if (!orderResults[orderId]) {
      orderResults[orderId] = {};
    }
  
    switch (validation.type) {
      case "STATE_ERROR":
        orderResults[orderId].stationCheck = "no";
        break;
      case "STATE_SUCCESS":
        orderResults[orderId].stationCheck = "yes";
        break;
      case "OPERATION_ERROR":
        orderResults[orderId].operaCheck = "no";
        break;
      case "OPERATION_SUCCESS":
        orderResults[orderId].operaCheck = "yes";
        break;
      case "ORDERTOTERM":
        orderResults[orderId].term = validation.content;
        break;
      case "TREND_ERROR":
        orderResults[orderId].trendOfTheCheck = "no";
        break;
      default:
        orderResults[orderId].parCheck = "no";
    }
  });

  orderList.forEach(order => {
    if (!orderResults[order.inst_id]) {
      orderResults[order.inst_id] = {};
    }

    if (orderResults[order.inst_id].parCheck == null) {
      orderResults[order.inst_id].parCheck = "yes";
    }
  });

  // 错误信息行
  var errorRows = {};
  var errorRowsArr = [];
  validations.forEach(validation => {
    // 根据validation类型提取错误信息，如果非错误类型，则errMsg为null.
    var errMsg = null;
    switch (validation.type) {
      case "STATE_SUCCESS":
      case "OPERATION_SUCCESS":
      case "ORDERTOTERM":
        break;
      default:
        errMsg = validation.content;
    }

    if (!errMsg) return;

    // 获取要插入的位置
    var pos = validation.pos;
    if (pos == null) {
      pos = getPosByOrderId(orderList, validation.orderId);
    }
    if (pos < 0) return; // 脏数据
    // 将220kV3M母线由冷备用状态转为热备用状态
    if (!errorRows[pos]) {
      if (validation.content) {
        let arr = validation.content.split('<br/>');
        let ids = validation.instId.split(';<br/>');
        arr.forEach((item, index) => {
          errorRowsArr.push({
            pos: pos,
            inst_id: ids[index],
            type: "error",
            cznr: judgeBeginField(validation.type) + item
          });
        })
        // errorRows[pos] = {
        //   inst_id: "error_" + pos,
        //   cznr: this.judgeBeginField(validation.type) + errMsg
        // };
      }
    } else {
      if (validation.content) {
        errorRows[pos].cznr +=
          "<br/>" + judgeBeginField(validation.type) + errMsg;
      }
    }
  });

  // 合并到列表数据
  var listData = [];
  orderList.forEach((order, index) => {
    order.parCheck = orderResults[order.inst_id].parCheck;
    order.stationCheck = orderResults[order.inst_id].stationCheck;
    order.operaCheck = orderResults[order.inst_id].operaCheck;
    order.trendOfTheCheck = orderResults[order.inst_id].trendOfTheCheck;
    listData.push(order);

    if (errorRowsArr.length) {
      errorRowsArr.forEach(item => {
        if (index == item.pos) {
          listData.push(item);
        }
      })
    }
    // if (errorRows[index]) {
    //   listData.push(errorRows[index]);
    // }

  });
  return listData;
}
function judgeBeginField(type) {
  let beginField = "";

  switch (type) {
    case "STATE_ERROR": {
      beginField = "【状态】 ";
      break;
    }
    case "OPERATION_ERROR": {
      beginField = "【拓扑】 ";
      break;
    }
    case "TREND_ERROR": {
      beginField = "【潮流】 ";
      break;
    }
    case null: {
      beginField = "【票面】 ";
    }
  }
  return beginField;
}
function getPosByOrderId(orderList, orderId) {
  if (orderId == null) return -1;
  for (var i = 0, len = orderList.length; i < len; i++) {
    if (orderList[i].inst_id === orderId) {
      return i;
    }
  }
  return -1;
}
//重新票面校核
function getStationTicketCheckResult(id) {
  substationAgainTicketCheck(id).then(res => {
    if (res.code === 200) {
      restTicket(id);
    }
  }).catch(error => {
    console.error(error);
  })
}

//状态校验
function getStationStateCheckResult(id) {
  ticketStateCheck(id).then((res)=>{
    if (res.code === 200) {
      restTicket(id);
    }
  }).catch(error => {
    console.error(error);
  })
}

//拓扑校验
function getStationOperationCheckResult(id) {
  stationOperationCheck(id).then((res)=>{
    if (res.code === 200) {
      restTicket(id);
    }
  }).catch(error => {
    console.error(error);
  })
}

const restTicket = (id) => {
  steps_loading.value = true;
  ticketList.value = null; // 清空数据等待再次获取
  getTicketResult(id);
}
const checkType = computed(()=>{
  return ticketList.value.checkType
})

const isCheck = (data, key, type) => {
  if (data && !key && !type) {
    if (data.parCheck === 'no' || data.stationCheck === 'no' || data.operaCheck === 'no') {
      return true;
    } else {
      return false;
    }
  }

  if (data && key === 'result') {
    if (data.parCheck === 'no' || data.stationCheck === 'no' || data.operaCheck === 'no') {
      return false;
    } else {
      return true;
    }
  }

  if (type === 'yes') {
    return data[key] && data[key] === 'yes'
  } else if (type === 'no') {
    return data[key] && data[key] === 'no'
  } else {
    return;
  }
}

const isCheckColor = (data, key) => {
  if (data && key) {
    if (data[key] === 'yes') {
      return '#67C23A'
    } else if (data[key] === 'no') {
      return '#f74747'
    } else {
      return '';
    }
  }
}

function getResultTagType(ticket) {
  if (!ticket.description) {
    return "";
  } else if (ticket.keyCount > 0 || ticket.operationCount > 0 || ticket.stateCount > 0) {
    return "danger";
  } else {
    return "success";
  }
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

  .details {
    height: calc(100vh - 45px);
    padding: 10px;
    overflow-y: auto;
    position: relative;
    .basic-info {
      font-size: 13px;
      border: 1px solid #eee;
      box-shadow: 0 0 3px #eee;
      border-radius: 10px;
      padding: 10px 5px;
      margin: 5px;
      overflow: hidden;
      .subtitle {
        line-height: 18px;
        text-align: center;
        margin-bottom: 5px;
        color: #2553a1;
      }
      .van-row {
        line-height: 20px;
        .d_label {
          text-align: right;
          color: #666;
        }
        .d_value {
          color: #888888;
        }
      }
    }
    .checkResultImg {
      position: absolute;
      width: 20%;
      right: 10px;
      top: 30px;
      img {
        width: 100%;
        transform: rotate(45deg);
      }
    }

    .oper-content {
      margin-top: 10px;
      .subtitle{
        margin: 5px 10px;
      }
      .btn-group {
        margin-left: 10px;
        .van-button {
          margin-right: 3px;
        }
      }
      .steps {
        padding-bottom: 20px;
        min-height: 200px;
        @include flex($text-align: left);
        .result {
          // display: flex;
        }
        .resultCheck {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #bebebe;
          margin: 6px 0 8px 0;
          .van-icon {
            font-size: 12px;
          }
        }
        .resultAll {
          font-size: 12px;
          margin: 6px 8px 10px 0;
          .van-icon {
            font-size: 12px;
          }
        }
      }
    }
  }
}

.red {
  color: red;
}
</style>