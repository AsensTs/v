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
              <div class="table-item" @click="handleClick(item)">
                <div class="item-bottom">
                  <div class="item">申请单位：{{item.sqdw}}</div>
                  <div class="item">申请日期：<span class="time">{{formaDate(item.sqrq, "yyyy-MM-dd hh:mm:ss")}}</span></div>
                  <div class="item"><p>操作任务：{{item.czrw}}</p></div>
                  <div class="item">许可来源：{{item.xklx}}</div>
                  <div class="item">填写人：{{item.txr}}</div>
                  <div class="item">结果：<van-tag :type="formaResult(item.checkResult).type">{{formaResult(item.checkResult).text}}</van-tag></div>
                  <!-- <div class="item"><van-button type="primary" size="mini" style="padding:3px 10px" @click="handleClick(item)">查看详情</van-button></div> -->
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <ScrollTop :max="20" :len="listLen" @scrollTop="scrollTop"></ScrollTop>
    
    <SearchPage dispath="permissiongd_search">
      <div class="title"><p>{{title}}</p></div>
      <van-cell-group inset>
        <van-search class="cell-item" v-model="sqdw" placeholder="申请单位" clearable  shape="round" @search="onSearch"/>
        <van-search class="cell-item" v-model="txr" placeholder="填写人" clearable  shape="round" @search="onSearch"/>
        <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="选择日期：" :value="sqrq" @click="showCalendar = true" /></div>
        <ts-calendar v-model:show="showCalendar" title="选择日期" :show-confirm="false" @confirm="onSearch"></ts-calendar>
        <!-- <van-button class="search-btn" type="primary" size="small">搜索</van-button> -->
        <div class="van-popover">
          <van-popover v-model:show="showStatePopover" :actions="stateOptions" @select="onSelectState" style="margin: 10px;">
            <template #reference>
              <van-button size="mini">{{stateOptions[state].text}}<van-icon name="arrow-down" /></van-button>
            </template>
          </van-popover>
          <van-popover v-model:show="showResultPopover" :actions="resultOptions" @select="onSelectResult">
            <template #reference>
              <van-button size="mini">{{checkResultText?checkResultText:'选择结果'}}<van-icon name="arrow-down" /></van-button>
            </template>
          </van-popover>
          <p v-if="searchData && searchData.length" style="text-align:center;color:#c6c6c6;font-size: 12px;">{{searchData.length >= 999?'999':searchData.length}} 条数据</p>
        </div>
      </van-cell-group>
      <div class="search-result">
        <van-list>
          <van-cell v-for="item in searchData" :key="item" > 
            <div class="table-item" @click="handleClick(item)">
              <div class="item-bottom">
                <div class="item">申请单位：{{item.sqdw}}</div>
                <div class="item">申请日期：<span class="time">{{formaDate(item.sqrq, "yyyy-MM-dd hh:mm:ss")}}</span></div>
                <div class="item"><p>操作任务：{{item.czrw}}</p></div>
                <div class="item">许可来源：{{item.xklx}}</div>
                <div class="item">填写人：{{item.txr}}</div>
                <div class="item">结果：<van-tag :type="formaResult(item.checkResult).type">{{formaResult(item.checkResult).text}}</van-tag></div>
                <!-- <div class="item"><van-button type="primary" size="mini" style="padding:3px 10px" @click="handleClick(item)">查看详情</van-button></div> -->
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
    </SearchPage>
    
    <transition enter-active-class="animate__animated animate__fadeInRight animate__faster" leave-active-class="animate__animated animate__fadeOut">
      <DetailsPage v-if="isDetailsPage" title="书面许可申请">
          <div class="checkResult">
            <div class="checkResultImg">
              <img v-if="!errorResult && isChecked" class="seal" src="@assets/images/true.png" alt />
              <img v-if="errorResult && isChecked" class="seal" src="@assets/images/false.png" alt/>
            </div>
            <ts-table v-model="tableData" title="校核结果">
                <ts-table-item label="类型" prop="type" width="100">
                  <template v-slot="scope">
                    <p>{{typeMap[scope.row.type]}}</p>
                  </template>
                </ts-table-item>
                <ts-table-item label="结果" prop="result" width="60">
                  <template v-slot="scope">
                    <van-icon v-if="scope.row.result == 'true'" name="success" style="color: green" />
                    <van-icon v-else name="cross" style="color: red" />
                  </template>
                </ts-table-item>
                <ts-table-item label="提示信息" prop="content"></ts-table-item>
            </ts-table>
          </div>
          <div class="detailsInfo">
            <van-cell-group inset>
              <van-cell title="申请日期" :value="formaDate(detailsInfo.sqrq, 'yyyy-MM-dd hh:mm:ss')" />
              <van-cell title="申请单位" :value="detailsInfo.sqdw" />
              <van-cell title="一/二次" :value="detailsInfo.sblx" />
              <van-cell title="停/复电" :value="detailsInfo.sftfd" />
              <van-cell title="检修单编号/其他许可" :value="detailsInfo.jxdType" :label="detailsInfo.jxdbh"/>
              <van-cell title="是否满足开工条件">
                <span v-if="JSON.parse(detailsInfo.sfmzkgtj)" style="color:#5e9aff">满足开工条件，申请开工</span>
                <span v-else>未满足开工条件</span>
              </van-cell>
              <van-cell title="工作内容" :value="detailsInfo.gznr" class="van-cell-custom" />
              <van-cell title="操作任务" :value="detailsInfo.czrw" class="van-cell-custom" />
              <van-cell title="备注" :value="detailsInfo.bz" class="van-cell-custom" />
              <van-cell title="填写人(申请人)" :value="detailsInfo.txr"/>
            </van-cell-group>
          </div>
          <div class="stepTable">
            <h3>以下操作步骤的正确性由申请方负责</h3>
            <div class="list" v-for="(item, index) in stepTableData" :key="index">
              <van-row class="row">
                <van-col span="12">顺序： <span class="value">{{item.xh}}</span></van-col>
                <van-col span="12">逻辑顺序： <span class="value">{{item.hx}}</span></van-col>
              </van-row>
              <van-row class="row">
                <van-col span="12">操作类型： <span class="value">{{item.czlx}}</span></van-col>
                <van-col span="12">受令单位： <span class="value">{{item.czdw}}</span></van-col>
              </van-row>
              <van-row class="row">
                <van-col span="24">操作项目： <span class="value">{{item.czbz}}</span></van-col>
              </van-row>
            </div>
          </div>
      </DetailsPage>
    </transition>
  </div>
