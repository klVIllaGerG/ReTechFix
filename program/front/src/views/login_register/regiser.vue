<template>
  <ElForm class="register-form" ref="registerRef" :model="registerForm" :rules="rules">
    <h1 class="register-title">注册</h1>
    <ElFormItem prop="username">
      <ElInput placeholder="请输入账号" :prefix-icon="icons.UserFilled" v-model="registerForm.username" size="large"></ElInput>
    </ElFormItem>
    <ElFormItem prop="password">
      <ElInput placeholder="请输入密码" :prefix-icon="icons.Lock" v-model="registerForm.password" size="large"></ElInput>
    </ElFormItem>
    <ElFormItem prop="name">
      <ElInput placeholder="请输入姓名" :prefix-icon="icons.Avatar" v-model="registerForm.name" size="large"></ElInput>
    </ElFormItem>
    <ElFormItem prop="email">
      <ElInput placeholder="请输入邮箱" :prefix-icon="icons.Message" v-model="registerForm.email" size="large"></ElInput>
    </ElFormItem>
    <ElFormItem prop="identity">
      <ElInput placeholder="请输入身份证号码" :prefix-icon="icons.Promotion" v-model="registerForm.identity" size="large"></ElInput>
    </ElFormItem>
    <ElFormItem prop="telephone">
      <ElInput placeholder="请输入电话号码" :prefix-icon="icons.PhoneFilled" v-model="registerForm.telephone" size="large"></ElInput>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" class="register-btn" size="large" @click="zhuce">注册</ElButton> 
      <el-dialog v-model="dialogVisible" title="UserID" width="30%" :before-close="handleClose"  style="margin: 30px;">
        <span >请记住您的UserID  {{ UserID }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </ElFormItem>
  </ElForm>
</template>

<script>
import { register } from '@/api/login.js'
import * as icons from '@element-plus/icons-vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      UserID:"",
      icons: icons,
      dialogVisible:false,
      // 表单信息
      registerForm: {
        // 用户名
        username: "",
        // 密码数据
        password: "",
        // 邮箱
        email: "",
        //姓名
        name: "",
        //身份证
        identity: "",
        //电话号码
        telephone: "",
        // 验证码数据
        code: "",

        // 记住密码
        remember: false,
        // 验证码的key，因为前后端分离，这里验证码不能由后台存入session，所以交给vue状态管理
        codeToken: "",
      },
      // 表单验证
      rules: {
        // 设置用户名效验规则
        username: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符的账户", trigger: "blur" },
        ],
        // 设置密码效验规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符的密码", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 6,  message: "邮箱不能为空", trigger: "blur" },
        ],
        // 设置姓名效验规则
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 0, max: 20, message: "姓名不能为空", trigger: "blur" },
        ],
        // 设置身份证效验规则
        identity: [
          { required: true, message: "请输入身份证", trigger: "blur" },
          { min: 0, max: 18, message: "长度为18个字符", trigger: "blur" },
        ],
        telephone:[
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 0, max: 18, message: "", trigger: "blur" },
        ],
        // 设置验证码效验规则
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 5, max: 5, message: "长度为 5 个字符", trigger: "blur" },
        ],
      },
      // 绑定验证码图片
      codeImg: null,
      // 后端提供的URL
      apiUrl: "/api/login",
    };
  },
  methods: {
    // 提交表单
    zhuce() {
      console.log("点击了注册键")
      var vm = this;
      //请求地址,this和vm指的是全局
      let params = {
        user_name: this.registerForm.username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        identity:this.registerForm.identity,
        telephone:this.registerForm.telephone,
        name:this.registerForm.name,
      }
      console.log(params)
    
      register(params).then((res) => {
        console.log(res.data)
        if (res.data === false) {
          vm.$message.error("注册失败");
          vm.resetForm();
        }
        else {
          vm.$message.success("注册成功");
          this.UserID=res.data.id;
          this.dialogVisible=true;
          this.$router.push('/')
        }
      })
    }

    
  }
};

</script>


<style scoped>
.register-form {
  grid-row: 1;
  grid-column: 1;
  opacity: 0;
  transition: 1s ease-in-out;
  /* 上下 | 左右 */
  padding: 0% 25%;
  z-index: 0;
}

.register-form.sign-up-model {
  opacity: 1;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
  z-index: 1;
}

.register-title {

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

.register-btn {
  width: 100%;
  font-size: 18px;
}


</style>
