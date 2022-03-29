<template>
  <div class="login">
    <div class="container">
      <p class="title">一体化安全管控平台登录</p>
      <van-form @submit="onSubmit" class="login-form">
        <van-cell-group inset>
          <van-field
            v-model="form.username"
            name="username"
            label="用户名"
            placeholder="请填写用户名"
            :rules="[{ required: true, message: '用户名不能为空' }]"
          />
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, validator: validatorPassword, message: '必须包含数字、英文字母、特殊符号, 且不小于6位字符' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const form = ref([]);

const validatorPassword = (value) => /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,}$/.test(value);
const onSubmit = async (formData) => {
  await store.dispatch('user/login', formData);
  router.push({name: 'Home'})
}

</script>

<style lang="scss" scoped>
@import '@styles/mixin.scss';
@import '@styles/variable.scss';
.login {
  @include flex();
  // background-image: url(../../assets/images/login-bg.jpg);
  background-position: center;
  .container {
    position: relative;
    top: -20px;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
      color: #fff;
    }
    .login-form {
      width: 100%;
      height: 200px;
      .van-cell {
        margin: 5px 0;
        border-radius: 5px;
      }
    }
  }
}
</style>