</template>

<script setup>
import { watch, nextTick, reactive, ref, toRaw, computed} from 'vue';
import { Toast } from 'vant';
import { getPermissiongd, getPCheckResult } from '@apis/permissiongd'
import SearchPage from '@components/search/searchPage'
import ScrollTop from '@components/scrollTop'
import DetailsPage from '@components/details'
import tsTable from '@components/table/ts-table'
import tsTableItem from '@components/table/ts-table-item'
import TsCalendar from '@components/calendar'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import filter from '@utils/filter'
import pushState from '@/utils/pushState'

const title = '厂站许可校核';
const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
const state = ref(1);
const listLen = ref(0);
const listRef = ref('listRef');
const store = useStore();
const route = useRoute();

const states = reactive({
  step: 0,
  params: { state: 1, offset: 0, limit: 10, },
  limit: 0
})
const stateOptions = [
  { text: '待提交调度', value: 0 },
  { text: '已提交调度', value: 1 },
];
const resultOptions = [
  { text: '正确', value: 'TRUE' },
  { text: '错误', value: 'FALSE' },
  { text: '未审核', value: "NONE" }
];
const sqdw = ref('');
const txr = ref('');
const sqrq = ref('');
const checkResult = ref('');
const checkResultText = ref('');
const searchData = ref(null);
const showResultPopover = ref(false);
const showStatePopover = ref(false);
const showCalendar = ref(false);
const formaDate = filter.formaDate;
const errorResult = ref(false);
const isChecked = ref(false);
const detailsInfo = ref();
const stepTableData = ref();

const typeMap = {
  TYPE: "设备类型",
  TASK: "操作任务",
  UNIT: "受令单位",
  STEP: "操作步骤",
}

const tableData =  ref([
  { type: "TYPE", result: "true", content: ""},
  { type: "TASK", result: "true", content: ""},
  { type: "UNIT", result: "true", content: ""},
  { type: "STEP", result: "true", content: ""}
])

watch(listLen, (newListLen) => { // 直接监听 ref
  listLen.value = newListLen
})

const onLoad = async() => { // 加载数据
  states.step += 10;
  states.params.offset = states.step - 10;
  listLen.value = states.step;
  let res = await getData(states.params);
  if (res.code == 200) list.value = [...list.value, ...res.data];
  list_loading.value = false;
}

const getData = (params) => { // 获取数据
  return new Promise((resolve, reject) => {
    getPermissiongd(params).then(res => {
      if (res.data.length < 10) {
        finished.value = true;
      }
      resolve(res);
    }).catch((error) => {
      reject(error)
    })
  })
}

const onRefresh = () => { // 下拉刷新
  setTimeout(() => {
    refresh_loading.value = false;
    states.params =  { state: state, offset: 0, limit: 10 };
    getData(states.params);
    Toast('刷新成功');
  }, 1000);
};

