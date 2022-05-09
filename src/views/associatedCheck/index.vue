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
                  <div class="item">操作票编号：{{item.czpbh}}</div>
                  <div class="item">拟票时间：{{item.npr_time.split('.')[0]}}</div>
                  <div class="item">审核时间：{{item.shsj1.split('.')[0]}}</div>
                  <div class="item">已关联变电票数量：{{item.associationTicketCount}}</div>
                  <div class="item">站点：{{item.allczdw}}</div>
                  <div class="item"><p>工作任务: {{item.czmd}}</p></div>
                  <div class="item"><van-button type="primary" size="mini" @click="handleClickDetails(item)">详情</van-button></div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <ScrollTop :max="20" :len="listLen" @scrollTop="scrollTop"></ScrollTop>
    
    <SearchPage dispath="associatedCheck_search">
      <div class="title"><p>{{title}}</p></div>
      <van-cell-group inset>
        <van-search class="cell-item" v-model="target" placeholder="操作任务" clearable  shape="round" @search="onSearch"/>
        <van-search class="cell-item" v-model="search" placeholder="站点" clearable  shape="round" @search="onSearch"/>
        <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="选择日期：" :value="nprTime" @click="showCalendar = true" /></div>
        <van-calendar v-model:show="showCalendar" @confirm="onSearch" />
        <van-button class="search-btn" type="primary" size="small">搜索</van-button>
      </van-cell-group>
    </SearchPage>

    <DetailsPage store="associatedCheck_details">
      <div class="details">
        <div class="subtitle">基础信息</div>
        <div class="basic-info">
          <div class="subtitle">{{ details.czdw }}</div>
          <van-row gutter="5"><van-col class="d_label" :span="d_label">操作票编号：</van-col> <van-col class="d_value" :span="d_value">{{ details.czpbh }}</van-col></van-row>
          <van-row gutter="5"><van-col class="d_label" :span="d_label">拟票时间：</van-col> <van-col class="d_value" :span="d_value">{{ details.npr_time.split('.')[0] }}</van-col></van-row>
          <van-row gutter="5"><van-col class="d_label" :span="d_label">审核时间：</van-col> <van-col class="d_value" :span="d_value">{{ details.shsj1.split('.')[0] }}</van-col></van-row>
          <van-row gutter="5"><van-col class="d_label" :span="d_label">站点：</van-col> <van-col class="d_value" :span="d_value">{{ details.allczdw }}</van-col></van-row>
          <van-row gutter="5"><van-col class="d_label" :span="d_label">工作任务：</van-col> <van-col class="d_value" :span="d_value">{{ details.czmd }}</van-col></van-row>
        </div>
        <div class="oper-content">
          <div class="subtitle">操作步骤</div>
          <div class="btn-group">
            <van-button type="primary" size="small" @click="autoRelation(details.inst_id)">一键关联变电操作票</van-button>
          </div>
          <div class="steps">
            <van-loading v-show="steps_loading" color="#1989fa" vertical>正在重新校核...</van-loading>
              <van-steps v-show="!steps_loading" direction="vertical" :active="-1">
                <van-step v-for="item in orderList" :key="item.inst_id">
                  <h3 style="color: #6f6c6a">{{item.czdw}}：{{ item.cznr }}</h3>
                  <div class="result" v-if="item.stationTicket">
                    <div class="glbdczp" v-if="!item.stationTicket.lsdx">
                      <van-button size="mini" @click="handleBindTicket(item.stationTicket.operationOrderId)">关联变电操作票</van-button>
                    </div>
                    <div v-else class="text">
                      <p>{{item.stationTicket.czdw}}</p>
                      <p><van-tag type="success" class="czmd">操作目的</van-tag>{{item.stationTicket.czmd?item.stationTicket.czmd:'空'}}</p>
                      <p><van-tag type="primary" class="gjbz">关键步骤</van-tag>{{item.stationTicket.cznr?item.stationTicket.cznr:'空'}}</p>
                      <div class="btn-groups">
                        <van-button size="mini" @click="handleCzpDetails(item.stationTicket)">详情</van-button>
                        <van-button v-if="item.stationTicket.czmd" size="mini" @click="handleUnbind(item.stationTicket.lsdx)">解绑</van-button>
                      </div>
                    </div>
                  </div>
                </van-step>
              </van-steps>
            </div>
        </div>

        <van-action-sheet v-model:show="showActionSheet" description="点击选择关联变电操作票">
          <div style="min-height: 50vh">
            <van-cell-group>
              <van-cell v-for="(item, index) in actions" :key="'变电操作票' + index" :title="item.ph" :label="item.czmd">
                <template #value>
                  <p>{{item.czdw}}</p>
                  <van-button size="mini" @click="relation(item)">关联操作票</van-button>
                  <van-button size="mini" @click="handleCzpDetails(item)">详情</van-button>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-action-sheet>

        <van-action-sheet v-model:show="showCzpDetails" title="详情">
          <div style="min-height: 50vh">
            <div class="title" style="margin: 10px;font-size: 14px;">基础信息</div>
            <div class="basic-info">
              <van-row gutter="5"><van-col class="d_label" :span="d_label">票号：</van-col> <van-col class="d_value" :span="d_value">{{ czpDetails.number?czpDetails.number:czpDetails.ph }}</van-col></van-row>
              <van-row gutter="5"><van-col class="d_label" :span="d_label">操作单位：</van-col> <van-col class="d_value" :span="d_value">{{ czpDetails.czdw }}</van-col></van-row>
              <van-row gutter="5"><van-col class="d_label" :span="d_label">生成时间：</van-col> <van-col class="d_value" :span="d_value">{{ formaDate(czpDetails.generateDate, 'yyyy-MM-dd hh:mm:ss')}}</van-col></van-row>
              <van-row gutter="5"><van-col class="d_label" :span="d_label">操作目的：</van-col> <van-col class="d_value" :span="d_value">{{ czpDetails.target?czpDetails.target:czpDetails.czmd }}</van-col></van-row>
            </div>
            <div class="title" style="margin: 10px;font-size: 14px;">操作步骤</div>
            <div>
              <van-steps direction="vertical" :active="-1">
                <van-step v-for="item in czpDetailsOrders" :key="item.inst_id">
                  <h3 style="color: #6f6c6a">{{item.number}}&nbsp; {{ item.content }}</h3>
                </van-step>
              </van-steps>
            </div>
          </div>
        </van-action-sheet>
      </div>
    </DetailsPage>

  </div>
