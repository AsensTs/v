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
              <div class="table-item" @click="handleClickDetails(item)">
                <div class="item-bottom">
                  <div class="item gzrw"><span class="label"></span><span>{{item.gzrw}}</span></div>
                  <div class="item"><span class="label">停电线路名称：</span>{{item.tdxlmc}}</div>
                  <!-- <div class="item gzrw"><p>工作任务: {{item.gzrw}}</p></div> -->
                  <div class="item"><span class="label">特殊工作票：</span>{{item.tsbz}}</div>
                  <div class="item"><span class="label">审批状态：</span>{{item.jxdState}}</div>
                  <div class="item"><span class="label">批准工作开始时间：</span>{{item.jhkssj?formaDate(item.jhkssj, "yyyy-MM-dd hh:mm:ss"):''}}</div>
                  <div class="item"><span class="label">批准工作结束时间：</span>{{item.jhjssj?formaDate(item.jhjssj, "yyyy-MM-dd hh:mm:ss"):''}}</div>
                  <div class="item">
                    <van-button size="mini" @click.stop="handleClickJxdDetails(item)">检修单</van-button>
                    <van-button size="mini" @click="handleClickDetails(item)">查看详情</van-button>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <ScrollTop :max="20" :len="listLen" @scrollTop="scrollTop"></ScrollTop>

    <SearchPage dispath="transmissionSecurity_search">
      <div class="title"><p>输电线路安全搜索</p></div>
      <van-cell-group inset>
        <van-search class="cell-item" v-model="target" placeholder="操作任务" clearable  shape="round"/>
        <van-search class="cell-item" v-model="search" placeholder="站点" clearable  shape="round"/>
        <div class="cell-item calendar-label"><van-cell class="calendar-cell" title="选择日期：" :value="nprTime" @click="showCalendar = true" /></div>
        <ts-calendar v-model:show="show" title="选择日期" :show-confirm="false" @confirm="onSearch"></ts-calendar>
        <van-button class="search-btn" type="primary" size="small">搜索</van-button>
      </van-cell-group>
    </SearchPage>

    <DetailsPage store="transmissionSecurity_details">
      <div class="details">
        <Details :data="details"></Details>
      </div>
    </DetailsPage>

    <DetailsPage v-model:show="jxdDetailsShow">
      <div class="details">
        <JxdDetails :data="JxdDetailsData"></JxdDetails>
      </div>
    </DetailsPage>
  </div>
</template>

<script setup>
import { watch, nextTick, reactive, ref, toRaw } from 'vue';
import { Toast } from 'vant';
import { transmissionXlyzp, jxsqdDetails } from '@apis/transmissionSecurity'
import SearchPage from '@components/search/searchPage'
import DetailsPage from '@components/detailsPage'
import ScrollTop from '@components/scrollTop'
import TsCalendar from '@components/calendar'
import Details from './details'
import JxdDetails from './jxdDetails'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import pushState from '@/utils/pushState'
import filter from '@utils/filter'

const store = useStore();
const route = useRoute();
const states = reactive({
  step: 0,
  params: { offset: 0, limit: 10 },
  limit: 0
})

const title = '输电线路安全措施填写';
const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
const listLen = ref(0);
const listRef = ref('listRef');

const target = ref('');
const search = ref('');
const nprTime = ref('');
const showCalendar = ref(false);
const details = ref(null);
const jxdDetailsShow = ref(false);
const JxdDetailsData = ref(null);
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

const handleClickDetails = (data) => {
  store.dispatch('details/transmissionSecurity_details', true);
  details.value = data;
  pushState(route.fullPath + '/details');
}

const handleClickJxdDetails = async (data) => {
  console.log(data, data.obj_id);
  let res = await getJxsqdDetails(data.ticketid);
  JxdDetailsData.value = res;
  jxdDetailsShow.value = true;
  console.log(res);
}

const getJxsqdDetails = (ticketid) => {
  return new Promise((resolve, reject) => {
    jxsqdDetails(ticketid).then((res) => {
      if (res.code == 200) {
        resolve(res.data);
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

const onSearch = (value) => {
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
        // background: #fbfcff;
        .item-bottom {
          font-size: 14px;
          color: #717171;
          .item {
            .label {
              color: #717171;
            }
            .time {
              padding-left: 2px;
            }
          }
          .gzrw {
            width: 100%;
            color: #6b6b6b;
            font-weight: bold;
            @include ellipsis($clamp: 2);
            margin-bottom: 5px;
            text-decoration: underline;
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
    .details {
      padding: 14px;
    }
  }
}


</style>