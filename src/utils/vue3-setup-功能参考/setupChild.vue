<template>
  v-model 传值：
  name: {{props.modelValue}}
  age: {{props.age}}
  <br/>
  <slot></slot>
  <slot name="title"></slot>
  <slot name="username" :scope="username"></slot>
</template>

<script setup>
import {defineProps, reactive, toRefs, useSlots} from 'vue';
const props = defineProps({
  modelValue: String,
  age: Number
})
console.log(props);

const username = reactive({
  name: "as",
  age: props.age
})

// 将数据和方法暴露给父组件
const state = reactive({
  name: 'as',
  arr: [1,2,3]
})

let slots = useSlots();
console.log('slots', slots);
console.log('default slot', slots.default&&slots.default(), slots.default().length);

// eslint-disable-next-line no-undef
defineExpose({
  ...toRefs(state),
  handleArr() {
    console.log(state.arr);
  }
})
</script>

<style>

</style>