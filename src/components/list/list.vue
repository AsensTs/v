<template>
  <van-list class="list">
    <van-cell v-for="(item, index) in data" :key="Math.random() + index" >
      <slot v-if="isSlot()" :row="item"></slot>
      <p v-else>{{item}}</p>
    </van-cell>
  </van-list>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    isSlot() {
      if (this.$slots && this.$slots.default) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  padding: 10px;
  .van-cell {
    border-bottom: 1px solid #eee;
  }
}
</style>