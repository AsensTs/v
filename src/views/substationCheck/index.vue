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
            <van-cell v-for="item in list" :key="item" > 
              <div class="table-item">
                <div class="item-top"><p>{{item.target}}</p></div>
                <div class="item-bottom">
                  <div class="item"><van-icon name="location" />{{item.czdw}}</div>
                  <div class="item"><van-icon name="calendar-o" /><span class="time">{{formaDate(item.generateTime)}}</span></div>
                  <div class="item"><span v-html="formaStatus(item.description)"></span></div>
                  <div class="item">查看</div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <div class="scrollTop" @click="handleClickScrollTop" v-if="listLen >= 60">
      <van-icon name="arrow-up" />
    </div>
  </div>
  
</template>

<script setup>
import { watch, nextTick, reactive, ref, toRaw} from 'vue';
import { Toast } from 'vant';
import { getStationTicket } from '@apis/substationCheck'

const refresh_loading = ref(false);
const list_loading = ref(false);
const list = ref([]);
const finished = ref(false);
const status = ref(4);
const listLen = ref(0);
const listRef = ref('listRef');

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

// 直接监听 ref
watch(listLen, (newListLen) => {
  listLen.value = newListLen
})

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

const formaStatus = (status) => {
  if (status === "错误") {
    return `<span style="color:#f74747">${status}</span>`;
  } else if (status === undefined) {
    return;
  } else {
    return `<span style="color:#67C23A">${status}</span>`;
  }
}
const formaDate = (time) => {
  let arr = time.split(' ');
  return arr[0];
}

const handleChange = async (value) => {
  let element = statusOptions[value];
  state.params = {status: element.text, offset: 0, limit: 0};
  await nextTick();
  let dom = toRaw(listRef.value);
  dom.scrollTop = 0;
  onLoad();
}

const handleClickScrollTop = async () => {
  await nextTick();
  let dom = toRaw(listRef.value);
  dom.scrollTop = 0;
  listLen.value = 0;
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
            width: 80%;
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

  .scrollTop {
    height: 50px;
    width: 50px;
    position: absolute;
    right: 20px;
    bottom: 30px;
    background-color: $border-Lighter;
    border-radius: 50%;
    @include flex();
    .van-icon {
      color: #fff;
      font-size: 30px;
    }
  }
}


</style>