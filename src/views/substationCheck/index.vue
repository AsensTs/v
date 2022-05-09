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
    
    <!-- <van-popup class="search" v-model:show="isSearchPage" @close="handleCloseSearchPage" position="right" closeable :style="{ height: '100%', width: '100%' }">
      <div class="search-input">
          <div class="title"><p>搜索变电操作票</p></div>
          <van-cell-group inset>
              <van-search class="cell-item" v-model="target" placeholder="操作任务" clearable  shape="round" @search="onSearch"/>
              <van-search class="cell-item" v-model="search" placeholder="站点" clearable  shape="round" @search="onSearch"/>
              <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="选择日期：" :value="nprTime" @click="show = true" /></div>
              <ts-calendar v-model:show="show" title="选择日期" :show-confirm="false" @confirm="onSearch"></ts-calendar>
              <p v-if="searchData && searchData.length" style="text-align:center;color:#c6c6c6;font-size: 12px;">共搜索到 {{searchData.length}} 条数据</p>
          </van-cell-group>
        </div>
        <div class="search-result">
          <van-list>
            <van-cell v-for="(item, index) in searchData" :key="item.instId + '-' + index" @click="handleItemCheck(item)"> 
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
        </div>
    </van-popup> -->
    <SearchPage dispath="substationCheck_search">
      <div class="search-input">
        <div class="title"><p>搜索变电操作票</p></div>
        <van-cell-group inset>
            <van-search class="cell-item" v-model="target" placeholder="操作任务" clearable  shape="round" @search="onSearch"/>
            <van-search class="cell-item" v-model="search" placeholder="站点" clearable  shape="round" @search="onSearch"/>
            <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="选择日期：" :value="nprTime" @click="show = true" /></div>
            <ts-calendar v-model:show="show" title="选择日期" :show-confirm="false" @confirm="onSearch"></ts-calendar>
            <div class="van-popover">
              <van-popover v-model:show="showStatusPopover" :actions="statusPopOptions" @select="onSelectState" style="margin: 10px;">
                <template #reference>
                  <van-button size="mini">{{statusPopOptions[statusPop].text}}<van-icon name="arrow-down" /></van-button>
                </template>
              </van-popover>
            </div>
            <p v-if="searchData && searchData.length" style="text-align:center;color:#c6c6c6;font-size: 12px;">共搜索到 {{searchData.length >= 99?'99+':searchData.length}} 条数据</p>
        </van-cell-group>
      </div>
      <div class="search-result">
        <van-list>
          <van-cell v-for="(item, index) in searchData" :key="item.instId + '-' + index" @click="handleItemCheck(item)"> 
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
      </div>
    </SearchPage>

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
import TsCalendar from '@components/calendar'
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
// const showCalendar = ref(true);     // 显示日历
const show = ref(false);     // 显示日历
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
const searchData = ref(null);
const ticketList = ref(null);
const listRef = ref('listRef'); // ref
const statusPop = ref(4);
const showStatusPopover = ref(false);
const statusPopOptions = [
  { text: '错误集', value: 0 },
  { text: '未校验', value: 1 },
  { text: '未审核', value: 2 },
  { text: '已初审', value: 3 },
  { text: '已生成', value: 4 },
];
const statusOptions = [
  { text: '错误集', value: 0 },
  { text: '未校验', value: 1 },
  { text: '未审核', value: 2 },
  { text: '已初审', value: 3 },
  { text: '已生成', value: 4 },
];

const isSearchPage = computed(() => {  // search-page
  return  store.getters['search/substationCheck_search'];
})

const isDetailsPage = computed(() => {  // details-page
  return store.getters['details/substationCheck_details'];
})

const checkType = computed(()=>{
  return ticketList.value.checkType
})

watch(listLen, (newListLen) => {
  listLen.value = newListLen;
})

watch(isSearchPage, (value) => { // 打开搜索页前，初始化数据
  console.log(value ? '打开搜索页' : '关闭搜索页');
  initSearch();
})

const initSearch = () => { // 初始化数据
  searchData.value = null;
  target.value = '';
  search.value = '';
  nprTime.value = '';
}

const onLoad = () => { // 加载数据
  state.step += 10;
  state.params.offset = state.step - 10;
  listLen.value = state.step;
  getData(state.params);
  list_loading.value = false;
}

