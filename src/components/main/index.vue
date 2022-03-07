<template>
  <div class="main">
    <van-pull-refresh class="refresh" v-model="loading" @refresh="onRefresh">
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
.main {
  height: calc(100% - 50px - 90px - 50px);
  .refresh {
    height: 100%;
  }
}
</style>