</template>

<script setup>
import { watch, nextTick, reactive, ref, toRaw } from 'vue';
import { Toast, Notify, Dialog } from 'vant';
import { associatedOPerTicket, associatedDetails, associatedUnbindTicket, relationStationTicket, accociatedTicketList, associatedManualBindTicket, accociatedStationTicket, accociatedSTOrders } from '@apis/associatedCheck'
import SearchPage from '@components/search/searchPage'
import DetailsPage from '@components/detailsPage'
import ScrollTop from '@components/scrollTop'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import pushState from '@/utils/pushState'
import filter from '@utils/filter'

const title = '调度变电关联扫描';
const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
const listLen = ref(0);
const listRef = ref('listRef');
const store = useStore();
const route = useRoute();

const states = reactive({
  step: 0,
  params: { offset: 0, limit: 10 },
  limit: 0
})
const target = ref('');
const search = ref('');
const nprTime = ref('');
const showCalendar = ref(false);
const formaDate = filter.formaDate;

const d_label = ref(6); 
const d_value = ref(18);
// details
const instId = ref('');
const details  = ref('');            // 详情基础信息
const orderList = ref(null);         // 操作步骤 operationOrders
const ticketList = ref(null);        // 操作步骤 stationTickets
const showActionSheet = ref(false);  // 关联变电操作票窗口
const actions = ref(null);           // 关联的变电操作票列表
const czpDetails = ref(null);        // 操作票详情
const czpDetailsOrders = ref(null);  // 操作票操作步骤
const showCzpDetails = ref(false); 
const steps_loading = ref(true);

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
  associatedOPerTicket(params).then(res => {
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

const onRefresh = () => { // 下拉刷新
  setTimeout(() => {
    refresh_loading.value = false;
    states.params =  { status: status, offset: 0, limit: 10 };
    getData(states.params);
    Toast('刷新成功');
  }, 1000);
};

const scrollTop = async () => { // 返回顶部
  await nextTick();
  let dom = toRaw(listRef.value);
  dom.scrollTop = 0;
  listLen.value = 0;
}

const onSearch = (value) => { //搜索
  showCalendar.value = false;
  nprTime.value = formaDate(value, 'yyyy-MM-dd');
}

const handleClickDetails = (data) => { // 点击进入详情
  store.dispatch('details/associatedCheck_details', true);
  details.value = data;
  instId.value = data.inst_id;
  pushState(route.fullPath + '/details')
  getAssociatedDetails(data.inst_id);
}

const getAssociatedDetails = (id) => { // 获取详情数据
  associatedDetails(id).then(res => {
    if (res.code === 200) {
      let data = res.data;
      for (let i = 0; i < data.operationOrders.length; i++) {
        const oper = data.operationOrders[i];
        for (let j = 0; j < data.stationTickets.length; j++) {
          const station = data.stationTickets[j];
          if (oper.inst_id == station.operationOrderId) {
            Object.assign(data.operationOrders[i], {
              stationTicket: station
            })
          }
        }
      }
      console.log(res.data);
      orderList.value = res.data.operationOrders;
      ticketList.value = res.data.stationTickets;
      steps_loading.value = false;
    } else {
      console.error(res.code, res.msg);
      Toast.fail("获取数据失败");
      return;
    }
  }).catch((error) => {
    console.error(error);
  })
}

const autoRelation = (instId) => { // 一键关联操作票
  relationStationTicket(instId).then((res) => {
    if (res.code == 200) {
      getAssociatedDetails(instId);
      nextTick(()=>{
        Notify({ type: 'success', message: '绑定成功！' });
      })
    }
  }).catch(error => {
    console.log(error);
  })
}

const handleUnbind = (lsdx) => { // 解绑票
  Dialog.confirm({
    title: '是否解绑？',
    message: '',
  }).then(() => {
    postAssociatedUnbindTicket(lsdx);
  }).catch(() => {
  });
}

const postAssociatedUnbindTicket = (lsdx) => {
  associatedUnbindTicket(lsdx).then((res) => {
    if (res.code == 200) {
      getAssociatedDetails(instId.value);
      nextTick(()=>{
        Notify({ type: 'success', message: '解绑成功！' });
      })
    }
  }).catch(error => {
    console.log(error);
  })
}

const handleBindTicket = (id) => { // 打开关联变电操作票窗口
  let params = {
    operationOrderId: id
  }
  getAccociatedTicketList(params);
}

const getAccociatedTicketList = (params) => { // 获取变电操作票列表数据
  accociatedTicketList(params).then((res) => {
    if (res.code == 200) {
      actions.value  = res.data
      nextTick(()=>{
        showActionSheet.value = true;
      })
    }
  }).catch((error)=>{
    console.log(error);
  })
}

const relation = (data) => { // 点击关联操作票
  Dialog.confirm({
    title: `确认关联此操作票？`,
    message: `${data.ph}\n${data.czdw}\n${data.czmd}`,
  }).then(() => {
    postAssociatedManualBindTicket(instId.value, data.inst_id);
  }).catch((error) => {
    console.error(error);
  });
}

const postAssociatedManualBindTicket = (instId, inst_id) => { // 关联指定变电操作票
  associatedManualBindTicket(instId, inst_id).then((res) => {
    if (res.code == 200) {
      getAssociatedDetails(instId);
      Notify({ type: 'success', message: '关联操作票成功！' });
      showActionSheet.value = false;
    }
  }).catch((error) => {
    console.error(error);
  });
}

const handleCzpDetails = (data) => { // 获取操作票详情数据
  czpDetails.value = null;
  czpDetailsOrders.value = null;
  if (data.lsdx) {
    accociatedStationTicket(data.lsdx).then(res => {
      if (res.code == 200) {
        czpDetails.value = res.data
      }
    }).catch(error => {
      console.error(error);
    })

    accociatedSTOrders(data.lsdx).then(res => {
      if (res.code == 200) {
        czpDetailsOrders.value = res.data;
        nextTick(()=>{
          showCzpDetails.value  = true;
        })
      }
    }).catch(error => {
      console.error(error);
    })
  } else {
    czpDetails.value = data;
    showCzpDetails.value  = true;
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

  .details {
    height: calc(100vh - 45px);
    padding: 10px;
    overflow-y: auto;
    position: relative;
    .subtitle {
      line-height: 18px;
      text-align: center;
      margin-bottom: 5px;
      color: #2553a1;
    }
    .basic-info {
      font-size: 13px;
      border: 1px solid #eee;
      box-shadow: 0 0 3px #eee;
      border-radius: 10px;
      padding: 10px 10px;
      margin: 5px;
      overflow: hidden;
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
      .btn-group {
        margin-left: 10px;
        display: flex;
        justify-content: right;
        .van-button {
          margin-right: 3px;
        }
      }
      .steps {
        padding-bottom: 20px;
        min-height: 200px;
        @include flex($text-align: left);
        .result {
          margin: 10px 0;
          .glbdczp {}
          .text {
            p {
              padding: 5px 0;
              font-size: 13px;
            }
            .czmd, .gjbz{
            margin-right: 10px;
          }
          }
        }
      }
    }
    ::v-deep .van-action-sheet__item {
      text-align: left;
      .van-action-sheet__name {
        font-size: 14px;
      }
      .van-action-sheet__subname {
        font-size: 14px;
      }
    }
  }
}


</style>