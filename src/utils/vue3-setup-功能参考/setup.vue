<template>
  <h2>Setup</h2>
  {{countWatch}}
  <el-button @click="handleClick" size="mini">count++</el-button>
  <p>{{dobuleCount}}</p>
  <p>父组件传进来的title: {{props.title}}</p>

  <input type="text" v-model="username"><button @click="changeName">更新用户名</button>
  <br>  
  <SetupChild ref="setupChild" v-model="modelData.name" v-model:age="modelData.age">
    <span>default slot</span>
    <template #title>
      title slot
    </template>
    <template #username="{scope}">
      子组件通过插槽传值给父组件：{{scope}}
    </template>
  </SetupChild>
</template>


<script>
  // 用单独script标签来设置组件名称
  export default {
    name: 'Setup'
  }
</script>

<script setup>
import axios from 'axios'
import { computed, watch, reactive, ref, toRefs, defineProps, nextTick, toRaw } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

// 引入子组件(组件自动注册)
import SetupChild from './setupChild.vue'

/**
 * data 数据
 * template可直接使用{{name}}、{{age}}等
 * reactive 声明响应式数据，用于声明引用数据类型
*/
const state = reactive({
  name: 'asens',
  age: 1
})
state.name = 'ts';
console.log('reactive ---', state.name);

// ref 声明响应式数据，用于声明基本数据类型
const name1 = ref('as');
name1.value = 'ts';
console.log('ref ---', name1.value);

// toRefs 解构
const {name, age} = toRefs(state);
console.log('toRefs ---', name, age);





/**
 * methods 方法
*/
const countWatch = ref(0);

const handleClick = ()=>{
  console.log(countWatch.value++);
}




/**
 * computed 计算属性
*/
const count1 = ref(1);

const dobuleCount = computed(()=>{
  return count1.value * 2;
})




/**
 * watch 监听
*/
const stateWatch = reactive({ count: 0 })
watch(
  () => stateWatch.count,
  (count, prevCount) => {
    console.log('watch');
  },
  {
    immediate: true, // 立即执行
    deep: true // 深度监听
  }
)
// 直接监听 ref
watch(countWatch, (count, prevCount) => {
  console.log('watch', count, prevCount);
})



/**
 * props 传值
 * import defineProps from 'vue';
 * defineProps 在 <script setup> 里面可以自动导入
 * 需在.eslintrc.js文件中【globals】下配置【defineProps: true】
 * 注意：使用setup(){} 函数 props是默认传进来的参数
 * 使用：template里使用 props.title / title
*/

// 子组件接收props
const props = defineProps({
  title: {
    type: String,
    default: ""
  }
})
console.log('props', props);




/**
 * emit 子传父
 * import { defineEmits, defineProps } from 'vue'
 * defineEmits和defineProps在<script setup>中自动可用，无需导入
 * 需在.eslintrc.js文件中【globals】下配置【defineEmits: true】、【defineProps: true】
*/
const username = ref("");
// eslint-disable-next-line no-undef
const emit = defineEmits(['updateName']);
const changeName = () => {
  emit('updateName', username.value)
}




/**
 * v-model
 * v-model:modelValue简写为v-model
 * 可以绑定多个v-model:modelValue
*/
const modelData = reactive({
  name: 'asens',
  age: 12
})




/**
 * nextTick
*/ 
nextTick(() => {
  console.log('nextTick');
})




/**
 * ref
 * 如果值为proxy对象的话，需要使用 toRaw() 来读取， 或者通过JSON.parse和JSON.stringify
*/ 
const setupChild = ref('setupChild');
nextTick(()=>{
  console.log(setupChild.value.name, setupChild.value.arr);
  console.log(toRaw(setupChild.value.arr), 'toRaw方式');
  console.log(JSON.parse(JSON.stringify(setupChild.value.arr)), 'JSON方式');
})



/**
 * 路由
 * useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate
 * 先声明后使用
*/
const route = useRoute();
const router = useRouter();
console.log(route.path, router);

onBeforeRouteLeave((to, form, next) => {
  // 组件离开前触发
  next(); 
})

onBeforeRouteUpdate((to, form, next) => {
  // 路由离开，组件复用时触发
  next();
})




/**
 * Vue3 中的Vuex不再提供辅助函数写法
 * 如： ...mapMutation 等
*/
import { useStore } from 'vuex'
// 必须先声明调用
const store = useStore()

// 获取Vuex的state
store.state.xxx

// 触发mutations的方法
store.commit('fnName')

// 触发actions的方法
store.dispatch('fnName')

// 获取Getters
store.getters.xxx



/**
 * 绑定原型与组件内使用， 全局属性
 * 
 * 
 * main.js
  import { createApp } from 'vue'
  import App from './App.vue'
  const app = createApp(App)
  // 获取原型
  const prototype = app.config.globalProperties
  // 绑定参数
  prototype.name = 'Jerry'


  options API 用法: 跟vue2用法一样
*/

import { getCurrentInstance } from 'vue'
// 获取原型
const { proxy } = getCurrentInstance()
// 输出
console.log(proxy.name)




/**
 * 对 async await 支持
 * 不用配合 async 就可以使用 await
 * 组件 setup 会自动变成 async setup
*/
const post = await fetch('/api').then(() => {});
console.log(post);

// 配合axios不写async会报错： TypeError: instance.update is not a function
const repos = await axios.get('https://api.github.com/users/asensts/repos');
console.log(repos);

// 使用函数配合async
const getRepos = async () => {
  let res = await axios.get('https://api.github.com/users/asensts/repos');
  console.log(res);
}
getRepos()


/**
 *  css 变量注入
 *  支持CSS变量注入v-bind(color)
 * */ 
const style = reactive({
  textColor: "red"
})
console.log(style);
</script>


<style lang="scss" scoped>
  // 支持CSS变量注入v-bind(color)
  .text {
    color: v-bind('style.textColor')
  }

</style>