const handleChange = async (value) => {  // 选择状态(status)
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

const scrollTop = async () => { // 返回顶部
  await nextTick();
  let dom = toRaw(listRef.value);
  dom.scrollTop = 0;
  listLen.value = 0;
}

const onSearch = async (value) => {
  if (value instanceof Date) {
    sqrq.value = filter.formaDate(value, 'yyyy-MM-dd');
    if (showCalendar.value) showCalendar.value = false;     // 关闭日历
  }

  Toast.loading({
    message: '搜索中...',
    forbidClick: true,
  });

  let params = {
    sqdw: sqdw.value,
    txr: txr.value,
    sqrq: sqrq.value,
    state: state.value,
    checkResult: checkResult.value,
    offset: 0,
    limit: 1000,
  }
  console.log(params);
  let res = await getData(params);
  searchData.value = res.data;
  list_loading.value = false;
}

const formaResult = (result) => {
  if (result === "TRUE") {
    return { type: 'success', text: "正确" };
  }
  return { type: 'danger', text: "错误" };
}

const isDetailsPage = computed(() => {
  return store.getters['details/permissiongd_details'];
})

const handleClick = (data) => {
  store.dispatch('details/permissiongd_details', true);
  detailsInfo.value = data;
  stepTableData.value = JSON.parse(data.czbz);
  pushState(route.fullPath + '/details');
  getPCheckResult(data.instId, {offset: 0, limit: 10000}).then((res)=>{
    if (res.code !== 200) {
      console.error(res.code, res.msg);
      Toast.fail("获取数据失败");
      return;
    }
    
    if (data.checkResult == "FALSE") {
      errorResult.value = true;
    }
    if (data.checkResult !== "NONE") {
      isChecked.value = true;
    }
    if(!res.length) {
      return;
    }

    let reference = null
    res.forEach((item) => {
      if (item && item.type) {
        switch (item.type) {
          case "TYPE":
            tableData.value[0].result = "false";
            tableData.value[0].content = item.content;
            break;
          case "TASK":
            tableData.value[1].result = "false";
            tableData.value[1].content = item.content;
            break;
          case "UNIT":
            tableData.value[2].result = "false";
            tableData.value[2].content = item.content;
            break;
          case "STEP":
            tableData.value[3].result = "false";
            tableData.value[3].content = item.content.slice( 0, item.content.indexOf("。") + 1 );
            reference = item.content.slice( item.content.indexOf("。") + 1 );
            break;
          default:
            break;
        }
        
        if (item && item.type == "TYPE") {
          // this.errorType = true;
        } else if (item && item.type == "TASK") {
          // this.errorTask = true;
        } else if (item && item.type == "UNIT") {
          // this.errorUnit = true;
        } else if (item && item.type == "STEP") {
          // this.errorStep = true;
        }

        stepTableData.value.push({ czbz: reference, color: true });
      }
    });
  }).catch(error => {
    console.error(error);
  })
}

const onSelectResult = (action) => {
  switch(action.text) {
    case '正确': 
      checkResult.value = 'TRUE'; 
      checkResultText.value = '正确';
    break;
    case '错误': 
      checkResult.value = 'FALSE'; 
      checkResultText.value = '错误';
    break;
    case '未审核': 
      checkResult.value = 'NONE'; 
      checkResultText.value = '未审核';
    break;
    default: break;
  }
  onSearch();
};

const onSelectState = (action) => {
  switch(action.text) {
    case '已提交调度': state.value = 1; break;
    case '待提交调度': state.value = 0; break;
    default: break;
  }
  onSearch();
};
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
      height: 45px;
      @include title($font-size: 16px, $color: #737373);
    }
    .van-cell-group {
      height: 170px;
    }
    .cell-item {
      padding: 3px 8px;
    }
    .van-popover {
      margin: 3px 10px;
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
    .search-result {
      height: 452px;
      background: $bg-color;
      border-radius: 10px;
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
  
  .details-page {
    background: #f9fbff;
    .checkResult {
      position: relative;
      background: #fff;
      margin: 10px;
      padding: 0 10px 10px 10px;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0 0 10px #e9e9e9;
      ::v-deep td.table-cell {
        padding: 6px 0;
      }
    }
    .detailsInfo {
      ::v-deep .van-cell-group {
        margin: 0 10px;
        box-shadow: 0 0 10px #e9e9e9;
      }
      .custom {
        ::v-deep .van-cell__value {
          flex: 3;
          text-align: left;
        }
      }
    }
    .stepTable {
      background: #fff;
      margin: 10px;
      padding: 0 10px 10px 10px;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0 0 10px #e9e9e9;
      h3 {
        @include title($padding: 10px 0 0 0);
      }
      .list {
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 10px;
        margin: 10px 0;
        font-size: 14px;
        .row {
          margin: 5px 0;
        }
        .value {
          color: #969799;
        }
      }
    }
  }
}


</style>