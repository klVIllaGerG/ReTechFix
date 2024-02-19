<template>
  <ElForm class="login-form" ref="loginForm" :model="loginForm" :rules="rules">
    <h1 class="login-title">登录</h1>
    <ElFormItem prop="userid">
      <ElInput placeholder="请输入id" :prefix-icon="icons.UserFilled" v-model="loginForm.userid" size="large"></ElInput>
    </ElFormItem>
    <ElFormItem prop="password">
      <el-input placeholder="请输入密码" :prefix-icon="icons.Lock" v-model="loginForm.password" size="large"></el-input>
    </ElFormItem>
    <ElFormItem prop="code">
      <el-input placeholder="请输入验证码" :prefix-icon="icons.QuestionFilled" v-model="loginForm.code" size="large"></el-input>
      <img :src="imageUrl" alt="图片描述">
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" class="login-btn" size="large" @click="submitForm">登录</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script>
import { login } from '@/api/login.js'
import { code } from '@/api/login.js'
import * as icons from '@element-plus/icons-vue';
import { mapState, mapActions } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  computed: {
    ...mapState(['userid']), // 获取 userid 数据
  },
  data() {
    return {
      icons: icons,
      imageUrl: "",
      // 表单信息
      loginForm: {
        // 账户数据
        userid: "",
        // 密码数据
        password: "",

        // 验证码数据
        code: "",
        // 记住密码
        remember: false,
        // 验证码的key，因为前后端分离，这里验证码不能由后台存入session，所以交给vue状态管理
        codeToken: "",
      },
      // 表单验证
      rules: {
        // 设置账户效验规则
        userid: [
          { required: true, message: "请输入账户id", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符的账户", trigger: "blur" },
        ],
        // 设置密码效验规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符的密码", trigger: "blur" },
        ],
        // 设置验证码效验规则
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 5, message: "长度为4 到 5 个字符", trigger: "blur" },
        ],
      },
      // 绑定验证码图片
      codeImg: null,
    };
  },
  methods: {
    resetForm() {//重置表单

      // 账户数据
      this.loginForm.userid = "",
        // 密码数据
        this.loginForm.password = "",
        // 验证码数据
        this.loginForm.code = "",
        // 记住密码
        this.loginForm.remember = false,
        // 验证码的key，因为前后端分离，这里验证码不能由后台存入session，所以交给vue状态管理
        this.loginForm.codeToken = ""
    },
    signUp() {
      this.$router.push('/mainpage')
    },
    ...mapActions(['updateUserId']),
    // 提交表单
    submitForm() {
      console.log("点击了登录键")
      this.updateUserId(this.loginForm.userid);
      this.$router.push('/mainpage')
      //请求地址,this和vm指的是全局
      let params = {
        user: this.loginForm.userid,
        pass: this.loginForm.password,
      }
 
      console.log(params)
      login(params).then((res) => {
        console.log(res.data)
        if (res.data.success === false || this.loginForm.code.toUpperCase() != this.loginForm.codeToken.toUpperCase()) {
          this.$message("登录失败")
          this.resetForm();
        }
        else {
          this.$message("登录成功")
          this.$router.push('/mainpage')
        }
      })
    },

  },
  created() {
    console.log("尝试拿到验证码")
    //请求地址,this和vm指的是全局
    code().then((res) => {
      console.log(res.data)
      if (res.data === false) {
        console.log("拿数据失败")
      }
      else {
        this.imageUrl = res.data.CodeImage
        this.loginForm.codeToken = res.data.CodeToken
        console.log("拿数据成功")
        console.log(this.code)
      }
    })
  },
};
</script>

<style scoped>
.login-form {
  grid-column: 1;
  grid-row: 1;
  opacity: 1;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
  /* 上下 | 左右 */
  padding: 1% 25%;
  z-index: 1;
}

.login-form.sign-up-model {
  opacity: 0;
  transition: 1s ease-in-out;
  z-index: 0;
}

.login-title {

  /*设置字体*/
  font-size: 60px;
  /*设置字体大小*/
  font-weight: bolder;
  /*设置字体粗细*/

  /*文字描边*/
  color: #5c9ef5;
  /*设置文字的填充颜色*/

  font-size: 50px;
  text-align: center;

}

.login-btn {
  width: 100%;
  font-size: 18px;
}
</style>
