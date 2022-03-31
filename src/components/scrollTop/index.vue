<template>
  <div class="scrollTop" @click="handleClickScrollTop" v-if="len >= max">
    <van-icon name="arrow-up" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['scrollTop'])
/**
 * len: Number 传入的 len 值；
 * max: Number 最大界限，如果传入的 len 大于 max 就显示 scrolltop；
*/
const props = defineProps({
  len: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 30
  }
})
console.log(props);

const handleClickScrollTop = () => {
  emit('scrollTop')
}

</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';
.scrollTop {
  height: 40px;
  width: 40px;
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
</style>