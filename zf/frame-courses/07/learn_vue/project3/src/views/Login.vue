<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="用户名"
        prop="name"
      >
        <el-input v-model.number="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/api/about";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "zhufneg",
        password: 123,
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log(this.$refs.ruleForm, valid);
          login(this.ruleForm).then((data) => {
            //信息给 vuex 和 localStorage
            // vuex  在于响应式
            console.log(data);
            this.$store.commit("updateUserInfo", data);
            localStorage.setItem("qqquserinfo", JSON.stringify(data));

            this.$alert("登录成功", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$router.push("/");
              },
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less">
</style>