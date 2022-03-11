<template>
  <div class="main">
    <van-pull-refresh class="refresh" v-model="loading" @refresh="onRefresh">
      <div class="main-container">
        <div class="table">
          <!-- <div class="table-title">Table Title</div> -->
          <div class="table-container">
            <div class="table-item">
              <div class="item-top"><p>投入220kV三水执行站投入220kV三水执行站</p></div>
              <div class="item-bottom">
                <div class="item"><van-icon name="calendar-o" /><span class="time">2022-02-02</span></div>
                <div class="item">状态：<span>正确</span></div>
                <div class="item">查看</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Toast } from 'vant';

export default {
  setup() {
    const loading = ref(false);
    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
      }, 1000);
    };

    return {
      loading,
      onRefresh,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/common.scss';
.main {
  height: calc(100% - 50px - 90px - 50px);
  background-color: #f6f6f6;
  .refresh {
    height: 100%;
    .main-container {
      padding: 8px;
      .table {
        .table-title {
          color: #797979;
          @include line-height(35px);
          padding: 0 5px;
          box-shadow: 0 0 10px #eee;
          background: $bgColor;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }
        .table-container {
          margin-top: 5px;
          background: $bgColor;
          border-radius: 10px;
          .table-item {
            height: 80px;
            padding: 5px 10px;
            box-shadow: 0 0 10px #e7e7e7;
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
              font-size: 14px;
              @include flex($justify-content: space-between);
              color: #888888;
              .item {
                .time {
                  padding-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>