const getData = (params, type) => { // 获取数据
  getStationTicket(params).then(res => {
    if (res.code === 200) {
      // 搜索请求的数据
      if (type === 'search') {
        searchData.value = res.data;
        return;
      }

      list.value = [...list.value, ...res.data];
      if (res.data.length < 10) {
        // 若数据已全部加载完毕，直接将 finished 设置成 true
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

const onRefresh = () => { // 下拉刷新
  setTimeout(() => {
    refresh_loading.value = false;
    state.params =  { status: status, offset: 0, limit: 10 };
    getData(state.params);
    Toast('刷新成功');
  }, 1000);
}

const formatDate = (time) => { // 格式化日期
  if (time) {
    if (time.indexOf(' ') !== -1) {
      let arr = time.split(' ');
      return arr[0];
    } else {
      return time;
    }
  }
}

const handleChange = async (value) => { // 选择状态(status)
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

const scrollTop = async () => { // 返回顶部
  await nextTick();
  let dom = toRaw(listRef.value);
  dom.scrollTop = 0;
  listLen.value = 0;
}

const onSearch = (value) => { // 搜索数据
  if (value instanceof Date) {
    nprTime.value = filter.formaDate(value, 'yyyy-MM-dd');
    if (show.value) show.value = false;     // 关闭日历
  }

  Toast.loading({
    message: '搜索中...',
    forbidClick: true,
  });

  let params = {
    status: state.params.status,
    target: target.value,
    search: search.value,
    nprTime: nprTime.value
  }
  console.log(params);
  getData(params, 'search');
  list_loading.value = false;
}

const handleItemCheck = (data) => {
  steps_loading.value = true;
  store.dispatch('details/substationCheck_details', true);
  details.value = data;
  pushState(route.fullPath + '/details');
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

const restTicket = (id) => {
  steps_loading.value = true;
  ticketList.value = null; // 清空数据等待再次获取
  getTicketResult(id);
}

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

function getStationTicketCheckResult(id) { //重新票面校核
  substationAgainTicketCheck(id).then(res => {
    if (res.code === 200) {
      restTicket(id);
    } else {
      console.error(res.code, res.msg);
      Toast.fail("票面校核失败");
      return;
    }
  }).catch(error => {
    console.error(error);
  })
}

function getStationStateCheckResult(id) { //状态校验
  ticketStateCheck(id).then((res)=>{
    if (res.code === 200) {
      restTicket(id);
    } else {
      console.error(res.code, res.msg);
      Toast.fail("状态校验失败");
      return;
    }
  }).catch(error => {
    console.error(error);
  })
}

function getStationOperationCheckResult(id) { //拓扑校验
  stationOperationCheck(id).then((res)=>{
    if (res.code === 200) {
      restTicket(id);
    } else {
      console.error(res.code, res.msg);
      Toast.fail("拓扑校验失败");
      return;
    }
  }).catch(error => {
    console.error(error);
  })
}

const onSelectState = (action) => {
  let status = ''
  switch(action.text) {
    case '错误集': 
      statusPop.value = 0;
      status = '错误集'
    break;
    case '未校验': 
      statusPop.value = 1;
      status = '未校验'
    break;
    case '未审核': 
      statusPop.value = 2;
      status = '未审核'
    break;
    case '已初审': 
      statusPop.value = 3;
      status = '已初审'
    break;
    case '已生成': 
      statusPop.value = 4;
      status = '已生成'
    break;
    default: break;
  }
  
  let params = {
    status: status,
    target: target.value,
    search: search.value,
    nprTime: nprTime.value,
    offset: 0, 
    limit: 99
  }
  onSearch_2(params);
};

const onSearch_2 = (params) => { // 搜索数据
  Toast.loading({
    message: '搜索中...',
    forbidClick: true,
  });

  let thisParams = {
    status: state.params.status,
    target: target.value,
    search: search.value,
    nprTime: nprTime.value
  }
  getData(params?params:thisParams, 'search');
  list_loading.value = false;
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

  .search-page {
    .van-popover {
      margin: 5px 10px;
      position: relative;
      ::v-deep .van-popover__wrapper {
        margin-right: 10px;
      }
      .van-button {
        .van-icon {
          font-size: 12px;
        }
      }
    }
    .search-input {
      height: 237.25px;
      .title {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #737373;
        padding: 10px;
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
    .search-result {
      height: 429.75px;
      overflow-y: auto;
      .table-item {
        min-height: 80px;
        padding: 5px 10px;
        box-shadow: 0 0 5px #eee;
        border: 1px solid $border-light;
        border-radius: 5px;
        .item-top {
          width: 100%;
          @include flex($justify-content: space-between, $text-align: left);
          font-weight: bold;
          color: #6b6b6b;
          p {
            font-size: 14px;
            padding: 10px 0;
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