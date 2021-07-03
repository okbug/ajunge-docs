<template>
  <div class="login_box">
    <div class="h50">
      <my-tab-bar
        :title="isLogin ? '登录' : '注册'"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      ></my-tab-bar>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },{ pattern:/\d{6}/, message: '请输入6位数字' }]"
      />
      <Verify
        :showButton='false'
        @success="success"
        @error="error"
        :type="2"
        ref='qqq'
      ></Verify>

      <span @click="isLogin = !isLogin">{{isLogin ? "立即注册" : "已有登录账号"}}</span>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >{{isLogin ? '登录' : '注册'}}</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import Verify from "vue2-verify";
import { Notify } from "vant";
import { login, register } from "../api";
import { Dialog } from "vant";
import md5 from "js-md5";
export default {
  data() {
    return {
      isLogin: true,
      username: "",
      password: "",
    };
  },
  methods: {
    onClickLeft() {},
    onSubmit() {
      this.$refs.qqq.checkCode(); // 用户名密码校验通过后 校验验证码
    },
    success(obj) {
      // 发送ajax请求
      // 判断是登陆还是注册
      if (this.isLogin) {
        login({
          loginName: this.username,
          passwordMd5: md5(this.password),
        }).then((data) => {
          // 登录i成功
          if (data.resultCode == 200) {
            // localStorage.setItem("newbeetoken", data.data);
            this.$store.commit("updateToken", data.data);
            this.$router.push("/");
            this.$store.dispatch("updateCartNum");
            // location.href = "/";
          }
        });
      } else {
        register({
          loginName: this.username,
          password: this.password,
        }).then((data) => {
          if (data.resultCode == 200) {
            Dialog.alert({
              title: "提示",
              message: "注册成功，请登录",
              theme: "round-button",
            }).then(() => {
              this.isLogin = true;
              obj.refresh(); // 刷新验证码
            });
          }
        });
      }
    },
    error() {
      Notify({ type: "danger", message: "验证码错误", duration: 500 });
    },
  },
  components: { Verify },
};
</script>
