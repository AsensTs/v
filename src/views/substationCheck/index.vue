<template>
  <div class="main-container">
    <div class="table">
      <div class="table-title">
        <div class="title">变电操作票校核</div>
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="status" :options="statusOptions"/>
        </van-dropdown-menu>
      </div>
      <div class="table-container">
        <van-pull-refresh class="refresh" v-model="loading" @refresh="onRefresh">
          <div>
            <div class="table-item" v-for="(item, index) in state.tableData" :key="'stationTicker_'+index">
              <div class="item-top"><p>{{item.target}}</p></div>
              <div class="item-bottom">
                <div class="item"><van-icon name="location" />{{item.czdw}}</div>
                <div class="item"><van-icon name="calendar-o" /><span class="time">{{formaDate(item.generateTime, 'yyyy-MM-dd')}}</span></div>
                <div class="item"><span v-html="formaStatus(item.description)"></span></div>
                <div class="item">查看</div>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import apis from '@apis/index.js'
import axios from '@utils/axios'
import filter from '@utils/filter.js'
import { reactive, ref} from 'vue';
import { Toast } from 'vant';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const loading = ref(false);
    const status = ref(4);
    const state = reactive({
      tableData: null
    })
    const authUser = store.getters['common/authUser']
    const formaDate = filter.formaDate;

    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
      }, 1000);
    };
    
    const statusOptions = [
      { text: '错误集', value: 0 },
      { text: '未校验', value: 1 },
      { text: '未审核', value: 2 },
      { text: '已初审', value: 3 },
      { text: '已生成', value: 4 },
    ];

    // 获取 station ticket 数据
    const getStationTicket = async () => {
      let res = await axios.get(apis.station_ticket + authUser + '/all', {
        params: {
          status: "已生成",
          offset: 0,
          limit: 20,
        },
      })
      state.tableData = res.data;
    }
    getStationTicket();

    const formaStatus = (status) => {
      if (status === "错误") {
        return `<span style="color:#f74747">${status}</span>`
      } else if (status === undefined) {
        return;
      } else {
        return `<span style="color:#67C23A">${status}</span>`
      }
    }

    
    return {
      state,
      loading,
      onRefresh,
      status,
      statusOptions,
      formaDate,
      formaStatus
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';
.main-container {
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
      margin:4px 8px;
      background: $bg-color;
      border-radius: 10px;
      height: calc(100% - 50px - 16px);
      overflow: auto;
      .table-item {
        height: 80px;
        padding: 5px 10px;
        box-shadow: 0 0 5px #eee;
        margin: 10px 5px;
        border: 1px solid $border-Extralight;
        border-radius: 5px;
        .item-top {
          width: 100%;
          height: 50%;
          @include flex($justify-content: space-between, $text-align: left);
          font-weight: bold;
          color: #6b6b6b;
          p {
            width: 70%;
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
        }
      }
    }
  }
}


</style>